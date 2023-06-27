// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "@cavalre/LPToken.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

struct PoolState {
    uint256 balance;
    uint256 scale;
    uint256 meanBalance;
    uint256 meanScale;
}

struct PoolInfo {
    address token;
    string name;
    string symbol;
    uint8 decimals;
    int256 tau;
    uint256 balance;
    uint256 scale;
    uint256 meanBalance;
    uint256 meanScale;
}

struct AssetState {
    address token;
    uint256 fee;
    uint256 balance;
    uint256 scale;
    uint256 meanBalance;
    uint256 meanScale;
}

struct AssetInfo {
    address token;
    string name;
    string symbol;
    uint8 decimals;
    uint256 fee;
    uint256 balance;
    uint256 scale;
    uint256 meanBalance;
    uint256 meanScale;
}

struct UserState {
    bool isAllowed;
    uint256 discount;
}

contract Pool is LPToken, ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;
    using FixedPointMathLib for uint256;
    using FixedPointMathLib for int256;

    uint256 internal constant ONE = 1e18;

    int256 private _tau;

    uint256 private _isInitialized;

    modifier onlyInitialized() {
        if (_isInitialized == 0) revert NotInitialized();
        _;
    }

    modifier onlyAllowed() {
        if (!_userState[_msgSender()].isAllowed) revert NotAllowed();
        _;
    }

    PoolState private _poolState;

    mapping(address => AssetState) private _assetState;
    address[] private _addresses;
    mapping(address => uint256) private _index;

    mapping(address => UserState) private _userState;

    enum Type {
        Swap,
        Stake,
        Unstake
    }

    error NotInitialized();

    error NotAllowed();

    error LengthMismatch(uint256 expected, uint256 actual);

    error IncorrectAllocation(uint256 expected, uint256 actual);

    error DuplicateToken(address payToken);

    error InvalidSwap(address payToken, address receiveToken);

    error InvalidStake(address payToken);

    error InvalidUnstake(address receiveToken);

    error TooLarge(uint256 size);

    error AssetNotFound(address asset);

    constructor(
        string memory name,
        string memory symbol,
        int256 tau
    ) LPToken(name, symbol) {
        _tau = tau;
    }

    function fromCanonical(
        uint256 amount,
        uint8 decimals
    ) internal pure returns (uint256) {
        if (decimals == 18) return amount;
        if (decimals < 18) return amount / (10 ** (18 - decimals));
        return amount * (10 ** (decimals - 18));
    }

    function addAsset(
        address payToken_,
        uint256 balance_,
        uint256 fee_,
        uint256 assetScale_
    ) public nonReentrant onlyOwner {
        if (_assetState[payToken_].token == payToken_)
            revert DuplicateToken(payToken_);

        _poolState.balance += assetScale_;
        _poolState.scale += assetScale_;
        _poolState.meanBalance += assetScale_;
        _poolState.meanScale += assetScale_;

        uint8 decimals_ = IERC20Metadata(payToken_).decimals();

        SafeERC20.safeTransferFrom(
            IERC20(payToken_),
            _msgSender(),
            address(this),
            fromCanonical(balance_, decimals_)
        );

        _index[payToken_] = _addresses.length;
        _addresses.push(payToken_);
        _assetState[payToken_] = AssetState(
            payToken_,
            fee_,
            balance_,
            assetScale_,
            balance_,
            assetScale_
        );
    }

    function uninitialize(address token) public nonReentrant onlyOwner {
        AssetState memory s = _assetState[token];
        IERC20Metadata m = IERC20Metadata(token);
        if (s.token != token) revert AssetNotFound(token);
        SafeERC20.safeTransfer(
            IERC20(token),
            owner(),
            fromCanonical(s.balance, m.decimals())
        );
    }

    function initialize() public nonReentrant onlyOwner {
        _isInitialized = 1;

        _mint(_msgSender(), _poolState.scale);

        renounceOwnership();
    }

    function info()
        public
        view
        returns (PoolInfo memory)
    {
        address poolAddress = address(this);
        IERC20Metadata poolMetadata = IERC20Metadata(poolAddress);
        return PoolInfo(
            poolAddress,
            poolMetadata.name(),
            poolMetadata.symbol(),
            poolMetadata.decimals(),
            _tau,
            _poolState.balance,
            _poolState.scale,
            _poolState.meanBalance,
            _poolState.meanScale
        );
    }

    function assets() public view returns (AssetInfo[] memory) {
        AssetInfo[] memory assets_ = new AssetInfo[](_addresses.length);

        for (uint256 i; i < _addresses.length; i++) {
            assets_[i] = asset(_addresses[i]);
        }

        return assets_;
    }

    function asset(address token) public view returns (AssetInfo memory) {
        AssetState memory a = _assetState[token];
        if (a.token != token) revert AssetNotFound(token);
        return AssetInfo(
            token,
            IERC20Metadata(token).name(),
            IERC20Metadata(token).symbol(),
            IERC20Metadata(token).decimals(),
            a.fee,
            a.balance,
            a.scale,
            a.meanBalance,
            a.meanScale
        );
    }

    function index(address token) public view returns (uint256) {
        return _index[token];
    }

    function balance() public view returns (uint256) {
        return _poolState.balance;
    }

    function scale() public view returns (uint256) {
        return _poolState.scale;
    }

    function meanPrice(address token) public view returns (uint256) {
        AssetState memory asset_ = _assetState[token];
        uint256 meanWeight = asset_.meanScale.divWadUp(_poolState.meanScale);
        return meanWeight.fullMulDiv(asset_.meanBalance, _poolState.meanBalance);
    }

    function multiswap(
        address[] memory payTokens,
        uint256[] memory amounts,
        address[] memory receiveTokens,
        uint256[] memory allocations
    )
        public
        nonReentrant
        onlyInitialized
        returns (uint256[] memory receiveAmounts)
    {
        Type t = Type.Swap;

        // Check length mismatch
        {
            if (payTokens.length != amounts.length)
                revert LengthMismatch(payTokens.length, amounts.length);
            if (receiveTokens.length != allocations.length)
                revert LengthMismatch(receiveTokens.length, allocations.length);
        }
        // Check duplicates
        {
            bool isLP;
            uint256 temp;
            bool[] memory check_ = new bool[](_addresses.length);
            for (uint256 i; i < payTokens.length; i++) {
                address token = payTokens[i];
                if (address(this) == token) {
                    if (isLP) revert DuplicateToken(token);
                    isLP = true;
                    if (i != 0) {
                        payTokens[i] = payTokens[0];
                        payTokens[0] = address(this);
                        temp = amounts[i];
                        amounts[i] = amounts[0];
                        amounts[0] = temp;
                    }
                    t = Type.Unstake;
                    continue;
                }
                if (_assetState[token].token != token)
                    revert AssetNotFound(token);
                if (check_[_index[token]]) revert DuplicateToken(token);
                check_[_index[token]] = true;
            }

            isLP = false;
            for (uint256 i; i < receiveTokens.length; i++) {
                address token = receiveTokens[i];
                if (address(this) == token) {
                    if (isLP) revert DuplicateToken(token);
                    isLP = true;
                    if (i != 0) {
                        receiveTokens[i] = receiveTokens[0];
                        receiveTokens[0] = address(this);
                        temp = allocations[i];
                        allocations[i] = allocations[0];
                        allocations[0] = temp;
                    }
                    t = Type.Stake;
                    continue;
                }
                if (_assetState[token].token != token)
                    revert AssetNotFound(token);
                if (check_[_index[token]]) revert DuplicateToken(token);
                check_[_index[token]] = true;
            }
        }
        // Check allocations
        {
            uint256 totalAllocation;
            for (uint256 i; i < allocations.length; i++) {
                totalAllocation += allocations[i];
            }
            if (totalAllocation != 1e18)
                revert IncorrectAllocation(1e18, totalAllocation);
        }
        // Check size
        {
            for (uint256 i; i < payTokens.length; i++) {
                address payToken = payTokens[i];
                uint256 balance_;
                if (payToken == address(this)) {
                    balance_ = _poolState.balance;
                } else {
                    balance_ = _assetState[payToken].balance;
                }
                if (amounts[i] * 3 > balance_) revert TooLarge(amounts[i]);
            }
        }

        receiveAmounts = new uint256[](receiveTokens.length);

        // Compute fee
        uint256 fee;
        {
            for (uint256 i; i < receiveTokens.length; i++) {
                fee += allocations[i].mulWadUp(
                    _assetState[receiveTokens[i]].fee
                );
            }
        }

        // Compute scaledValueIn
        uint256 scaledValueIn;
        uint256 feeAmount;
        {
            // Contribution from assets only
            for (uint256 i; i < payTokens.length; i++) {
                address token_ = payTokens[i];
                uint256 amount_ = amounts[i];
                if (token_ != address(this)) {
                    AssetState storage assetIn = _assetState[token_];
                    scaledValueIn += assetIn.scale.fullMulDiv(
                        amount_,
                        assetIn.balance + amount_
                    );
                }
            }

            uint256 scaledFee = scaledValueIn.mulWadUp(fee);
            if (t == Type.Unstake) {
                uint256 amountIn = amounts[0];
                feeAmount =
                    scaledFee.mulWadUp(_poolState.balance - amountIn) +
                    amountIn
                        .fullMulDiv(
                            _poolState.scale,
                            _poolState.scale - scaledFee
                        )
                        .mulWadUp(fee);
                // Contribution from LP tokens
                scaledValueIn += _poolState.scale.fullMulDiv(
                    amountIn,
                    _poolState.balance + feeAmount - amountIn
                );
            } else {
                feeAmount = _poolState.balance.fullMulDiv(
                    scaledFee,
                    _poolState.scale - scaledFee
                );
            }
        }

        // Compute receiveAmounts
        {
            uint256 scaledValueOut;
            uint256 gamma = ONE - fee;

            address receiveToken;
            uint256 allocation;
            for (uint256 i; i < receiveTokens.length; i++) {
                receiveToken = receiveTokens[i];
                allocation = allocations[i].mulWadUp(gamma);
                scaledValueOut = scaledValueIn.mulWadUp(allocation);
                if (receiveToken == address(this)) {
                    receiveAmounts[i] = _poolState.balance.fullMulDiv(
                        scaledValueOut,
                        _poolState.scale - scaledValueOut
                    );
                } else {
                    AssetState storage assetOut = _assetState[receiveToken];
                    receiveAmounts[i] = assetOut.balance.fullMulDiv(
                        scaledValueOut,
                        assetOut.scale + scaledValueOut
                    );
                }
            }
        }

        // Distribute fee
        _poolState.balance += feeAmount;
        _distributeFee(feeAmount);

        // Transfer tokens to the pool
        for (uint256 i; i < payTokens.length; i++) {
            address payToken = payTokens[i];
            uint256 amount = amounts[i];
            if (payToken == address(this)) {
                _poolState.balance -= amount;
                _poolState.meanBalance = _poolState.meanBalance.mulWadUp(
                    uint256(
                        int256(
                            _poolState.balance.divWadUp(_poolState.meanBalance)
                        ).powWad(_tau)
                    )
                );
                _burn(_msgSender(), amount);
            } else {
                AssetState storage assetIn = _assetState[payToken];
                assetIn.balance += amount;
                assetIn.meanBalance = assetIn.meanBalance.mulWadUp(
                    uint256(
                        int256(assetIn.balance.divWadUp(assetIn.meanBalance))
                            .powWad(_tau)
                    )
                );

                SafeERC20.safeTransferFrom(
                    IERC20(payToken),
                    _msgSender(),
                    address(this),
                    fromCanonical(amount, IERC20Metadata(payToken).decimals())
                );
            }
        }

        // Transfer tokens to the receiving address
        for (uint256 i; i < receiveTokens.length; i++) {
            address receiveToken = receiveTokens[i];
            uint256 amountOut = receiveAmounts[i];
            // Update _balance and asset balances.
            if (receiveToken == address(this)) {
                _poolState.balance += amountOut;
                _mint(_msgSender(), amountOut);
            } else {
                _assetState[receiveToken].balance -= amountOut;
                SafeERC20.safeTransfer(
                    IERC20(receiveToken),
                    _msgSender(),
                    fromCanonical(
                        amountOut,
                        IERC20Metadata(receiveToken).decimals()
                    )
                );
            }
        }
    }

    function swap(
        address payToken,
        address receiveToken,
        uint256 payAmount
    ) public nonReentrant returns (uint256) {
        if (_isInitialized == 0) revert NotInitialized();
        if (
            payToken == address(this) ||
            receiveToken == address(this) ||
            _assetState[payToken].scale == 0 ||
            _assetState[receiveToken].scale == 0 ||
            payToken == receiveToken
        ) revert InvalidSwap(payToken, receiveToken);
        AssetState storage assetIn = _assetState[payToken];
        AssetState storage assetOut = _assetState[receiveToken];
        if (payAmount * 3 > assetIn.balance) revert TooLarge(payAmount);

        uint256 feeAmount;
        uint256 receiveAmount;
        {
            assetIn.balance += payAmount;
            assetIn.meanBalance = assetIn.meanBalance.mulWadUp(
                uint256(
                    int256(assetIn.balance.divWadUp(assetIn.meanBalance))
                        .powWad(_tau)
                )
            );

            uint256 scaledValueIn = assetIn.scale.fullMulDiv(
                payAmount,
                assetIn.balance
            );

            uint256 scaledFee = assetOut.fee.mulWadUp(scaledValueIn);
            feeAmount = _poolState.balance.fullMulDiv(
                scaledFee,
                _poolState.scale - scaledFee
            );

            uint256 scaledValueOut = (ONE - assetOut.fee).mulWadUp(
                scaledValueIn
            );
            receiveAmount = assetOut.balance.fullMulDiv(
                scaledValueOut,
                assetOut.scale + scaledValueOut
            );
        }

        _poolState.balance += feeAmount;
        _poolState.meanBalance = _poolState.meanBalance.mulWadUp(
            uint256(
                int256(_poolState.balance.divWadUp(_poolState.meanBalance))
                    .powWad(_tau)
            )
        );

        assetOut.balance -= receiveAmount;
        assetOut.meanBalance = assetOut.meanBalance.mulWadUp(
            uint256(
                int256(assetOut.balance.divWadUp(assetOut.meanBalance)).powWad(
                    _tau
                )
            )
        );

        _distributeFee(feeAmount);

        SafeERC20.safeTransferFrom(
            IERC20(payToken),
            _msgSender(),
            address(this),
            fromCanonical(payAmount, IERC20Metadata(payToken).decimals())
        );

        SafeERC20.safeTransfer(
            IERC20(receiveToken),
            _msgSender(),
            fromCanonical(
                receiveAmount,
                IERC20Metadata(receiveToken).decimals()
            )
        );

        return receiveAmount;
    }

    function stake(
        address payToken,
        uint256 payAmount
    ) public nonReentrant returns (uint256) {
        if (_isInitialized == 0) revert NotInitialized();
        if (payToken == address(this) || _assetState[payToken].scale == 0)
            revert InvalidStake(payToken);
        if (payAmount * 3 > _assetState[payToken].balance)
            revert TooLarge(payAmount);
        AssetState storage assetIn = _assetState[payToken];

        assetIn.balance += payAmount;
        assetIn.meanBalance = assetIn.meanBalance.mulWadUp(
            uint256(
                int256(assetIn.balance.divWadUp(assetIn.meanBalance)).powWad(
                    _tau
                )
            )
        );

        uint256 scaledValueIn = assetIn.scale.fullMulDiv(
            payAmount,
            assetIn.balance
        );
        uint256 receiveAmount = _poolState.balance.fullMulDiv(
            scaledValueIn,
            _poolState.scale - scaledValueIn
        );

        _poolState.balance += receiveAmount;
        _poolState.meanBalance = _poolState.meanBalance.mulWadUp(
            uint256(
                int256(_poolState.balance.divWadUp(_poolState.meanBalance))
                    .powWad(_tau)
            )
        );

        SafeERC20.safeTransferFrom(
            IERC20(payToken),
            _msgSender(),
            address(this),
            fromCanonical(payAmount, IERC20Metadata(payToken).decimals())
        );

        _mint(_msgSender(), receiveAmount);

        return receiveAmount;
    }

    function unstake(
        address receiveToken,
        uint256 payAmount
    ) public nonReentrant returns (uint256) {
        if (_isInitialized == 0) revert NotInitialized();
        if (
            receiveToken == address(this) ||
            _assetState[receiveToken].scale == 0
        ) revert InvalidUnstake(receiveToken);
        if (payAmount * 3 > _poolState.balance) revert TooLarge(payAmount);
        AssetState storage assetOut = _assetState[receiveToken];

        uint256 feeAmount = payAmount.mulWadUp(assetOut.fee);
        uint256 delta = payAmount - feeAmount;

        uint256 scaledValueIn = _poolState.scale.fullMulDiv(
            payAmount,
            _poolState.balance - delta
        );

        uint256 scaledValueOut = scaledValueIn.mulWadUp(ONE - assetOut.fee);

        uint256 receiveAmount = assetOut.balance.fullMulDiv(
            scaledValueOut,
            assetOut.scale + scaledValueOut
        );

        _poolState.balance -= delta;
        _burn(_msgSender(), payAmount);
        _distributeFee(feeAmount);

        assetOut.balance -= receiveAmount;
        SafeERC20.safeTransfer(
            IERC20(receiveToken),
            _msgSender(),
            fromCanonical(
                receiveAmount,
                IERC20Metadata(receiveToken).decimals()
            )
        );

        return receiveAmount;
    }
}

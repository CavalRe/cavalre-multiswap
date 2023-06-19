// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "@cavalre/LPToken.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "solmate/utils/FixedPointMathLib.sol";

struct AssetMeta {
    IERC20 token;
    string name;
    string symbol;
    uint8 decimals;
    uint256 fee;
}

struct AssetState {
    uint256 fee;
    uint256 balance;
    uint256 scale;
    uint256 gamma;
}

struct Asset {
    AssetMeta meta;
    AssetState state;
}

struct PoolState {
    uint256 balance;
    uint256 scale;
}

contract Pool is LPToken, ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;
    using FixedPointMathLib for uint256;

    uint256 internal constant ONE = 1e18;

    uint256 private _isInitialized;

    modifier onlyInitialized() {
        if (_isInitialized == 0) revert NotInitialized();
        _;
    }

    PoolState private _poolState;

    mapping(address => AssetMeta) private _assetMeta;
    mapping(address => AssetState) private _assetState;
    address[] private _addresses;
    mapping(address => uint256) private _index;

    enum Type {
        Swap,
        Stake,
        Unstake
    }

    error NotInitialized();

    error LengthMismatch(uint256 expected, uint256 actual);

    error IncorrectAllocation(uint256 expected, uint256 actual);

    error DuplicateToken(address payToken);

    error InvalidSwap(address payToken, address receiveToken);

    error InvalidStake(address payToken);

    error InvalidUnstake(address receiveToken);

    error TooSmall(uint256 size);

    error TooLarge(uint256 size);

    error AssetNotFound(address asset);

    constructor(
        string memory name,
        string memory symbol
    ) LPToken(name, symbol) {}

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
        if (_assetMeta[payToken_].token == IERC20(payToken_))
            revert DuplicateToken(payToken_);

        _poolState.balance += assetScale_;
        _poolState.scale += assetScale_;

        uint8 decimals_ = IERC20Metadata(payToken_).decimals();

        SafeERC20.safeTransferFrom(
            IERC20(payToken_),
            _msgSender(),
            address(this),
            fromCanonical(balance_, decimals_)
        );

        _index[payToken_] = _addresses.length;
        _addresses.push(payToken_);
        _assetMeta[payToken_] = AssetMeta(
            IERC20(payToken_),
            IERC20Metadata(payToken_).name(),
            IERC20Metadata(payToken_).symbol(),
            decimals_,
            fee_
        );
        _assetState[payToken_] = AssetState(
            fee_,
            balance_,
            assetScale_,
            ONE - fee_
        );
    }

    function uninitialize(address token) public nonReentrant onlyOwner {
        AssetMeta memory m = _assetMeta[token];
        AssetState memory s = _assetState[token];
        SafeERC20.safeTransfer(
            m.token,
            owner(),
            fromCanonical(s.balance, m.decimals)
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
        returns (address, string memory, string memory, uint8, uint256, uint256)
    {
        address poolAddress = address(this);
        IERC20Metadata poolMetadata = IERC20Metadata(poolAddress);
        return (
            poolAddress,
            poolMetadata.name(),
            poolMetadata.symbol(),
            poolMetadata.decimals(),
            _poolState.balance,
            _poolState.scale
        );
    }

    function assets() public view returns (Asset[] memory) {
        Asset[] memory assets_ = new Asset[](_addresses.length);
        for (uint256 i; i < _addresses.length; i++) {
            assets_[i] = Asset(
                _assetMeta[_addresses[i]],
                _assetState[_addresses[i]]
            );
        }
        return assets_;
    }

    function asset(address token) public view returns (Asset memory) {
        AssetMeta memory meta = _assetMeta[token];
        if (address(meta.token) != token) revert AssetNotFound(token);
        AssetState memory state = _assetState[token];
        return Asset(meta, state);
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
                if (address(_assetMeta[token].token) != token)
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
                if (address(_assetMeta[token].token) != token)
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
                if (amounts[i] * 3 > balance_ * 4) revert TooLarge(amounts[i]);
            }
        }

        receiveAmounts = new uint256[](receiveTokens.length);

        // Compute fee
        uint256 fee;
        {
            for (uint256 i; i < receiveTokens.length; i++) {
                fee += allocations[i].mulWadUp(
                    _assetMeta[receiveTokens[i]].fee
                );
            }
        }

        // Compute scaledValueIn
        uint256 scaledValueIn;
        uint256 feeAmount;
        {
            // Contribution from assets only
            uint256 delta;
            for (uint256 i; i < payTokens.length; i++) {
                address token_ = payTokens[i];
                uint256 amount_ = amounts[i];
                if (token_ != address(this)) {
                    AssetState storage asset_ = _assetState[token_];
                    // Compute using pre-trade scale to determine change in scale
                    delta = asset_
                        .scale
                        .divWadUp(asset_.balance + amount_)
                        .mulWadUp(amount_);
                    _assetState[token_].scale -= delta;
                    _poolState.scale -= delta;
                    // Compute using post-trade
                    scaledValueIn += asset_
                        .scale
                        .divWadUp(asset_.balance + amount_)
                        .mulWadUp(amount_);
                }
            }

            uint256 scaledFee = scaledValueIn.mulWadUp(fee);
            if (t == Type.Unstake) {
                uint256 amountIn = amounts[0];
                feeAmount = (scaledFee.mulWadUp(_poolState.balance - amountIn) +
                    _poolState
                        .scale
                        .divWadUp(_poolState.scale - scaledFee)
                        .mulWadUp(fee)
                        .mulWadUp(amountIn));
                // Contribution from LP tokens
                scaledValueIn += _poolState
                    .scale
                    .divWadUp(_poolState.balance + feeAmount - amountIn)
                    .mulWadUp(amountIn);
            } else {
                feeAmount = _poolState
                    .balance
                    .divWadUp(_poolState.scale - scaledFee)
                    .mulWadUp(scaledFee);
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
                    receiveAmounts[i] = _poolState
                        .balance
                        .divWadUp(_poolState.scale - scaledValueOut)
                        .mulWadUp(scaledValueOut);
                } else {
                    AssetState storage assetOut = _assetState[receiveToken];
                    receiveAmounts[i] = assetOut
                        .balance
                        .divWadUp(assetOut.scale + scaledValueOut)
                        .mulWadUp(scaledValueOut);
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
                _burn(_msgSender(), amount);
            } else {
                _assetState[payToken].balance += amount;
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
        if (payAmount * 3 > assetIn.balance * 4) revert TooLarge(payAmount);

        uint256 feeAmount;
        uint256 receiveAmount;
        {
            // Compute using pre-trade scale to determine change in scale
            uint256 scaledValueIn = assetIn
                .scale
                .divWadUp(assetIn.balance + payAmount)
                .mulWadUp(payAmount);
            assetIn.scale -= scaledValueIn;
            _poolState.scale -= scaledValueIn;
            // Compute using post-trade scale
            scaledValueIn = assetIn
                .scale
                .divWadUp(assetIn.balance + payAmount)
                .mulWadUp(payAmount);

            uint256 scaledFee = assetOut.fee.mulWadUp(scaledValueIn);
            feeAmount = _poolState
                .balance
                .divWadUp(_poolState.scale - scaledFee)
                .mulWadUp(scaledFee);

            uint256 scaledValueOut = (ONE - assetOut.fee).mulWadUp(
                scaledValueIn
            );
            receiveAmount = assetOut
                .balance
                .divWadUp(assetOut.scale + scaledValueOut)
                .mulWadUp(scaledValueOut);
        }

        _poolState.balance += feeAmount;
        assetIn.balance += payAmount;
        assetOut.balance -= receiveAmount;

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
        if (payAmount * 3 > _assetState[payToken].balance * 4)
            revert TooLarge(payAmount);
        AssetState storage assetIn = _assetState[payToken];

        // Compute using pre-trade scale to determine change in scale
        uint256 scaledValueIn = assetIn
            .scale
            .divWadUp(assetIn.balance + payAmount)
            .mulWadUp(payAmount);
        assetIn.scale -= scaledValueIn;
        _poolState.scale -= scaledValueIn;
        // Compute using post-trade scale
        scaledValueIn = assetIn
            .scale
            .divWadUp(assetIn.balance + payAmount)
            .mulWadUp(payAmount);
        uint256 receiveAmount = _poolState
            .balance
            .divWadUp(_poolState.scale - scaledValueIn)
            .mulWadUp(scaledValueIn);

        assetIn.balance += payAmount;
        SafeERC20.safeTransferFrom(
            IERC20(payToken),
            _msgSender(),
            address(this),
            fromCanonical(payAmount, IERC20Metadata(payToken).decimals())
        );

        _poolState.balance += receiveAmount;
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
        if (payAmount * 3 > _poolState.balance * 4) revert TooLarge(payAmount);
        AssetState storage assetOut = _assetState[receiveToken];

        uint256 feeAmount = payAmount.mulWadUp(assetOut.fee);
        uint256 delta = payAmount - feeAmount;

        uint256 scaledValueIn = _poolState
            .scale
            .divWadUp(_poolState.balance - delta)
            .mulWadUp(payAmount);

        uint256 scaledValueOut = scaledValueIn.mulWadUp(ONE - assetOut.fee);

        uint256 receiveAmount = assetOut
            .balance
            .divWadUp(assetOut.scale + scaledValueOut)
            .mulWadUp(scaledValueOut);

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

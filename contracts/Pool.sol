// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {LPToken, FixedPointMathLib, IERC20, IERC20Metadata} from "@cavalre/LPToken.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

struct PoolState {
    address token;
    string name;
    string symbol;
    uint8 decimals;
    int256 tau;
    uint256 balance;
    uint256 meanBalance;
    uint256 scale;
    uint256 meanScale;
    uint256 lastUpdated;
}

struct AssetState {
    address token;
    uint256 index;
    string name;
    string symbol;
    uint8 decimals;
    uint256 fee;
    uint256 balance;
    uint256 meanBalance;
    uint256 scale;
    uint256 meanScale;
    uint256 lastUpdated;
}

contract Pool is LPToken {
    using SafeERC20 for IERC20;
    using FixedPointMathLib for uint256;
    using FixedPointMathLib for int256;

    uint256 private _txCount;

    uint256 private _isInitialized;

    bool private _forceSpecialized;

    modifier onlyInitialized() {
        if (_isInitialized == 0) revert NotInitialized();
        _;
    }

    modifier onlyUninitialized() {
        if (_isInitialized == 1) revert AlreadyInitialized();
        _;
    }

    PoolState private _poolState;

    mapping(address => AssetState) private _assetState;
    address[] private _assetAddress;

    event Multiswap(
        address indexed user,
        address[] payTokens,
        address[] receiveTokens,
        uint256[] payAmounts,
        uint256[] receiveAmounts,
        uint256 feeAmount
    );

    event Swap(
        address indexed user,
        address payToken,
        address receiveToken,
        uint256 payAmount,
        uint256 receiveAmount,
        uint256 feeAmount
    );

    event Stake(
        address indexed user,
        address payToken,
        uint256 payAmount,
        uint256 receiveAmount
    );

    event Unstake(
        address indexed user,
        address receiveToken,
        uint256 payAmount,
        uint256 receiveAmount,
        uint256 feeAmount
    );

    event AddLiquidity(
        address indexed user,
        uint256[] payAmounts,
        uint256 receiveAmount
    );

    event RemoveLiquidity(
        address indexed user,
        uint256 payAmount,
        uint256[] receiveAmounts,
        uint256 feeAmount
    );

    error AlreadyInitialized();

    error AssetNotFound(address asset);

    error DuplicateToken(address payToken);

    error IncorrectAllocation(uint256 expected, uint256 actual);

    error InvalidStake(address payToken);

    error InvalidSwap(address payToken, address receiveToken);

    error InvalidUnstake(address receiveToken);

    error LengthMismatch(uint256 expected, uint256 actual);

    error NotInitialized();

    error TooLarge(uint256 size);

    error UseSpecializedFunction();

    error ZeroAddress();

    error ZeroBalance();

    error ZeroLength();

    error ZeroScale();

    constructor(
        string memory name,
        string memory symbol,
        int256 tau,
        bool forceSpecialized
    ) LPToken(name, symbol) {
        _poolState.token = address(this);
        _poolState.name = name;
        _poolState.symbol = symbol;
        _poolState.decimals = 18;
        _poolState.tau = tau;
        _forceSpecialized = forceSpecialized;
    }

    function fromCanonical(
        uint256 amount,
        uint8 decimals
    ) private pure returns (uint256) {
        if (decimals == 18) return amount;
        if (decimals < 18) return amount / (10 ** (18 - decimals));
        return amount * (10 ** (decimals - 18));
    }

    function addAsset(
        address payToken_,
        uint256 balance_,
        uint256 fee_,
        uint256 assetScale_
    ) public nonReentrant onlyUninitialized onlyOwner {
        if (payToken_ == address(0)) revert ZeroAddress();
        if (_assetState[payToken_].token == payToken_)
            revert DuplicateToken(payToken_);
        if (balance_ == 0) revert ZeroBalance();
        if (assetScale_ == 0) revert ZeroScale();

        _poolState.balance += assetScale_;
        _poolState.meanBalance += assetScale_;
        _poolState.scale += assetScale_;
        _poolState.meanScale += assetScale_;

        uint8 decimals_ = IERC20Metadata(payToken_).decimals();

        SafeERC20.safeTransferFrom(
            IERC20(payToken_),
            _msgSender(),
            address(this),
            fromCanonical(balance_, decimals_)
        );

        _assetState[payToken_] = AssetState(
            payToken_,
            _assetAddress.length,
            IERC20Metadata(payToken_).name(),
            IERC20Metadata(payToken_).symbol(),
            decimals_,
            fee_,
            balance_,
            balance_,
            assetScale_,
            assetScale_,
            0
        );
        _assetAddress.push(payToken_);
    }

    function removeAsset(
        address token
    ) public nonReentrant onlyUninitialized onlyOwner {
        if (token == address(0)) revert ZeroAddress();
        AssetState storage asset_ = _assetState[token];
        if (asset_.token != token) revert AssetNotFound(token);

        uint256 assetScale_ = asset_.scale;

        _poolState.balance -= assetScale_;
        _poolState.meanBalance -= assetScale_;
        _poolState.scale -= assetScale_;
        _poolState.meanScale -= assetScale_;

        asset_.balance = 0;
        asset_.meanBalance = 0;
        asset_.scale = 0;
        asset_.meanScale = 0;
        asset_.lastUpdated = 0;

        SafeERC20.safeTransfer(
            IERC20(token),
            owner(),
            fromCanonical(asset_.balance, asset_.decimals)
        );

        _assetAddress[asset_.index] = _assetAddress[_assetAddress.length - 1];
        _assetAddress.pop();
        for (uint256 i; i < _assetAddress.length; i++) {
            _assetState[_assetAddress[i]].index = i;
        }
    }

    function initialize() public nonReentrant onlyUninitialized onlyOwner {
        _isInitialized = 1;

        _mint(_msgSender(), _poolState.scale);
    }

    function info() public view returns (PoolState memory) {
        return _poolState;
    }

    function assets() public view returns (AssetState[] memory) {
        AssetState[] memory assets_ = new AssetState[](_assetAddress.length);

        for (uint256 i; i < _assetAddress.length; i++) {
            assets_[i] = asset(_assetAddress[i]);
        }

        return assets_;
    }

    function asset(address token) public view returns (AssetState memory) {
        if (token == address(0)) revert ZeroAddress();
        if (_assetState[token].token != token) revert AssetNotFound(token);
        return _assetState[token];
    }

    function _geometricMean(
        uint256 newValue,
        uint256 lastValue,
        uint256 lastMean,
        uint256 lastUpdated
    ) private view returns (uint256) {
        int256 delta = int256(_txCount - lastUpdated);
        int256 tau = _poolState.tau;
        if (delta == 0) return lastMean;
        if (delta == 1) {
            return
                newValue.mulWadUp(
                    uint256(int256(lastMean.divWadUp(newValue)).powWad(tau))
                );
        } else {
            int256 exp = tau.powWad(delta);
            return
                newValue
                    .mulWadUp(
                        uint256(
                            int256(lastMean.divWadUp(lastValue)).powWad(exp)
                        )
                    )
                    .mulWadUp(
                        uint256(
                            int256(lastValue.divWadUp(newValue)).powWad(tau)
                        )
                    );
        }
    }

    function _increaseBalance(address token, uint256 amount) private {
        uint256 lastBalance;
        if (token == address(this)) {
            lastBalance = _poolState.balance;
            _poolState.balance += amount;
            _poolState.meanBalance = _geometricMean(
                _poolState.balance,
                lastBalance,
                _poolState.meanBalance,
                _poolState.lastUpdated
            );
            _poolState.lastUpdated = _txCount;
        } else {
            if (token == address(0)) revert ZeroAddress();
            AssetState storage asset_ = _assetState[token];
            if (asset_.token != token) revert AssetNotFound(token);
            lastBalance = asset_.balance;
            asset_.balance += amount;
            asset_.meanBalance = _geometricMean(
                asset_.balance,
                lastBalance,
                asset_.meanBalance,
                asset_.lastUpdated
            );
            asset_.lastUpdated = _txCount;
        }
    }

    function _decreaseBalance(address token, uint256 amount) private {
        uint256 lastBalance;
        if (token == address(this)) {
            lastBalance = _poolState.balance;
            _poolState.balance -= amount;
            _poolState.meanBalance = _geometricMean(
                _poolState.balance,
                lastBalance,
                _poolState.meanBalance,
                _poolState.lastUpdated
            );
            _poolState.lastUpdated = _txCount;
        } else {
            if (token == address(0)) revert ZeroAddress();
            AssetState storage asset_ = _assetState[token];
            if (asset_.token != token) revert AssetNotFound(token);
            lastBalance = asset_.balance;
            asset_.balance -= amount;
            asset_.meanBalance = _geometricMean(
                asset_.balance,
                lastBalance,
                asset_.meanBalance,
                asset_.lastUpdated
            );
            asset_.lastUpdated = _txCount;
        }
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
        onlyAllowed
        returns (uint256[] memory receiveAmounts, uint256 feeAmount)
    {
        _txCount++;

        // Check lengths
        {
            if (payTokens.length == 0) revert ZeroLength();
            if (receiveTokens.length == 0) revert ZeroLength();
            if (
                _forceSpecialized &&
                payTokens.length == 1 &&
                receiveTokens.length == 1
            ) revert UseSpecializedFunction();
            if (payTokens.length != amounts.length)
                revert LengthMismatch(payTokens.length, amounts.length);
            if (receiveTokens.length != allocations.length)
                revert LengthMismatch(receiveTokens.length, allocations.length);
        }
        // Check duplicates
        {
            bool isLP;
            uint256 temp;
            bool[] memory check_ = new bool[](_assetAddress.length);
            for (uint256 i; i < payTokens.length; i++) {
                address token = payTokens[i];
                if (token == address(0)) revert ZeroAddress();
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
                    continue;
                }
                AssetState memory asset_ = _assetState[token];
                if (asset_.token != token) revert AssetNotFound(token);
                if (check_[asset_.index]) revert DuplicateToken(token);
                check_[asset_.index] = true;
            }

            isLP = false;
            for (uint256 i; i < receiveTokens.length; i++) {
                address token = receiveTokens[i];
                if (token == address(0)) revert ZeroAddress();
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
                    continue;
                }
                AssetState memory asset_ = _assetState[token];
                if (asset_.token != token) revert AssetNotFound(token);
                if (check_[asset_.index]) revert DuplicateToken(token);
                check_[asset_.index] = true;
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
        uint256 gamma;
        {
            for (uint256 i; i < receiveTokens.length; i++) {
                fee += allocations[i].mulWadUp(
                    _assetState[receiveTokens[i]].fee
                );
            }
        }
        if (fee > 0 && _userState[_msgSender()].discount > 0) {
            fee = fee.mulWadUp(ONE - _userState[_msgSender()].discount);
        }
        gamma = ONE - fee;

        // Compute scaledValueIn
        uint256 scaledValueIn;
        uint256 lastPoolBalance = _poolState.balance;
        uint256 poolOut;
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

            uint256 poolAlloc = fee;
            if (receiveTokens[0] == address(this)) {
                poolAlloc += allocations[0].mulWadUp(gamma);
            }
            uint256 scaledPoolOut = scaledValueIn.mulWadUp(poolAlloc);
            uint256 poolIn;
            if (payTokens[0] == address(this)) {
                poolIn = amounts[0];
                poolOut = poolAlloc.fullMulDiv(
                    scaledValueIn.mulWadUp(lastPoolBalance - poolIn) +
                        _poolState.scale.mulWadUp(poolIn),
                    _poolState.scale - scaledPoolOut
                );
                scaledValueIn += _poolState.scale.fullMulDiv(
                    poolIn,
                    lastPoolBalance + poolOut - poolIn
                );
                feeAmount = poolOut;
            } else {
                poolOut = lastPoolBalance.fullMulDiv(
                    scaledPoolOut,
                    _poolState.scale - scaledPoolOut
                );
                feeAmount = poolOut.fullMulDiv(fee, poolAlloc);
            }
        }

        // Compute receiveAmounts
        {
            uint256 scaledValueOut;

            address receiveToken;
            uint256 allocation;
            for (uint256 i; i < receiveTokens.length; i++) {
                receiveToken = receiveTokens[i];
                allocation = allocations[i].mulWadUp(gamma);
                scaledValueOut = scaledValueIn.mulWadUp(allocation);
                if (receiveToken == address(this)) {
                    receiveAmounts[i] = poolOut - feeAmount;
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
                _burn(_msgSender(), amount);
            } else {
                _increaseBalance(payToken, amount);

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
                _decreaseBalance(receiveToken, amountOut);

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

        _poolState.meanBalance = _geometricMean(
            _poolState.balance,
            lastPoolBalance,
            _poolState.meanBalance,
            _poolState.lastUpdated
        );
        _poolState.lastUpdated = _txCount;

        emit Multiswap(
            _msgSender(),
            payTokens,
            receiveTokens,
            amounts,
            receiveAmounts,
            feeAmount
        );
    }

    function swap(
        address payToken,
        address receiveToken,
        uint256 payAmount
    )
        public
        nonReentrant
        onlyInitialized
        onlyAllowed
        returns (uint256 receiveAmount, uint256 feeAmount)
    {
        _txCount++;

        if (payToken == address(0)) revert ZeroAddress();
        if (receiveToken == address(0)) revert ZeroAddress();
        if (payToken == address(this))
            revert InvalidSwap(payToken, receiveToken);
        if (receiveToken == address(this))
            revert InvalidSwap(payToken, receiveToken);
        if (payToken == receiveToken) revert DuplicateToken(payToken);
        AssetState storage assetIn = _assetState[payToken];
        if (assetIn.token != payToken) revert AssetNotFound(payToken);
        AssetState storage assetOut = _assetState[receiveToken];
        if (assetOut.token != receiveToken) revert AssetNotFound(receiveToken);

        if (payAmount * 3 > assetIn.balance) revert TooLarge(payAmount);

        {
            _increaseBalance(payToken, payAmount);

            uint256 scaledValueIn = assetIn.scale.fullMulDiv(
                payAmount,
                assetIn.balance
            );

            uint256 fee = assetOut.fee;
            if (fee > 0 && _userState[_msgSender()].discount > 0) {
                fee = fee.mulWadUp(ONE - _userState[_msgSender()].discount);
            }
            uint256 scaledFee = fee.mulWadUp(scaledValueIn);
            feeAmount = _poolState.balance.fullMulDiv(
                scaledFee,
                _poolState.scale - scaledFee
            );

            uint256 scaledValueOut = (ONE - fee).mulWadUp(scaledValueIn);
            receiveAmount = assetOut.balance.fullMulDiv(
                scaledValueOut,
                assetOut.scale + scaledValueOut
            );
        }

        _increaseBalance(address(this), feeAmount);

        _decreaseBalance(receiveToken, receiveAmount);

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

        emit Swap(
            _msgSender(),
            payToken,
            receiveToken,
            payAmount,
            receiveAmount,
            feeAmount
        );
    }

    function stake(
        address payToken,
        uint256 payAmount
    )
        public
        nonReentrant
        onlyInitialized
        onlyAllowed
        returns (uint256 receiveAmount)
    {
        _txCount++;

        if (payToken == address(0)) revert ZeroAddress();
        if (payToken == address(this)) revert InvalidStake(payToken);
        AssetState storage assetIn = _assetState[payToken];
        if (assetIn.token != payToken) revert AssetNotFound(payToken);
        if (payAmount * 3 > assetIn.balance) revert TooLarge(payAmount);

        _increaseBalance(payToken, payAmount);

        uint256 scaledValueIn = assetIn.scale.fullMulDiv(
            payAmount,
            assetIn.balance
        );
        receiveAmount = _poolState.balance.fullMulDiv(
            scaledValueIn,
            _poolState.scale - scaledValueIn
        );

        _increaseBalance(address(this), receiveAmount);

        SafeERC20.safeTransferFrom(
            IERC20(payToken),
            _msgSender(),
            address(this),
            fromCanonical(payAmount, IERC20Metadata(payToken).decimals())
        );

        _mint(_msgSender(), receiveAmount);

        emit Stake(_msgSender(), payToken, payAmount, receiveAmount);
    }

    function unstake(
        address receiveToken,
        uint256 payAmount
    )
        public
        nonReentrant
        onlyInitialized
        onlyAllowed
        returns (uint256 receiveAmount, uint256 feeAmount)
    {
        _txCount++;

        if (receiveToken == address(0)) revert ZeroAddress();
        if (receiveToken == address(this)) revert InvalidUnstake(receiveToken);
        AssetState storage assetOut = _assetState[receiveToken];
        if (assetOut.token != receiveToken) revert AssetNotFound(receiveToken);
        if (payAmount * 3 > _poolState.balance) revert TooLarge(payAmount);

        uint256 fee = assetOut.fee;
        if (fee > 0 && _userState[_msgSender()].discount > 0) {
            fee = fee.mulWadUp(ONE - _userState[_msgSender()].discount);
        }
        feeAmount = payAmount.mulWadUp(fee);
        uint256 delta = payAmount - feeAmount;

        uint256 scaledValueIn = _poolState.scale.fullMulDiv(
            payAmount,
            _poolState.balance - delta
        );

        uint256 scaledValueOut = scaledValueIn.mulWadUp(ONE - fee);

        receiveAmount = assetOut.balance.fullMulDiv(
            scaledValueOut,
            assetOut.scale + scaledValueOut
        );

        _decreaseBalance(address(this), delta);

        _burn(_msgSender(), payAmount);

        _distributeFee(feeAmount);

        _decreaseBalance(receiveToken, receiveAmount);

        SafeERC20.safeTransfer(
            IERC20(receiveToken),
            _msgSender(),
            fromCanonical(
                receiveAmount,
                IERC20Metadata(receiveToken).decimals()
            )
        );

        emit Unstake(
            _msgSender(),
            receiveToken,
            payAmount,
            receiveAmount,
            feeAmount
        );
    }

    function addLiquidity(
        address token,
        uint256 amount
    ) public nonReentrant onlyInitialized onlyAllowed returns (uint256) {
        _txCount++;

        AssetState storage assetIn;
        uint256 g;
        uint256 amountOut;
        uint256[] memory payAmounts = new uint256[](_assetAddress.length);
        if (token == address(this)) {
            g = (_poolState.balance + amount).divWadUp(_poolState.balance);
            amountOut = amount;
        } else {
            if (token == address(0)) revert ZeroAddress();
            assetIn = _assetState[token];
            if (assetIn.token != token) revert AssetNotFound(token);
            g = (assetIn.balance + amount).divWadUp(assetIn.balance);
            amountOut = _poolState.balance.mulWadUp(g) - _poolState.balance;
        }
        for (uint256 i; i < _assetAddress.length; i++) {
            assetIn = _assetState[_assetAddress[i]];
            uint256 amountIn;
            if (assetIn.token == token) {
                amountIn = amount;
            } else {
                amountIn = assetIn.balance.mulWadUp(g) - assetIn.balance;
            }
            payAmounts[i] = amountIn;
            _increaseBalance(_assetAddress[i], amountIn);

            SafeERC20.safeTransferFrom(
                IERC20(assetIn.token),
                _msgSender(),
                address(this),
                fromCanonical(amount, IERC20Metadata(assetIn.token).decimals())
            );
        }

        _increaseBalance(address(this), amountOut);

        _mint(_msgSender(), amountOut);

        emit AddLiquidity(_msgSender(), payAmounts, amountOut);

        return amountOut;
    }

    function removeLiquidity(
        uint256 amount
    )
        public
        nonReentrant
        onlyInitialized
        returns (uint256[] memory receiveAmounts, uint256 feeAmount)
    {
        _txCount++;

        AssetState storage assetOut;
        uint256 fee;
        for (uint256 i; i < _assetAddress.length; i++) {
            fee += _assetState[_assetAddress[i]].fee.fullMulDiv(
                _assetState[_assetAddress[i]].scale,
                _poolState.scale
            );
        }
        if (fee > 0 && _userState[_msgSender()].discount > 0) {
            fee = fee.mulWadUp(ONE - _userState[_msgSender()].discount);
        }
        feeAmount = amount.mulWadUp(fee);

        uint256 delta = amount - feeAmount;

        uint256 g = (_poolState.balance - delta).divWadUp(_poolState.balance);

        _decreaseBalance(address(this), delta);

        _burn(_msgSender(), amount);

        _distributeFee(feeAmount);

        receiveAmounts = new uint256[](_assetAddress.length);
        uint256 amountOut;
        for (uint256 i; i < _assetAddress.length; i++) {
            assetOut = _assetState[_assetAddress[i]];
            amountOut = assetOut.balance - assetOut.balance.mulWadUp(g);
            _decreaseBalance(_assetAddress[i], amountOut);

            receiveAmounts[i] = amountOut;

            SafeERC20.safeTransfer(
                IERC20(assetOut.token),
                _msgSender(),
                fromCanonical(
                    amountOut,
                    IERC20Metadata(assetOut.token).decimals()
                )
            );
        }

        emit RemoveLiquidity(_msgSender(), amount, receiveAmounts, feeAmount);
    }
}

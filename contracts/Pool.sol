// SPDX-License-Identifier: Business Source License 1.1
// Copyright (C) 2020-2023, CavalRe Inc. All rights reserved.
// See the file LICENSE.md for licensing terms.
pragma solidity 0.8.19;

import {IPool, PoolState, AssetState} from "@cavalre/IPool.sol";
import {LPToken, FixedPointMathLib} from "@cavalre/LPToken.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {IERC20, IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Pool is IPool, LPToken, ReentrancyGuard {
    using SafeERC20 for IERC20;
    using FixedPointMathLib for uint256;
    using FixedPointMathLib for int256;

    uint256 private _txCount;

    uint256 private _isInitialized;

    PoolState private _poolState;

    mapping(address => AssetState) private _assetState;
    address[] private _assetAddresses;

    bool private _tradingPaused;

    modifier onlyInitialized() {
        if (_isInitialized == 0) revert NotInitialized();
        _;
    }

    modifier onlyUninitialized() {
        if (_isInitialized == 1) revert AlreadyInitialized();
        _;
    }

    constructor(
        string memory name,
        string memory symbol,
        uint256 tau
    ) LPToken(name, symbol) {
        if (tau >= ONE) revert TooLarge(tau);
        _poolState.token = address(this);
        _poolState.name = name;
        _poolState.symbol = symbol;
        _poolState.decimals = 18;
        _poolState.w = int256(ONE - tau);
    }

    function addAsset(
        address token_,
        uint256 fee_, // 18 decimals
        uint256 balance_, // Token decimals
        uint256 scale_ // 18 decimals
    ) public onlyUninitialized onlyOwner {
        if (token_ == address(0)) revert ZeroAddress();
        if (_assetState[token_].token == token_) revert DuplicateToken(token_);
        if (balance_ == 0) revert ZeroBalance();
        if (scale_ == 0) revert ZeroScale();
        if (fee_ >= ONE) revert TooLarge(fee_);
        uint8 decimals_ = IERC20Metadata(token_).decimals();
        if (decimals_ > 18) revert TooLarge(decimals_); // Contract supports 18 decimals or fewer

        SafeERC20.safeTransferFrom(
            IERC20(token_),
            _msgSender(),
            address(this),
            balance_ // Convert from canonical
        );

        _poolState.balance += scale_;
        _poolState.meanBalance += scale_;
        _poolState.scale += scale_;
        _poolState.meanScale += scale_;

        uint256 conversion_ = 10 ** (18 - decimals_);
        balance_ *= conversion_; // Convert to canonical
        _assetState[token_] = AssetState(
            token_,
            _assetAddresses.length,
            IERC20Metadata(token_).name(),
            IERC20Metadata(token_).symbol(),
            decimals_,
            10 ** (18 - decimals_),
            fee_,
            balance_,
            balance_,
            scale_,
            scale_,
            0
        );
        _assetAddresses.push(token_);
        emit AssetAdded(_txCount, token_, fee_, balance_, scale_);
    }

    function removeAsset(address token) public onlyUninitialized onlyOwner {
        if (token == address(0)) revert ZeroAddress();
        AssetState storage asset_ = _assetState[token];
        if (asset_.token != token) revert AssetNotFound(token);

        uint256 scale_ = asset_.scale;
        _poolState.balance -= scale_;
        _poolState.meanBalance -= scale_;
        _poolState.scale -= scale_;
        _poolState.meanScale -= scale_;

        SafeERC20.safeTransfer(
            IERC20(token),
            owner(),
            asset_.balance / asset_.conversion // Convert from canonical
        );

        uint256 index_ = asset_.index;
        uint256 lastIndex_ = _assetAddresses.length - 1;

        if (index_ != lastIndex_) {
            _assetAddresses[index_] = _assetAddresses[lastIndex_];
            _assetState[_assetAddresses[index_]].index = index_;
        }
        _assetAddresses.pop();

        delete _assetState[token];
        emit AssetRemoved(_txCount, token);
    }

    function initialize() public onlyUninitialized onlyOwner {
        _isInitialized = 1;

        _mint(_msgSender(), _poolState.scale);
        emit Initialized(_poolState.token);
    }

    function txCount() public view returns (uint256) {
        return _txCount;
    }

    function isInitialized() public view returns (bool) {
        return _isInitialized == 1;
    }

    function info() public view returns (PoolState memory) {
        return _poolState;
    }

    function assets() public view returns (AssetState[] memory) {
        AssetState[] memory assets_ = new AssetState[](_assetAddresses.length);

        for (uint256 i; i < _assetAddresses.length; i++) {
            assets_[i] = asset(_assetAddresses[i]);
        }

        return assets_;
    }

    function assetAddresses() public view returns (address[] memory) {
        return _assetAddresses;
    }

    function asset(address token) public view returns (AssetState memory) {
        if (token == address(0)) revert ZeroAddress();
        if (_assetState[token].token != token) revert AssetNotFound(token);
        return _assetState[token];
    }

    function isPaused() public view returns (bool) {
        return _tradingPaused;
    }

    function _geometricMean(
        uint256 newValue,
        uint256 lastValue,
        uint256 lastMean,
        uint256 delta
    ) internal view returns (uint256) {
        int256 w = _poolState.w;
        if (delta == 0) return lastMean;
        if (delta == 1) {
            return
                newValue.mulWadUp(
                    uint256(int256(lastMean.divWadUp(newValue)).powWad(w))
                );
        } else {
            int256 exp = w.powWad(int256(delta * ONE));
            return
                newValue
                    .mulWadUp(
                        uint256(
                            int256(lastMean.divWadUp(lastValue)).powWad(exp)
                        )
                    )
                    .mulWadUp(
                        uint256(int256(lastValue.divWadUp(newValue)).powWad(w))
                    );
        }
    }

    function _updateAssetBalance(
        address token,
        uint256 increaseAmount,
        uint256 decreaseAmount
    ) private {
        if (token == address(0)) revert ZeroAddress();
        AssetState storage asset_ = _assetState[token];
        if (asset_.token != token) revert AssetNotFound(token);
        uint256 lastBalance = asset_.balance;
        asset_.balance += increaseAmount;
        asset_.balance -= decreaseAmount;
        asset_.meanBalance = _geometricMean(
            asset_.balance,
            lastBalance,
            asset_.meanBalance,
            _txCount - asset_.lastUpdated
        );
        asset_.lastUpdated = _txCount;
        emit BalanceUpdate(
            _txCount,
            token,
            asset_.balance,
            asset_.meanBalance,
            IERC20(token).balanceOf(_msgSender())
        );
    }

    function _updatePoolBalance() private {
        uint256 lastPoolBalance = _poolState.balance;
        _poolState.balance = totalSupply();
        _poolState.meanBalance = _geometricMean(
            _poolState.balance,
            lastPoolBalance,
            _poolState.meanBalance,
            _txCount - _poolState.lastUpdated
        );
        _poolState.lastUpdated = _txCount;
        emit BalanceUpdate(
            _txCount,
            address(this),
            _poolState.balance,
            _poolState.meanBalance,
            this.balanceOf(_msgSender())
        );
    }

    function _checkUser(address user_) private view {
        if (user_ == address(0)) revert ZeroAddress();
        if (_isBlocked[user_]) revert UserNotAllowed(user_);
    }

    function _checkDuplicateTokens(
        address[] memory tokens,
        bool[] memory check_,
        bool isLP
    ) private view returns (bool) {
        for (uint256 i; i < tokens.length; i++) {
            address token = tokens[i];
            if (token == address(0)) revert ZeroAddress();
            if (address(this) == token) {
                if (isLP) revert DuplicateToken(token);
                if (i != 0) revert LPTokenFirst();
                isLP = true;
                continue;
            }
            AssetState memory asset_ = _assetState[token];
            if (asset_.token != token) revert AssetNotFound(token);
            if (check_[asset_.index]) revert DuplicateToken(token);
            check_[asset_.index] = true;
        }
        return isLP;
    }

    function _multiswap(
        address sender,
        address[] memory payTokens,
        uint256[] memory amounts,
        address[] memory receiveTokens,
        uint256[] memory allocations,
        uint256[] memory minReceiveAmounts
    )
        private
        nonReentrant
        returns (uint256[] memory receiveAmounts, uint256 feeAmount)
    {
        _txCount++;

        receiveAmounts = new uint256[](receiveTokens.length);

        {
            // Compute fee
            uint256 fee;
            {
                for (uint256 i; i < receiveTokens.length; i++) {
                    fee += allocations[i].mulWadUp(
                        _assetState[receiveTokens[i]].fee
                    );
                }
                uint256 discount_ = _discount[sender];
                if (fee > 0 && discount_ > 0) {
                    fee = fee.mulWadUp(ONE - discount_);
                }
            }

            // Compute scaledValueIn
            uint256 scaledValueIn;
            uint256 poolOut;
            {
                // Contribution from assets only
                for (uint256 i; i < payTokens.length; i++) {
                    address token_ = payTokens[i];
                    if (token_ != address(this)) {
                        AssetState storage assetIn = _assetState[token_];
                        uint256 amount_ = amounts[i] * assetIn.conversion; // Convert to canonical
                        scaledValueIn += assetIn.scale.fullMulDiv(
                            amount_,
                            assetIn.balance + amount_
                        );
                    }
                }

                uint256 poolAlloc = fee;
                if (receiveTokens[0] == address(this)) {
                    poolAlloc += allocations[0].mulWadUp(ONE - fee);
                }
                uint256 lastPoolBalance = _poolState.balance;
                uint256 scaledPoolOut = scaledValueIn.mulWadUp(poolAlloc);
                if (payTokens[0] == address(this)) {
                    uint256 poolIn = amounts[0];
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
                    if (poolAlloc > 0) {
                        feeAmount = poolOut.fullMulDiv(fee, poolAlloc);
                    }
                }
            }

            // Compute receiveAmounts
            {
                uint256 scaledValueOut;

                address receiveToken;
                uint256 allocation;
                for (uint256 i; i < receiveTokens.length; i++) {
                    receiveToken = receiveTokens[i];
                    allocation = allocations[i].mulWadUp(ONE - fee);
                    scaledValueOut = scaledValueIn.mulWadUp(allocation);
                    if (receiveToken == address(this)) {
                        receiveAmounts[i] = poolOut - feeAmount;
                    } else {
                        AssetState storage assetOut = _assetState[receiveToken];
                        receiveAmounts[i] =
                            assetOut.balance.fullMulDiv(
                                scaledValueOut,
                                assetOut.scale + scaledValueOut
                            ) /
                            assetOut.conversion; // Convert from canonical
                    }
                    if (receiveAmounts[i] < minReceiveAmounts[i]) {
                        revert InsufficientReceiveAmount(
                            minReceiveAmounts[i],
                            receiveAmounts[i]
                        );
                    }
                }
            }
        }

        // Transfer tokens to the pool
        for (uint256 i; i < payTokens.length; i++) {
            address payToken = payTokens[i];
            uint256 amount = amounts[i];
            if (payToken == address(this)) {
                uint256 contractBalance = balanceOf(address(this));
                if (contractBalance == 0) {
                    _burn(sender, amount);
                } else if (contractBalance < amount) {
                    _burn(sender, amount - contractBalance);
                    _burn(address(this), contractBalance);
                } else {
                    _burn(address(this), amount);
                }
            } else {
                uint256 externalBalance = IERC20(payToken).balanceOf(
                    address(this)
                );
                uint256 internalBalance = _assetState[payToken].balance /
                    _assetState[payToken].conversion; // Convert from canonical
                if (externalBalance < internalBalance + amount) {
                    SafeERC20.safeTransferFrom(
                        IERC20(payToken),
                        sender,
                        address(this),
                        internalBalance + amount - externalBalance
                    );
                }
                amount *= _assetState[payToken].conversion; // Convert to canonical
                _updateAssetBalance(payToken, amount, 0);
            }
        }

        // Transfer tokens to the receiving address
        for (uint256 i; i < receiveTokens.length; i++) {
            address receiveToken = receiveTokens[i];
            uint256 receiveAmount = receiveAmounts[i];
            // Update _balance and asset balances.
            if (receiveToken == address(this)) {
                _mint(sender, receiveAmount);
            } else {
                SafeERC20.safeTransfer(
                    IERC20(receiveToken),
                    sender,
                    receiveAmount
                );

                receiveAmount *= _assetState[receiveToken].conversion; // Convert to canonical
                _updateAssetBalance(receiveToken, 0, receiveAmount);
            }
        }

        // Distribute fee
        distributeFee(feeAmount);

        _updatePoolBalance();
    }

    function multiswap(
        address[] memory payTokens,
        uint256[] memory amounts,
        address[] memory receiveTokens,
        uint256[] memory allocations,
        uint256[] memory minReceiveAmounts
    )
        public
        onlyInitialized
        returns (uint256[] memory receiveAmounts, uint256 feeAmount)
    {
        if (_tradingPaused) revert TradingPausedError();

        address sender = _msgSender();
        // Check user
        {
            _checkUser(sender);
        }
        // Check lengths
        {
            if (payTokens.length == 0) revert ZeroLength();
            if (receiveTokens.length == 0) revert ZeroLength();
            if (payTokens.length != amounts.length)
                revert LengthMismatch(payTokens.length, amounts.length);
            if (receiveTokens.length != allocations.length)
                revert LengthMismatch(receiveTokens.length, allocations.length);
            if (receiveTokens.length != minReceiveAmounts.length)
                revert LengthMismatch(
                    receiveTokens.length,
                    minReceiveAmounts.length
                );
        }
        // Check duplicates
        {
            bool isLP;
            bool[] memory check_ = new bool[](_assetAddresses.length);
            isLP = _checkDuplicateTokens(payTokens, check_, isLP);
            isLP = _checkDuplicateTokens(receiveTokens, check_, isLP);
        }
        // Check amounts
        {
            for (uint256 i; i < amounts.length; i++) {
                if (amounts[i] == 0) revert ZeroAmount();
            }
        }
        // Check allocations
        {
            uint256 totalAllocation;
            for (uint256 i; i < allocations.length; i++) {
                if (allocations[i] == 0) revert ZeroAllocation();
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
                    balance_ =
                        _assetState[payToken].balance /
                        _assetState[payToken].conversion; // Convert from canonical
                }
                if (amounts[i] * 3 > balance_) revert TooLarge(amounts[i]);
            }
        }

        (receiveAmounts, feeAmount) = _multiswap(
            sender,
            payTokens,
            amounts,
            receiveTokens,
            allocations,
            minReceiveAmounts
        );

        emit Multiswap(
            _txCount,
            sender,
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
        uint256 payAmount,
        uint256 minReceiveAmount
    )
        public
        onlyInitialized
        returns (uint256 receiveAmount, uint256 feeAmount)
    {
        if (_tradingPaused) revert TradingPausedError();
        address sender = _msgSender();
        _checkUser(sender);
        if (payToken == address(0)) revert ZeroAddress();
        if (receiveToken == address(0)) revert ZeroAddress();
        if (payToken == address(this))
            revert InvalidSwap(payToken, receiveToken);
        if (receiveToken == address(this))
            revert InvalidSwap(payToken, receiveToken);
        if (payToken == receiveToken) revert DuplicateToken(payToken);
        if (_assetState[payToken].token != payToken)
            revert AssetNotFound(payToken);
        if (_assetState[receiveToken].token != receiveToken)
            revert AssetNotFound(receiveToken);
        if (payAmount == 0) revert ZeroAmount();
        if (
            payAmount * 3 >
            _assetState[payToken].balance / _assetState[payToken].conversion
        ) revert TooLarge(payAmount);

        {
            address[] memory payTokens = new address[](1);
            uint256[] memory amounts = new uint256[](1);
            address[] memory receiveTokens = new address[](1);
            uint256[] memory allocations = new uint256[](1);
            uint256[] memory minReceiveAmounts = new uint256[](1);
            uint256[] memory receiveAmounts = new uint256[](1);

            payTokens[0] = payToken;
            amounts[0] = payAmount;
            receiveTokens[0] = receiveToken;
            allocations[0] = 1e18;
            minReceiveAmounts[0] = minReceiveAmount;

            (receiveAmounts, feeAmount) = _multiswap(
                sender,
                payTokens,
                amounts,
                receiveTokens,
                allocations,
                minReceiveAmounts
            );

            receiveAmount = receiveAmounts[0];
        }

        emit Swap(
            _txCount,
            sender,
            payToken,
            receiveToken,
            payAmount,
            receiveAmount,
            feeAmount
        );
    }

    function stake(
        address payToken,
        uint256 payAmount,
        uint256 minReceiveAmount
    )
        public
        onlyInitialized
        returns (uint256 receiveAmount, uint256 feeAmount)
    {
        if (_tradingPaused) revert TradingPausedError();
        address sender = _msgSender();
        _checkUser(sender);
        if (payToken == address(0)) revert ZeroAddress();
        if (payToken == address(this)) revert InvalidStake(payToken);
        if (_assetState[payToken].token != payToken)
            revert AssetNotFound(payToken);
        if (payAmount == 0) revert ZeroAmount();
        if (
            payAmount * 3 >
            _assetState[payToken].balance / _assetState[payToken].conversion
        ) revert TooLarge(payAmount);

        {
            address[] memory payTokens = new address[](1);
            uint256[] memory amounts = new uint256[](1);
            address[] memory receiveTokens = new address[](1);
            uint256[] memory allocations = new uint256[](1);
            uint256[] memory minReceiveAmounts = new uint256[](1);
            uint256[] memory receiveAmounts = new uint256[](1);

            payTokens[0] = payToken;
            amounts[0] = payAmount;
            receiveTokens[0] = address(this);
            allocations[0] = 1e18;
            minReceiveAmounts[0] = minReceiveAmount;

            (receiveAmounts, feeAmount) = _multiswap(
                sender,
                payTokens,
                amounts,
                receiveTokens,
                allocations,
                minReceiveAmounts
            );

            receiveAmount = receiveAmounts[0];
        }

        emit Stake(_txCount, sender, payToken, payAmount, receiveAmount);
    }

    function unstake(
        address receiveToken,
        uint256 payAmount,
        uint256 minReceiveAmount
    )
        public
        onlyInitialized
        returns (uint256 receiveAmount, uint256 feeAmount)
    {
        if (_tradingPaused) revert TradingPausedError();
        address sender = _msgSender();
        _checkUser(sender);
        if (receiveToken == address(0)) revert ZeroAddress();
        if (receiveToken == address(this)) revert InvalidUnstake(receiveToken);
        if (_assetState[receiveToken].token != receiveToken)
            revert AssetNotFound(receiveToken);
        if (payAmount == 0) revert ZeroAmount();
        if (payAmount * 3 > _poolState.balance) revert TooLarge(payAmount);

        address[] memory payTokens = new address[](1);
        uint256[] memory amounts = new uint256[](1);
        address[] memory receiveTokens = new address[](1);
        uint256[] memory allocations = new uint256[](1);
        uint256[] memory minReceiveAmounts = new uint256[](1);
        uint256[] memory receiveAmounts = new uint256[](1);

        payTokens[0] = address(this);
        amounts[0] = payAmount;
        receiveTokens[0] = receiveToken;
        allocations[0] = 1e18;
        minReceiveAmounts[0] = minReceiveAmount;

        (receiveAmounts, feeAmount) = _multiswap(
            sender,
            payTokens,
            amounts,
            receiveTokens,
            allocations,
            minReceiveAmounts
        );

        receiveAmount = receiveAmounts[0];

        emit Unstake(
            _txCount,
            sender,
            receiveToken,
            payAmount,
            receiveAmount,
            feeAmount
        );
    }

    function addLiquidity(
        uint256 receiveAmount,
        uint256[] memory maxPayAmounts
    )
        public
        onlyInitialized
        nonReentrant
        returns (uint256[] memory payAmounts)
    {
        if (_tradingPaused) revert TradingPausedError();
        if (_assetAddresses.length != maxPayAmounts.length)
            revert LengthMismatch(_assetAddresses.length, maxPayAmounts.length);
        if (receiveAmount == 0) revert ZeroAmount();
        address sender = _msgSender();
        _checkUser(sender);

        _txCount++;

        AssetState storage assetIn;
        payAmounts = new uint256[](_assetAddresses.length);

        uint256 g = (_poolState.balance + receiveAmount).divWadUp(
            _poolState.balance
        );
        for (uint256 i; i < _assetAddresses.length; i++) {
            assetIn = _assetState[_assetAddresses[i]];
            uint256 payAmount = (assetIn.balance.mulWadUp(g) -
                assetIn.balance) / assetIn.conversion;
            if (payAmount > maxPayAmounts[i])
                revert ExcessivePayAmount(maxPayAmounts[i], payAmount);
            payAmounts[i] = payAmount;

            SafeERC20.safeTransferFrom(
                IERC20(assetIn.token),
                sender,
                address(this),
                payAmount
            );

            payAmount *= assetIn.conversion; // Convert to canonical
            _updateAssetBalance(_assetAddresses[i], payAmount, 0);
        }

        _mint(sender, receiveAmount);
        _updatePoolBalance();

        emit AddLiquidity(_txCount, sender, payAmounts, receiveAmount);
    }

    function _removeLiquidity(
        address sender,
        uint256 amount,
        uint256[] memory minReceiveAmounts
    ) internal returns (uint256[] memory receiveAmounts, uint256 feeAmount) {
        uint256 n = _assetAddresses.length;
        address[] memory payTokens = new address[](1);
        uint256[] memory amounts = new uint256[](1);
        address[] memory receiveTokens = new address[](n);
        uint256[] memory allocations = new uint256[](n);
        receiveAmounts = new uint256[](n);

        payTokens[0] = address(this);
        amounts[0] = amount;
        receiveTokens = _assetAddresses;
        {
            uint256 allocation;
            uint256 totalAllocation;
            for (uint256 i; i < n - 1; i++) {
                allocation = _assetState[_assetAddresses[i]].scale.divWadUp(
                    _poolState.scale
                );
                allocations[i] = allocation;
                totalAllocation += allocation;
            }
            allocations[n - 1] = 1e18 - totalAllocation;
        }

        (receiveAmounts, feeAmount) = _multiswap(
            sender,
            payTokens,
            amounts,
            receiveTokens,
            allocations,
            minReceiveAmounts
        );

        emit RemoveLiquidity(
            _txCount,
            sender,
            amount,
            receiveAmounts,
            feeAmount
        );
    }

    function removeLiquidity(
        uint256 amount,
        uint256[] memory minReceiveAmounts
    )
        public
        onlyInitialized
        returns (uint256[] memory receiveAmounts, uint256 feeAmount)
    {
        if (_assetAddresses.length != minReceiveAmounts.length)
            revert LengthMismatch(
                _assetAddresses.length,
                minReceiveAmounts.length
            );
        if (amount == 0) revert ZeroAmount();
        (receiveAmounts, feeAmount) = _removeLiquidity(
            _msgSender(),
            amount,
            minReceiveAmounts
        );
    }

    function setIsAllowed(address user_, bool isAllowed_) public onlyOwner {
        _isBlocked[user_] = !isAllowed_;
        if (!isAllowed_) {
            if (user_ == owner() || user_ == protocolFeeRecipient())
                revert CannotModify(user_);
            uint256 balance = balanceOf(user_);
            if (balance > 0) {
                _removeLiquidity(
                    user_,
                    balance,
                    new uint256[](_assetAddresses.length)
                );
            }
            _discount[user_] = 0;
            emit UserRemoved(user_);
        }
    }

    function pauseTrading() public onlyOwner {
        _tradingPaused = true;
        emit TradingPaused();
    }

    function resumeTrading() public onlyOwner {
        _tradingPaused = false;
        emit TradingResumed();
    }
}

// SPDX-License-Identifier: Business Source License 1.1
// Copyright (C) 2020-2023, CavalRe Inc. All rights reserved.
// See the file LICENSE.md for licensing terms.
pragma solidity 0.8.19;

import {IPool, PoolState, AssetState, QuoteState} from "./interfaces/IPool.sol";
import {LPToken, FixedPointMathLib} from "./LPToken.sol";
import {IWrappedNative} from "./interfaces/IWrappedNative.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {IERC20, IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Pool is IPool, LPToken, ReentrancyGuard {
    using SafeERC20 for IERC20;
    using FixedPointMathLib for uint256;
    using FixedPointMathLib for int256;

    uint256 private _isInitialized;

    uint256 private _txCount;
    // uint256 internal _multiplier = 1e9;

    PoolState private _poolState;
    mapping(address => AssetState) private _assetState;
    address[] private _assetAddresses;

    address private _wrappedNativeAddress;

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
        uint256 protocolFee, // 18 decimals
        address protocolFeeRecipient,
        uint256 tokensPerShare, // 18 decimals
        uint256 tau, // 18 decimals
        address wrappedNativeAddress
    ) LPToken(name, symbol, protocolFee, protocolFeeRecipient, tokensPerShare) {
        if (tau >= ONE) revert TooLarge(tau);
        if (wrappedNativeAddress == address(0)) revert ZeroAddress();

        tau *= TO_INTERNAL; // Convert to internal decimals

        _poolState.token = address(this);
        _poolState.name = name;
        _poolState.symbol = symbol;
        _poolState.internalDecimals = INTERNAL_DECIMALS;
        _poolState.omega = int256(ONE - tau); // Internal decimals
        _poolState.tokensPerShare = _tokensPerShare; // Internal decimals
        _wrappedNativeAddress = wrappedNativeAddress;
    }

    function _payTokenToPool(
        address sender,
        address payToken,
        uint256 amount // Token decimals
    ) private {
        if (payToken == address(this)) {
            _burn(sender, amount);
        } else if (payToken == address(0)) {
            if (msg.value != amount) revert IncorrectAmount(msg.value, amount);
            _wrap(amount);
        } else {
            SafeERC20.safeTransferFrom(
                IERC20(payToken),
                sender,
                address(this),
                amount
            );
        }
    }

    function _payTokensFromPool(
        address receiver,
        address receiveToken,
        uint256 amount // Token decimals
    ) private {
        if (receiveToken == address(this)) {
            _mint(receiver, amount);
        } else if (receiveToken == address(0)) {
            _unwrap(amount);
            (bool success, ) = payable(receiver).call{value: amount}("");
            require(success, "Transfer failed");
        } else {
            SafeERC20.safeTransfer(IERC20(receiveToken), receiver, amount);
        }
    }

    function addAsset(
        address token_,
        uint256 fee_, // 18 decimals
        uint256 balance_, // Token decimals
        uint256 scale_ // 18 decimals
    ) public payable onlyUninitialized onlyOwner {
        if (token_ == address(0)) revert ZeroAddress();
        if (_assetState[token_].token == token_) revert DuplicateToken(token_);
        if (balance_ == 0) revert ZeroBalance();
        if (scale_ == 0) revert ZeroScale();
        fee_ *= TO_INTERNAL; // Convert to internal decimals
        if (fee_ >= ONE) revert TooLarge(fee_);

        string memory name_ = IERC20Metadata(token_).name();
        string memory symbol_ = IERC20Metadata(token_).symbol();
        uint8 decimals_ = IERC20Metadata(token_).decimals();
        if (decimals_ > 18) revert TooLarge(decimals_); // Contract supports 18 decimals or fewer
        if (decimals_ == 0) revert TooSmall(decimals_);

        _payTokenToPool(_msgSender(), token_, balance_);

        scale_ *= TO_INTERNAL; // Convert to internal decimals
        _poolState.balance += scale_;
        _poolState.meanBalance += scale_;
        _poolState.scale += scale_;
        _poolState.meanScale += scale_;

        uint256 conversion_ = TO_INTERNAL * 10 ** (18 - decimals_);
        balance_ *= conversion_; // Convert to internal decimals
        AssetState memory asset_ = _assetState[token_] = AssetState(
            token_,
            _assetAddresses.length,
            name_,
            symbol_,
            decimals_,
            conversion_,
            fee_,
            balance_,
            balance_,
            scale_,
            scale_,
            0
        );
        _assetState[token_] = asset_;
        if (token_ == _wrappedNativeAddress) {
            _assetState[address(0)] = asset_;
        }
        _assetAddresses.push(token_);
        emit AssetAdded(
            token_,
            fee_ / TO_INTERNAL, // 18 decimals
            balance_ / TO_INTERNAL, // 18 decimals
            scale_ / TO_INTERNAL // 18 decimals
        ); // Convert to 18 decimals
    }

    function removeAsset(address token) public onlyUninitialized onlyOwner {
        if (token == address(0)) revert ZeroAddress();
        AssetState storage asset_ = _assetState[token];
        if (asset_.decimals == 0) revert AssetNotFound(token);

        uint256 balance = IERC20(token).balanceOf(address(this));

        _payTokensFromPool(_msgSender(), token, balance);

        uint256 scale_ = asset_.scale;
        _poolState.balance -= scale_;
        _poolState.meanBalance -= scale_;
        _poolState.scale -= scale_;
        _poolState.meanScale -= scale_;

        uint256 index_ = asset_.index;
        uint256 lastIndex_ = _assetAddresses.length - 1;

        if (index_ != lastIndex_) {
            _assetAddresses[index_] = _assetAddresses[lastIndex_];
            _assetState[_assetAddresses[index_]].index = index_;
        }
        _assetAddresses.pop();

        delete _assetState[token];
        if (token == _wrappedNativeAddress) {
            delete _assetState[address(0)];
        }
        emit AssetRemoved(token);
    }

    function setTau(
        uint256 tau // 18 decimals
    ) public onlyUninitialized onlyOwner {
        tau *= TO_INTERNAL; // Convert to internal decimals
        if (tau >= ONE) revert TooLarge(tau / TO_INTERNAL);
        _poolState.omega = int256(ONE - tau);
    }

    function initialize() public onlyUninitialized onlyOwner {
        _isInitialized = 1;

        _mintTokens(_msgSender(), _poolState.balance); // Internal decimals
        emit Initialized(_poolState.token);
    }

    function txCount() public view returns (uint256) {
        return _txCount;
    }

    function conversion(address token) public view returns (uint256) {
        if (
            token == address(this) ||
            token == _wrappedNativeAddress ||
            token == address(0)
        ) {
            return TO_INTERNAL;
        }
        if (_assetState[token].decimals == 0) revert AssetNotFound(token);
        return _assetState[token].conversion;
    }

    function isInitialized() public view returns (bool) {
        return _isInitialized == 1;
    }

    function _info() public view returns (PoolState memory) {
        return _poolState;
    }

    function _assets() public view returns (AssetState[] memory) {
        AssetState[] memory assets_ = new AssetState[](_assetAddresses.length);
        for (uint256 i; i < _assetAddresses.length; i++) {
            assets_[i] = _assetState[_assetAddresses[i]];
        }
        return assets_;
    }

    function _state()
        public
        view
        returns (PoolState memory, AssetState[] memory)
    {
        return (_info(), _assets());
    }

    function _asset(address token) public view returns (AssetState memory) {
        if (_assetState[token].decimals == 0) revert AssetNotFound(token);
        return _assetState[token];
    }

    function _toExternal(
        PoolState memory pool_
    ) internal pure returns (PoolState memory) {
        PoolState memory p_;
        p_.token = pool_.token;
        p_.name = pool_.name;
        p_.symbol = pool_.symbol;
        p_.internalDecimals = pool_.internalDecimals;
        p_.omega = pool_.omega / int256(TO_INTERNAL); // Convert to 18 decimals
        p_.tokensPerShare = pool_.tokensPerShare / TO_INTERNAL; // Convert to 18 decimals
        p_.balance = pool_.balance / TO_INTERNAL; // Convert to 18 decimals
        p_.meanBalance = pool_.meanBalance / TO_INTERNAL; // Convert to 18 decimals
        p_.scale = pool_.scale / TO_INTERNAL; // Convert to 18 decimals
        p_.meanScale = pool_.meanScale / TO_INTERNAL; // Convert to 18 decimals
        p_.lastUpdated = pool_.lastUpdated;
        return p_;
    }

    function _toExternal(
        AssetState memory asset_
    ) internal pure returns (AssetState memory) {
        AssetState memory a_;
        a_.token = asset_.token;
        a_.index = asset_.index;
        a_.name = asset_.name;
        a_.symbol = asset_.symbol;
        a_.decimals = asset_.decimals;
        a_.conversion = asset_.conversion / TO_INTERNAL; // Convert to 18 decimals
        a_.fee = asset_.fee / TO_INTERNAL; // Convert to 18 decimals
        a_.balance = asset_.balance / TO_INTERNAL; // Convert to 18 decimals
        a_.meanBalance = asset_.meanBalance / TO_INTERNAL; // Convert to 18 decimals
        a_.scale = asset_.scale / TO_INTERNAL; // Convert to 18 decimals
        a_.meanScale = asset_.meanScale / TO_INTERNAL; // Convert to 18 decimals
        a_.lastUpdated = asset_.lastUpdated;
        return a_;
    }

    function info() public view returns (PoolState memory) {
        return _toExternal(_poolState);
    }

    function assets() public view returns (AssetState[] memory) {
        AssetState[] memory assets_ = new AssetState[](_assetAddresses.length);
        for (uint256 i; i < _assetAddresses.length; i++) {
            assets_[i] = _toExternal(_assetState[_assetAddresses[i]]);
        }
        return assets_;
    }

    function state()
        public
        view
        returns (PoolState memory, AssetState[] memory)
    {
        return (info(), assets());
    }

    function asset(address token) public view returns (AssetState memory) {
        if (_assetState[token].decimals == 0) revert AssetNotFound(token);
        return _toExternal(_assetState[token]);
    }

    function assetAddresses() public view returns (address[] memory) {
        return _assetAddresses;
    }

    function isPaused() public view returns (bool) {
        return _tradingPaused;
    }

    function _geometricMean(
        uint256 newValue, // Internal decimals
        uint256 lastValue, // Internal decimals
        uint256 lastMean, // Internal decimals
        uint256 delta
    ) internal view returns (uint256) {
        // Process with 18 decimals until powRay is implemented
        int256 omega = _poolState.omega / int256(TO_INTERNAL); // Convert to 18 decimals
        newValue /= TO_INTERNAL; // Convert to 18 decimals
        lastValue /= TO_INTERNAL; // Convert to 18 decimals
        lastMean /= TO_INTERNAL; // Convert to 18 decimals

        if (delta == 0) return lastMean / TO_INTERNAL; // Convert to 18 decimals
        if (delta == 1) {
            return
                newValue.mulWadUp(
                    uint256(int256(lastMean.divWadUp(newValue)).powWad(omega))
                ) * TO_INTERNAL; // Convert to internal decimals
        } else {
            int256 exp = omega.powWad(int256(delta * ONE));
            return
                newValue
                    .mulWadUp(
                        uint256(
                            int256(lastMean.divWadUp(lastValue)).powWad(exp)
                        )
                    )
                    .mulWadUp(
                        uint256(
                            int256(lastValue.divWadUp(newValue)).powWad(omega)
                        )
                    ) * TO_INTERNAL; // Convert to internal decimals
        }
    }

    function _userAssetBalance(address token) internal view returns (uint256) {
        if (token == address(0) || token == _wrappedNativeAddress) {
            return
                _msgSender().balance +
                IERC20(_wrappedNativeAddress).balanceOf(_msgSender());
        }
        return
            (IERC20(token).balanceOf(_msgSender()) * conversion(token)) / // Convert to internal decimals
            TO_INTERNAL; // Convert to 18 decimals
    }

    function _updateAssetBalance(
        address token,
        uint256 increaseAmount, // Internal decimals
        uint256 decreaseAmount // Internal decimals
    ) internal {
        AssetState storage asset_ = _assetState[token];
        if (asset_.decimals == 0) revert AssetNotFound(token);
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
            asset_.balance / TO_INTERNAL, // 18 decimals
            asset_.meanBalance / TO_INTERNAL, // 18 decimals
            _userAssetBalance(token) // 18 decimals
        );
    }

    function _updatePoolBalance() internal {
        uint256 lastPoolBalance = _poolState.balance;
        _poolState.tokensPerShare = _tokensPerShare;
        _poolState.balance = _totalTokens;
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
            _poolState.balance / TO_INTERNAL, // 18 decimals
            _poolState.meanBalance / TO_INTERNAL, // 18 decimals
            balanceOf(_msgSender()) // 18 decimals
        );
    }

    function _checkUser(address user_) private view {
        if (user_ == address(0)) revert ZeroAddress();
        if (_isBlocked[user_]) revert UserNotAllowed(user_);
    }

    function _checkDuplicateTokens(
        address[] memory tokens,
        bool[] memory check_,
        bool hasLP
    ) private view returns (bool) {
        for (uint256 i; i < tokens.length; i++) {
            address token = tokens[i];
            if (address(this) == token) {
                if (hasLP) revert DuplicateToken(token);
                if (i != 0) revert LPTokenFirst();
                hasLP = true;
                continue;
            }
            AssetState memory asset_ = _assetState[token];
            if (asset_.decimals == 0) revert AssetNotFound(token);
            if (check_[asset_.index]) revert DuplicateToken(token);
            check_[asset_.index] = true;
        }
        return hasLP;
    }

    function _quoteMultiswap(
        address sender,
        address[] memory payTokens,
        uint256[] memory amounts, // Token decimals
        address[] memory receiveTokens, // Token decimals
        uint256[] memory allocations // 18 decimals
    ) public view returns (QuoteState memory q) {
        uint256 totalSupply_ = totalSupply();
        uint256 assetAddressesLength = _assetAddresses.length;
        uint256 payTokensLength = payTokens.length;
        uint256 receiveTokensLength = receiveTokens.length;

        if (payTokens[0] == address(this) && amounts[0] == totalSupply_) {
            q.feeAmount = 0;
            q.receiveAmounts = new uint256[](assetAddressesLength);
            for (uint256 i; i < assetAddressesLength; i++) {
                q.receiveAmounts[i] =
                    IERC20(_assetAddresses[i]).balanceOf(address(this)) *
                    _assetState[_assetAddresses[i]].conversion; // Convert to internal decimals
            }
            return q;
        }

        // Note: All values except ratios are in internal decimals
        q.payTokens = payTokens;
        q.payAmounts = new uint256[](payTokensLength);
        q.receiveTokens = receiveTokens;
        q.allocations = new uint256[](receiveTokensLength);
        q.receiveAmounts = new uint256[](receiveTokensLength);
        q.initialTokens = _totalTokens;
        q.initialShares = totalSupply_ * TO_INTERNAL; // Convert to internal decimals
        q.initialTokensPerShare = _tokensPerShare;

        // Compute fee
        for (uint256 i; i < receiveTokensLength; i++) {
            q.allocations[i] = allocations[i] * TO_INTERNAL; // Convert to internal decimals
            q.fee += q.allocations[i].mulUp(
                _assetState[receiveTokens[i]].fee,
                ONE
            );
        }
        q.discount = _discount[sender];
        if (q.fee > 0 && q.discount > 0) {
            q.fee = q.fee.mulUp(ONE - q.discount, ONE);
        }
        q.poolAlloc = q.fee;
        if (receiveTokens[0] == address(this)) {
            q.poolAlloc += q.allocations[0].mulUp(ONE - q.fee, ONE);
        }

        // Compute scaledValueIn from assets only
        uint256 amount;
        for (uint256 i; i < payTokensLength; i++) {
            address payToken = payTokens[i];
            if (payToken == address(this)) continue;
            AssetState storage assetIn = _assetState[payToken];
            amount = amounts[i] * assetIn.conversion; // Convert to internal decimals
            q.payAmounts[i] = amount;
            q.scaledValueIn += assetIn.scale.fullMulDiv(
                amount,
                assetIn.balance + amount
            );
        }

        // Compute poolOut
        q.lastPoolBalance = _poolState.balance;
        q.scaledPoolOut = q.scaledValueIn.mulUp(q.poolAlloc, ONE);
        if (payTokens[0] == address(this)) {
            amount = amounts[0] * TO_INTERNAL; // Convert to internal decimals
            q.payAmounts[0] = amount;
            q.poolIn = amount.mulUp(q.initialTokensPerShare, ONE); // Convert shares to tokens
            q.poolOut = q.poolAlloc.fullMulDiv(
                q.scaledValueIn.mulUp(q.lastPoolBalance - q.poolIn, ONE) +
                    _poolState.scale.mulUp(q.poolIn, ONE),
                _poolState.scale - q.scaledPoolOut
            );
            q.scaledValueIn += _poolState.scale.fullMulDiv(
                q.poolIn,
                q.lastPoolBalance + q.poolOut - q.poolIn
            );
            q.feeAmount = q.poolOut;
        } else {
            q.poolOut = q.lastPoolBalance.fullMulDiv(
                q.scaledPoolOut,
                _poolState.scale - q.scaledPoolOut
            );
            if (q.poolAlloc > 0) {
                q.feeAmount = q.poolOut.fullMulDiv(q.fee, q.poolAlloc);
            }
        }

        // Compute receiveAmounts
        q.finalTokens = q.initialTokens + q.poolOut - q.poolIn;
        q.finalTokensPerShare = q.initialTokensPerShare.mulUp(
            ONE +
                q.feeAmount.fullMulDiv(
                    ONE - _protocolFee,
                    q.initialTokens - q.poolIn
                ),
            ONE
        );
        q.finalShares = q.finalTokens.divUp(q.finalTokensPerShare, ONE);

        address receiveToken;
        uint256 allocation;
        uint256 scaledValueOut;
        for (uint256 i; i < receiveTokensLength; i++) {
            receiveToken = receiveTokens[i];
            if (receiveToken == address(this)) {
                q.receiveAmounts[i] = (q.poolOut - q.feeAmount).divUp(
                    q.finalTokensPerShare,
                    ONE
                );
            } else {
                allocation = q.allocations[i].mulUp(ONE - q.fee, ONE);
                scaledValueOut = q.scaledValueIn.mulUp(allocation, ONE);
                AssetState storage assetOut = _assetState[receiveToken];
                q.receiveAmounts[i] = assetOut.balance.fullMulDiv(
                    scaledValueOut,
                    assetOut.scale + scaledValueOut
                );
            }
        }
    }

    function quoteMultiswap(
        address[] memory payTokens,
        uint256[] memory amounts, // Token decimals
        address[] memory receiveTokens,
        uint256[] memory allocations // 18 decimals
    )
        public
        view
        returns (
            uint256[] memory receiveAmounts, // Token decimals
            uint256 feeAmount // Token decimals
        )
    {
        QuoteState memory q = _quoteMultiswap(
            _msgSender(),
            payTokens,
            amounts,
            receiveTokens,
            allocations
        );

        receiveAmounts = new uint256[](q.receiveAmounts.length);
        for (uint256 i; i < receiveTokens.length; i++) {
            receiveAmounts[i] =
                q.receiveAmounts[i] /
                conversion(receiveTokens[i]); // Convert to token decimals
        }
        feeAmount = q.feeAmount / TO_INTERNAL; // Token decimals
    }

    function _disable(
        address receiver
    ) private returns (uint256[] memory receiveAmounts, uint256 feeAmount) {
        receiveAmounts = new uint256[](_assetAddresses.length);
        feeAmount = 0;

        // Burn all LP tokens
        _burn(receiver, totalSupply());
        emit BalanceUpdate(_txCount, address(this), 0, 0, 0);

        for (uint256 i; i < _assetAddresses.length; i++) {
            address token = _assetAddresses[i];
            uint256 balance = IERC20(token).balanceOf(address(this));
            if (balance > 0) {
                SafeERC20.safeTransfer(IERC20(token), receiver, balance);
            }
            delete _assetState[token];
            receiveAmounts[i] = balance;
            emit BalanceUpdate(_txCount, token, 0, 0, 0);
        }

        _txCount = 0;
        _isInitialized = 0;
        _poolState.token = address(0);
        _poolState.name = "";
        _poolState.symbol = "";
        _poolState.internalDecimals = 0;
        _poolState.omega = 0;
        _poolState.tokensPerShare = 0;
        _poolState.balance = 0;
        _poolState.meanBalance = 0;
        _poolState.scale = 0;
        _poolState.meanScale = 0;
        _poolState.lastUpdated = 0;
        delete _assetAddresses;
        _tradingPaused = false;
        renounceOwnership();

        emit PoolDisabled(_txCount, address(this));
    }

    function _multiswap(
        address sender,
        address[] memory payTokens,
        uint256[] memory amounts, // Token decimals
        address[] memory receiveTokens,
        uint256[] memory allocations, // 18 decimals
        uint256[] memory minReceiveAmounts // Token decimals
    ) private returns (uint256[] memory receiveAmounts, uint256 feeAmount) {
        _txCount++;

        if (payTokens[0] == address(this) && amounts[0] == totalSupply()) {
            return _disable(sender);
        }

        QuoteState memory q = _quoteMultiswap(
            sender,
            payTokens,
            amounts,
            receiveTokens,
            allocations
        );

        receiveAmounts = new uint256[](q.receiveAmounts.length);
        // Check receiveAmounts
        {
            for (uint256 i; i < receiveTokens.length; i++) {
                receiveAmounts[i] =
                    q.receiveAmounts[i] /
                    conversion(receiveTokens[i]); // Convert to token decimals
                if (receiveAmounts[i] == 0) revert ZeroAmount();
                if (receiveAmounts[i] < minReceiveAmounts[i]) {
                    revert InsufficientReceiveAmount(
                        minReceiveAmounts[i],
                        receiveAmounts[i]
                    );
                }
            }
        }

        // Transfer tokens to the pool
        for (uint256 i; i < payTokens.length; i++) {
            address payToken = payTokens[i];
            _payTokenToPool(sender, payToken, amounts[i]); // Token decimals
            if (payToken != address(this)) {
                _updateAssetBalance(payToken, q.payAmounts[i], 0); // Canonical
            }
        }

        // Transfer tokens to the receiving address
        for (uint256 i; i < receiveTokens.length; i++) {
            address receiveToken = receiveTokens[i];
            _payTokensFromPool(
                sender,
                receiveToken,
                q.receiveAmounts[i] / conversion(receiveToken) // Convert to token decimals
            );
            if (receiveToken != address(this)) {
                _updateAssetBalance(receiveToken, 0, q.receiveAmounts[i]); // Canonical
            }
        }

        // Distribute fee
        _allocateShares(
            _protocolFeeRecipient,
            q.finalShares / TO_INTERNAL - totalSupply()
        ); // Token deciamls
        _totalTokens = q.finalTokens;
        _tokensPerShare = q.finalTokensPerShare;
        feeAmount = q.feeAmount / TO_INTERNAL; // 18 decimals

        // Update pool balance
        _updatePoolBalance();
    }

    function multiswap(
        address[] memory payTokens,
        uint256[] memory amounts, // Token decimals
        address[] memory receiveTokens,
        uint256[] memory allocations, // 18 decimals
        uint256[] memory minReceiveAmounts // Token decimals
    )
        public
        payable
        onlyInitialized
        nonReentrant
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
            bool hasLP;
            bool[] memory check_ = new bool[](_assetAddresses.length);
            hasLP = _checkDuplicateTokens(payTokens, check_, hasLP);
            hasLP = _checkDuplicateTokens(receiveTokens, check_, hasLP);
        }
        // Check amounts
        {
            uint256 minAmount;
            for (uint256 i; i < amounts.length; i++) {
                minAmount = 10 ** (INTERNAL_DECIMALS - _assetState[payTokens[i]].decimals);
                if (amounts[i] < minAmount) revert ZeroAmount();
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
                revert IncorrectAmount(1e18, totalAllocation);
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
                        _assetState[payToken].conversion; // Convert from internal decimals
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

    function _quoteSwap(
        address payToken,
        address receiveToken,
        uint256 payAmount // Token decimals
    ) public view returns (QuoteState memory) {
        address[] memory payTokens = new address[](1);
        uint256[] memory amounts = new uint256[](1);
        address[] memory receiveTokens = new address[](1);
        uint256[] memory allocations = new uint256[](1);

        payTokens[0] = payToken;
        amounts[0] = payAmount;
        receiveTokens[0] = receiveToken;
        allocations[0] = 1e18;

        return
            _quoteMultiswap(
                _msgSender(),
                payTokens,
                amounts,
                receiveTokens,
                allocations
            );
    }

    function quoteSwap(
        address payToken,
        address receiveToken,
        uint256 payAmount // Token decimals
    )
        public
        view
        returns (
            uint256 receiveAmount, // Token decimals
            uint256 feeAmount // Token decimals
        )
    {
        QuoteState memory q = _quoteSwap(payToken, receiveToken, payAmount);
        receiveAmount = q.receiveAmounts[0] / conversion(receiveToken); // Token decimals
        feeAmount = q.feeAmount / TO_INTERNAL; // Token decimals
    }

    function swap(
        address payToken,
        address receiveToken,
        uint256 payAmount,
        uint256 minReceiveAmount
    )
        public
        payable
        onlyInitialized
        nonReentrant
        returns (uint256 receiveAmount, uint256 feeAmount)
    {
        if (_tradingPaused) revert TradingPausedError();
        address sender = _msgSender();
        _checkUser(sender);
        if (payToken == address(this))
            revert InvalidSwap(payToken, receiveToken);
        if (receiveToken == address(this))
            revert InvalidSwap(payToken, receiveToken);
        if (payToken == receiveToken) revert DuplicateToken(payToken);
        if (_assetState[payToken].decimals == 0) revert AssetNotFound(payToken);
        if (_assetState[receiveToken].decimals == 0)
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

            payTokens[0] = payToken;
            amounts[0] = payAmount;
            receiveTokens[0] = receiveToken;
            allocations[0] = 1e18;
            minReceiveAmounts[0] = minReceiveAmount;

            uint256[] memory receiveAmounts = new uint256[](1);
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

    function _quoteStake(
        address payToken,
        uint256 payAmount
    ) public view returns (QuoteState memory) {
        address[] memory payTokens = new address[](1);
        uint256[] memory amounts = new uint256[](1);
        address[] memory receiveTokens = new address[](1);
        uint256[] memory allocations = new uint256[](1);

        payTokens[0] = payToken;
        amounts[0] = payAmount;
        receiveTokens[0] = address(this);
        allocations[0] = 1e18;

        return
            _quoteMultiswap(
                _msgSender(),
                payTokens,
                amounts,
                receiveTokens,
                allocations
            );
    }

    function quoteStake(
        address payToken,
        uint256 payAmount
    ) public view returns (uint256 receiveAmount, uint256 feeAmount) {
        address[] memory payTokens = new address[](1);
        uint256[] memory amounts = new uint256[](1);
        address[] memory receiveTokens = new address[](1);
        uint256[] memory allocations = new uint256[](1);

        payTokens[0] = payToken;
        amounts[0] = payAmount;
        receiveTokens[0] = address(this);
        allocations[0] = 1e18;

        QuoteState memory q = _quoteMultiswap(
            _msgSender(),
            payTokens,
            amounts,
            receiveTokens,
            allocations
        );

        receiveAmount = q.receiveAmounts[0] / TO_INTERNAL; // Token decimals
        feeAmount = q.feeAmount / TO_INTERNAL; // Token decimals
    }

    function stake(
        address payToken,
        uint256 payAmount, // Token decimals
        uint256 minReceiveAmount // Token decimals
    )
        public
        payable
        onlyInitialized
        returns (uint256 receiveAmount, uint256 feeAmount)
    {
        if (_tradingPaused) revert TradingPausedError();
        address sender = _msgSender();
        _checkUser(sender);
        if (payToken == address(this)) revert InvalidStake(payToken);
        if (_assetState[payToken].decimals == 0) revert AssetNotFound(payToken);
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

            payTokens[0] = payToken;
            amounts[0] = payAmount;
            receiveTokens[0] = address(this);
            allocations[0] = 1e18;
            minReceiveAmounts[0] = minReceiveAmount;

            uint256[] memory receiveAmounts = new uint256[](1);
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

    function _quoteUnstake(
        address receiveToken,
        uint256 payAmount // Token decimals
    ) public view returns (QuoteState memory) {
        address[] memory payTokens = new address[](1);
        uint256[] memory amounts = new uint256[](1);
        address[] memory receiveTokens = new address[](1);
        uint256[] memory allocations = new uint256[](1);

        payTokens[0] = address(this);
        amounts[0] = payAmount;
        receiveTokens[0] = receiveToken;
        allocations[0] = 1e18;

        return
            _quoteMultiswap(
                _msgSender(),
                payTokens,
                amounts,
                receiveTokens,
                allocations
            );
    }

    function quoteUnstake(
        address receiveToken,
        uint256 payAmount // Token decimals
    ) public view returns (uint256 receiveAmount, uint256 feeAmount) {
        address[] memory payTokens = new address[](1);
        uint256[] memory amounts = new uint256[](1);
        address[] memory receiveTokens = new address[](1);
        uint256[] memory allocations = new uint256[](1);

        payTokens[0] = address(this);
        amounts[0] = payAmount;
        receiveTokens[0] = receiveToken;
        allocations[0] = 1e18;

        QuoteState memory q = _quoteMultiswap(
            _msgSender(),
            payTokens,
            amounts,
            receiveTokens,
            allocations
        );

        receiveAmount = q.receiveAmounts[0] / conversion(receiveToken); // Token decimals
        feeAmount = q.feeAmount / TO_INTERNAL; // Token decimals
    }

    function unstake(
        address receiveToken,
        uint256 payAmount, // Token decimals
        uint256 minReceiveAmount // Token decimals
    )
        public
        onlyInitialized
        nonReentrant
        returns (uint256 receiveAmount, uint256 feeAmount)
    {
        if (_tradingPaused) revert TradingPausedError();
        address sender = _msgSender();
        _checkUser(sender);
        if (receiveToken == address(this)) revert InvalidUnstake(receiveToken);
        if (_assetState[receiveToken].decimals == 0)
            revert AssetNotFound(receiveToken);
        if (payAmount == 0) revert ZeroAmount();
        if (payAmount * 3 > _poolState.balance) revert TooLarge(payAmount);

        address[] memory payTokens = new address[](1);
        uint256[] memory amounts = new uint256[](1);
        address[] memory receiveTokens = new address[](1);
        uint256[] memory allocations = new uint256[](1);
        uint256[] memory minReceiveAmounts = new uint256[](1);

        payTokens[0] = address(this);
        amounts[0] = payAmount;
        receiveTokens[0] = receiveToken;
        allocations[0] = 1e18;
        minReceiveAmounts[0] = minReceiveAmount;

        uint256[] memory receiveAmounts = new uint256[](1);
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

    function _quoteAddLiquidity(
        address token,
        uint256 amount // Token decimals
    ) public view returns (QuoteState memory q) {
        AssetState storage assetIn;
        q.payTokens = _assetAddresses;
        q.payAmounts = new uint256[](_assetAddresses.length);
        q.receiveTokens = new address[](1);
        q.receiveTokens[0] = address(this);
        q.receiveAmounts = new uint256[](1);
        q.initialTokens = _poolState.balance;
        q.initialShares = totalSupply() * TO_INTERNAL; // Convert to internal decimals
        q.initialTokensPerShare = _poolState.tokensPerShare;

        amount *= conversion(token); // Convert to internal decimals
        uint256 R;
        if (token == address(this)) {
            R = amount.fullMulDiv(q.initialTokensPerShare, q.initialTokens);
            q.receiveAmounts[0] = amount;
        } else {
            assetIn = _assetState[token];
            if (assetIn.decimals == 0) revert AssetNotFound(token);
            R = amount.divUp(assetIn.balance, ONE);
            q.receiveAmounts[0] = R.mulUp(q.initialShares, ONE); // Internal decimals
        }

        for (uint256 i; i < _assetAddresses.length; i++) {
            assetIn = _assetState[_assetAddresses[i]];
            if (assetIn.token == token) {
                q.payAmounts[i] = amount; // Internal decimals
            } else {
                q.payAmounts[i] = R.mulUp(assetIn.balance, ONE);
            }
        }

        q.finalShares = q.initialShares + q.receiveAmounts[0];
        q.finalTokensPerShare = q.initialTokensPerShare;
        q.finalTokens = q.finalShares.mulUp(q.finalTokensPerShare, ONE);
    }

    function quoteAddLiquidity(
        address token,
        uint256 amount // Token decimals
    )
        public
        view
        returns (
            uint256[] memory payAmounts, // Token decimals
            uint256 receiveAmount
        )
    {
        payAmounts = new uint256[](_assetAddresses.length);
        QuoteState memory q = _quoteAddLiquidity(token, amount);
        receiveAmount = q.receiveAmounts[0] / TO_INTERNAL; // Convert to token decimals
        for (uint256 i; i < payAmounts.length; i++) {
            payAmounts[i] = q.payAmounts[i] / conversion(_assetAddresses[i]); // Convert to token decimals
        }
    }

    function addLiquidity(
        address token,
        uint256 amount, // Token decimals
        uint256[] memory maxPayAmounts // Token decimals
    )
        public
        payable
        onlyInitialized
        nonReentrant
        returns (uint256[] memory payAmounts, uint256 receiveAmount)
    {
        if (_tradingPaused) revert TradingPausedError();
        if (_assetAddresses.length != maxPayAmounts.length)
            revert LengthMismatch(_assetAddresses.length, maxPayAmounts.length);
        if (amount == 0) revert ZeroAmount();
        if (token == _wrappedNativeAddress && msg.value != amount)
            revert IncorrectAmount(amount, msg.value);
        address sender = _msgSender();
        _checkUser(sender);

        _txCount++;

        (payAmounts, receiveAmount) = quoteAddLiquidity(token, amount);
        if (receiveAmount == 0) revert ZeroAmount();

        uint256 payAmount;
        for (uint256 i; i < _assetAddresses.length; i++) {
            payAmount = payAmounts[i];
            if (payAmount == 0) revert ZeroAmount();
            if (payAmount > maxPayAmounts[i])
                revert ExcessivePayAmount(maxPayAmounts[i], payAmount);

            _payTokenToPool(sender, _assetAddresses[i], payAmount);
            payAmount *= _assetState[_assetAddresses[i]].conversion; // Convert to internal decimals
            _updateAssetBalance(_assetAddresses[i], payAmount, 0);
        }

        _payTokensFromPool(sender, address(this), receiveAmount);
        _updatePoolBalance();

        emit AddLiquidity(_txCount, sender, receiveAmount, payAmounts);
    }

    function _quoteRemoveLiquidity(
        uint256 amount // Token decimals
    ) public view returns (QuoteState memory) {
        uint256 n = _assetAddresses.length;
        address[] memory payTokens = new address[](1);
        uint256[] memory amounts = new uint256[](1);
        address[] memory receiveTokens = new address[](n);
        uint256[] memory allocations = new uint256[](n);

        payTokens[0] = address(this);
        amounts[0] = amount;
        receiveTokens = _assetAddresses;
        {
            uint256 allocation;
            uint256 totalAllocation;
            for (uint256 i; i < n - 1; i++) {
                allocation =
                    _assetState[_assetAddresses[i]].scale.divUp(
                        _poolState.scale,
                        ONE
                    ) /
                    TO_INTERNAL; // Convert to 18 decimals
                // allocation =
                //     _assetState[_assetAddresses[i]].scale.divUp(
                //         _poolState.scale,
                //         ONE
                //     ) /
                //     conversion(_assetAddresses[i]); // Convert to token decimals
                allocations[i] = allocation;
                totalAllocation += allocation;
            }
            allocations[n - 1] = 1e18 - totalAllocation;
        }

        return
            _quoteMultiswap(
                _msgSender(),
                payTokens,
                amounts,
                receiveTokens,
                allocations
            );
    }

    function quoteRemoveLiquidity(
        uint256 amount
    ) public view returns (uint256[] memory receiveAmounts, uint256 feeAmount) {
        QuoteState memory q = _quoteRemoveLiquidity(amount);
        for (uint256 i; i < _assetAddresses.length; i++) {
            receiveAmounts[i] =
                q.receiveAmounts[i] /
                _assetState[_assetAddresses[i]].conversion; // Convert to token decimals
        }
        feeAmount = q.feeAmount / TO_INTERNAL; // Convert to token decimals
    }

    function _removeUserLiquidity(
        address user,
        uint256 amount, // Shares
        uint256[] memory minReceiveAmounts
    ) private returns (uint256[] memory receiveAmounts, uint256 feeAmount) {
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
                allocation = _assetState[_assetAddresses[i]].scale.divUp(
                    _poolState.scale,
                    ONE
                ) / TO_INTERNAL; // Convert to 18 decimals
                allocations[i] = allocation;
                totalAllocation += allocation;
            }
            allocations[n - 1] = 1e18 - totalAllocation;
        }

        (receiveAmounts, feeAmount) = _multiswap(
            user,
            payTokens,
            amounts,
            receiveTokens,
            allocations,
            minReceiveAmounts
        );

        emit RemoveLiquidity(_txCount, user, amount, receiveAmounts, feeAmount);
    }

    function removeLiquidity(
        uint256 amount,
        uint256[] memory minReceiveAmounts
    )
        public
        onlyInitialized
        nonReentrant
        returns (uint256[] memory receiveAmounts, uint256 feeAmount)
    {
        if (_assetAddresses.length != minReceiveAmounts.length)
            revert LengthMismatch(
                _assetAddresses.length,
                minReceiveAmounts.length
            );
        if (amount == 0) revert ZeroAmount();
        (receiveAmounts, feeAmount) = _removeUserLiquidity(
            _msgSender(),
            amount,
            minReceiveAmounts
        );
    }

    function setIsAllowed(address user_, bool isAllowed_) public onlyOwner {
        if (_isBlocked[user_] == !isAllowed_) return;
        if (_isBlocked[user_] && isAllowed_) emit UserBlockLifted(user_);
        _isBlocked[user_] = !isAllowed_;
        if (!isAllowed_) {
            if (user_ == owner() || user_ == protocolFeeRecipient())
                revert CannotModify(user_);
            uint256 balance = balanceOf(user_);
            if (balance > 0) {
                _removeUserLiquidity(
                    user_,
                    balance,
                    new uint256[](_assetAddresses.length)
                );
            }
            _discount[user_] = 0;
            emit UserBlocked(user_);
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

    function _approveTokenIfNeeded(
        address token,
        address _to,
        uint256 _amount
    ) internal {
        if (IERC20(token).allowance(address(this), _to) < _amount) {
            IERC20(token).approve(_to, type(uint256).max);
        }
    }

    function _wrap(uint256 amount) internal {
        IWrappedNative(_wrappedNativeAddress).deposit{value: amount}();
    }

    function _unwrap(uint256 amount) internal {
        _approveTokenIfNeeded(
            _wrappedNativeAddress,
            _wrappedNativeAddress,
            amount
        );
        IWrappedNative(_wrappedNativeAddress).withdraw(amount);
    }

    receive() external payable {}
}

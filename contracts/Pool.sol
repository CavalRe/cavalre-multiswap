// SPDX-License-Identifier: Business Source License 1.1
// Copyright (C) 2020-2023, CavalRe Inc. All rights reserved.
// See the file LICENSE.md for licensing terms.
pragma solidity 0.8.19;

import {IPool, PoolState, AssetState, QuoteState, PoolStateExternal, AssetStateExternal} from "./interfaces/IPool.sol";
import {LPToken, FloatingPoint as FP, UFloat} from "./LPToken.sol";
import {IWrappedNative} from "./interfaces/IWrappedNative.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {IERC20, IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Pool is IPool, LPToken, ReentrancyGuard {
    using SafeERC20 for IERC20;
    using FP for uint256;
    using FP for int256;
    using FP for UFloat;
    using FP for uint256[];

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
        address wrappedNativeAddress
    ) LPToken(name, symbol, protocolFee, protocolFeeRecipient, tokensPerShare) {
        if (wrappedNativeAddress == address(0)) revert ZeroAddress();

        _poolState.token = address(this);
        _poolState.name = name;
        _poolState.symbol = symbol;
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
        if (fee_ >= ONE) revert TooLarge(fee_);

        string memory name_ = IERC20Metadata(token_).name();
        string memory symbol_ = IERC20Metadata(token_).symbol();
        uint8 decimals_ = IERC20Metadata(token_).decimals();
        if (decimals_ > 18) revert TooLarge(uint256(uint8(decimals_))); // Contract supports 18 decimals or fewer
        if (decimals_ <= 0) revert TooSmall(uint256(uint8(decimals_)));

        _payTokenToPool(_msgSender(), token_, balance_);

        UFloat memory fee = fee_.toUFloat();
        UFloat memory balance = balance_.toUFloat(decimals_);
        UFloat memory scale = scale_.toUFloat();
        _poolState.balance = _poolState.balance.plus(scale);
        _poolState.scale = _poolState.scale.plus(scale);

        AssetState memory asset_ = _assetState[token_] = AssetState(
            token_,
            _assetAddresses.length,
            name_,
            symbol_,
            decimals_,
            fee,
            balance,
            scale,
            0
        );
        _assetState[token_] = asset_;
        if (token_ == _wrappedNativeAddress) {
            _assetState[address(0)] = asset_;
        }
        _assetAddresses.push(token_);
        emit AssetAdded(
            token_,
            fee_, // 18 decimals
            balance.toUInt(), // 18 decimals
            scale_ // 18 decimals
        ); // Convert to 18 decimals
    }

    function removeAsset(address token) public onlyUninitialized onlyOwner {
        if (token == address(0)) revert ZeroAddress();
        AssetState storage asset_ = _assetState[token];
        if (asset_.decimals == 0) revert AssetNotFound(token);

        uint256 balance = IERC20(token).balanceOf(address(this));

        _payTokensFromPool(_msgSender(), token, balance);

        UFloat memory scale_ = asset_.scale;
        _poolState.balance = _poolState.balance.minus(scale_);
        _poolState.scale = _poolState.scale.minus(scale_);

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

    function initialize() public onlyUninitialized onlyOwner {
        _isInitialized = 1;

        _mintTokens(_msgSender(), _poolState.balance);
        emit Initialized(_poolState.token);
    }

    function txCount() public view returns (uint256) {
        return _txCount;
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
    ) internal pure returns (PoolStateExternal memory) {
        PoolStateExternal memory p_;
        p_.token = pool_.token;
        p_.name = pool_.name;
        p_.symbol = pool_.symbol;
        p_.tokensPerShare = pool_.tokensPerShare.toUInt(); // Convert to 18 decimals
        p_.balance = pool_.balance.toUInt(); // Convert to 18 decimals
        p_.scale = pool_.scale.toUInt(); // Convert to 18 decimals
        p_.lastUpdated = pool_.lastUpdated;
        return p_;
    }

    function _toExternal(
        AssetState memory asset_
    ) internal pure returns (AssetStateExternal memory) {
        AssetStateExternal memory a_;
        a_.token = asset_.token;
        a_.index = asset_.index;
        a_.name = asset_.name;
        a_.symbol = asset_.symbol;
        a_.decimals = asset_.decimals;
        a_.fee = asset_.fee.toUInt(); // Convert to 18 decimals
        a_.balance = asset_.balance.toUInt(); // Convert to 18 decimals
        a_.scale = asset_.scale.toUInt(); // Convert to 18 decimals
        a_.lastUpdated = asset_.lastUpdated;
        return a_;
    }

    function info() public view returns (PoolStateExternal memory) {
        return _toExternal(_poolState);
    }

    function assets() public view returns (AssetStateExternal[] memory) {
        AssetStateExternal[] memory assets_ = new AssetStateExternal[](
            _assetAddresses.length
        );
        for (uint256 i; i < _assetAddresses.length; i++) {
            assets_[i] = _toExternal(_assetState[_assetAddresses[i]]);
        }
        return assets_;
    }

    function state()
        public
        view
        returns (PoolStateExternal memory, AssetStateExternal[] memory)
    {
        return (info(), assets());
    }

    function asset(
        address token
    ) public view returns (AssetStateExternal memory) {
        if (_assetState[token].decimals == 0) revert AssetNotFound(token);
        return _toExternal(_assetState[token]);
    }

    function assetAddresses() public view returns (address[] memory) {
        return _assetAddresses;
    }

    function assetDecimals(
        address[] memory addresses
    ) public view returns (uint8[] memory) {
        uint8[] memory assetDecimals_ = new uint8[](addresses.length);
        for (uint256 i; i < addresses.length; i++) {
            assetDecimals_[i] = _assetState[addresses[i]].decimals;
        }
        return assetDecimals_;
    }

    function assetDecimals() public view returns (uint8[] memory) {
        uint8[] memory assetDecimals_ = new uint8[](_assetAddresses.length);
        for (uint256 i; i < _assetAddresses.length; i++) {
            assetDecimals_[i] = _assetState[_assetAddresses[i]].decimals;
        }
        return assetDecimals_;
    }

    function isPaused() public view returns (bool) {
        return _tradingPaused;
    }

    function _updateAssetBalance(
        address token,
        UFloat memory increaseAmount,
        UFloat memory decreaseAmount
    ) internal {
        AssetState storage asset_ = _assetState[token];
        if (asset_.decimals == 0) revert AssetNotFound(token);
        asset_.balance = asset_.balance.plus(increaseAmount).minus(
            decreaseAmount
        );
        asset_.lastUpdated = _txCount;
        emit BalanceUpdate(
            _txCount,
            token,
            asset_.balance.toUInt() // 18 decimals
        );
    }

    function _updatePoolBalance() internal {
        _poolState.tokensPerShare = _tokensPerShare;
        _poolState.balance = _totalTokens;
        _poolState.lastUpdated = _txCount;
        emit BalanceUpdate(
            _txCount,
            address(this),
            _poolState.balance.toUInt() // 18 decimals
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

    // /*
    // - shift should be unopinionated. 
    // - If the shift is too large, it will overflow.
    // - If the shift is too small, it will underflow.
    //  */
    // function shift(
    //     UFloat memory a,
    //     int256 i
    // ) internal pure returns (UFloat memory) {
    //     uint256 mantissa = a.mantissa;
    //     if (i > 0) {
    //         mantissa /= 10 ** FP.toUInt(i);
    //     } else if (i < 0) {
    //         mantissa *= 10 ** FP.toUInt(-i);
    //     }
    //     return UFloat(mantissa, a.exponent + i);
    // }

    // function normalize(UFloat memory a) internal pure returns (UFloat memory) {
    //     uint256 mantissa = a.mantissa;
    //     int256 exponent = a.exponent;
    //     bool isLarge = mantissa > FP.NORMALIZED_MANTISSA_MAX;
    //     bool isSmall = mantissa < FP.NORMALIZED_MANTISSA_MIN;
    //     if (!isLarge && !isSmall) {
    //         return UFloat(mantissa, exponent);
    //     } else if (isLarge) {
    //         while (mantissa > FP.NORMALIZED_MANTISSA_MAX) {
    //             mantissa /= 10;
    //             exponent++;
    //         }
    //         return UFloat(mantissa, exponent);
    //     } else if (mantissa == 0) {
    //         return UFloat(0, 0);
    //     } else {
    //         // if (isSmall) {
    //         while (mantissa < FP.NORMALIZED_MANTISSA_MIN) {
    //             mantissa *= 10;
    //             exponent--;
    //         }
    //         return UFloat(mantissa, exponent);
    //     }
    // }

    // function align(
    //     UFloat memory a,
    //     UFloat memory b
    // ) internal pure returns (UFloat memory, UFloat memory) {
    //     int256 delta = a.exponent - b.exponent;
    //     if (delta >= 0) {
    //         if (delta > int256(FP.SIGNIFICANT_DIGITS)) {
    //             return (UFloat(a.mantissa, a.exponent), UFloat(0, a.exponent));
    //         }
    //         return (UFloat(a.mantissa, a.exponent), shift(b, delta));
    //     } else {
    //         if (-delta > int256(FP.SIGNIFICANT_DIGITS)) {
    //             return (UFloat(0, b.exponent), UFloat(b.mantissa, b.exponent));
    //         }
    //         return (shift(a, -delta), UFloat(b.mantissa, b.exponent));
    //     }
    // }

    // function plus(
    //     UFloat memory a,
    //     UFloat memory b
    // ) internal pure returns (UFloat memory) {
    //     (a, b) = align(a, b);
    //     return normalize(UFloat(a.mantissa + b.mantissa, a.exponent));
    // }

    function scaledAssetValueIn(
        UFloat memory scale,
        UFloat memory balance,
        UFloat memory amount
    ) internal pure returns (UFloat memory) {
        if (amount.mantissa == 0) return UFloat(0, 0);
        UFloat memory denom = FP.plus(balance, amount);
        return scale.times(amount).divide(denom);
    }

    function _quoteMultiswap(
        address sender,
        address[] memory payTokens,
        UFloat[] memory payAmounts,
        address[] memory receiveTokens,
        UFloat[] memory allocations
    ) public returns (QuoteState memory q) {
        UFloat memory totalSupply_ = totalSupply().toUFloat();
        uint256 assetAddressesLength = _assetAddresses.length;
        uint256 payTokensLength = payTokens.length;
        uint256 receiveTokensLength = receiveTokens.length;

        if (
            payTokens[0] == address(this) && payAmounts[0].isEqual(totalSupply_)
        ) {
            q.receiveAmounts = new UFloat[](assetAddressesLength);
            for (uint256 i; i < assetAddressesLength; i++) {
                uint256 balance_ = IERC20(_assetAddresses[i]).balanceOf(
                    address(this)
                );
                uint8 decimals_ = _assetState[_assetAddresses[i]].decimals;
                q.receiveAmounts[i] = balance_.toUFloat(decimals_);
            }
            return q;
        }

        q.payTokens = payTokens;
        q.payAmounts = payAmounts;
        q.receiveTokens = receiveTokens;
        q.allocations = allocations;
        q.receiveAmounts = new UFloat[](receiveTokensLength);
        q.initialTokens = _totalTokens;
        q.initialShares = totalSupply_;
        q.initialTokensPerShare = _tokensPerShare;

        // Compute fee
        for (uint256 i; i < receiveTokensLength; i++) {
            q.fee = q.fee.plus(
                q.allocations[i].times(_assetState[receiveTokens[i]].fee)
            );
        }
        q.discount = _discount[sender];
        if (q.fee.gt(ZERO_FLOAT) && q.discount.gt(ZERO_FLOAT)) {
            q.fee = q.fee.times(ONE_FLOAT.minus(q.discount));
        }
        q.poolAlloc = q.fee;
        if (receiveTokens[0] == address(this)) {
            q.poolAlloc = q.poolAlloc.plus(
                q.allocations[0].times(ONE_FLOAT.minus(q.fee))
            );
        }

        UFloat memory amount;
        for (uint256 i; i < payTokensLength; i++) {
            address payToken = payTokens[i];
            if (payToken == address(this)) continue;
            AssetState storage assetIn = _assetState[payToken];
            amount = payAmounts[i];
            q.scaledValueIn = q.scaledValueIn.plus(
                scaledAssetValueIn(assetIn.scale, assetIn.balance, amount)
            );
        }

        // Compute poolOut
        q.lastPoolBalance = _poolState.balance;
        q.scaledPoolOut = q.scaledValueIn.times(q.poolAlloc);
        if (payTokens[0] == address(this)) {
            amount = payAmounts[0];
            q.payAmounts[0] = amount;
            q.poolIn = amount.times(q.initialTokensPerShare); // Convert shares to tokens
            // q.poolOut = q.poolAlloc.fullMulDiv(
            //     q.scaledValueIn.mulUp(q.lastPoolBalance - q.poolIn, ONE) +
            //         _poolState.scale.mulUp(q.poolIn, ONE),
            //     _poolState.scale - q.scaledPoolOut
            // );
            q.poolOut = q
                .poolAlloc
                .times(
                    q
                        .scaledValueIn
                        .times(q.lastPoolBalance.minus(q.poolIn))
                        .plus(_poolState.scale.times(q.poolIn))
                )
                .divide(_poolState.scale.minus(q.scaledPoolOut));
            q.scaledValueIn = q.scaledValueIn.plus(
                _poolState.scale.times(q.poolIn).divide(
                    q.lastPoolBalance.plus(q.poolOut).minus(q.poolIn)
                )
            );
            q.feeAmount = q.poolOut;
        } else {
            q.poolOut = q.lastPoolBalance.times(q.scaledPoolOut).divide(
                _poolState.scale.minus(q.scaledPoolOut)
            );
            if (q.poolAlloc.gt(ZERO_FLOAT)) {
                q.feeAmount = q.poolOut.times(q.fee).divide(q.poolAlloc);
            }
        }

        // Compute receiveAmounts
        q.finalTokens = q.initialTokens.plus(q.poolOut).minus(q.poolIn);
        q.finalTokensPerShare = q.initialTokensPerShare.times(
            ONE_FLOAT.plus(
                q.feeAmount.times(ONE_FLOAT.minus(_protocolFee)).divide(
                    q.initialTokens.minus(q.poolIn)
                )
            )
        );
        q.finalShares = q.finalTokens.divide(q.finalTokensPerShare);

        address receiveToken;
        UFloat memory allocation;
        UFloat memory scaledValueOut;
        for (uint256 i; i < receiveTokensLength; i++) {
            receiveToken = receiveTokens[i];
            if (receiveToken == address(this)) {
                q.receiveAmounts[i] = (q.poolOut.minus(q.feeAmount)).divide(
                    q.finalTokensPerShare
                );
            } else {
                allocation = q.allocations[i].times(ONE_FLOAT.minus(q.fee));
                scaledValueOut = q.scaledValueIn.times(allocation);
                AssetState storage assetOut = _assetState[receiveToken];
                q.receiveAmounts[i] = assetOut
                    .balance
                    .times(scaledValueOut)
                    .divide(assetOut.scale.plus(scaledValueOut));
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
        returns (
            uint256[] memory receiveAmounts, // Token decimals
            uint256 feeAmount // Token decimals
        )
    {
        QuoteState memory q = _quoteMultiswap(
            _msgSender(),
            payTokens,
            amounts.toUFloatArray(assetDecimals(payTokens)),
            receiveTokens,
            allocations.toUFloatArray()
        );

        receiveAmounts = new uint256[](q.receiveAmounts.length);
        for (uint256 i; i < receiveTokens.length; i++) {
            if (receiveTokens[i] == address(this)) {
                receiveAmounts[i] = q.receiveAmounts[i].toUInt(); // Token decimals
            } else {
                receiveAmounts[i] = q.receiveAmounts[i].toUInt(
                    _assetState[payTokens[i]].decimals
                ); // Token decimals
            }
        }
        feeAmount = q.feeAmount.toUInt(); // Token decimals
    }

    function _disable(
        address receiver
    ) private returns (uint256[] memory receiveAmounts, uint256 feeAmount) {
        receiveAmounts = new uint256[](_assetAddresses.length);
        feeAmount = 0;

        // Burn all LP tokens
        _burn(receiver, totalSupply());
        emit BalanceUpdate(_txCount, address(this), 0);

        for (uint256 i; i < _assetAddresses.length; i++) {
            address token = _assetAddresses[i];
            uint256 balance = IERC20(token).balanceOf(address(this));
            if (balance > 0) {
                SafeERC20.safeTransfer(IERC20(token), receiver, balance);
            }
            delete _assetState[token];
            receiveAmounts[i] = balance;
            emit BalanceUpdate(_txCount, token, 0);
        }

        _txCount = 0;
        _isInitialized = 0;
        delete _poolState;
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

        UFloat[] memory amountsFloat = new UFloat[](amounts.length);
        for (uint256 i; i < payTokens.length; i++) {
            if (payTokens[i] == address(this)) {
                amountsFloat[i] = amounts[i].toUFloat(); // Convert to token decimals
            } else {
                amountsFloat[i] = amounts[i].toUFloat(
                    _assetState[payTokens[i]].decimals
                ); // Convert to token decimals
            }
        }

        QuoteState memory q = _quoteMultiswap(
            sender,
            payTokens,
            amountsFloat,
            receiveTokens,
            allocations.toUFloatArray()
        );

        receiveAmounts = new uint256[](q.receiveAmounts.length);

        // Check receiveAmounts
        {
            for (uint256 i; i < receiveTokens.length; i++) {
                if (receiveTokens[i] == address(this)) {
                    receiveAmounts[i] = q.receiveAmounts[i].toUInt(); // Convert to token decimals
                } else {
                    receiveAmounts[i] = q.receiveAmounts[i].toUInt(
                        _assetState[receiveTokens[i]].decimals
                    ); // Convert to token decimals
                }
                // receiveAmounts[i] = q.receiveAmounts[i].toUInt(
                //     _assetState[receiveTokens[i]].decimals
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
        }

        // Transfer tokens to the receiving address
        for (uint256 i; i < receiveTokens.length; i++) {
            address receiveToken = receiveTokens[i];
            _payTokensFromPool(
                sender,
                receiveToken,
                receiveAmounts[i] // Token decimals
            );
            if (receiveToken != address(this)) {
                _updateAssetBalance(
                    receiveToken,
                    ZERO_FLOAT,
                    q.receiveAmounts[i]
                ); // Canonical
            }
        }

        // Distribute fee
        if (q.finalShares.toUInt() > totalSupply()) {
            _allocateShares(
                _protocolFeeRecipient,
                q.finalShares.toUInt() - totalSupply()
            ); // Token deciamls
        }
        _totalTokens = q.finalTokens;
        _tokensPerShare = q.finalTokensPerShare;
        feeAmount = q.feeAmount.toUInt(); // 18 decimals

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
                    balance_ = _poolState.balance.toUInt(); // Convert to token decimals
                } else {
                    balance_ = _assetState[payToken].balance.toUInt(
                        _assetState[payToken].decimals
                    ); // Convert to token decimals
                }
                if (amounts[i] > balance_ / 3) revert TooLarge(amounts[i]);
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
        UFloat memory payAmount
    ) public returns (QuoteState memory) {
        address[] memory payTokens = new address[](1);
        UFloat[] memory amounts = new UFloat[](1);
        address[] memory receiveTokens = new address[](1);
        UFloat[] memory allocations = new UFloat[](1);

        payTokens[0] = payToken;
        amounts[0] = payAmount;
        receiveTokens[0] = receiveToken;
        allocations[0] = ONE_FLOAT;

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
        returns (
            uint256 receiveAmount, // Token decimals
            uint256 feeAmount // Token decimals
        )
    {
        QuoteState memory q = _quoteSwap(
            payToken,
            receiveToken,
            payAmount.toUFloat(_assetState[payToken].decimals)
        );
        receiveAmount = q.receiveAmounts[0].toUInt(
            _assetState[receiveToken].decimals
        ); // Token decimals
        feeAmount = q.feeAmount.toUInt(); // Token decimals
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
            payAmount >
            _assetState[payToken].balance.toUInt(_assetState[payToken].decimals) / 3
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
        UFloat memory payAmount
    ) public returns (QuoteState memory) {
        address[] memory payTokens = new address[](1);
        UFloat[] memory amounts = new UFloat[](1);
        address[] memory receiveTokens = new address[](1);
        UFloat[] memory allocations = new UFloat[](1);

        payTokens[0] = payToken;
        amounts[0] = payAmount;
        receiveTokens[0] = address(this);
        allocations[0] = ONE_FLOAT;

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
    ) public returns (uint256 receiveAmount, uint256 feeAmount) {
        address[] memory payTokens = new address[](1);
        UFloat[] memory amounts = new UFloat[](1);
        address[] memory receiveTokens = new address[](1);
        UFloat[] memory allocations = new UFloat[](1);

        payTokens[0] = payToken;
        amounts[0] = payAmount.toUFloat(_assetState[payToken].decimals);
        receiveTokens[0] = address(this);
        allocations[0] = ONE_FLOAT;

        QuoteState memory q = _quoteMultiswap(
            _msgSender(),
            payTokens,
            amounts,
            receiveTokens,
            allocations
        );

        receiveAmount = q.receiveAmounts[0].toUInt(); // Token decimals
        feeAmount = q.feeAmount.toUInt(); // Token decimals
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
            payAmount >
            _assetState[payToken].balance.toUInt(_assetState[payToken].decimals) / 3
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
        UFloat memory payAmount // Token decimals
    ) public returns (QuoteState memory) {
        address[] memory payTokens = new address[](1);
        UFloat[] memory amounts = new UFloat[](1);
        address[] memory receiveTokens = new address[](1);
        UFloat[] memory allocations = new UFloat[](1);

        payTokens[0] = address(this);
        amounts[0] = payAmount;
        receiveTokens[0] = receiveToken;
        allocations[0] = ONE_FLOAT;

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
    ) public returns (uint256 receiveAmount, uint256 feeAmount) {
        address[] memory payTokens = new address[](1);
        UFloat[] memory amounts = new UFloat[](1);
        address[] memory receiveTokens = new address[](1);
        UFloat[] memory allocations = new UFloat[](1);

        payTokens[0] = address(this);
        amounts[0] = payAmount.toUFloat();
        receiveTokens[0] = receiveToken;
        allocations[0] = ONE_FLOAT;

        QuoteState memory q = _quoteMultiswap(
            _msgSender(),
            payTokens,
            amounts,
            receiveTokens,
            allocations
        );

        receiveAmount = q.receiveAmounts[0].toUInt(
            _assetState[receiveToken].decimals
        ); // Token decimals
        feeAmount = q.feeAmount.toUInt(); // Token decimals
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
        if (payAmount > _poolState.balance.toUInt() / 3)
            revert TooLarge(payAmount);

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
        UFloat memory amount
    ) public returns (QuoteState memory q) {
        AssetState storage assetIn;
        q.payTokens = _assetAddresses;
        q.payAmounts = new UFloat[](_assetAddresses.length);
        q.receiveTokens = new address[](1);
        q.receiveTokens[0] = address(this);
        q.receiveAmounts = new UFloat[](1);
        q.initialTokens = _poolState.balance;
        q.initialShares = totalSupply().toUFloat();
        q.initialTokensPerShare = _poolState.tokensPerShare;

        UFloat memory R;
        if (token == address(this)) {
            R = amount.times(q.initialTokensPerShare).divide(q.initialTokens);
            q.receiveAmounts[0] = amount;
        } else {
            assetIn = _assetState[token];
            if (assetIn.decimals == 0) revert AssetNotFound(token);
            R = amount.divide(assetIn.balance);
            q.receiveAmounts[0] = R.times(q.initialShares);
        }

        for (uint256 i; i < _assetAddresses.length; i++) {
            assetIn = _assetState[_assetAddresses[i]];
            if (assetIn.token == token) {
                q.payAmounts[i] = amount;
            } else {
                q.payAmounts[i] = R.times(assetIn.balance);
            }
        }

        q.finalShares = q.initialShares.plus(q.receiveAmounts[0]);
        q.finalTokensPerShare = q.initialTokensPerShare;
        q.finalTokens = q.finalShares.times(q.finalTokensPerShare);
    }

    function quoteAddLiquidity(
        address token,
        uint256 amount // Token decimals
    )
        public
        returns (
            uint256[] memory payAmounts, // Token decimals
            uint256 receiveAmount
        )
    {
        UFloat memory amountFloat;
        if (token == address(this)) {
            amountFloat = amount.toUFloat();
        } else {
            amountFloat = amount.toUFloat(_assetState[token].decimals);
        }
        payAmounts = new uint256[](_assetAddresses.length);
        QuoteState memory q = _quoteAddLiquidity(token, amountFloat);
        receiveAmount = q.receiveAmounts[0].toUInt(); // Convert to token decimals
        for (uint256 i; i < payAmounts.length; i++) {
            payAmounts[i] = q.payAmounts[i].toUInt(
                _assetState[_assetAddresses[i]].decimals
            ); // Convert to token decimals
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
            _updateAssetBalance(
                _assetAddresses[i],
                payAmount.toUFloat(_assetState[_assetAddresses[i]].decimals),
                ZERO_FLOAT
            );
        }

        _payTokensFromPool(sender, address(this), receiveAmount);
        _updatePoolBalance();

        emit AddLiquidity(_txCount, sender, receiveAmount, payAmounts);
    }

    function _quoteRemoveLiquidity(
        UFloat memory amount
    ) public returns (QuoteState memory) {
        uint256 n = _assetAddresses.length;
        address[] memory payTokens = new address[](1);
        UFloat[] memory amounts = new UFloat[](1);
        address[] memory receiveTokens = new address[](n);
        UFloat[] memory allocations = new UFloat[](n);

        payTokens[0] = address(this);
        amounts[0] = amount;
        receiveTokens = _assetAddresses;
        {
            UFloat memory allocation;
            UFloat memory totalAllocation;
            for (uint256 i; i < n - 1; i++) {
                allocation = _assetState[_assetAddresses[i]].scale.divide(
                    _poolState.scale
                );
                // allocation =
                //     _assetState[_assetAddresses[i]].scale.divUp(
                //         _poolState.scale,
                //         ONE
                //     ) /
                //     conversion(_assetAddresses[i]); // Convert to token decimals
                allocations[i] = allocation;
                totalAllocation = totalAllocation.plus(allocation);
            }
            allocations[n - 1] = ONE_FLOAT.minus(totalAllocation);
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
    ) public returns (uint256[] memory receiveAmounts, uint256 feeAmount) {
        QuoteState memory q = _quoteRemoveLiquidity(amount.toUFloat());
        for (uint256 i; i < _assetAddresses.length; i++) {
            receiveAmounts[i] = q.receiveAmounts[i].toUInt(
                _assetState[_assetAddresses[i]].decimals
            ); // Convert to token decimals
        }
        feeAmount = q.feeAmount.toUInt(); // Convert to token decimals
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
                allocation = _assetState[_assetAddresses[i]]
                    .scale
                    .divide(_poolState.scale)
                    .toUInt(); // Convert to 18 decimals
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
            _discount[user_] = ZERO_FLOAT;
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

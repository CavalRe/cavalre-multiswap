// SPDX-License-Identifier: Business Source License 1.1
// Copyright (C) 2020-2023, CavalRe Inc. All rights reserved.
// See the file LICENSE.md for licensing terms.
pragma solidity 0.8.24;

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Quotes is ReentrancyGuard {

    function _quoteMultiswap(
        address sender,
        address[] memory payTokens,
        uint256[] memory amounts,
        address[] memory receiveTokens,
        uint256[] memory allocations
    ) public view returns (uint256[] memory receiveAmounts, uint256 feeAmount) {
        // if (payTokens[0] == address(this) && amounts[0] == totalSupply()) {
        //     feeAmount = 0;
        //     receiveAmounts = new uint256[](_assetAddresses.length);
        //     for (uint256 i; i < _assetAddresses.length; i++) {
        //         receiveAmounts[i] = IERC20(_assetAddresses[i]).balanceOf(
        //             address(this)
        //         );
        //     }
        //     return (receiveAmounts, feeAmount);
        // }

        // receiveAmounts = new uint256[](receiveTokens.length);

        // {
        //     // Compute fee
        //     uint256 fee;
        //     {
        //         for (uint256 i; i < receiveTokens.length; i++) {
        //             fee += allocations[i].mulWadUp(
        //                 _assetState[receiveTokens[i]].fee
        //             );
        //         }
        //         uint256 discount_ = _discount[sender];
        //         if (fee > 0 && discount_ > 0) {
        //             fee = fee.mulWadUp(ONE - discount_);
        //         }
        //     }

        //     // Compute scaledValueIn
        //     uint256 scaledValueIn;
        //     uint256 poolOut;
        //     {
        //         // Contribution from assets only
        //         for (uint256 i; i < payTokens.length; i++) {
        //             address token_ = payTokens[i];
        //             if (token_ != address(this)) {
        //                 AssetState storage assetIn = _assetState[token_];
        //                 uint256 amount_ = amounts[i] * assetIn.conversion; // Convert to canonical
        //                 scaledValueIn += assetIn.scale.fullMulDiv(
        //                     amount_,
        //                     assetIn.balance + amount_
        //                 );
        //             }
        //         }

        //         uint256 poolAlloc = fee;
        //         if (receiveTokens[0] == address(this)) {
        //             poolAlloc += allocations[0].mulWadUp(ONE - fee);
        //         }
        //         uint256 lastPoolBalance = _poolState.balance;
        //         uint256 scaledPoolOut = scaledValueIn.mulWadUp(poolAlloc);
        //         if (payTokens[0] == address(this)) {
        //             uint256 poolIn = amounts[0].mulWadUp(
        //                 _poolState.tokensPerShare
        //             );
        //             poolOut = poolAlloc.fullMulDiv(
        //                 scaledValueIn.mulWadUp(lastPoolBalance - poolIn) +
        //                     _poolState.scale.mulWadUp(poolIn),
        //                 _poolState.scale - scaledPoolOut
        //             );
        //             scaledValueIn += _poolState.scale.fullMulDiv(
        //                 poolIn,
        //                 lastPoolBalance + poolOut - poolIn
        //             );
        //             feeAmount = poolOut;
        //         } else {
        //             poolOut = lastPoolBalance.fullMulDiv(
        //                 scaledPoolOut,
        //                 _poolState.scale - scaledPoolOut
        //             );
        //             if (poolAlloc > 0) {
        //                 feeAmount = poolOut.fullMulDiv(fee, poolAlloc);
        //             }
        //         }
        //     }

        //     // Compute receiveAmounts
        //     {
        //         uint256 scaledValueOut;

        //         address receiveToken;
        //         uint256 allocation;
        //         for (uint256 i; i < receiveTokens.length; i++) {
        //             receiveToken = receiveTokens[i];
        //             allocation = allocations[i].mulWadUp(ONE - fee);
        //             scaledValueOut = scaledValueIn.mulWadUp(allocation);
        //             if (receiveToken == address(this)) {
        //                 receiveAmounts[i] = (poolOut - feeAmount).divWadUp(
        //                     _poolState.tokensPerShare
        //                 );
        //             } else {
        //                 AssetState storage assetOut = _assetState[receiveToken];
        //                 receiveAmounts[i] =
        //                     assetOut.balance.fullMulDiv(
        //                         scaledValueOut,
        //                         assetOut.scale + scaledValueOut
        //                     ) /
        //                     assetOut.conversion; // Convert from canonical
        //             }
        //         }
        //     }
        // }
    }

    function quoteMultiswap(
        address[] memory payTokens,
        uint256[] memory amounts,
        address[] memory receiveTokens,
        uint256[] memory allocations
    ) public view returns (uint256[] memory receiveAmounts, uint256 feeAmount) {
        // (receiveAmounts, feeAmount) = _quoteMultiswap(
        //     _msgSender(),
        //     payTokens,
        //     amounts,
        //     receiveTokens,
        //     allocations
        // );
    }

    function quoteSwap(
        address payToken,
        address receiveToken,
        uint256 payAmount
    ) public view returns (uint256 receiveAmount, uint256 feeAmount) {
        // address[] memory payTokens = new address[](1);
        // uint256[] memory amounts = new uint256[](1);
        // address[] memory receiveTokens = new address[](1);
        // uint256[] memory allocations = new uint256[](1);
        // uint256[] memory receiveAmounts = new uint256[](1);

        // payTokens[0] = payToken;
        // amounts[0] = payAmount;
        // receiveTokens[0] = receiveToken;
        // allocations[0] = 1e18;

        // (receiveAmounts, feeAmount) = _quoteMultiswap(
        //     _msgSender(),
        //     payTokens,
        //     amounts,
        //     receiveTokens,
        //     allocations
        // );

        // receiveAmount = receiveAmounts[0];
    }

    function quoteStake(
        address payToken,
        uint256 payAmount
    ) public view returns (uint256 receiveAmount, uint256 feeAmount) {
        // address[] memory payTokens = new address[](1);
        // uint256[] memory amounts = new uint256[](1);
        // address[] memory receiveTokens = new address[](1);
        // uint256[] memory allocations = new uint256[](1);
        // uint256[] memory receiveAmounts = new uint256[](1);

        // payTokens[0] = payToken;
        // amounts[0] = payAmount;
        // receiveTokens[0] = address(this);
        // allocations[0] = 1e18;

        // (receiveAmounts, feeAmount) = _quoteMultiswap(
        //     _msgSender(),
        //     payTokens,
        //     amounts,
        //     receiveTokens,
        //     allocations
        // );

        // receiveAmount = receiveAmounts[0];
    }

    function quoteUnstake(
        address receiveToken,
        uint256 payAmount
    ) public view returns (uint256 receiveAmount, uint256 feeAmount) {
        // address[] memory payTokens = new address[](1);
        // uint256[] memory amounts = new uint256[](1);
        // address[] memory receiveTokens = new address[](1);
        // uint256[] memory allocations = new uint256[](1);
        // uint256[] memory receiveAmounts = new uint256[](1);

        // payTokens[0] = address(this);
        // amounts[0] = payAmount;
        // receiveTokens[0] = receiveToken;
        // allocations[0] = 1e18;

        // (receiveAmounts, feeAmount) = _quoteMultiswap(
        //     _msgSender(),
        //     payTokens,
        //     amounts,
        //     receiveTokens,
        //     allocations
        // );

        // receiveAmount = receiveAmounts[0];
    }

    function quoteAddLiquidity(
        address token,
        uint256 amount
    ) public view returns (uint256[] memory payAmounts) {
        // AssetState storage assetIn;
        // payAmounts = new uint256[](_assetAddresses.length);

        // uint256 g;
        // if (token == address(this)) {
        //     g = (_poolState.balance +
        //         amount.mulWadUp(_poolState.tokensPerShare)).divWadUp(
        //             _poolState.balance
        //         );
        // } else {
        //     assetIn = _assetState[token];
        //     if (assetIn.decimals == 0) revert AssetNotFound(token);
        //     g = (assetIn.balance + amount * assetIn.conversion).divWadUp(
        //         assetIn.balance
        //     );
        // }

        // uint256 payAmount;
        // for (uint256 i; i < _assetAddresses.length; i++) {
        //     assetIn = _assetState[_assetAddresses[i]];
        //     if (
        //         (assetIn.token == token) ||
        //         (assetIn.token == _wrappedNativeAddress && token == address(0))
        //     ) {
        //         payAmount = amount;
        //     } else {
        //         payAmount =
        //             (assetIn.balance.mulWadUp(g) - assetIn.balance) /
        //             assetIn.conversion;
        //     }
        //     payAmounts[i] = payAmount;
        // }
    }

    function quoteRemoveLiquidity(
        uint256 amount
    ) public view returns (uint256[] memory receiveAmounts, uint256 feeAmount) {
        // receiveAmounts = new uint256[](_assetAddresses.length);

        // uint256 n = _assetAddresses.length;
        // address[] memory payTokens = new address[](1);
        // uint256[] memory amounts = new uint256[](1);
        // address[] memory receiveTokens = new address[](n);
        // uint256[] memory allocations = new uint256[](n);

        // payTokens[0] = address(this);
        // amounts[0] = amount;
        // receiveTokens = _assetAddresses;
        // {
        //     uint256 allocation;
        //     uint256 totalAllocation;
        //     for (uint256 i; i < n - 1; i++) {
        //         allocation = _assetState[_assetAddresses[i]].scale.divWadUp(
        //             _poolState.scale
        //         );
        //         allocations[i] = allocation;
        //         totalAllocation += allocation;
        //     }
        //     allocations[n - 1] = 1e18 - totalAllocation;
        // }

        // (receiveAmounts, feeAmount) = _quoteMultiswap(
        //     _msgSender(),
        //     payTokens,
        //     amounts,
        //     receiveTokens,
        //     allocations
        // );
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
        // _txCount++;

        // if (payTokens[0] == address(this) && amounts[0] == totalSupply()) {
        //     return _disable(sender);
        // }

        // (receiveAmounts, feeAmount) = _quoteMultiswap(
        //     sender,
        //     payTokens,
        //     amounts,
        //     receiveTokens,
        //     allocations
        // );

        // // Check receiveAmounts
        // {
        //     for (uint256 i; i < receiveTokens.length; i++) {
        //         if (receiveAmounts[i] < minReceiveAmounts[i]) {
        //             revert InsufficientReceiveAmount(
        //                 minReceiveAmounts[i],
        //                 receiveAmounts[i]
        //             );
        //         }
        //     }
        // }

        // // Transfer tokens to the pool
        // for (uint256 i; i < payTokens.length; i++) {
        //     address payToken = payTokens[i];
        //     uint256 amount = amounts[i];
        //     _payTokenToPool(sender, payToken, amount);
        //     if (payToken != address(this)) {
        //         amount *= _assetState[payToken].conversion; // Convert to canonical
        //         _updateAssetBalance(payToken, amount, 0);
        //     }
        // }

        // // Transfer tokens to the receiving address
        // for (uint256 i; i < receiveTokens.length; i++) {
        //     address receiveToken = receiveTokens[i];
        //     uint256 receiveAmount = receiveAmounts[i];
        //     _payTokenToSender(sender, receiveToken, receiveAmount);
        //     if (receiveToken != address(this)) {
        //         receiveAmount *= _assetState[receiveToken].conversion; // Convert to canonical
        //         _updateAssetBalance(receiveToken, 0, receiveAmount);
        //     }
        // }

        // // Distribute fee
        // distributeFee(feeAmount);

        // // Update pool balance
        // _updatePoolBalance();
    }

    function multiswap(
        address[] memory payTokens,
        uint256[] memory amounts,
        address[] memory receiveTokens,
        uint256[] memory allocations,
        uint256[] memory minReceiveAmounts
    )
        public
        payable
        // onlyInitialized
        returns (uint256[] memory receiveAmounts, uint256 feeAmount)
    {
        // if (_tradingPaused) revert TradingPausedError();

        // address sender = _msgSender();
        // // Check user
        // {
        //     _checkUser(sender);
        // }
        // // Check lengths
        // {
        //     if (payTokens.length == 0) revert ZeroLength();
        //     if (receiveTokens.length == 0) revert ZeroLength();
        //     if (payTokens.length != amounts.length)
        //         revert LengthMismatch(payTokens.length, amounts.length);
        //     if (receiveTokens.length != allocations.length)
        //         revert LengthMismatch(receiveTokens.length, allocations.length);
        //     if (receiveTokens.length != minReceiveAmounts.length)
        //         revert LengthMismatch(
        //             receiveTokens.length,
        //             minReceiveAmounts.length
        //         );
        // }
        // // Check duplicates
        // {
        //     bool isLP;
        //     bool[] memory check_ = new bool[](_assetAddresses.length);
        //     isLP = _checkDuplicateTokens(payTokens, check_, isLP);
        //     isLP = _checkDuplicateTokens(receiveTokens, check_, isLP);
        // }
        // // Check amounts
        // {
        //     for (uint256 i; i < amounts.length; i++) {
        //         if (amounts[i] == 0) revert ZeroAmount();
        //     }
        // }
        // // Check allocations
        // {
        //     uint256 totalAllocation;
        //     for (uint256 i; i < allocations.length; i++) {
        //         if (allocations[i] == 0) revert ZeroAllocation();
        //         totalAllocation += allocations[i];
        //     }
        //     if (totalAllocation != 1e18)
        //         revert IncorrectAmount(1e18, totalAllocation);
        // }
        // // Check size
        // {
        //     for (uint256 i; i < payTokens.length; i++) {
        //         address payToken = payTokens[i];
        //         uint256 balance_;
        //         if (payToken == address(this)) {
        //             balance_ = _poolState.balance;
        //         } else {
        //             balance_ =
        //                 _assetState[payToken].balance /
        //                 _assetState[payToken].conversion; // Convert from canonical
        //         }
        //         if (amounts[i] * 3 > balance_) revert TooLarge(amounts[i]);
        //     }
        // }

        // (receiveAmounts, feeAmount) = _multiswap(
        //     sender,
        //     payTokens,
        //     amounts,
        //     receiveTokens,
        //     allocations,
        //     minReceiveAmounts
        // );

        // emit Multiswap(
        //     _txCount,
        //     sender,
        //     payTokens,
        //     receiveTokens,
        //     amounts,
        //     receiveAmounts,
        //     feeAmount
        // );
    }

    function swap(
        address payToken,
        address receiveToken,
        uint256 payAmount,
        uint256 minReceiveAmount
    )
        public
        payable
        // onlyInitialized
        returns (uint256 receiveAmount, uint256 feeAmount)
    {
        // if (_tradingPaused) revert TradingPausedError();
        // address sender = _msgSender();
        // _checkUser(sender);
        // if (payToken == address(this))
        //     revert InvalidSwap(payToken, receiveToken);
        // if (receiveToken == address(this))
        //     revert InvalidSwap(payToken, receiveToken);
        // if (payToken == receiveToken) revert DuplicateToken(payToken);
        // if (_assetState[payToken].decimals == 0) revert AssetNotFound(payToken);
        // if (_assetState[receiveToken].decimals == 0)
        //     revert AssetNotFound(receiveToken);
        // if (payAmount == 0) revert ZeroAmount();
        // if (
        //     payAmount * 3 >
        //     _assetState[payToken].balance / _assetState[payToken].conversion
        // ) revert TooLarge(payAmount);

        // {
        //     address[] memory payTokens = new address[](1);
        //     uint256[] memory amounts = new uint256[](1);
        //     address[] memory receiveTokens = new address[](1);
        //     uint256[] memory allocations = new uint256[](1);
        //     uint256[] memory minReceiveAmounts = new uint256[](1);
        //     uint256[] memory receiveAmounts = new uint256[](1);

        //     payTokens[0] = payToken;
        //     amounts[0] = payAmount;
        //     receiveTokens[0] = receiveToken;
        //     allocations[0] = 1e18;
        //     minReceiveAmounts[0] = minReceiveAmount;

        //     (receiveAmounts, feeAmount) = _multiswap(
        //         sender,
        //         payTokens,
        //         amounts,
        //         receiveTokens,
        //         allocations,
        //         minReceiveAmounts
        //     );

        //     receiveAmount = receiveAmounts[0];
        // }

        // emit Swap(
        //     _txCount,
        //     sender,
        //     payToken,
        //     receiveToken,
        //     payAmount,
        //     receiveAmount,
        //     feeAmount
        // );
    }

    function stake(
        address payToken,
        uint256 payAmount,
        uint256 minReceiveAmount
    )
        public
        payable
        // onlyInitialized
        returns (uint256 receiveAmount, uint256 feeAmount)
    {
        // if (_tradingPaused) revert TradingPausedError();
        // address sender = _msgSender();
        // _checkUser(sender);
        // if (payToken == address(this)) revert InvalidStake(payToken);
        // if (_assetState[payToken].decimals == 0) revert AssetNotFound(payToken);
        // if (payAmount == 0) revert ZeroAmount();
        // if (
        //     payAmount * 3 >
        //     _assetState[payToken].balance / _assetState[payToken].conversion
        // ) revert TooLarge(payAmount);

        // {
        //     address[] memory payTokens = new address[](1);
        //     uint256[] memory amounts = new uint256[](1);
        //     address[] memory receiveTokens = new address[](1);
        //     uint256[] memory allocations = new uint256[](1);
        //     uint256[] memory minReceiveAmounts = new uint256[](1);
        //     uint256[] memory receiveAmounts = new uint256[](1);

        //     payTokens[0] = payToken;
        //     amounts[0] = payAmount;
        //     receiveTokens[0] = address(this);
        //     allocations[0] = 1e18;
        //     minReceiveAmounts[0] = minReceiveAmount;

        //     (receiveAmounts, feeAmount) = _multiswap(
        //         sender,
        //         payTokens,
        //         amounts,
        //         receiveTokens,
        //         allocations,
        //         minReceiveAmounts
        //     );

        //     receiveAmount = receiveAmounts[0];
        // }

        // emit Stake(_txCount, sender, payToken, payAmount, receiveAmount);
    }

    function unstake(
        address receiveToken,
        uint256 payAmount,
        uint256 minReceiveAmount
    )
        public
        // onlyInitialized
        returns (uint256 receiveAmount, uint256 feeAmount)
    {
        // if (_tradingPaused) revert TradingPausedError();
        // address sender = _msgSender();
        // _checkUser(sender);
        // if (receiveToken == address(this)) revert InvalidUnstake(receiveToken);
        // if (_assetState[receiveToken].decimals == 0)
        //     revert AssetNotFound(receiveToken);
        // if (payAmount == 0) revert ZeroAmount();
        // if (payAmount * 3 > _poolState.balance) revert TooLarge(payAmount);

        // address[] memory payTokens = new address[](1);
        // uint256[] memory amounts = new uint256[](1);
        // address[] memory receiveTokens = new address[](1);
        // uint256[] memory allocations = new uint256[](1);
        // uint256[] memory minReceiveAmounts = new uint256[](1);
        // uint256[] memory receiveAmounts = new uint256[](1);

        // payTokens[0] = address(this);
        // amounts[0] = payAmount;
        // receiveTokens[0] = receiveToken;
        // allocations[0] = 1e18;
        // minReceiveAmounts[0] = minReceiveAmount;

        // (receiveAmounts, feeAmount) = _multiswap(
        //     sender,
        //     payTokens,
        //     amounts,
        //     receiveTokens,
        //     allocations,
        //     minReceiveAmounts
        // );

        // receiveAmount = receiveAmounts[0];

        // emit Unstake(
        //     _txCount,
        //     sender,
        //     receiveToken,
        //     payAmount,
        //     receiveAmount,
        //     feeAmount
        // );
    }

    function addLiquidity(
        address token,
        uint256 amount,
        uint256[] memory maxPayAmounts
    )
        public
        payable
        // onlyInitialized
        nonReentrant
        returns (uint256[] memory payAmounts)
    {
        // if (_tradingPaused) revert TradingPausedError();
        // if (_assetAddresses.length != maxPayAmounts.length)
        //     revert LengthMismatch(_assetAddresses.length, maxPayAmounts.length);
        // if (amount == 0) revert ZeroAmount();
        // address sender = _msgSender();
        // _checkUser(sender);

        // _txCount++;

        // AssetState storage assetIn;
        // payAmounts = new uint256[](_assetAddresses.length);

        // uint256 g;
        // if (token == address(this)) {
        //     g = (_poolState.balance +
        //         amount.mulWadUp(_poolState.tokensPerShare)).divWadUp(
        //             _poolState.balance
        //         );
        // } else {
        //     assetIn = _assetState[token];
        //     if (assetIn.decimals == 0) revert AssetNotFound(token);
        //     g = (assetIn.balance + amount * assetIn.conversion).divWadUp(
        //         assetIn.balance
        //     );
        // }
        // address payAddress;
        // uint256 payAmount;
        // for (uint256 i; i < _assetAddresses.length; i++) {
        //     assetIn = _assetState[_assetAddresses[i]];
        //     if (
        //         (assetIn.token == token) ||
        //         (assetIn.token == _wrappedNativeAddress && token == address(0))
        //     ) {
        //         payAddress = token;
        //         payAmount = amount;
        //     } else {
        //         payAddress = _assetAddresses[i];
        //         payAmount =
        //             (assetIn.balance.mulWadUp(g) - assetIn.balance) /
        //             assetIn.conversion;
        //     }
        //     if (payAmount > maxPayAmounts[i])
        //         revert ExcessivePayAmount(maxPayAmounts[i], payAmount);
        //     payAmounts[i] = payAmount;

        //     _payTokenToPool(sender, payAddress, payAmount);
        //     payAmount *= assetIn.conversion; // Convert to canonical
        //     _updateAssetBalance(_assetAddresses[i], payAmount, 0);
        // }

        // _mint(sender, amount);
        // _updatePoolBalance();

        // emit AddLiquidity(_txCount, sender, payAmounts, amount);
    }

    function _removeLiquidity(
        address sender,
        uint256 amount,
        uint256[] memory minReceiveAmounts
    ) private returns (uint256[] memory receiveAmounts, uint256 feeAmount) {
        // uint256 n = _assetAddresses.length;
        // address[] memory payTokens = new address[](1);
        // uint256[] memory amounts = new uint256[](1);
        // address[] memory receiveTokens = new address[](n);
        // uint256[] memory allocations = new uint256[](n);
        // receiveAmounts = new uint256[](n);

        // payTokens[0] = address(this);
        // amounts[0] = amount;
        // receiveTokens = _assetAddresses;
        // {
        //     uint256 allocation;
        //     uint256 totalAllocation;
        //     for (uint256 i; i < n - 1; i++) {
        //         allocation = _assetState[_assetAddresses[i]].scale.divWadUp(
        //             _poolState.scale
        //         );
        //         allocations[i] = allocation;
        //         totalAllocation += allocation;
        //     }
        //     allocations[n - 1] = 1e18 - totalAllocation;
        // }

        // (receiveAmounts, feeAmount) = _multiswap(
        //     sender,
        //     payTokens,
        //     amounts,
        //     receiveTokens,
        //     allocations,
        //     minReceiveAmounts
        // );

        // emit RemoveLiquidity(
        //     _txCount,
        //     sender,
        //     amount,
        //     receiveAmounts,
        //     feeAmount
        // );
    }

    function removeLiquidity(
        uint256 amount,
        uint256[] memory minReceiveAmounts
    )
        public
        // onlyInitialized
        returns (uint256[] memory receiveAmounts, uint256 feeAmount)
    {
        // if (_assetAddresses.length != minReceiveAmounts.length)
        //     revert LengthMismatch(
        //         _assetAddresses.length,
        //         minReceiveAmounts.length
        //     );
        // if (amount == 0) revert ZeroAmount();
        // (receiveAmounts, feeAmount) = _removeLiquidity(
        //     _msgSender(),
        //     amount,
        //     minReceiveAmounts
        // );
    }

}
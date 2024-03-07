// SPDX-License-Identifier: Business Source License 1.1
// Copyright (C) 2020-2023, CavalRe Inc. All rights reserved.
// See the file LICENSE.md for licensing terms.
pragma solidity 0.8.24;

library Quotes {

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





}
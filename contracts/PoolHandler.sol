// SPDX-License-Identifier: Business Source License 1.1
// Copyright (C) 2020-2023, CavalRe Inc. All rights reserved.
// See the file LICENSE.md for licensing terms.
pragma solidity 0.8.19;

import {Pool, IPool, IERC20} from "./Pool.sol";
import {IWrappedNative} from "./interfaces/IWrappedNative.sol";

// import {IPool, PoolState, AssetState} from "./interfaces/IPool.sol";
// import {LPToken, FixedPointMathLib} from "./LPToken.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import {Context} from "@openzeppelin/contracts/utils/Context.sol";

// import {IERC20, IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract PoolHandler is ReentrancyGuard, Context {
    address internal _wrappedNativeAddress;
    IPool internal _pool;

    error IncorrectAmount(uint256 expected, uint256 actual);

    constructor(address wrappedNativeAddress_, address poolAddress_) {
        _wrappedNativeAddress = wrappedNativeAddress_;
        _pool = IPool(poolAddress_);
    }

    function _handleNative(uint256 amount) internal returns (address) {
        if (msg.value != amount) revert IncorrectAmount(msg.value, amount);
        _wrap(amount);
        return _wrappedNativeAddress;
    }

    function _payTokenToPool(
        address sender,
        address token,
        uint256 amount
    ) internal returns (address) {
        if (token == address(0)) {
            if (msg.value != amount) revert IncorrectAmount(msg.value, amount);
            _wrap(amount);
            return _wrappedNativeAddress;
        }
        SafeERC20.safeTransferFrom(
            IERC20(token),
            sender,
            address(this),
            amount
        );
        return token;
    }

    function _payTokenToSender(
        address recipient,
        address token,
        uint256 amount
    ) internal {
        if (token == address(0)) {
            if (msg.value != amount) revert IncorrectAmount(msg.value, amount);
            _unwrap(amount);
            (bool success, ) = payable(recipient).call{value: amount}("");
            require(success, "Transfer failed");
        } else {
            SafeERC20.safeTransfer(IERC20(token), recipient, amount);
        }
    }

    // function addAsset(
    //     address token_,
    //     uint256 fee_, // 18 decimals
    //     uint256 balance_, // Token decimals
    //     uint256 scale_ // 18 decimals
    // ) external payable nonReentrant {
    //     if (token_ == address(0)) {
    //         token_ = _handleNative(balance_);
    //     }
    //     _pool.addAsset(token_, fee_, balance_, scale_);
    // }

    function multiswap(
        address[] memory payTokens,
        uint256[] memory amounts,
        address[] memory receiveTokens,
        uint256[] memory allocations,
        uint256[] memory minReceiveAmounts
    )
        external
        payable
        returns (uint256[] memory receiveAmounts, uint256 feeAmount)
    {
        for (uint256 i; i < payTokens.length; i++) {
            payTokens[i] = _payTokenToPool(
                _msgSender(),
                payTokens[i],
                amounts[i]
            );
        }

        uint256 iReceiveNative;
        for (uint256 i; i < receiveTokens.length; i++) {
            if (receiveTokens[i] == address(0)) {
                iReceiveNative = i + 1;
                receiveTokens[i] = _wrappedNativeAddress;
            }
        }

        (receiveAmounts, feeAmount) = _pool.multiswap(
            payTokens,
            amounts,
            receiveTokens,
            allocations,
            minReceiveAmounts
        );

        // if (iReceiveNative > 0) {
        //     _payNativeToUser(receiveAmounts[iReceiveNative-1]);
        // }
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
}

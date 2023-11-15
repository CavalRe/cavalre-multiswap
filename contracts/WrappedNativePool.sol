// SPDX-License-Identifier: Business Source License 1.1
// Copyright (C) 2020-2023, CavalRe Inc. All rights reserved.
// See the file LICENSE.md for licensing terms.
pragma solidity 0.8.19;

import {LPToken} from "./LPToken.sol";
import {Pool} from "./Pool.sol";
import {IWrappedNative} from "./interfaces/IWrappedNative.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract WrappedNativePool is Pool {
    address public _wrappedNativeAddress;

    constructor(
        string memory name,
        string memory symbol,
        uint256 protocolFee,
        uint256 tau,
        address wrappedNativeAddress_
    ) Pool(name, symbol, protocolFee, tau) {
        if (tau >= ONE) revert TooLarge(tau);
        _protocolFee = protocolFee;
        _poolState.token = address(this);
        _poolState.name = name;
        _poolState.symbol = symbol;
        _poolState.decimals = 18;
        _poolState.omega = int256(ONE - tau);
        _poolState.tokensPerShare = ONE;
        _wrappedNativeAddress = wrappedNativeAddress_;
    }

    function wrappedNativeAddress() public view returns (address) {
        return _wrappedNativeAddress;
    }

    function _payTokenToPool(
        address sender,
        address token,
        uint256 amount
    ) internal override {
        if (token == address(this)) {
            _burn(sender, amount);
            return;
        }
        uint256 nativeBalance;
        bool isNative = token == address(0) || token == _wrappedNativeAddress;
        if (isNative) {
            nativeBalance = msg.value;
        }
        if (nativeBalance < amount) {
            SafeERC20.safeTransferFrom(
                IERC20(token),
                sender,
                address(this),
                amount - nativeBalance
            );
        } else if (isNative && nativeBalance > amount) {
            (bool success, ) = payable(sender).call{
                value: nativeBalance - amount
            }("");
            require(success, "Transfer failed");
            nativeBalance = amount;
        }
        if (isNative && nativeBalance > 0) {
            _wrap(nativeBalance);
        }
    }

    function _payTokenToSender(
        address recipient,
        address token,
        uint256 amount
    ) internal override {
        if (token == address(this)) {
            _mint(recipient, amount);
            return;
        }
        if (token == address(0)) {
            _unwrap(amount);
            (bool success, ) = payable(recipient).call{value: amount}("");
            require(success, "Transfer failed");
        } else {
            SafeERC20.safeTransfer(IERC20(token), recipient, amount);
        }
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

    receive() external payable {
        _wrap(msg.value);
    }
}

// SPDX-License-Identifier: Business Source License 1.1
/**
 * This file is a modified version of a file from the OpenZeppelin project:
 * https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.0/contracts/token/ERC20/ERC20.sol
 *
 * The original file is licensed under the MIT License, a copy of which can be found at:
 * https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.0/LICENSE
 */
// Copyright (C) 2020-2023, CavalRe Inc. All rights reserved.
// See the file LICENSE.md for licensing terms.
pragma solidity 0.8.19;

import {ILPToken} from "./ILPToken.sol";
import {Users} from "./Users.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {FixedPointMathLib} from "solady/src/utils/FixedPointMathLib.sol";

contract LPToken is ILPToken, ERC20, Users {
    using FixedPointMathLib for uint256;

    mapping(address => uint256) private _balances;

    mapping(address => mapping(address => uint256)) private _allowances;

    uint256 private _totalTokens;
    uint256 private _price; // shares -> assets

    string private _name;
    string private _symbol;

    uint256 private _protocolFee;
    address private _protocolFeeRecipient;

    constructor(
        string memory name_,
        string memory symbol_
    ) ERC20(name_, symbol_) {
        _price = 1e18;
        _protocolFeeRecipient = _msgSender();
    }

    function totalTokens() public view returns (uint256) {
        return _totalTokens;
    }

    function price() public view returns (uint256) {
        return _price;
    }

    function tokensOf(address account) public view returns (uint256) {
        return balanceOf(account).mulWadUp(_price);
    }

    function approve(
        address spender,
        uint256 amount
    ) public override returns (bool) {
        if (_isBlocked[spender]) revert UserNotAllowed(spender);
        return super.approve(spender, amount);
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public override returns (bool) {
        address spender = _msgSender();
        if (_isBlocked[spender]) revert UserNotAllowed(spender);
        return super.transferFrom(from, to, amount);
    }

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal override {
        if (_isBlocked[to]) revert UserNotAllowed(to);
        return super._transfer(from, to, amount);
    }

    function _mint(address account, uint256 amount) internal override {
        if (_isBlocked[account]) revert UserNotAllowed(account);
        super._mint(account, amount);
        _totalTokens = totalSupply().mulWadUp(_price);
    }

    function _burn(address account, uint256 amount) internal override {
        super._burn(account, amount);
        _totalTokens = totalSupply().mulWadUp(_price);
    }

    function _distributeFee(
        uint256 txCount,
        uint256 amount
    ) internal returns (uint256 lpAmount, uint256 protocolAmount) {
        protocolAmount = amount.mulWadUp(_protocolFee);
        lpAmount = amount - protocolAmount;
        _totalTokens += amount;
        _price = _totalTokens.divWadUp(totalSupply());
        if (protocolAmount > 0)
            _mint(_protocolFeeRecipient, protocolAmount.divWadUp(_price));

        emit DistributeFee(txCount, lpAmount, protocolAmount);
    }

    function protocolFee() public view returns (uint256) {
        return _protocolFee;
    }

    function protocolFeeRecipient() public view returns (address) {
        return _protocolFeeRecipient;
    }

    function setProtocolFee(uint256 fee) public onlyOwner {
        if (fee > HALF) revert InvalidProtocolFee(fee);
        _protocolFee = fee;
    }

    function setProtocolFeeRecipient(address recipient) public onlyOwner {
        if (recipient == address(0)) revert ZeroAddress();
        if (_isBlocked[recipient]) revert UserNotAllowed(recipient);
        _protocolFeeRecipient = recipient;
    }
}

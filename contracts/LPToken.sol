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
import {FixedPointMathLib} from "../node_modules/solady/src/utils/FixedPointMathLib.sol";

contract LPToken is ILPToken, Users {
    using FixedPointMathLib for uint256;

    mapping(address => uint256) private _virtualBalances;

    mapping(address => mapping(address => uint256)) private _virtualAllowances;

    uint256 private _totalSupply;
    uint256 private _virtualSupply;
    uint256 private _ratio; // virtual -> real

    string private _name;
    string private _symbol;

    uint256 private _protocolFee;
    address private _protocolFeeRecipient;

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
        _ratio = 1e18;
        _protocolFeeRecipient = _msgSender();
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public pure returns (uint8) {
        return 18;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function virtualSupply() public view returns (uint256) {
        return _virtualSupply;
    }

    function ratio() public view returns (uint256) {
        return _ratio;
    }

    function balanceOf(address account) public view returns (uint256) {
        return _virtualBalances[account].mulWadUp(_ratio);
    }

    function transfer(address to, uint256 amount) public returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }

    function allowance(
        address owner,
        address spender
    ) public view returns (uint256) {
        uint256 virtualAllowance_ = _virtualAllowances[owner][spender];
        if (virtualAllowance_ > type(uint256).max / _ratio)
            return type(uint256).max;
        return virtualAllowance_.mulWadUp(_ratio);
    }

    function approve(address spender, uint256 amount) public returns (bool) {
        if (_isBlocked[spender]) revert UserNotAllowed(spender);
        address owner = _msgSender();
        _approve(owner, spender, amount);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public returns (bool) {
        address spender = _msgSender();
        if (_isBlocked[spender]) revert UserNotAllowed(spender);
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }

    function increaseAllowance(
        address spender,
        uint256 addedValue
    ) public returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, allowance(owner, spender) + addedValue);
        return true;
    }

    function decreaseAllowance(
        address spender,
        uint256 subtractedValue
    ) public returns (bool) {
        address owner = _msgSender();
        uint256 currentAllowance = allowance(owner, spender);
        require(
            currentAllowance >= subtractedValue,
            "ERC20: decreased allowance below zero"
        );
        unchecked {
            _approve(owner, spender, currentAllowance - subtractedValue);
        }

        return true;
    }

    function _transfer(address from, address to, uint256 amount) private {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        if (_isBlocked[to]) revert UserNotAllowed(to);

        uint256 virtualAmount = amount.divWadUp(_ratio);
        uint256 fromVirtualBalance = _virtualBalances[from];
        require(
            fromVirtualBalance >= virtualAmount,
            "ERC20: transfer amount exceeds balance"
        );
        unchecked {
            _virtualBalances[from] = fromVirtualBalance - virtualAmount;
            // Overflow not possible: the sum of all balances is capped by totalSupply, and the sum is preserved by
            // decrementing then incrementing.
            _virtualBalances[to] += virtualAmount;
        }

        emit Transfer(from, to, amount);
    }

    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: mint to the zero address");

        if (_isBlocked[account]) revert UserNotAllowed(account);

        _totalSupply += amount;
        uint256 virtualAmount = amount.divWadUp(_ratio);
        _virtualSupply += virtualAmount;
        unchecked {
            // Overflow not possible: balance + amount is at most totalSupply + amount, which is checked above.
            _virtualBalances[account] += virtualAmount;
        }
        emit Transfer(address(0), account, amount);
    }

    function _burn(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: burn from the zero address");

        uint256 accountVirtualBalance = _virtualBalances[account];
        uint256 virtualAmount = amount.divWadUp(_ratio);
        require(
            accountVirtualBalance >= virtualAmount,
            "ERC20: burn amount exceeds balance"
        );
        unchecked {
            _virtualBalances[account] = accountVirtualBalance - virtualAmount;
            // Overflow not possible: amount <= accountBalance <= totalSupply.
            _totalSupply -= amount;
            _virtualSupply -= virtualAmount;
        }

        emit Transfer(account, address(0), amount);
    }

    function _approve(address owner, address spender, uint256 amount) internal {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        uint256 virtualAmount = amount;
        if (amount != type(uint256).max) {
            virtualAmount = amount.divWadUp(_ratio);
        }
        _virtualAllowances[owner][spender] = virtualAmount;
        emit Approval(owner, spender, amount);
    }

    function _spendAllowance(
        address owner,
        address spender,
        uint256 amount
    ) internal {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(
                currentAllowance >= amount,
                "ERC20: insufficient allowance"
            );
            unchecked {
                _approve(owner, spender, currentAllowance - amount);
            }
        }
    }

    function _distributeFee(
        uint256 txCount,
        uint256 amount
    ) internal returns (uint256 lpAmount, uint256 protocolAmount) {
        protocolAmount = amount.mulWadUp(_protocolFee);
        lpAmount = amount - protocolAmount;
        _totalSupply += lpAmount;
        _ratio = _totalSupply.divWadUp(_virtualSupply);
        if (protocolAmount > 0) _mint(_protocolFeeRecipient, protocolAmount);

        if (lpAmount > 0) emit DistributeFee(txCount, lpAmount, protocolAmount);
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

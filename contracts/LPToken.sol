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

import {ILPToken} from "./interfaces/ILPToken.sol";
import {Users, FloatingPoint, Float} from "./Users.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {FixedPointMathLib} from "./libraries/FixedPointMath/src/FixedPointMathLib.sol";

contract LPToken is ILPToken, ERC20, Users {
    using FixedPointMathLib for uint256;
    using FloatingPoint for uint256;
    using FloatingPoint for Float;

    Float internal _totalTokens;
    Float internal _tokensPerShare;

    Float internal _protocolFee;
    address internal _protocolFeeRecipient;

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 protocolFee_, // 18 decimals
        address protocolFeeRecipient_,
        uint256 tokensPerShare_ // 18 decimals
    ) ERC20(name_, symbol_) {
        if (protocolFee_ > HALF) revert InvalidProtocolFee(protocolFee_);
        if (protocolFeeRecipient_ == address(0)) revert ZeroAddress();
        if (tokensPerShare_ == 0) revert ZeroTokensPerShare();
        _protocolFee = protocolFee_.fromWad();
        _protocolFeeRecipient = protocolFeeRecipient_;
        _tokensPerShare = tokensPerShare_.fromWad();
    }

    function totalTokens() public view returns (uint256) {
        return _totalTokens.toWad(); // Convert to 18 decimals
    }

    function tokensPerShare() public view returns (uint256) {
        return _tokensPerShare.toWad(); // Convert to 18 decimals
    }

    function tokensOf(address account) public view returns (uint256) {
        return balanceOf(account).fromWad().times(_tokensPerShare).toWad(); // Convert to 18 decimals
    }

    function approve(
        address spender,
        uint256 shares // 18 decimals
    ) public override returns (bool) {
        if (_isBlocked[spender]) revert UserNotAllowed(spender);
        return super.approve(spender, shares);
    }

    function transferFrom(
        address from,
        address to,
        uint256 shares // 18 decimals
    ) public override returns (bool) {
        address spender = _msgSender();
        if (_isBlocked[spender]) revert UserNotAllowed(spender);
        return super.transferFrom(from, to, shares);
    }

    function _transfer(
        address from,
        address to,
        uint256 shares // 18 decimals
    ) internal override {
        if (_isBlocked[to]) revert UserNotAllowed(to);
        return super._transfer(from, to, shares);
    }

    function _mint(
        address account,
        uint256 shares // 18 decimals
    ) internal override {
        if (_isBlocked[account]) revert UserNotAllowed(account);
        super._mint(account, shares);
        _totalTokens = totalSupply().fromWad().times(_tokensPerShare);
    }

    function _burn(address account, uint256 shares) internal override {
        super._burn(account, shares);
        _totalTokens = totalSupply().fromWad().times(_tokensPerShare);
    }

    function _mintTokens(address account, Float memory amount) internal {
        if (_isBlocked[account]) revert UserNotAllowed(account);
        _totalTokens = _totalTokens.plus(amount);
        uint256 shares = amount.divide(_tokensPerShare).toWad(); // Convert to 18 decimals
        super._mint(account, shares);
    }

    function _burnTokens(address account, Float memory amount) internal {
        _totalTokens = _totalTokens.minus(amount);
        uint256 shares = amount.divide(_tokensPerShare).toWad(); // Convert to 18 decimals
        super._burn(account, shares);
    }

    function _distributeTokens(Float memory amount) internal {
        _totalTokens = _totalTokens.plus(amount);
        _tokensPerShare = _totalTokens.divide(totalSupply().fromWad());
    }

    function _allocateShares(
        address recipient,
        uint256 shares // 18 decimals
    ) internal {
        super._mint(recipient, shares);
        _tokensPerShare = _totalTokens.divide(totalSupply().fromWad());
    }

    function protocolFee() public view returns (uint256) {
        return _protocolFee.toWad(); // Convert to 18 decimals
    }

    function protocolFeeRecipient() public view returns (address) {
        return _protocolFeeRecipient;
    }

    function setProtocolFee(
        uint256 fee // 18 decimals
    ) public onlyOwner {
        if (fee > HALF) revert InvalidProtocolFee(fee);
        _protocolFee = fee.fromWad();
    }

    function setProtocolFeeRecipient(address recipient) public onlyOwner {
        if (recipient == address(0)) revert ZeroAddress();
        if (_isBlocked[recipient]) revert UserNotAllowed(recipient);
        _protocolFeeRecipient = recipient;
    }
}

// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {Users} from "@cavalre/Users.sol";
import {ERC20, IERC20, IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {FixedPointMathLib} from "solady/utils/FixedPointMathLib.sol";

contract LPToken is ERC20, ReentrancyGuard, Ownable, Users {
    using FixedPointMathLib for uint256;

    uint256 private _protocolFee;
    address private _protocolFeeRecipient;

    uint256 private _ratio; // virtual -> real

    error InvalidProtocolFee(uint256 fee);

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _ratio = 1e18;
        _protocolFeeRecipient = _msgSender();
    }

    function protocolFee() public view returns (uint256) {
        return _protocolFee;
    }

    function protocolFeeRecipient() public view returns (address) {
        return _protocolFeeRecipient;
    }

    function setProtocolFee(uint256 fee) public nonReentrant onlyOwner {
        if (fee > HALF) revert InvalidProtocolFee(fee);
        _protocolFee = fee;
    }

    function setProtocolFeeRecipient(
        address recipient
    ) public nonReentrant onlyOwner {
        _protocolFeeRecipient = recipient;
        addUser(recipient, 0);
    }

    function ratio() internal view returns (uint256) {
        return _ratio;
    }

    function totalSupply() public view override returns (uint256) {
        return super.totalSupply().mulWadUp(_ratio);
    }

    function balanceOf(address account) public view override returns (uint256) {
        return super.balanceOf(account).mulWadUp(_ratio);
    }

    function transfer(
        address to,
        uint256 amount
    ) public override onlyAllowed returns (bool) {
        if (!isAllowed(to)) revert UserNotAllowed(to);
        amount = amount.divWadUp(_ratio);
        return super.transfer(to, amount);
    }

    function allowance(
        address owner,
        address spender
    ) public view override returns (uint256) {
        return super.allowance(owner, spender).mulWadUp(_ratio);
    }

    function approve(
        address spender,
        uint256 amount
    ) public override returns (bool) {
        amount = amount.divWadUp(_ratio);
        return super.approve(spender, amount);
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public override returns (bool) {
        if (!isAllowed(from)) revert UserNotAllowed(from);
        if (!isAllowed(to)) revert UserNotAllowed(to);
        amount = amount.divWadUp(_ratio);
        return super.transferFrom(from, to, amount);
    }

    function increaseAllowance(
        address spender,
        uint256 addedValue
    ) public override returns (bool) {
        addedValue = addedValue.divWadUp(_ratio);
        return super.increaseAllowance(spender, addedValue);
    }

    function decreaseAllowance(
        address spender,
        uint256 subtractedValue
    ) public override returns (bool) {
        subtractedValue = subtractedValue.divWadUp(_ratio);
        return super.decreaseAllowance(spender, subtractedValue);
    }

    function _distributeFee(uint256 amount) internal virtual {
        uint256 protocolAmount = amount.mulWadUp(_protocolFee);
        uint256 userAmount = amount - protocolAmount;
        _mint(_protocolFeeRecipient, protocolAmount);
        _ratio = (totalSupply() + userAmount).divWadUp(super.totalSupply());
    }
}

// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {Users, UserState, FixedPointMathLib} from "@cavalre/Users.sol";
import {ERC20, IERC20, IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract LPToken is ERC20, Ownable, Users {
    using FixedPointMathLib for uint256;

    uint256 private _protocolFee;
    address private _protocolFeeRecipient;

    uint256 private _totalSupply;
    uint256 private _ratio; // virtual -> real

    bool internal _tradingPaused;

    error InvalidProtocolFee(uint256 fee);

    error TradingPaused();

    error UserNotAllowed(address user_);

    modifier onlyAllowed() {
        if (_tradingPaused) revert TradingPaused();
        address user_ = _msgSender();
        if (
            _userIndex[user_] > 0 && !_userList[_userIndex[user_] - 1].isAllowed
        ) revert UserNotAllowed(user_);
        _;
    }

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

    function setProtocolFee(uint256 fee) public onlyOwner {
        if (fee > HALF) revert InvalidProtocolFee(fee);
        _protocolFee = fee;
    }

    function setProtocolFeeRecipient(address recipient) public onlyOwner {
        _protocolFeeRecipient = recipient;
        if (_userIndex[recipient] == 0) {
            _addUser(recipient, 0);
        }
        _userList[_userIndex[recipient] - 1].isAllowed = true;
    }

    function ratio() public view returns (uint256) {
        return _ratio;
    }

    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view override returns (uint256) {
        return super.balanceOf(account).mulWadUp(_ratio);
    }

    function transfer(
        address to,
        uint256 amount
    ) public override onlyAllowed returns (bool) {
        if (_userIndex[to] == 0) revert UserNotFound(to);
        if (!_userList[_userIndex[to] - 1].isAllowed) revert UserNotAllowed(to);
        amount = amount.divWadUp(_ratio);
        return super.transfer(to, amount);
    }

    function allowance(
        address owner,
        address spender
    ) public view override returns (uint256) {
        uint256 allowance_ = super.allowance(owner, spender);
        if (allowance_ > type(uint256).max / _ratio) return type(uint256).max;
        return allowance_.mulWadUp(_ratio);
    }

    function approve(
        address spender,
        uint256 amount
    ) public override returns (bool) {
        if (amount != type(uint256).max) {
            amount = amount.divWadUp(_ratio);
        }
        return super.approve(spender, amount);
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public override returns (bool) {
        if (_userIndex[from] == 0) revert UserNotFound(from);
        if (!_userList[_userIndex[from] - 1].isAllowed)
            revert UserNotAllowed(from);
        if (_userIndex[to] == 0) revert UserNotFound(to);
        if (!_userList[_userIndex[to] - 1].isAllowed) revert UserNotAllowed(to);
        amount = amount.divWadUp(_ratio);
        return super.transferFrom(from, to, amount);
    }

    function increaseAllowance(
        address spender,
        uint256 addedValue
    ) public override returns (bool) {
        address owner = _msgSender();
        return approve(spender, allowance(owner, spender) + addedValue);
    }

    function decreaseAllowance(
        address spender,
        uint256 subtractedValue
    ) public override returns (bool) {
        if (subtractedValue != type(uint256).max) {
            subtractedValue = subtractedValue.divWadUp(_ratio);
        }
        return super.decreaseAllowance(spender, subtractedValue);
    }

    function mint(address to, uint256 amount) internal onlyAllowed {
        _totalSupply += amount;
        amount = amount.divWadUp(_ratio);
        super._mint(to, amount);
    }

    function burn(address from, uint256 amount) internal {
        _totalSupply -= amount;
        amount = amount.divWadUp(_ratio);
        super._burn(from, amount);
    }

    function distributeFee(uint256 amount) internal {
        uint256 protocolAmount = amount.mulWadUp(_protocolFee);
        uint256 userAmount = amount - protocolAmount;
        mint(_protocolFeeRecipient, protocolAmount);
        _totalSupply += userAmount;
        _ratio = _totalSupply.divWadUp(super.totalSupply());
    }

    function pauseTrading() public onlyOwner {
        _tradingPaused = true;
    }

    function resumeTrading() public onlyOwner {
        _tradingPaused = false;
    }
}

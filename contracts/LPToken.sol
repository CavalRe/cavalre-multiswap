// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {ERC20, IERC20, IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {FixedPointMathLib} from "solady/utils/FixedPointMathLib.sol";

struct UserState {
    address user;
    bool isAllowed;
    uint256 discount;
}

contract LPToken is ERC20, ReentrancyGuard, Ownable {
    using FixedPointMathLib for uint256;

    uint256 internal constant ONE = 1e18;
    uint256 internal constant HALF = 5e17;

    mapping(address => UserState) internal _userState;
    address[] private _userAddress;
    mapping(address => uint256) private _userIndex;

    uint256 private _protocolFee;
    address private _protocolFeeRecipient;

    uint256 private _ratio; // virtual -> real

    modifier onlyAllowed() {
        address user = _msgSender();
        UserState memory state = _userState[user];
        if (!state.isAllowed) revert UserNotAllowed(user);
        _;
    }

    error InvalidDiscount(uint256 discount);

    error InvalidProtocolFee(uint256 fee);

    error InvalidUser(address user);

    error UserAlreadyAdded(address user);

    error UserNotAllowed(address user);

    error UserNotFound(address user);

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _ratio = 1e18;
        _protocolFeeRecipient = _msgSender();
        addUser(_msgSender(), 0);
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

    function addUser(
        address user,
        uint256 discount
    ) public nonReentrant onlyOwner {
        if (user == address(0)) revert InvalidUser(user);
        UserState memory state = _userState[user];
        if (state.user != user) {
            _userIndex[user] = _userAddress.length;
            _userAddress.push(user);
        }
        _userState[user] = UserState(user, true, discount);
    }

    function allowUser(address user) public nonReentrant onlyOwner {
        UserState memory state = _userState[user];
        if (state.user != user) revert UserNotFound(user);
        _userState[user].isAllowed = true;
    }

    function disallowUser(address user) public nonReentrant onlyOwner {
        UserState memory state = _userState[user];
        if (state.user != user) revert UserNotFound(user);
        _userState[user].isAllowed = false;
    }

    function isAllowed(address user) public view returns (bool) {
        UserState memory state = _userState[user];
        return state.isAllowed;
    }

    function allUsers() public view returns (address[] memory) {
        return _userAddress;
    }

    function allowedUsers() public view returns (address[] memory) {
        uint256 n = 0;
        for (uint256 i = 0; i < _userAddress.length; i++) {
            address user = _userAddress[i];
            if (_userState[user].isAllowed) n++;
        }
        address[] memory users = new address[](n);
        uint256 j = 0;
        for (uint256 i = 0; i < _userAddress.length; i++) {
            address user = _userAddress[i];
            if (_userState[user].isAllowed) {
                users[j] = user;
                j++;
            }
        }
        return users;
    }

    function setDiscount(
        address user,
        uint256 discount
    ) public nonReentrant onlyOwner {
        UserState memory state = _userState[user];
        if (state.user != user) revert UserNotFound(user);
        if (discount > ONE) revert InvalidDiscount(discount);
        _userState[user].discount = discount;
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

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal override {
        amount = amount.divWadUp(_ratio);
        super._transfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal override onlyAllowed {
        amount = amount.divWadUp(_ratio);
        super._mint(to, amount);
    }

    function _burn(address from, uint256 amount) internal override onlyAllowed {
        amount = amount.divWadUp(_ratio);
        super._burn(from, amount);
    }

    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) internal override {
        amount = amount.divWadUp(_ratio);
        super._approve(owner, spender, amount);
    }

    function _spendAllowance(
        address owner,
        address spender,
        uint256 amount
    ) internal override {
        amount = amount.divWadUp(_ratio);
        super._spendAllowance(owner, spender, amount);
    }
}

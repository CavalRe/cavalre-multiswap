// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {FixedPointMathLib} from "solady/utils/FixedPointMathLib.sol";

struct UserState {
    bool isAllowed;
    uint256 discount;
    address[] associates;
    uint256 lastBlock;
}

contract Users is Ownable {
    using FixedPointMathLib for uint256;

    uint256 internal constant ONE = 1e18;
    uint256 internal constant HALF = 5e17;

    UserState[] private _userList;
    mapping(address => uint256) internal _userIndex;

    error DuplicateUser(address user_);

    error InvalidDiscount(uint256 discount_);

    error InvalidUser(address user_);

    error OnlyOneTransaction(address user_);

    error UserAlreadyAdded(address user_);

    error UserNotAllowed(address user_);

    error UserNotFound(address user_);

    error ZeroAddress();

    modifier onlyAllowed() {
        address user_ = _msgSender();
        if (
            _userIndex[user_] == 0 ||
            !_userList[_userIndex[user_] - 1].isAllowed
        ) revert UserNotAllowed(user_);
        _;
    }

    // modifier onlyOnce() {
    //     address user_ = _msgSender();
    //     if (block.number == _userList[_userIndex[user_]].lastBlock)
    //         revert OnlyOneTransaction(user_);
    //     _userList[_userIndex[user_]].lastBlock = block.number;
    //     _;
    // }

    function users() public view returns (UserState[] memory) {
        return _userList;
    }

    function user(address user_) public view returns (UserState memory) {
        if (_userIndex[user_] == 0) revert UserNotFound(user_);
        return _userList[_userIndex[user_] - 1];
    }

    function addUser(address user_, uint256 discount_) public onlyOwner {
        if (user_ == address(0)) revert ZeroAddress();
        if (_userIndex[user_] > 0) revert DuplicateUser(user_);

        _userList.push();

        UserState storage userState_ = _userList[_userList.length - 1];
        userState_.isAllowed = true;
        userState_.discount = discount_;
        userState_.associates.push(user_);

        _userIndex[user_] = _userList.length;
    }

    function allowUser(address user_) public onlyOwner {
        if (_userIndex[user_] == 0) revert UserNotFound(user_);
        _userList[_userIndex[user_] - 1].isAllowed = true;
    }

    function disallowUser(address user_) public onlyOwner {
        if (_userIndex[user_] == 0) revert UserNotFound(user_);
        _userList[_userIndex[user_] - 1].isAllowed = false;
    }

    function isAllowed(address user_) public view returns (bool) {
        if (_userIndex[user_] == 0) return false;
        return _userList[_userIndex[user_] - 1].isAllowed;
    }

    function discount(address user_) public view returns (uint256) {
        if (_userIndex[user_] == 0) revert UserNotFound(user_);
        return _userList[_userIndex[user_] - 1].discount;
    }

    function setDiscount(address user_, uint256 discount_) public onlyOwner {
        if (_userIndex[user_] == 0) revert UserNotFound(user_);
        if (discount_ > ONE) revert InvalidDiscount(discount_);
        _userList[_userIndex[user_] - 1].discount = discount_;
    }

    function associates(address user) public view (address[] memory) {
        if (_userIndex[user_] == 0) revert UserNotFound(user_);
        return _userList[_userIndex[user]-1].associates;
    }
}

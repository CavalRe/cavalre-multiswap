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

    UserState[] internal _userList;
    mapping(address => uint256) internal _userIndex;

    error InvalidDiscount(uint256 discount_);

    error InvalidUser(address user_);

    error OnlyOneTransaction(address user_);

    error UserAlreadyAdded(address user_);

    error UserNotAllowed(address user_);

    error UserNotFound(address user_);

    error ZeroAddress();

    modifier onlyOnce() {
        address userAddress_ = _msgSender();
        UserState storage user_ = _userList[_userIndex[userAddress_] - 1];
        if (block.number == user_.lastBlock)
            revert OnlyOneTransaction(userAddress_);
        user_.lastBlock = block.number;
        _;
    }

    modifier onlyAllowed() {
        address user_ = _msgSender();
        if (
            _userIndex[user_] > 0 && !_userList[_userIndex[user_] - 1].isAllowed
        ) revert UserNotAllowed(user_);
        _;
    }

    function users() public view returns (UserState[] memory) {
        return _userList;
    }

    function user(address user_) public view returns (UserState memory) {
        if (_userIndex[user_] == 0) revert UserNotFound(user_);
        return _userList[_userIndex[user_] - 1];
    }

    function addUser(address user_, uint256 discount_) public onlyOwner {
        if (user_ == address(0)) revert ZeroAddress();
        if (_userIndex[user_] > 0) revert UserAlreadyAdded(user_);
        if (discount_ > ONE) revert InvalidDiscount(discount_);

        _userList.push();

        UserState storage userState_ = _userList[_userList.length - 1];
        userState_.isAllowed = true;
        userState_.discount = discount_;
        userState_.associates.push(user_);

        _userIndex[user_] = _userList.length;
    }

    function removeUser(address user_) public onlyOwner {
        if (_userIndex[user_] == 0) revert UserNotFound(user_);

        uint256 index_ = _userIndex[user_] - 1;
        uint256 lastIndex_ = _userList.length - 1;

        if (index_ != lastIndex_) {
            _userList[index_] = _userList[lastIndex_];
            _userIndex[_userList[lastIndex_].associates[0]] = index_ + 1;
        }
        _userList.pop();

        delete _userIndex[user_];
    }

    function setAllowed(address user_, bool isAllowed_) public onlyOwner {
        if (_userIndex[user_] == 0) revert UserNotFound(user_);
        _userList[_userIndex[user_] - 1].isAllowed = isAllowed_;
    }

    function setDiscount(address user_, uint256 discount_) public onlyOwner {
        if (_userIndex[user_] == 0) revert UserNotFound(user_);
        if (discount_ > ONE) revert InvalidDiscount(discount_);
        _userList[_userIndex[user_] - 1].discount = discount_;
    }

    function addAssociate(address user_, address associate_) public onlyOwner {
        if (_userIndex[user_] == 0) revert UserNotFound(user_);
        if (_userIndex[user_] == _userIndex[associate_])
            revert UserAlreadyAdded(associate_);

        _userIndex[associate_] = _userIndex[user_];
        _userList[_userIndex[user_] - 1].associates.push(associate_);
    }

    function removeAssociate(
        address user_,
        address associate_
    ) public onlyOwner {
        if (_userIndex[user_] == 0) revert UserNotFound(user_);
        if (_userIndex[associate_] == 0) revert UserNotFound(associate_);
        if (_userIndex[user_] != _userIndex[associate_])
            revert InvalidUser(associate_);

        uint256 index_ = _userIndex[user_] - 1;
        uint256 lastIndex_ = _userList[index_].associates.length - 1;

        if (index_ != lastIndex_) {
            for (uint256 i = 0; i < _userList[index_].associates.length; i++) {
                if (_userList[index_].associates[i] == associate_) {
                    _userList[index_].associates[i] = _userList[index_]
                        .associates[lastIndex_];
                    break;
                }
            }
        }
        _userList[index_].associates.pop();
        _userIndex[associate_] = 0;
    }
}

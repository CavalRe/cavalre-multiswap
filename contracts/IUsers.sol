// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

struct UserState {
    bool isAllowed;
    uint256 discount;
    address[] associates;
    uint256 lastBlock;
}

interface IUsers {
    error InvalidDiscount(uint256 discount_);

    error InvalidUser(address user_);

    error UserAlreadyAdded(address user_);

    error UserNotFound(address user_);

    error ZeroAddress();

    function users() external view returns (UserState[] memory);

    function user(address user_) external view returns (UserState memory);

    function addUser(address user_, uint256 discount_) external;

    function removeUser(address user_) external;

    function setDiscount(address user_, uint256 discount_) external;

    function addAssociate(address user_, address associate_) external;

    function removeAssociate(address associate_) external;
}

// SPDX-License-Identifier: Business Source License 1.1
pragma solidity 0.8.19;

interface IUsers {
    error InvalidDiscount(uint256 discount_);

    error ZeroAddress();

    function isAllowed(address user_) external view returns (bool);

    function discount(address user_) external view returns (uint256);

    function setDiscount(address user_, uint256 discount_) external;
}

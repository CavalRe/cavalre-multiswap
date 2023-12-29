// SPDX-License-Identifier: Business Source License 1.1
// Copyright (C) 2020-2023, CavalRe Inc. All rights reserved.
// See the file LICENSE.md for licensing terms.
pragma solidity 0.8.19;

import {IUsers} from "./interfaces/IUsers.sol";
import {Ownable2Step} from "@openzeppelin/contracts/access/Ownable2Step.sol";

import {Test} from "forge-std/Test.sol";

contract Users is IUsers, Ownable2Step, Test {
    // uint256 internal constant ONE = 1e27;
    // uint256 internal constant TO_INTERNAL = 1e9;
    // uint256 internal constant HALF = 5e26;
    uint8 internal constant INTERNAL_DECIMALS = 27;
    uint256 internal constant ONE = 10 ** INTERNAL_DECIMALS;
    uint256 internal constant TO_INTERNAL = 10 ** (INTERNAL_DECIMALS - 18);
    uint256 internal constant HALF = 5 * 10 ** (INTERNAL_DECIMALS - 1);

    mapping(address => bool) internal _isBlocked;
    mapping(address => uint256) internal _discount; // Internal decimals

    function isAllowed(address user_) public view returns (bool) {
        return !_isBlocked[user_];
    }

    function discount(address user_) public view returns (uint256) {
        return _discount[user_];
    }

    function setDiscount(
        address user_,
        uint256 discount_ // 18 decimals
    ) public onlyOwner {
        if (_isBlocked[user_]) revert UserNotAllowed(user_);
        if (user_ == address(0)) revert ZeroAddress();
        discount_ *= TO_INTERNAL; // Convert to internal decimals
        emit log_named_uint("discount", discount_);
        if (discount_ > ONE) revert InvalidDiscount(discount_);
        _discount[user_] = discount_;
    }
}

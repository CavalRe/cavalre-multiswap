// SPDX-License-Identifier: Business Source License 1.1
// Copyright (C) 2020-2023, CavalRe Inc. All rights reserved.
// See the file LICENSE.md for licensing terms.
pragma solidity 0.8.19;

import {IUsers} from "./interfaces/IUsers.sol";
import {Ownable2Step} from "@openzeppelin/contracts/access/Ownable2Step.sol";
import {FloatingPoint, UFloat} from "./libraries/FloatingPoint/src/FloatingPoint.sol";

contract Users is IUsers, Ownable2Step {
    using FloatingPoint for uint256;
    using FloatingPoint for UFloat;
    uint256 internal constant ONE = 10 ** 18;
    uint256 internal constant HALF = 5 * 10 ** 17;
    UFloat internal ZERO_FLOAT = UFloat(0,0);
    UFloat internal ONE_FLOAT = UFloat(1,0).normalize();

    mapping(address => bool) internal _isBlocked;
    mapping(address => UFloat) internal _discount; // 18 decimals

    function isAllowed(address user_) public view returns (bool) {
        return !_isBlocked[user_];
    }

    function discount(address user_) public view returns (uint256) {
        return _discount[user_].toUInt();
    }

    function setDiscount(
        address user_,
        uint256 discount_ // 18 decimals
    ) public onlyOwner {
        if (_isBlocked[user_]) revert UserNotAllowed(user_);
        if (user_ == address(0)) revert ZeroAddress();
        if (discount_ > ONE) revert InvalidDiscount(discount_);
        _discount[user_] = discount_.toUFloat();
    }
}

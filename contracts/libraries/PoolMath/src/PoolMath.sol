// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {FloatingPoint as FP, Float} from "../../FloatingPoint/src/FloatingPoint.sol";

library PoolMath {
    using FP for uint256;
    using FP for Float;

    // function scaledValueFlow(
    //     Float memory scale,
    //     Float memory balance,
    //     int256 amount
    // ) internal pure returns (Float memory) {
    //     if (amount == 0) {
    //         return Float(10 ** FP.SIGNIFICANT_DIGITS, -int256(FP.SIGNIFICANT_DIGITS)); // ONE = Float(1,0).normalize()
    //     }
    //     if (amount > 0) {
    //         return scale.times(uint256(amount)).divide(uint256(int256(balance) + amount));
    //     }
    //     return scale.mul(amount.toUint256()).div(balance);
    // }
}
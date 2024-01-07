// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {FloatingPoint as FP, UFloat, Float} from "../../FloatingPoint/src/FloatingPoint.sol";

library PoolMath {
    using FP for uint256;
    using FP for UFloat;

    // function scaledValueFlow(
    //     UFloat memory scale,
    //     UFloat memory balance,
    //     Float memory amount
    // ) internal pure returns (UFloat memory) {
    //     UFloat memory denom;
    //     if (amount.mantissa == 0) {
    //         return UFloat(0, 0);
    //     } else {
    //         denom = balance.toFloat().plus(amount);
    //     }
    //     if (amount > 0) {
    //         return scale.times(amount).add(amount.toUFloat());
    //     } else {
    //         return scale.mul(balance).sub((-amount).toUFloat());
    //     }
    // }
}
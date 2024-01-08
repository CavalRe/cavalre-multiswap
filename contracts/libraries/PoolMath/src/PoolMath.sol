// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {FloatingPoint as FP, UFloat, Float} from "../../FloatingPoint/src/FloatingPoint.sol";

library PoolMath {
    using FP for uint256;
    using FP for int256;
    using FP for UFloat;
    using FP for Float;

    function scaledAssetValueIn(
        UFloat memory scale,
        UFloat memory balance,
        UFloat memory amount
    ) internal pure returns (UFloat memory) {
        if (amount.mantissa == 0) return UFloat(0, 0);
        (balance, amount) = balance.align(amount);
        if (amount.mantissa / balance.mantissa >= 10 ** FP.SIGNIFICANT_DIGITS) return scale;

        UFloat memory denom = UFloat(balance.mantissa + amount.mantissa, balance.exponent).normalize();
        return scale.times(amount).divide(denom);
    }
}
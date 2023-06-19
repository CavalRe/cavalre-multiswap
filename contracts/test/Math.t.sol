// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "forge-std/Test.sol";
import {FixedPointMathLib} from "solady/utils/FixedPointMathLib.sol";

contract TestMath is Test {
    using FixedPointMathLib for uint256;
    using FixedPointMathLib for int256;

    uint256 internal constant ONE = 1e18;

    function testSquareRoot() public {
        uint256 x = 16e18;
        uint256 y = x.sqrt();
        uint256 HALF = 5e17;
        assertEq(y, 4e9, "sqrt(16e18) = 4e9");
        assertApproxEqRel(
            int256(x).powWad(int256(HALF)),
            int256(4e18),
            1e6,
            "16e18^(1/2) = 4e18"
        );
    }
}

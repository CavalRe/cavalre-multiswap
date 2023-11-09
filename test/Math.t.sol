// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "../contracts/Pool.sol";
import "forge-std/Test.sol";
import {FixedPointMathLib} from "solady/src/utils/FixedPointMathLib.sol";

contract TestPool is Pool {
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 tau_
    ) Pool(name_, symbol_, tau_, address(1234)) {}

    function geometricMean(
        uint256 newValue,
        uint256 lastValue,
        uint256 lastMean,
        uint256 delta
    ) public view returns (uint256) {
        return super._geometricMean(newValue, lastValue, lastMean, delta);
    }
}

contract TestMath is Test {
    using FixedPointMathLib for uint256;
    using FixedPointMathLib for int256;

    uint256 internal constant ONE = 1e18;
    uint256 internal constant HALF = 5e17;

    uint256 private tau = 1e16;

    TestPool private pool;

    function setUp() public {
        pool = new TestPool("Pool", "P", tau);
    }

    function testSquareRoot() public {
        uint256 x = 16e18;
        uint256 y = x.sqrt();
        assertEq(y, 4e9, "sqrt(16e18) = 4e9");
        assertApproxEqRel(
            uint256(int256(x).powWad(int256(HALF))),
            4e18,
            1e6,
            "16e18^(1/2) = 4e18"
        );
    }

    function testGeometricMeanFuzz(uint256 amount) public {
        vm.assume(amount > 0 && amount < 1000000000000000 * ONE);

        assertEq(pool.geometricMean(0, 0, amount, 0), amount, "delta = 0");

        assertEq(
            pool.geometricMean(amount, amount, amount, 1),
            amount,
            "delta = 1"
        );
    }

    function testGeometricMeanVerbose() public {
        uint256 lastMean = 12345678 * ONE;
        uint256 lastValue = 2 * lastMean;
        uint256 newValue = 2 * lastValue;

        emit log_named_uint("lastMean", lastMean);
        emit log_named_uint("lastValue", lastValue);
        emit log_named_uint("newValue", newValue);
        emit log_named_uint("tau", tau);
        emit log_named_uint(
            "mean (delta=0)",
            pool.geometricMean(newValue, lastValue, lastMean, 0)
        );
        emit log_named_uint(
            "mean (delta=1)",
            pool.geometricMean(newValue, lastValue, lastMean, 1)
        );
        emit log_named_uint(
            "mean (delta=10)",
            pool.geometricMean(newValue, lastValue, lastMean, 10)
        );
    }
}

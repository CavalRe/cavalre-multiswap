// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

// import {Pool, FixedPointMathLib} from "../contracts/Pool.sol";
import {FloatingPoint as FP, Float} from "../contracts/libraries/FloatingPoint/src/FloatingPoint.sol";

import {Test} from "forge-std/Test.sol";

contract TestMath is Test {
    using FP for uint256;
    using FP for int256;

    Float internal ZERO;
    Float internal HALF;
    Float internal ONE;
    Float internal TWO;

    Float internal ZERO_unnormalized;
    Float internal HALF_unnormalized;
    Float internal ONE_unnormalized;
    Float internal TWO_unnormalized;

    uint256 internal mantissaZERO;
    uint256 internal exponentZERO;
    uint256 internal mantissaHALF;
    uint256 internal exponentHALF;
    uint256 internal mantissaONE;
    uint256 internal exponentONE;
    uint256 internal mantissaTWO;
    uint256 internal exponentTWO;

    uint256 internal mantissaZERO_unnormalized;
    uint256 internal exponentZERO_unnormalized;
    uint256 internal mantissaHALF_unnormalized;
    uint256 internal exponentHALF_unnormalized;
    uint256 internal mantissaONE_unnormalized;
    uint256 internal exponentONE_unnormalized;
    uint256 internal mantissaTWO_unnormalized;
    uint256 internal exponentTWO_unnormalized;

    // using FixedPointMathLib for uint256;
    // using FixedPointMathLib for int256;

    // uint256 internal ONE = uint256(1).encode(int256(0).bias()).normalize();
    // uint256 internal TWO = uint256(2).encode(int256(0).bias()).normalize();

    function setUp() public {
        ZERO = FP.normalize(Float(0, FP.bias(0)));
        HALF = FP.normalize(Float(1, FP.bias(-1)));
        ONE = FP.normalize(Float(1, FP.bias(0)));
        TWO = FP.normalize(Float(2, FP.bias(0)));

        ZERO_unnormalized = Float(0, FP.bias(0));
        HALF_unnormalized = Float(1, FP.bias(-1));
        ONE_unnormalized = Float(1, FP.bias(0));
        TWO_unnormalized = Float(2, FP.bias(0));

        mantissaZERO = ZERO.mantissa;
        exponentZERO = ZERO.exponent;
        mantissaHALF = HALF.mantissa;
        exponentHALF = HALF.exponent;
        mantissaONE = ONE.mantissa;
        exponentONE = ONE.exponent;
        mantissaTWO = TWO.mantissa;
        exponentTWO = TWO.exponent;

        mantissaZERO_unnormalized = ZERO_unnormalized.mantissa;
        exponentZERO_unnormalized = ZERO_unnormalized.exponent;
        mantissaHALF_unnormalized = HALF_unnormalized.mantissa;
        exponentHALF_unnormalized = HALF_unnormalized.exponent;
        mantissaONE_unnormalized = ONE_unnormalized.mantissa;
        exponentONE_unnormalized = ONE_unnormalized.exponent;
        mantissaTWO_unnormalized = TWO_unnormalized.mantissa;
        exponentTWO_unnormalized = TWO_unnormalized.exponent;
    }

    function testGasNormalizeParts() public pure {
        FP.normalize(1, FP.bias(0));
    }

    function testGasNormalizeStruct() public view {
        FP.normalize(ONE_unnormalized);
    }

    function testGasAlignParts() public view {
        FP.alignExponents(mantissaONE, exponentONE, mantissaTWO_unnormalized, exponentTWO_unnormalized);
    }

    function testGasAlignStruct() public view {
        FP.alignExponents(ONE, TWO_unnormalized);
    }

    function testGasAddParts() public view {
        FP.add(ONE.mantissa, ONE.exponent, TWO.mantissa, TWO.exponent);
    }

    function testGasAddStruct() public view {
        // FP.add(ONE.mantissa, ONE.exponent, TWO.mantissa, TWO.exponent);
        FP.add(ONE, TWO);
    }

    function testGasSubParts() public view {
        FP.subtract(ONE.mantissa, ONE.exponent, TWO.mantissa, TWO.exponent);
    }

    function testGasSubStruct() public view {
        FP.subtract(ONE, TWO);
    }

    function testGasMulParts() public view {
        FP.multiply(ONE.mantissa, ONE.exponent, TWO.mantissa, TWO.exponent);
    }

    function testGasMulStruct() public view {
        FP.multiply(ONE, TWO);
    }

    function testGasDivParts() public view {
        FP.divide(ONE.mantissa, ONE.exponent, TWO.mantissa, TWO.exponent);
    }

    function testGasDivStruct() public view {
        FP.divide(ONE, TWO);
    }

    function testAlign() public {
        uint256 exponent;
        (mantissaONE, mantissaTWO_unnormalized, exponent) = FP.alignExponents(
            mantissaONE,
            exponentONE,
            mantissaTWO_unnormalized,
            exponentTWO_unnormalized
        );
        (ONE, TWO_unnormalized) = FP.alignExponents(ONE, TWO_unnormalized);
        assertEq(mantissaONE, ONE.mantissa, "mantissa");
        assertEq(exponentONE, ONE.exponent, "exponent");
        assertEq(mantissaTWO_unnormalized, TWO_unnormalized.mantissa, "mantissa");
        assertEq(exponentTWO_unnormalized, TWO_unnormalized.exponent, "exponent");
        if (failed) {
            emit log_named_uint("mantissaONE", mantissaONE);
            emit log_named_uint("ONE.mantissa", ONE.mantissa);
            emit log_named_uint("exponentONE", exponentONE);
            emit log_named_uint("ONE.exponent", ONE.exponent);
            emit log_named_uint("mantissaTWO_unnormalized", mantissaTWO_unnormalized);
            emit log_named_uint("TWO_unnormalized.mantissa", TWO_unnormalized.mantissa);
            emit log_named_uint("exponentTWO_unnormalized", exponentTWO_unnormalized);
            emit log_named_uint("TWO_unnormalized.exponent", TWO_unnormalized.exponent);
        }
    }

    function testONE() public {
        uint256 mantissa;
        uint256 exponent;
        (mantissa, exponent) = FP.normalize(1, FP.bias(0));
        assertEq(mantissa, 576460752303423488, "mantissa");
        assertEq(exponent, 68, "exponent");
        if (failed) {
            emit log_named_uint("ONE.mantissa", mantissa);
            emit log_named_uint("ONE.exponent", exponent);
            emit log_named_uint("EXPONENT_BIAS", FP.EXPONENT_BIAS);
        }
    }

    // function testEncode() public {
    //     uint256 x = FP.encode(1, 1);
    //     uint256 m;
    //     uint256 e;
    //     (m, e) = FP.decode(x);
    //     assertEq(
    //         x,
    //         0x0000000000000000000000000000000000000000000000000000000000000081,
    //         "encode"
    //     );
    //     assertEq(m, 1, "mantissa");
    //     assertEq(e, 1, "exponent");
    // }

    // uint256 private protocolFee = 5e17;
    // address private multisigAddress = vm.envAddress("MULTISIG_ADDRESS");
    // uint256 private tokensPerShare = 1e18;
    // uint256 private tau = 1e16;

    // TestPool private pool;

    // function setUp() public {
    //     pool = new TestPool(
    //         "Pool",
    //         "P",
    //         protocolFee,
    //         multisigAddress,
    //         tokensPerShare,
    //         tau
    //     );
    // }

    // function testSquareRoot() public {
    //     uint256 x = 16e18;
    //     uint256 y = x.sqrt();
    //     assertEq(y, 4e9, "sqrt(16e18) = 4e9");
    //     assertApproxEqRel(
    //         uint256(int256(x).powWad(int256(HALF))),
    //         4e18,
    //         1e6,
    //         "16e18^(1/2) = 4e18"
    //     );
    // }

    // function testGeometricMeanFuzz(uint256 amount) public {
    //     vm.assume(amount > 0 && amount < 1000000000000000 * ONE);

    //     assertEq(pool.geometricMean(0, 0, amount, 0), amount, "delta = 0");

    //     assertEq(
    //         pool.geometricMean(amount, amount, amount, 1),
    //         amount,
    //         "delta = 1"
    //     );
    // }

    // function testGeometricMeanVerbose() public {
    //     uint256 lastMean = 12345678 * ONE;
    //     uint256 lastValue = 2 * lastMean;
    //     uint256 newValue = 2 * lastValue;

    //     emit log_named_uint("lastMean", lastMean);
    //     emit log_named_uint("lastValue", lastValue);
    //     emit log_named_uint("newValue", newValue);
    //     emit log_named_uint("tau", tau);
    //     emit log_named_uint(
    //         "mean (delta=0)",
    //         pool.geometricMean(newValue, lastValue, lastMean, 0)
    //     );
    //     emit log_named_uint(
    //         "mean (delta=1)",
    //         pool.geometricMean(newValue, lastValue, lastMean, 1)
    //     );
    //     emit log_named_uint(
    //         "mean (delta=10)",
    //         pool.geometricMean(newValue, lastValue, lastMean, 10)
    //     );
    // }
}

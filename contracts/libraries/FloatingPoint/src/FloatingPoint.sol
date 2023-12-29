// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

struct Float {
    uint256 mantissa;
    uint256 exponent; // Biased
}

library FloatingPoint {
    uint256 constant MANTISSA_BITS = 60;
    uint256 constant EXPONENT_BITS = 8;
    uint256 constant EXPONENT_MASK = (1 << EXPONENT_BITS) - 1;
    uint256 constant EXPONENT_BIAS = (1 << (EXPONENT_BITS - 1)) - 1;

    // uint256 constant ONE = 73786976294838206468;
    // uint256 constant TWO = 73786976294838206469;

    function bias(
        int256 exponent // Unbiased
    ) internal pure returns (uint256) {
        return uint256(exponent + int256(EXPONENT_BIAS));
    }

    function unbias(
        uint256 exponent // Biased
    ) internal pure returns (int256) {
        return int256(exponent) - int256(EXPONENT_BIAS);
    }

    // Normalization function for mantissa bits
    function normalize(
        uint256 mantissa,
        uint256 exponent // Biased
    ) internal pure returns (uint, uint) {
        if (mantissa == 0) return (0, 0);
        while (mantissa >= (1 << MANTISSA_BITS)) {
            mantissa >>= 1;
            exponent++;
        }
        while (mantissa < (1 << (MANTISSA_BITS - 1))) {
            mantissa <<= 1;
            exponent--; // Will revert on underflow
        }
        if (exponent > EXPONENT_MASK)
            revert("FloatingPoint: exponent overflow");
        return (mantissa, exponent);
    }

    function normalize(Float memory a) internal pure returns (Float memory) {
        // if (a.mantissa == 0) return Float(0, 0);
        // while (a.mantissa >= (1 << MANTISSA_BITS)) {
        //     a.mantissa >>= 1;
        //     a.exponent++;
        // }
        // while (a.mantissa < (1 << (MANTISSA_BITS - 1))) {
        //     a.mantissa <<= 1;
        //     a.exponent--; // Will revert on underflow
        // }
        // if (a.exponent > EXPONENT_MASK)
        //     revert("FloatingPoint: exponent overflow");
        // return a;
        uint256 mantissa;
        uint256 exponent;
        (mantissa, exponent) = normalize(a.mantissa, a.exponent);
        return Float(mantissa, exponent);
    }

    // function normalize(uint256 a) internal pure returns (uint256) {
    //     (uint256 mantissa, uint256 exponent) = decode(a);
    //     (mantissa, exponent) = normalize(mantissa, exponent);
    //     return encode(mantissa, exponent);
    // }

    // function decode(
    //     uint256 fpNumber
    // ) internal pure returns (uint256 mantissa, uint256 biasedExponent) {
    //     mantissa = fpNumber >> EXPONENT_BITS;
    //     biasedExponent = fpNumber & EXPONENT_MASK;
    // }

    // function encode(
    //     uint256 mantissa,
    //     uint256 exponent // Biased
    // ) internal pure returns (uint256) {
    //     (mantissa, exponent) = normalize(mantissa, exponent);
    //     if (exponent > EXPONENT_MASK)
    //         revert("FloatingPoint: exponent overflow");
    //     return (mantissa << EXPONENT_BITS) | exponent;
    // }

    // // Most significant bit
    // function msb(uint256 value) internal pure returns (uint256) {
    //     if (value == 0) {
    //         return 0;
    //     }

    //     uint256 msb_ = 0;
    //     if (value >= 1 << 128) {
    //         msb_ += 128;
    //         value >>= 128;
    //     }
    //     if (value >= 1 << 64) {
    //         msb_ += 64;
    //         value >>= 64;
    //     }
    //     if (value >= 1 << 32) {
    //         msb_ += 32;
    //         value >>= 32;
    //     }
    //     if (value >= 1 << 16) {
    //         msb_ += 16;
    //         value >>= 16;
    //     }
    //     if (value >= 1 << 8) {
    //         msb_ += 8;
    //         value >>= 8;
    //     }
    //     if (value >= 1 << 4) {
    //         msb_ += 4;
    //         value >>= 4;
    //     }
    //     if (value >= 1 << 2) {
    //         msb_ += 2;
    //         value >>= 2;
    //     }
    //     if (value >= 1 << 1) {
    //         msb_ += 1;
    //     }

    //     return msb_;
    // }

    function alignExponents(
        uint256 mantissaA,
        uint256 exponentA, // Biased
        uint256 mantissaB,
        uint256 exponentB // Biased
    ) internal pure returns (uint256, uint256, uint256) {
        if (exponentA == exponentB) {
            return (mantissaA, mantissaB, exponentA);
        } else if (exponentA > exponentB) {
            mantissaB >>= uint256(exponentA - exponentB);
            return (mantissaA, mantissaB, exponentA);
        } else {
            mantissaA >>= uint256(exponentB - exponentA);
            return (mantissaA, mantissaB, exponentB);
        }
    }

    function alignExponents(
        Float memory a,
        Float memory b
    ) internal pure returns (Float memory, Float memory) {
        if (a.exponent == b.exponent) return (a, b);
        if (a.exponent > b.exponent) {
            b.mantissa >>= uint256(a.exponent - b.exponent);
            b.exponent = a.exponent;
        } else if (a.exponent < b.exponent) {
            a.mantissa >>= uint256(b.exponent - a.exponent);
            a.exponent = b.exponent;
        }
        return (a, b);
        // uint256 mantissaA;
        // uint256 mantissaB;
        // uint256 exponent;
        // (mantissaA, mantissaB, exponent) = alignExponents(
        //     a.mantissa,
        //     a.exponent,
        //     b.mantissa,
        //     b.exponent
        // );
        // return (Float(mantissaA, exponent), Float(mantissaB, exponent));
    }

    // function alignExponents(
    //     uint256 a,
    //     uint256 b
    // ) internal pure returns (uint256, uint256) {
    //     (uint256 mantissaA, uint256 exponent) = decode(a);
    //     (uint256 mantissaB, uint256 exponentB) = decode(b);

    //     (mantissaA, mantissaB, exponent) = alignExponents(
    //         mantissaA,
    //         exponent,
    //         mantissaB,
    //         exponentB
    //     );
    //     return (encode(mantissaA, exponent), encode(mantissaB, exponent));
    // }

    function equal(
        uint256 mantissaA,
        uint256 exponentA, // Biased
        uint256 mantissaB,
        uint256 exponentB // Biased
    ) internal pure returns (bool) {
        if (exponentA == exponentB) return mantissaA == mantissaB;
        (mantissaA, mantissaB, exponentA) = alignExponents(
            mantissaA,
            exponentA,
            mantissaB,
            exponentB
        );

        return mantissaA == mantissaB;
    }

    // function equal(uint256 a, uint256 b) internal pure returns (bool) {
    //     if (a == b) return true;
    //     (uint256 mantissaA, uint256 exponent) = decode(a);
    //     (uint256 mantissaB, uint256 exponentB) = decode(b);

    //     (mantissaA, mantissaB, exponent) = alignExponents(
    //         mantissaA,
    //         exponent,
    //         mantissaB,
    //         exponentB
    //     );

    //     return mantissaA == mantissaB;
    // }

    function add(
        uint256 mantissa,
        uint256 exponent, // Biased
        uint256 mantissaB,
        uint256 exponentB // Biased
    ) internal pure returns (uint256, uint256) {
        // Align exponents
        (mantissa, mantissaB, exponent) = alignExponents(
            mantissa,
            exponent,
            mantissaB,
            exponentB
        );

        return normalize(mantissa + mantissaB, exponent);
    }

    function add(
        Float memory a,
        Float memory b
    ) internal pure returns (Float memory) {
        (a, b) = alignExponents(a, b);
        return normalize(Float(a.mantissa + b.mantissa, a.exponent));
        // uint256 mantissa;
        // uint256 exponent;
        // (mantissa, exponent) = add(
        //     a.mantissa,
        //     a.exponent,
        //     b.mantissa,
        //     b.exponent
        // );

        // // Encode and return the result
        // return Float(mantissa, exponent);
    }

    // function add(uint256 a, uint256 b) internal pure returns (uint256) {
    //     (
    //         uint256 mantissa,
    //         uint256 exponent // Biased
    //     ) = decode(a);
    //     (
    //         uint256 mantissaB,
    //         uint256 exponentB // Biased
    //     ) = decode(b);

    //     (mantissa, exponent) = add(mantissa, exponent, mantissaB, exponentB);

    //     // Encode and return the result
    //     return encode(mantissa, exponent);
    // }

    function subtract(
        uint256 mantissa,
        uint256 exponent, // Biased
        uint256 mantissaB,
        uint256 exponentB // Biased
    ) internal pure returns (uint256, uint256) {
        // Align exponents
        (mantissa, mantissaB, exponent) = alignExponents(
            mantissa,
            exponent,
            mantissaB,
            exponentB
        );

        return normalize(mantissa - mantissaB, exponent);
    }

    function subtract(
        Float memory a,
        Float memory b
    ) internal pure returns (Float memory) {
        uint256 mantissa;
        uint256 exponent;
        (mantissa, exponent) = subtract(
            a.mantissa,
            a.exponent,
            b.mantissa,
            b.exponent
        );

        // Encode and return the result
        return Float(mantissa, exponent);
    }

    // function subtract(uint256 a, uint256 b) internal pure returns (uint256) {
    //     (uint256 mantissaA, uint256 exponentA) = decode(a);
    //     (uint256 mantissaB, uint256 exponentB) = decode(b);

    //     (mantissaA, exponentA) = subtract(
    //         mantissaA,
    //         exponentA,
    //         mantissaB,
    //         exponentB
    //     );

    //     // Encode and return the result
    //     return encode(mantissaA, exponentA);
    // }

    function multiply(
        uint256 mantissa,
        uint256 exponent, // Biased
        uint256 mantissaB,
        uint256 exponentB // Biased
    ) internal pure returns (uint256, uint256) {
        (mantissa, exponent) = normalize(mantissa, exponent);
        (mantissaB, exponentB) = normalize(mantissaB, exponentB);
        // Normalize result
        return
            normalize(
                (mantissa * mantissaB) >> MANTISSA_BITS,
                MANTISSA_BITS + exponent + exponentB - EXPONENT_BIAS
            );
    }

    function multiply(
        Float memory a,
        Float memory b
    ) internal pure returns (Float memory) {
        uint256 mantissa;
        uint256 exponent;
        (mantissa, exponent) = multiply(
            a.mantissa,
            a.exponent,
            b.mantissa,
            b.exponent
        );

        // Encode and return the result
        return Float(mantissa, exponent);
    }

    // function multiply(uint256 a, uint256 b) internal pure returns (uint256) {
    //     (
    //         uint256 mantissa,
    //         uint256 exponent // Biased
    //     ) = decode(a);
    //     (
    //         uint256 mantissaB,
    //         uint256 exponentB // Biased
    //     ) = decode(b);

    //     (mantissa, exponent) = multiply(
    //         mantissa,
    //         exponent,
    //         mantissaB,
    //         exponentB
    //     );

    //     // Encode and return the result
    //     return encode(mantissa, exponent);
    // }

    function divide(
        uint256 mantissaA,
        uint256 exponentA, // Biased
        uint256 mantissaB,
        uint256 exponentB // Biased
    )
        internal
        pure
        returns (
            // ) internal pure returns (uint256, uint256) {
            uint256,
            uint256
        )
    {
        (mantissaA, exponentA) = normalize(mantissaA, exponentA);
        (mantissaB, exponentB) = normalize(mantissaB, exponentB);
        // Normalize result
        return
            normalize(
                (mantissaA << MANTISSA_BITS) / mantissaB,
                EXPONENT_BIAS + exponentA - exponentB - MANTISSA_BITS
            );
    }

    function divide(
        Float memory a,
        Float memory b
    ) internal pure returns (Float memory) {
        uint256 mantissa;
        uint256 exponent;
        (mantissa, exponent) = divide(
            a.mantissa,
            a.exponent,
            b.mantissa,
            b.exponent
        );

        // Encode and return the result
        return Float(mantissa, exponent);
    }

    // function divide(uint256 a, uint256 b) internal pure returns (uint256) {
    // function divide(uint256 a, uint256 b) internal pure returns (uint256) {
    //     (
    //         uint256 mantissa,
    //         uint256 exponent // Biased
    //     ) = decode(a);
    //     (
    //         uint256 mantissaB,
    //         uint256 exponentB // Biased
    //     ) = decode(b);

    //     (mantissa, exponent) = divide(mantissa, exponent, mantissaB, exponentB);

    //     // Encode and return the result
    //     return encode(mantissa, exponent);
    // }

    function mulDiv(
        uint256 mantissaA,
        uint256 exponentA, // Biased
        uint256 mantissaB,
        uint256 exponentB, // Biased
        uint256 mantissaC,
        uint256 exponentC // Biased
    ) internal pure returns (uint256, uint256) {
        // Normalize result
        return
            normalize(
                (((mantissaA * mantissaB) << MANTISSA_BITS) / mantissaC) >>
                    MANTISSA_BITS,
                exponentA + exponentB - exponentC
            );
    }

    // function mulDiv(
    //     uint256 a,
    //     uint256 b,
    //     uint256 c
    // ) internal pure returns (uint256) {
    //     (
    //         uint256 mantissa,
    //         uint256 exponent // Biased
    //     ) = decode(a);
    //     (
    //         uint256 mantissaB,
    //         uint256 exponentB // Biased
    //     ) = decode(b);
    //     (
    //         uint256 mantissaC,
    //         uint256 exponentC // Biased
    //     ) = decode(c);

    //     (mantissa, exponent) = mulDiv(
    //         mantissa,
    //         exponent,
    //         mantissaB,
    //         exponentB,
    //         mantissaC,
    //         exponentC
    //     );

    //     // Encode and return the result
    //     return encode(mantissa, exponent);
    // }

    function mulDivAdd(
        uint256 mantissaA,
        uint256 exponentA, // Biased
        uint256 mantissaB,
        uint256 exponentB, // Biased
        uint256 mantissaDB,
        uint256 exponentDB // Biased
    ) internal pure returns (uint256, uint256) {
        (mantissaB, mantissaDB, exponentB) = alignExponents(
            mantissaB,
            exponentB,
            mantissaDB,
            exponentDB
        );
        // Normalize result
        return
            normalize(
                (((mantissaA * mantissaDB) << MANTISSA_BITS) /
                    (mantissaB + mantissaDB)) >> MANTISSA_BITS,
                exponentA
            );
    }

    // function mulDivAdd(
    //     uint256 a,
    //     uint256 b,
    //     uint256 db
    // ) internal pure returns (uint256) {
    //     (
    //         uint256 mantissa,
    //         uint256 exponent // Biased
    //     ) = decode(a);
    //     (
    //         uint256 mantissaB,
    //         uint256 exponentB // Biased
    //     ) = decode(b);
    //     (
    //         uint256 mantissaDB,
    //         uint256 exponentDB // Biased
    //     ) = decode(db);

    //     (mantissa, exponent) = mulDivAdd(
    //         mantissa,
    //         exponent,
    //         mantissaB,
    //         exponentB,
    //         mantissaDB,
    //         exponentDB
    //     );

    //     // Encode and return the result
    //     return encode(mantissa, exponent);
    // }

    function divMulSub(
        uint256 mantissaA,
        uint256 exponentA, // Biased
        uint256 mantissaB,
        uint256 exponentB, // Biased
        uint256 mantissaDB,
        uint256 exponentDB // Biased
    ) internal pure returns (uint256, uint256) {
        (mantissaB, mantissaDB, exponentB) = alignExponents(
            mantissaB,
            exponentB,
            mantissaDB,
            exponentDB
        );
        // Normalize result
        return
            normalize(
                (((mantissaA * mantissaDB) << MANTISSA_BITS) /
                    (mantissaB - mantissaDB)) >> MANTISSA_BITS,
                exponentA
            );
    }

    // function divMulSub(
    //     uint256 a,
    //     uint256 b,
    //     uint256 db
    // ) internal pure returns (uint256) {
    //     (
    //         uint256 mantissa,
    //         uint256 exponent // Biased
    //     ) = decode(a);
    //     (
    //         uint256 mantissaB,
    //         uint256 exponentB // Biased
    //     ) = decode(b);
    //     (
    //         uint256 mantissaDB,
    //         uint256 exponentDB // Biased
    //     ) = decode(db);

    //     (mantissa, exponent) = divMulSub(
    //         mantissa,
    //         exponent,
    //         mantissaB,
    //         exponentB,
    //         mantissaDB,
    //         exponentDB
    //     );

    //     // Encode and return the result
    //     return encode(mantissa, exponent);
    // }

    // function sqrt(uint256 a) internal pure returns (uint256) {
    //     uint256 mantissa = a >> EXPONENT_BITS;
    //     uint256 exponent = a & EXPONENT_MASK;

    //     // If exponent is odd, multiply mantissa by 10
    //     if (exponent & 1 == 1) {
    //         mantissa *= 10;
    //         exponent--;
    //     }

    //     // Shift exponent right by 1
    //     exponent >>= 1;

    //     // If mantissa is odd, multiply by 10
    //     if (mantissa & 1 == 1) {
    //         mantissa *= 10;
    //     }

    //     // Shift mantissa right by 1
    //     mantissa >>= 1;

    //     // Encode and return the result
    //     return encode(mantissa, exponent);
    // }

    // function pow(
    //     uint256 mantissa,
    //     uint256 exponent, // Biased
    //     uint256 exponentB // Biased
    // ) internal pure returns (uint256, uint256) {
    //     // Normalize result
    //     return normalize(mantissa ** exponentB, exponent * exponentB);
    // }

    // function pow(uint256 a, uint256 b) internal pure returns (uint256) {
    //     (
    //         uint256 mantissa,
    //         uint256 exponent // Biased
    //     ) = decode(a);

    //     (mantissa, exponent) = pow(mantissa, exponent, b);

    //     // Encode and return the result
    //     return encode(mantissa, exponent);
    // }

    // function powWad(
    //     uint256 mantissa,
    //     uint256 exponent, // Biased
    //     int256 exponentB // Biased
    // ) internal pure returns (uint256, uint256) {
    //     if (exponentB < 0) {
    //         // Normalize result
    //         return
    //             normalize(
    //                 mantissa ** uint256(-exponentB),
    //                 exponent * uint256(-exponentB)
    //             );
    //     } else {
    //         // Normalize result
    //         return
    //             normalize(
    //                 mantissa ** uint256(exponentB),
    //                 exponent * uint256(exponentB)
    //             );
    //     }
    // }

    // function powWad(uint256 a, int256 b) internal pure returns (uint256) {
    //     (
    //         uint256 mantissa,
    //         uint256 exponent // Biased
    //     ) = decode(a);

    //     (mantissa, exponent) = powWad(mantissa, exponent, b);

    //     // Encode and return the result
    //     return encode(mantissa, exponent);
    // }

    // function ln(uint256 a) internal pure returns (uint256) {
    //     uint256 mantissa = a >> EXPONENT_BITS;
    //     uint256 exponent = a & EXPONENT_MASK;

    //     // If exponent is odd, multiply mantissa by 10
    //     if (exponent & 1 == 1) {
    //         mantissa *= 10;
    //         exponent--;
    //     }

    //     // Shift exponent right by 1
    //     exponent >>= 1;

    //     // If mantissa is odd, multiply by 10
    //     if (mantissa & 1 == 1) {
    //         mantissa *= 10;
    //     }

    //     // Shift mantissa right by 1
    //     mantissa >>= 1;

    //     // Encode and return the result
    //     return encode(mantissa, exponent);
    // }

    // function exp(uint256 a) internal pure returns (uint256) {
    //     uint256 mantissa = a >> EXPONENT_BITS;
    //     uint256 exponent = a & EXPONENT_MASK;

    //     // If exponent is odd, multiply mantissa by 10
    //     if (exponent & 1 == 1) {
    //         mantissa *= 10;
    //         exponent--;
    //     }

    //     // Shift exponent right by 1
    //     exponent >>= 1;

    //     // If mantissa is odd, multiply by 10
    //     if (mantissa & 1 == 1) {
    //         mantissa *= 10;
    //     }

    //     // Shift mantissa right by 1
    //     mantissa >>= 1;

    //     // Encode and return the result
    //     return encode(mantissa, exponent);
    // }

    // function log10(uint256 a) internal pure returns (uint256) {
    //     uint256 mantissa = a >> EXPONENT_BITS;
    //     uint256 exponent = a & EXPONENT_MASK;

    //     // If exponent is odd, multiply mantissa by 10
    //     if (exponent & 1 == 1) {
    //         mantissa *= 10;
    //         exponent--;
    //     }

    //     // Shift exponent right by 1
    //     exponent >>= 1;

    //     // If mantissa is odd, multiply by 10
    //     if (mantissa & 1 == 1) {
    //         mantissa *= 10;
    //     }

    //     // Shift mantissa right by 1
    //     mantissa >>= 1;

    //     // Encode and return the result
    //     return encode(mantissa, exponent);
    // }

    // function log2(uint256 a) internal pure returns (uint256) {
    //     uint256 mantissa = a >> EXPONENT_BITS;
    //     uint256 exponent = a & EXPONENT_MASK;

    //     // If exponent is odd, multiply mantissa by 10
    //     if (exponent & 1 == 1) {
    //         mantissa *= 10;
    //         exponent--;
    //     }

    //     // Shift exponent right by 1
    //     exponent >>= 1;

    //     // If mantissa is odd, multiply by 10
    //     if (mantissa & 1 == 1) {
    //         mantissa *= 10;
    //     }

    //     // Shift mantissa right by 1
    //     mantissa >>= 1;

    //     // Encode and return the result
    //     return encode(mantissa, exponent);
    // }

    // function log(
    //     uint256 mantissa,
    //     uint256 exponent // Biased
    // ) internal pure returns (uint256) {
    //     return encode(mantissa, exponent);
    // }

    // function log(uint256 a) internal pure returns (uint256) {
    //     uint256 mantissa = a >> EXPONENT_BITS;
    //     uint256 exponent = a & EXPONENT_MASK;

    //     // If exponent is odd, multiply mantissa by 10
    //     if (exponent & 1 == 1) {
    //         mantissa *= 10;
    //         exponent--;
    //     }

    //     // Shift exponent right by 1
    //     exponent >>= 1;

    //     // If mantissa is odd, multiply by 10
    //     if (mantissa & 1 == 1) {
    //         mantissa *= 10;
    //     }

    //     // Shift mantissa right by 1
    //     mantissa >>= 1;

    //     // Encode and return the result
    //     return encode(mantissa, exponent);
    // }

    // function log(
    //     uint256 mantissa,
    //     uint256 exponent, // Biased
    //     uint256 base
    // ) internal pure returns (uint256) {
    //     return divide(log(mantissa, exponent), log(base));
    // }

    // function log(uint256 a, uint256 base) internal pure returns (uint256) {
    //     return divide(log(a), log(base));
    // }
}

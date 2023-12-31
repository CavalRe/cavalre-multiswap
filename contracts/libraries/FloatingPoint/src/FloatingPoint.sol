// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

struct Float {
    uint256 mantissa;
    uint256 exponent; // Biased
}

struct Float10 {
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

    function normalize(
        Float10 memory a
    ) internal pure returns (Float10 memory) {
        if (a.mantissa == 0) return Float10(0, 0);
        while (a.mantissa >= 10 ** 18) {
            a.mantissa *= 10;
            a.exponent++;
        }
        while (a.mantissa < 10 ** 17) {
            a.mantissa *= 10;
            a.exponent--; // Will revert on underflow
        }
        if (a.exponent > EXPONENT_MASK)
            revert("FloatingPoint: exponent overflow");
        return a;
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

    function align(
        uint256 mantissaA,
        uint256 exponentA, // Biased
        uint256 mantissaB,
        uint256 exponentB // Biased
    ) internal pure returns (uint256, uint256, uint256) {
        if (mantissaA == 0) return (mantissaA, mantissaB, exponentB);
        if (mantissaB == 0) return (mantissaA, mantissaB, exponentA);
        if (exponentA == exponentB) {
            return (mantissaA, mantissaB, exponentA);
        } else if (exponentA > exponentB) {
            mantissaB >>= (exponentA - exponentB);
            return (mantissaA, mantissaB, exponentA);
        } else {
            mantissaA >>= (exponentB - exponentA);
            return (mantissaA, mantissaB, exponentB);
        }
    }

    function align(
        Float memory a,
        Float memory b
    ) internal pure returns (Float memory, Float memory) {
        if (a.exponent == b.exponent) {
            return (a, b);
        } else if (a.exponent > b.exponent) {
            b.mantissa >>= (a.exponent - b.exponent);
            b.exponent = a.exponent;
            return (a, b);
        } else {
            a.mantissa >>= (b.exponent - a.exponent);
            a.exponent = b.exponent;
            return (a, b);
        }
        // uint256 mantissaA;
        // uint256 mantissaB;
        // uint256 exponent;
        // (mantissaA, mantissaB, exponent) = align(
        //     a.mantissa,
        //     a.exponent,
        //     b.mantissa,
        //     b.exponent
        // );
        // return (Float(mantissaA, exponent), Float(mantissaB, exponent));
    }

    function align(
        Float10 memory a,
        Float10 memory b
    ) internal pure returns (Float10 memory, Float10 memory) {
        if (a.exponent == b.exponent) {
            return (a, b);
        } else if (a.exponent > b.exponent) {
            b.mantissa /= 10 ** (a.exponent - b.exponent);
            b.exponent = a.exponent;
            return (a, b);
        } else {
            a.mantissa *= 10 ** (b.exponent - a.exponent);
            a.exponent = b.exponent;
            return (a, b);
        }
    }

    // function align(
    //     uint256 a,
    //     uint256 b
    // ) internal pure returns (uint256, uint256) {
    //     (uint256 mantissaA, uint256 exponent) = decode(a);
    //     (uint256 mantissaB, uint256 exponentB) = decode(b);

    //     (mantissaA, mantissaB, exponent) = align(
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
        (mantissaA, mantissaB, exponentA) = align(
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

    //     (mantissaA, mantissaB, exponent) = align(
    //         mantissaA,
    //         exponent,
    //         mantissaB,
    //         exponentB
    //     );

    //     return mantissaA == mantissaB;
    // }

    function plus(
        uint256 mantissa,
        uint256 exponent, // Biased
        uint256 mantissaB,
        uint256 exponentB // Biased
    ) internal pure returns (uint256, uint256) {
        // Align exponents
        (mantissa, mantissaB, exponent) = align(
            mantissa,
            exponent,
            mantissaB,
            exponentB
        );

        return normalize(mantissa + mantissaB, exponent);
    }

    function plus(
        Float memory a,
        Float memory b
    ) internal pure returns (Float memory) {
        (a, b) = align(a, b);
        return normalize(Float(a.mantissa + b.mantissa, a.exponent));
        // uint256 mantissa;
        // uint256 exponent;
        // (mantissa, exponent) = plus(
        //     a.mantissa,
        //     a.exponent,
        //     b.mantissa,
        //     b.exponent
        // );

        // // Encode and return the result
        // return Float(mantissa, exponent);
    }

    function plus(
        Float10 memory a,
        Float10 memory b
    ) internal pure returns (Float10 memory) {
        (a, b) = align(a, b);
        return normalize(Float10(a.mantissa + b.mantissa, a.exponent));
        // uint256 mantissa;
        // uint256 exponent;
        // (mantissa, exponent) = plus(
        //     a.mantissa,
        //     a.exponent,
        //     b.mantissa,
        //     b.exponent
        // );

        // // Encode and return the result
        // return Float(mantissa, exponent);
    }

    // function plus(uint256 a, uint256 b) internal pure returns (uint256) {
    //     (
    //         uint256 mantissa,
    //         uint256 exponent // Biased
    //     ) = decode(a);
    //     (
    //         uint256 mantissaB,
    //         uint256 exponentB // Biased
    //     ) = decode(b);

    //     (mantissa, exponent) = plus(mantissa, exponent, mantissaB, exponentB);

    //     // Encode and return the result
    //     return encode(mantissa, exponent);
    // }

    function minus(
        uint256 mantissa,
        uint256 exponent, // Biased
        uint256 mantissaB,
        uint256 exponentB // Biased
    ) internal pure returns (uint256, uint256) {
        // Align exponents
        (mantissa, mantissaB, exponent) = align(
            mantissa,
            exponent,
            mantissaB,
            exponentB
        );

        return normalize(mantissa - mantissaB, exponent);
    }

    function minus(
        Float memory a,
        Float memory b
    ) internal pure returns (Float memory) {
        uint256 mantissa;
        uint256 exponent;
        (mantissa, exponent) = minus(
            a.mantissa,
            a.exponent,
            b.mantissa,
            b.exponent
        );

        // Encode and return the result
        return Float(mantissa, exponent);
    }

    function minus(
        Float10 memory a,
        Float10 memory b
    ) internal pure returns (Float10 memory) {
        (a, b) = align(a, b);
        return normalize(Float10(a.mantissa - b.mantissa, a.exponent));
    }

    // function minus(uint256 a, uint256 b) internal pure returns (uint256) {
    //     (uint256 mantissaA, uint256 exponentA) = decode(a);
    //     (uint256 mantissaB, uint256 exponentB) = decode(b);

    //     (mantissaA, exponentA) = minus(
    //         mantissaA,
    //         exponentA,
    //         mantissaB,
    //         exponentB
    //     );

    //     // Encode and return the result
    //     return encode(mantissaA, exponentA);
    // }

    function times(
        uint256 mantissa,
        uint256 exponent, // Biased
        uint256 mantissaB,
        uint256 exponentB // Biased
    ) internal pure returns (uint256, uint256) {
        if (mantissa == 0 || mantissaB == 0) return (0, 0);
        (mantissa, exponent) = normalize(mantissa, exponent);
        (mantissaB, exponentB) = normalize(mantissaB, exponentB);
        // Normalize result
        return
            normalize(
                (mantissa * mantissaB) >> MANTISSA_BITS,
                MANTISSA_BITS + exponent + exponentB - EXPONENT_BIAS
            );
    }

    function times(
        Float memory a,
        Float memory b
    ) internal pure returns (Float memory) {
        uint256 mantissa;
        uint256 exponent;
        (mantissa, exponent) = times(
            a.mantissa,
            a.exponent,
            b.mantissa,
            b.exponent
        );

        // Encode and return the result
        return Float(mantissa, exponent);
    }

    // function times(uint256 a, uint256 b) internal pure returns (uint256) {
    //     (
    //         uint256 mantissa,
    //         uint256 exponent // Biased
    //     ) = decode(a);
    //     (
    //         uint256 mantissaB,
    //         uint256 exponentB // Biased
    //     ) = decode(b);

    //     (mantissa, exponent) = times(
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
        if (mantissaA == 0) return (0, 0);
        if (mantissaB == 0) revert("FloatingPoint: division by zero");
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

    function mulDiv(
        Float memory a,
        Float memory b,
        Float memory c
    ) internal pure returns (Float memory) {
        uint256 mantissa;
        uint256 exponent;
        (mantissa, exponent) = mulDiv(
            a.mantissa,
            a.exponent,
            b.mantissa,
            b.exponent,
            c.mantissa,
            c.exponent
        );

        // Encode and return the result
        return Float(mantissa, exponent);
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
        (mantissaB, mantissaDB, exponentB) = align(
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
        (mantissaB, mantissaDB, exponentB) = align(
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

    function shiftStringBytesLeft(
        bytes memory strBytes,
        uint256 numChars
    ) public pure returns (bytes memory) {
        bytes memory result = new bytes(strBytes.length + numChars);

        for (uint256 i = 0; i < result.length; i++) {
            if (i < strBytes.length) {
                result[i] = strBytes[i];
            } else {
                result[i] = "0";
            }
        }

        return result;
    }

    function shiftStringLeft(
        string memory str,
        uint256 numChars
    ) public pure returns (string memory) {
        return string(shiftStringBytesLeft(bytes(str), numChars));
    }

    function shiftStringBytesRight(
        bytes memory strBytes,
        uint256 numChars
    ) public pure returns (bytes memory result, bytes memory remainder) {
        uint256 resultChars;
        uint256 remainderChars;
        uint256 excessChars;
        if (numChars > strBytes.length) {
            resultChars = 0;
            excessChars = numChars - strBytes.length;
            result = new bytes(1);
        } else {
            resultChars = strBytes.length - numChars;
            result = new bytes(resultChars);
        }
        remainderChars = numChars;
        remainder = new bytes(remainderChars);

        for (uint256 i = 0; i < strBytes.length; i++) {
            if (i < resultChars) {
                result[i] = strBytes[i];
            } else {
                remainder[remainderChars - 1 + resultChars - i] = strBytes[
                    strBytes.length - 1 + resultChars - i
                ];
            }
        }

        return (result, remainder);
    }

    function shiftStringRight(
        string memory str,
        uint256 numChars
    ) public pure returns (string memory result, string memory remainder) {
        bytes memory strBytes = bytes(str);
        bytes memory resultBytes;
        bytes memory remainderBytes;
        (resultBytes, remainderBytes) = shiftStringBytesRight(
            strBytes,
            numChars
        );
        result = string(resultBytes);
        remainder = string(remainderBytes);
    }

    function toStringBytes(uint256 value) public pure returns (bytes memory) {
        // Handle the special case of zero.
        if (value == 0) {
            return bytes("0");
        }

        // Determine the length of the decimal number.
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }

        // Create a temporary byte array to fill with the digits of the number.
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + (value % 10)));
            value /= 10;
        }

        // Convert the byte array to a string and return it.
        return buffer;
    }

    function toString(uint256 value) public pure returns (string memory) {
        return string(toStringBytes(value));
    }

    function integerPart(Float memory number) public pure returns (uint256) {
        // Handle the special case of zero.
        if (number.mantissa == 0) {
            return 0;
        }

        uint256 unbiasedExponent;
        if (number.exponent >= EXPONENT_BIAS) {
            unbiasedExponent = number.exponent - EXPONENT_BIAS;
            return number.mantissa << unbiasedExponent;
        }
        unbiasedExponent = EXPONENT_BIAS - number.exponent;
        return number.mantissa >> unbiasedExponent;
    }

    function toString(Float memory number) public pure returns (string memory) {
        // Handle the special case of zero.
        if (number.mantissa == 0) {
            return "0.0";
        }

        uint256 integerPartUint = integerPart(number);
        if (number.exponent >= EXPONENT_BIAS) {
            return string(abi.encodePacked(toString(integerPartUint), ".0"));
        }

        Float memory fractionalPartFloat = minus(
            number,
            Float(integerPartUint, bias(0))
        );

        // Determine the length of the decimal number.
        uint256 temp = integerPartUint;
        uint256 integerDigits;
        while (temp != 0) {
            integerDigits++;
            temp /= 10;
        }
        uint256 fractionalDigits = 18 - integerDigits;
        uint256 fractionalPartUint = integerPart(
            times(fractionalPartFloat, Float(10 ** fractionalDigits, bias(0)))
        );

        return
            string(
                abi.encodePacked(
                    toString(integerPartUint),
                    ".",
                    toString(fractionalPartUint)
                )
            );
    }

    function trimStringBytesRight(
        bytes memory strBytes
    ) public pure returns (bytes memory) {
        uint256 i = strBytes.length - 1;
        while (i > 0 && strBytes[i] == "0") {
            i--;
        }
        bytes memory result = new bytes(i + 1);
        for (uint256 j = 0; j < i + 1; j++) {
            result[j] = strBytes[j];
        }
        return result;
    }

    function trimStringRight(
        string memory str
    ) public pure returns (string memory) {
        return string(trimStringBytesRight(bytes(str)));
    }

    // function splitFloat(
    //     Float memory number
    // )
    //     public
    //     pure
    //     returns (string memory integerPart, string memory fractionalPart)
    // {
    //     if (number.mantissa == 0) {
    //         return ("0", "0");
    //     }
    //     if (number.exponent >= EXPONENT_BIAS) {
    //         // If the biased exponent is greater than or equal to the bias
    //         uint256 unbiasedExponent = number.exponent - EXPONENT_BIAS;
    //         integerPart = toString(number.mantissa << unbiasedExponent);
    //         fractionalPart = "0";
    //     } else {
    //         // If the biased exponent is smaller than the bias, the number is fractional
    //         uint256 unbiasedExponent = EXPONENT_BIAS - number.exponent;
    //         fractionalPart = trimStringRight(toString((number.mantissa & ((1 << unbiasedExponent) - 1)) * (5 ** unbiasedExponent)));
    //         integerPart = toString(number.mantissa >> unbiasedExponent);
    //         uint256 stringLength;
    //         if (bytes(integerPart).length == 1 && bytes(integerPart)[0] == "0") {
    //             stringLength = bytes(fractionalPart).length;
    //         } else {
    //             stringLength = bytes(integerPart).length + bytes(fractionalPart).length;
    //         }
    //         if (stringLength > 18) {
    //             // If the fractional part is less than 18 digits, pad it with zeros
    //             uint256 excess = stringLength - 18;
    //             (fractionalPart,) = shiftStringRight(fractionalPart, excess);
    //         }
    //     }
    // }

    // function toString(Float memory a) public pure returns (string memory) {
    //     string memory integerPart;
    //     string memory fractionalPart;
    //     (integerPart, fractionalPart) = splitFloat(a);

    //     return
    //         string(
    //             abi.encodePacked(
    //                 integerPart,
    //                 ".",
    //                 fractionalPart
    //             )
    //         );
    // }
}

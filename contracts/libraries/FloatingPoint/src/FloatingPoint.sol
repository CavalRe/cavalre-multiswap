// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

struct UFloat {
    uint256 mantissa;
    int256 exponent;
}

struct Float {
    int256 mantissa;
    int256 exponent;
}

library FloatingPoint {
    uint256 constant SIGNIFICANT_DIGITS = 18;
    uint256 constant NORMALIZED_MANTISSA_MAX = 10 ** SIGNIFICANT_DIGITS - 1;
    uint256 constant NORMALIZED_MANTISSA_MIN = 10 ** (SIGNIFICANT_DIGITS - 1);

    /******************
     *   Conversions   *
     ******************/

    function toUInt(int256 a) internal pure returns (uint256) {
        require(a >= 0, "Value must be non-negative");
        return uint256(a);
    }

    function toInt(uint256 a) internal pure returns (int256) {
        require(a <= uint256(type(int256).max), "Value out of int256 range");
        return int256(a);
    }

    function toUInt(
        UFloat memory a,
        uint256 decimals
    ) internal pure returns (uint256) {
        if (a.exponent + toInt(decimals) >= 0) {
            return a.mantissa * 10 ** toUInt(a.exponent + toInt(decimals));
        } else {
            return a.mantissa / 10 ** toUInt(-(a.exponent + toInt(decimals)));
        }
    }

    function toUInt(UFloat memory a) internal pure returns (uint256) {
        return toUInt(a, SIGNIFICANT_DIGITS);
    }

    // function toInt(
    //     Float memory a,
    //     uint256 decimals
    // ) internal pure returns (int256) {
    //     if (a.exponent + toInt(decimals) >= 0) {
    //         return
    //             a.mantissa * int256(10 ** toUInt(a.exponent + toInt(decimals)));
    //     } else {
    //         return
    //             a.mantissa /
    //             int256(10 ** toUInt(-(a.exponent + toInt(decimals))));
    //     }
    // }

    // function toInt(Float memory a) internal pure returns (int256) {
    //     return toInt(a, SIGNIFICANT_DIGITS);
    // }

    //--------------
    //   toUFloat
    //--------------
    // function toUFloat(Float memory a) internal pure returns (UFloat memory) {
    //     return UFloat(toUInt(a.mantissa), a.exponent);
    // }

    function toUFloat(
        uint256 a,
        uint256 decimals
    ) internal pure returns (UFloat memory) {
        return normalize(UFloat(a, -toInt(decimals)));
    }

    function toUFloat(uint256 a) internal pure returns (UFloat memory) {
        return toUFloat(a, SIGNIFICANT_DIGITS);
    }

    //-------------
    //   toFloat
    //-------------
    // function toFloat(UFloat memory a) internal pure returns (Float memory) {
    //     return Float(toInt(a.mantissa), a.exponent);
    // }

    // function toFloat(
    //     uint256 a,
    //     uint256 decimals
    // ) internal pure returns (Float memory) {
    //     return normalize(Float(toInt(a), -toInt(decimals)));
    // }

    // function toFloat(uint256 a) internal pure returns (Float memory) {
    //     return toFloat(a, SIGNIFICANT_DIGITS);
    // }

    //-------------------
    //   toUFloatArray
    //-------------------
    function toUFloatArray(
        uint256[] memory a,
        uint8[] memory decimals
    ) internal pure returns (UFloat[] memory) {
        UFloat[] memory result = new UFloat[](a.length);
        for (uint256 i = 0; i < a.length; i++) {
            result[i] = toUFloat(a[i], decimals[i]);
        }
        return result;
    }

    function toUFloatArray(
        uint256[] memory a
    ) internal pure returns (UFloat[] memory) {
        UFloat[] memory result = new UFloat[](a.length);
        for (uint256 i = 0; i < a.length; i++) {
            result[i] = toUFloat(a[i]);
        }
        return result;
    }

    /*******************
     *   Comparisons   *
     *******************/

    //-------------
    //   isEqual
    //-------------
    function isEqual(
        UFloat memory a,
        UFloat memory b
    ) internal pure returns (bool) {
        (a, b) = align(a, b);
        return a.mantissa == b.mantissa;
    }

    // function isEqual(
    //     Float memory a,
    //     Float memory b
    // ) internal pure returns (bool) {
    //     (a, b) = align(a, b);
    //     return a.mantissa == b.mantissa;
    // }

    //--------
    //   gt
    //--------
    function gt(UFloat memory a, UFloat memory b) internal pure returns (bool) {
        (a, b) = align(a, b);
        return a.mantissa > b.mantissa;
    }

    function gte(
        UFloat memory a,
        UFloat memory b
    ) internal pure returns (bool) {
        (a, b) = align(a, b);
        return a.mantissa >= b.mantissa;
    }

    function lt(UFloat memory a, UFloat memory b) internal pure returns (bool) {
        (a, b) = align(a, b);
        return a.mantissa < b.mantissa;
    }

    function lte(
        UFloat memory a,
        UFloat memory b
    ) internal pure returns (bool) {
        (a, b) = align(a, b);
        return a.mantissa <= b.mantissa;
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

    /**********************
     *   Transformations   *
     **********************/

    // Must return a UFloat with non-negative exponent
    function integerPart(
        UFloat memory number
    ) public pure returns (UFloat memory) {
        if (number.exponent < 0) {
            uint256 temp = number.mantissa;
            for (uint256 i = 0; i < toUInt(-number.exponent); i++) {
                temp /= 10;
                if (temp == 0) return UFloat(0, 0);
            }
            return UFloat(temp, 0);
        } else {
            return number;
        }
    }

    // function integerPart(
    //     Float memory number
    // ) public pure returns (Float memory) {
    //     if (number.exponent < 0) {
    //         return
    //             Float(
    //                 number.mantissa / toInt(10 ** toUInt(-number.exponent)),
    //                 0
    //             );
    //     } else {
    //         return number;
    //     }
    // }

    //-----------
    //   Shift
    //-----------
    /*
    - shift should be unopinionated. 
    - If the shift is too large, it will overflow.
    - If the shift is too small, it will underflow.
     */
    function shift(
        UFloat memory a,
        int256 i
    ) internal pure returns (UFloat memory) {
        uint256 mantissa = a.mantissa;
        if (i > 0) {
            mantissa /= 10 ** toUInt(i);
        } else if (i < 0) {
            mantissa *= 10 ** toUInt(-i);
        }
        return UFloat(mantissa, a.exponent + i);
    }

    //---------------
    //   Normalize
    //---------------
    function normalize(UFloat memory a) internal pure returns (UFloat memory) {
        uint256 mantissa = a.mantissa;
        int256 exponent = a.exponent;
        bool isLarge = mantissa > NORMALIZED_MANTISSA_MAX;
        bool isSmall = mantissa < NORMALIZED_MANTISSA_MIN;
        if (!isLarge && !isSmall) {
            return UFloat(mantissa, exponent);
        } else if (isLarge) {
            while (mantissa > NORMALIZED_MANTISSA_MAX) {
                mantissa /= 10;
                exponent++;
            }
            return UFloat(mantissa, exponent);
        } else if (mantissa == 0) {
            return UFloat(0, 0);
        } else {
            // if (isSmall) {
            while (mantissa < NORMALIZED_MANTISSA_MIN) {
                mantissa *= 10;
                exponent--;
            }
            return UFloat(mantissa, exponent);
        }
    }

    //-----------
    //   align
    //-----------

    /*
    a and b should be normalized before shifting because shifting shifts the mantissa downward
    */
    function align(
        UFloat memory a,
        UFloat memory b
    ) internal pure returns (UFloat memory, UFloat memory) {
        if (a.mantissa == 0 && b.mantissa == 0) {
            return (UFloat(0, 0), UFloat(0, 0));
        } else if (a.mantissa == 0) {
            return (UFloat(0, b.exponent), UFloat(b.mantissa, b.exponent));
        } else if (b.mantissa == 0) {
            return (UFloat(a.mantissa, a.exponent), UFloat(0, a.exponent));
        }

        a = normalize(a);
        b = normalize(b);
        
        int256 delta = a.exponent - b.exponent;
        if (delta >= 0) {
            if (delta > int256(SIGNIFICANT_DIGITS)) {
                return (UFloat(a.mantissa, a.exponent), UFloat(0, a.exponent));
            }
            return (UFloat(a.mantissa, a.exponent), shift(b, delta));
        } else {
            if (-delta > int256(SIGNIFICANT_DIGITS)) {
                return (UFloat(0, b.exponent), UFloat(b.mantissa, b.exponent));
            }
            return (shift(a, -delta), UFloat(b.mantissa, b.exponent));
        }
    }

    // function align(
    //     Float memory a,
    //     Float memory b
    // ) internal pure returns (Float memory, Float memory) {
    //     if (a.exponent > b.exponent) {
    //         a.mantissa *= toInt(10 ** toUInt(a.exponent - b.exponent));
    //         a.exponent = b.exponent;
    //     } else if (a.exponent < b.exponent) {
    //         b.mantissa *= toInt(10 ** toUInt(b.exponent - a.exponent));
    //         b.exponent = a.exponent;
    //     }
    //     return (a, b);
    // }

    /*****************
     *   Arithmetic   *
     *****************/

    //----------
    //   plus
    //----------
    function plus(
        UFloat memory a,
        UFloat memory b
    ) internal pure returns (UFloat memory) {
        a = normalize(a);
        b = normalize(b);

        (a, b) = align(a, b);
        return normalize(UFloat(a.mantissa + b.mantissa, a.exponent));
    }

    // function plus(
    //     Float memory a,
    //     Float memory b
    // ) internal pure returns (Float memory) {
    //     (a, b) = align(a, b);
    //     return normalize(Float(a.mantissa + b.mantissa, a.exponent));
    // }

    //-----------
    //   minus
    //-----------
    function minus(
        UFloat memory a,
        UFloat memory b
    ) internal pure returns (UFloat memory) {
        a = normalize(a);
        b = normalize(b);

        (a, b) = align(a, b);
        return normalize(UFloat(a.mantissa - b.mantissa, a.exponent));
    }

    // function minus(
    //     Float memory a,
    //     Float memory b
    // ) internal pure returns (Float memory) {
    //     (a, b) = align(a, b);
    //     return normalize(Float(a.mantissa - b.mantissa, a.exponent));
    // }

    //-----------
    //   times
    //-----------
    function times(
        UFloat memory a,
        UFloat memory b
    ) internal pure returns (UFloat memory) {
        // if (a.mantissa == 0 || b.mantissa == 0) return UFloat(0, 0);
        a = normalize(a);
        b = normalize(b);

        // return
        //     normalize(UFloat(a.mantissa * b.mantissa, a.exponent + b.exponent));
        return
            normalize(
                UFloat(
                    (a.mantissa * b.mantissa) / 10 ** SIGNIFICANT_DIGITS,
                    toInt(SIGNIFICANT_DIGITS) + a.exponent + b.exponent
                )
            );
        // return UFloat(a.mantissa * b.mantissa, a.exponent + b.exponent);
    }

    // function times(
    //     Float memory a,
    //     Float memory b
    // ) internal pure returns (Float memory) {
    //     return
    //         normalize(
    //             Float(
    //                 (a.mantissa * b.mantissa) / toInt(10 ** SIGNIFICANT_DIGITS),
    //                 toInt(SIGNIFICANT_DIGITS) + a.exponent + b.exponent
    //             )
    //         );
    // }

    //------------
    //   divide
    //------------
    function divide(
        UFloat memory a,
        UFloat memory b
    ) internal pure returns (UFloat memory) {
        // if (a.mantissa == 0) return UFloat(0, 0);
        a = normalize(a);
        b = normalize(b);

        return
            normalize(
                UFloat(
                    (a.mantissa * 10 ** SIGNIFICANT_DIGITS) / b.mantissa,
                    a.exponent - b.exponent - toInt(SIGNIFICANT_DIGITS)
                )
            );
        // return
        //     UFloat(
        //         (a.mantissa * 10 ** SIGNIFICANT_DIGITS) / b.mantissa,
        //         a.exponent - b.exponent - toInt(SIGNIFICANT_DIGITS)
        //     );
    }

    // function divide(
    //     Float memory a,
    //     Float memory b
    // ) internal pure returns (Float memory) {
    //     return
    //         normalize(
    //             Float(
    //                 (a.mantissa * toInt(10 ** SIGNIFICANT_DIGITS)) / b.mantissa,
    //                 a.exponent - b.exponent - toInt(SIGNIFICANT_DIGITS)
    //             )
    //         );
    // }

    function mulDiv(
        UFloat memory a,
        UFloat memory b,
        UFloat memory c
    ) internal pure returns (UFloat memory) {
        // if (a.mantissa == 0 || b.mantissa == 0) return (0, 0);
        // a = normalize(a);
        // b = normalize(b);
        // c = normalize(c);

        return
            normalize(
                UFloat(
                    (a.mantissa * b.mantissa * 10 ** SIGNIFICANT_DIGITS) /
                        c.mantissa,
                    a.exponent +
                        b.exponent -
                        c.exponent -
                        toInt(SIGNIFICANT_DIGITS)
                )
            );
    }

    // function mulDiv(
    //     uint256 mantissaA,
    //     uint256 exponentA, // Biased
    //     uint256 mantissaB,
    //     uint256 exponentB, // Biased
    //     uint256 mantissaC,
    //     uint256 exponentC // Biased
    // ) internal pure returns (uint256, uint256) {
    //     // Normalize result
    //     return
    //         normalize(
    //             (((mantissaA * mantissaB) << MANTISSA_BITS) / mantissaC) >>
    //                 MANTISSA_BITS,
    //             exponentA + exponentB - exponentC
    //         );
    // }

    // function mulDiv(
    //     UFloat memory a,
    //     UFloat memory b,
    //     UFloat memory c
    // ) internal pure returns (UFloat memory) {
    //     uint256 mantissa;
    //     uint256 exponent;
    //     (mantissa, exponent) = mulDiv(
    //         a.mantissa,
    //         a.exponent,
    //         b.mantissa,
    //         b.exponent,
    //         c.mantissa,
    //         c.exponent
    //     );

    //     // Encode and return the result
    //     return UFloat(mantissa, exponent);
    // }

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
        UFloat memory a,
        UFloat memory b,
        UFloat memory db
    ) internal pure returns (UFloat memory) {
        (b, db) = align(b, db);

        // Normalize result
        return
            normalize(
                UFloat(
                    (a.mantissa * db.mantissa * 10 ** SIGNIFICANT_DIGITS) /
                        (b.mantissa + db.mantissa),
                    a.exponent - toInt(SIGNIFICANT_DIGITS)
                )
            );
    }

    // function mulDivAdd(
    //     uint256 mantissaA,
    //     uint256 exponentA, // Biased
    //     uint256 mantissaB,
    //     uint256 exponentB, // Biased
    //     uint256 mantissaDB,
    //     uint256 exponentDB // Biased
    // ) internal pure returns (uint256, uint256) {
    //     (mantissaB, mantissaDB, exponentB) = align(
    //         mantissaB,
    //         exponentB,
    //         mantissaDB,
    //         exponentDB
    //     );
    //     // Normalize result
    //     return
    //         normalize(
    //             (((mantissaA * mantissaDB) << MANTISSA_BITS) /
    //                 (mantissaB + mantissaDB)) >> MANTISSA_BITS,
    //             exponentA
    //         );
    // }

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

    // function divMulSub(
    //     uint256 mantissaA,
    //     uint256 exponentA, // Biased
    //     uint256 mantissaB,
    //     uint256 exponentB, // Biased
    //     uint256 mantissaDB,
    //     uint256 exponentDB // Biased
    // ) internal pure returns (uint256, uint256) {
    //     (mantissaB, mantissaDB, exponentB) = align(
    //         mantissaB,
    //         exponentB,
    //         mantissaDB,
    //         exponentDB
    //     );
    //     // Normalize result
    //     return
    //         normalize(
    //             (((mantissaA * mantissaDB) << MANTISSA_BITS) /
    //                 (mantissaB - mantissaDB)) >> MANTISSA_BITS,
    //             exponentA
    //         );
    // }

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
    //                 mantissa ** toUInt(-exponentB),
    //                 exponent * toUInt(-exponentB)
    //             );
    //     } else {
    //         // Normalize result
    //         return
    //             normalize(
    //                 mantissa ** toUInt(exponentB),
    //                 exponent * toUInt(exponentB)
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

    // Most significant bit
    function msb(uint256 value) internal pure returns (uint256) {
        if (value == 0) {
            return 0;
        }
        return toStringBytes(value).length;
    }

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

    function toStringBytes(
        UFloat memory value
    ) public pure returns (bytes memory, bytes memory) {
        // Handle the special case of zero.
        if (value.mantissa == 0) {
            return (bytes("0"), bytes("0"));
        }

        UFloat memory integerPartFloat = integerPart(value);

        bytes memory integerPartBytes;
        if (integerPartFloat.mantissa == 0) {
            integerPartBytes = bytes("0");
        } else {
            bytes memory integerPartMantissaBytes = toStringBytes(
                integerPartFloat.mantissa
            );

            integerPartBytes = new bytes(
                integerPartMantissaBytes.length +
                    toUInt(integerPartFloat.exponent)
            );

            for (uint256 i = 0; i < integerPartBytes.length; i++) {
                if (i < integerPartMantissaBytes.length) {
                    integerPartBytes[i] = integerPartMantissaBytes[i];
                } else {
                    integerPartBytes[i] = bytes1("0");
                }
            }
        }

        UFloat memory fractionalPartFloat;
        if (integerPartFloat.mantissa == 0) {
            fractionalPartFloat = value;
        } else {
            fractionalPartFloat = minus(value, integerPartFloat);
        }

        bytes memory fractionalPartBytes;
        if (fractionalPartFloat.mantissa == 0) {
            fractionalPartBytes = bytes("0");
        } else {
            bytes memory fractionalPartMantissaBytes = toStringBytes(
                fractionalPartFloat.mantissa
            );

            fractionalPartBytes = new bytes(
                toUInt(-fractionalPartFloat.exponent)
            );

            for (uint256 i = 0; i < fractionalPartBytes.length; i++) {
                if (i < fractionalPartMantissaBytes.length) {
                    fractionalPartBytes[
                        fractionalPartBytes.length - 1 - i
                    ] = fractionalPartMantissaBytes[
                        fractionalPartMantissaBytes.length - 1 - i
                    ];
                } else {
                    fractionalPartBytes[
                        fractionalPartBytes.length - 1 - i
                    ] = bytes1("0");
                }
            }
        }

        return (integerPartBytes, fractionalPartBytes);
    }

    // function toStringBytes(
    //     UFloat memory value
    // ) public pure returns (bytes memory, bytes memory) {
    //     // Handle the special case of zero.
    //     if (value.mantissa == 0) {
    //         return (bytes("0"), bytes("0"));
    //     }

    //     UFloat memory integerPartFloat = integerPart(value);
    //     UFloat memory fractionalPartFloat = minus(value, integerPartFloat);

    //     bytes memory integerPartBytes = toStringBytes(
    //         integerPartFloat.mantissa
    //     );
    //     bytes memory fractionalPartBytes = toStringBytes(
    //         fractionalPartFloat.mantissa
    //     );

    //     bytes memory integerPart_ = new bytes(
    //         integerPartBytes.length + toUInt(integerPartFloat.exponent)
    //     );
    //     bytes memory fractionalPart_ = new bytes(
    //         toUInt(-fractionalPartFloat.exponent)
    //         // fractionalPartBytes.length - fractionalPartFloat.exponent
    //     );

    //     for (uint256 i = 0; i < integerPartBytes.length; i++) {
    //         integerPart_[i] = integerPartBytes[i];
    //     }
    //     for (uint256 i = 0; i < fractionalPartBytes.length; i++) {
    //         fractionalPart_[
    //             fractionalPart_.length - 1 - i
    //         ] = fractionalPartBytes[fractionalPartBytes.length - 1 - i];
    //     }

    //     return (integerPart_, fractionalPart_);
    // }

    function toString(uint256 value) public pure returns (string memory) {
        return string(toStringBytes(value));
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

    function toString(
        UFloat memory number
    ) public pure returns (string memory) {
        bytes memory integerPartBytes;
        bytes memory fractionalPartBytes;

        (integerPartBytes, fractionalPartBytes) = toStringBytes(number);
        return
            string(
                abi.encodePacked(
                    string(integerPartBytes),
                    ".",
                    string(trimStringBytesRight(fractionalPartBytes))
                )
            );
    }

    // function toString(
    //     UFloat memory number
    // ) public pure returns (string memory) {
    //     bytes memory integerPartBytes;
    //     bytes memory fractionalPartBytes;

    //     (integerPartBytes, fractionalPartBytes) = toStringBytes(number);
    //     return
    //         string(
    //             abi.encodePacked(
    //                 string(integerPartBytes),
    //                 ".",
    //                 string(trimStringBytesRight(fractionalPartBytes))
    //             )
    //         );

    //     // // Handle the special case of zero.
    //     // if (number.mantissa == 0) {
    //     //     return "0.0";
    //     // }

    //     // UFloat memory integerPartFloat = integerPart(number);

    //     // // uint256 integerPartUint = integerPart(number);
    //     // // if (number.exponent >= 0) {
    //     // //     return string(abi.encodePacked(toString(integerPartUint), ".0"));
    //     // // }

    //     // // UFloat memory integerPartFloat = UFloat(integerPartUint, 0);
    //     // UFloat memory fractionalPartFloat = normalize(
    //     //     minus(number, integerPartFloat)
    //     // );

    //     // if (fractionalPartFloat.mantissa == 0) {
    //     //     return string(abi.encodePacked(toString(integerPartUint), ".0"));
    //     // }

    //     // // Determine the length of the decimal number.
    //     // uint256 temp = integerPartUint;
    //     // uint256 integerDigits;
    //     // while (temp != 0) {
    //     //     integerDigits++;
    //     //     temp /= 10;
    //     // }

    //     // uint256 fractionalDigits = SIGNIFICANT_DIGITS - integerDigits;
    //     // uint256 zeroPadding;
    //     // if (
    //     //     integerPartUint == 0 &&
    //     //     toInt(SIGNIFICANT_DIGITS) < -fractionalPartFloat.exponent
    //     // ) {
    //     //     zeroPadding = toUInt(
    //     //         -fractionalPartFloat.exponent - toInt(SIGNIFICANT_DIGITS)
    //     //     );
    //     // }

    //     // bytes memory fractionalPartBytesFull = toStringBytes(
    //     //     fractionalPartFloat.mantissa
    //     // );
    //     // bytes memory fractionalPartBytes = new bytes(
    //     //     fractionalDigits + zeroPadding
    //     // );
    //     // for (uint256 i = 0; i < fractionalDigits + zeroPadding; i++) {
    //     //     if (i < zeroPadding) {
    //     //         fractionalPartBytes[i] = "0";
    //     //     } else {
    //     //         fractionalPartBytes[i] = fractionalPartBytesFull[
    //     //             i - zeroPadding
    //     //         ];
    //     //     }
    //     // }
    //     // return
    //     //     string(
    //     //         abi.encodePacked(
    //     //             toString(integerPartUint),
    //     //             ".",
    //     //             trimStringRight(string(fractionalPartBytes))
    //     //         )
    //     //     );
    // }

    // function toString(UFloat memory number) public pure returns (string memory) {
    //     // Handle the special case of zero.
    //     if (number.mantissa == 0) {
    //         return "0.0";
    //     }

    //     uint256 integerPartUint = integerPart(number);
    //     if (number.exponent >= EXPONENT_BIAS) {
    //         return string(abi.encodePacked(toString(integerPartUint), ".0"));
    //     }

    //     UFloat memory fractionalPartFloat = minus(
    //         number,
    //         UFloat(integerPartUint, 0)
    //     );

    //     // Determine the length of the decimal number.
    //     uint256 temp = integerPartUint;
    //     uint256 integerDigits;
    //     while (temp != 0) {
    //         integerDigits++;
    //         temp /= 10;
    //     }
    //     uint256 fractionalDigits = 18 - integerDigits;
    //     uint256 fractionalPartUint = integerPart(
    //         times(fractionalPartFloat, UFloat(10 ** fractionalDigits, 0))
    //     );

    //     return
    //         string(
    //             abi.encodePacked(
    //                 toString(integerPartUint),
    //                 ".",
    //                 trimStringRight(toString(fractionalPartUint))
    //             )
    //         );
    // }

    // function toString(UFloat memory number) public pure returns (string memory) {
    //     // Handle the special case of zero.
    //     if (number.mantissa == 0) {
    //         return "0.0";
    //     }

    //     uint256 integerPartUint = integerPart(number);
    //     if (number.exponent >= EXPONENT_BIAS) {
    //         return string(abi.encodePacked(toString(integerPartUint), ".0"));
    //     }

    //     UFloat memory fractionalPartFloat = minus(
    //         number,
    //         UFloat(integerPartUint, 0)
    //     );

    //     // Determine the length of the decimal number.
    //     uint256 temp = integerPartUint;
    //     uint256 integerDigits;
    //     while (temp != 0) {
    //         integerDigits++;
    //         temp /= 10;
    //     }
    //     uint256 fractionalDigits = 18 - integerDigits;
    //     uint256 fractionalPartUint = integerPart(
    //         times(fractionalPartFloat, UFloat(10 ** fractionalDigits, 0))
    //     );

    //     return
    //         string(
    //             abi.encodePacked(
    //                 toString(integerPartUint),
    //                 ".",
    //                 toString(fractionalPartUint)
    //             )
    //         );
    // }

    // function splitFloat(
    //     UFloat memory number
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

    // function toString(UFloat memory a) public pure returns (string memory) {
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
}

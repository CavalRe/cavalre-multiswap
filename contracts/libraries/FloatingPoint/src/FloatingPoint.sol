// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

struct Float {
    uint256 mantissa;
    int256 exponent;
}

library FloatingPoint {
    uint256 constant SIGNIFICANT_DIGITS = 18;

    function fromWad(uint256 a) internal pure returns (Float memory) {
        return normalize(Float(a, -int256(SIGNIFICANT_DIGITS)));
    }

    function toWad(Float memory a) internal pure returns (uint256) {
        return
            integerPart(
                Float(a.mantissa, a.exponent + int256(SIGNIFICANT_DIGITS))
            );
    }

    function fromDecimals(
        uint256 a,
        uint8 decimals
    ) internal pure returns (Float memory) {
        return normalize(Float(a, -int256(int8(decimals))));
    }

    function toDecimals(
        Float memory a,
        uint8 decimals
    ) internal pure returns (uint256) {
        // a.exponent += int256(int8(decimals));
        return
            integerPart(Float(a.mantissa, a.exponent + int256(int8(decimals))));
    }

    function toFloatArray(
        uint256[] memory a
    ) internal pure returns (Float[] memory) {
        Float[] memory result = new Float[](a.length);
        for (uint256 i = 0; i < a.length; i++) {
            result[i] = fromWad(a[i]);
        }
        return result;
    }

    function toFloatArray(
        uint256[] memory a,
        uint8[] memory decimals
    ) internal pure returns (Float[] memory) {
        Float[] memory result = new Float[](a.length);
        for (uint256 i = 0; i < a.length; i++) {
            result[i] = fromDecimals(a[i], decimals[i]);
        }
        return result;
    }

    function normalize(Float memory a) internal pure returns (Float memory) {
        if (a.mantissa == 0) return Float(0, 0);
        while (a.mantissa >= 10 ** SIGNIFICANT_DIGITS) {
            a.mantissa /= 10;
            a.exponent++;
        }
        while (a.mantissa < 10 ** (SIGNIFICANT_DIGITS - 1)) {
            a.mantissa *= 10;
            a.exponent--; // Will revert on underflow
        }
        return a;
    }

    function align(
        Float memory a,
        Float memory b
    ) internal pure returns (Float memory, Float memory) {
        if (a.exponent > b.exponent) {
            a.mantissa *= 10 ** uint256(a.exponent - b.exponent);
            a.exponent = b.exponent;
        } else if (a.exponent < b.exponent) {
            b.mantissa *= 10 ** uint256(b.exponent - a.exponent);
            b.exponent = a.exponent;
        }
        return (a, b);
    }

    function isEqual(
        Float memory a,
        Float memory b
    ) internal pure returns (bool) {
        (a, b) = align(a, b);
        return a.mantissa == b.mantissa;
    }

    function gt(Float memory a, Float memory b) internal pure returns (bool) {
        (a, b) = align(a, b);
        return a.mantissa > b.mantissa;
    }

    function gte(Float memory a, Float memory b) internal pure returns (bool) {
        (a, b) = align(a, b);
        return a.mantissa >= b.mantissa;
    }

    function lt(Float memory a, Float memory b) internal pure returns (bool) {
        (a, b) = align(a, b);
        return a.mantissa < b.mantissa;
    }

    function lte(Float memory a, Float memory b) internal pure returns (bool) {
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

    function plus(
        Float memory a,
        Float memory b
    ) internal pure returns (Float memory) {
        if (a.exponent > b.exponent) {
            a.mantissa *= 10 ** uint256(a.exponent - b.exponent);
            a.exponent = b.exponent;
        } else if (a.exponent < b.exponent) {
            b.mantissa *= 10 ** uint256(b.exponent - a.exponent);
            b.exponent = a.exponent;
        }
        return normalize(Float(a.mantissa + b.mantissa, a.exponent));
        // return Float(a.mantissa + b.mantissa, a.exponent);
    }

    function minus(
        Float memory a,
        Float memory b
    ) internal pure returns (Float memory) {
        if (a.exponent > b.exponent) {
            a.mantissa *= 10 ** uint256(a.exponent - b.exponent);
            a.exponent = b.exponent;
        } else if (a.exponent < b.exponent) {
            b.mantissa *= 10 ** uint256(b.exponent - a.exponent);
            b.exponent = a.exponent;
        }
        return normalize(Float(a.mantissa - b.mantissa, a.exponent));
        // return Float(a.mantissa - b.mantissa, a.exponent);
    }

    function times(
        Float memory a,
        Float memory b
    ) internal pure returns (Float memory) {
        // if (a.mantissa == 0 || b.mantissa == 0) return Float(0, 0);
        // a = normalize(a);
        // b = normalize(b);

        // return
        //     normalize(Float(a.mantissa * b.mantissa, a.exponent + b.exponent));
        return
            normalize(
                Float(
                    (a.mantissa * b.mantissa) / 10 ** SIGNIFICANT_DIGITS,
                    int256(SIGNIFICANT_DIGITS) + a.exponent + b.exponent
                )
            );
        // return Float(a.mantissa * b.mantissa, a.exponent + b.exponent);
    }

    function times(
        Float memory a,
        uint256 b
    ) internal pure returns (Float memory) {
        return times(a, Float(b, 0));
    }

    function times(
        uint256 a,
        Float memory b
    ) internal pure returns (Float memory) {
        return times(Float(a, 0), b);
    }

    function divide(
        Float memory a,
        Float memory b
    ) internal pure returns (Float memory) {
        // if (a.mantissa == 0) return Float(0, 0);
        // a = normalize(a);
        // b = normalize(b);

        return
            normalize(
                Float(
                    (a.mantissa * 10 ** SIGNIFICANT_DIGITS) / b.mantissa,
                    a.exponent - b.exponent - int256(SIGNIFICANT_DIGITS)
                )
            );
        // return
        //     Float(
        //         (a.mantissa * 10 ** SIGNIFICANT_DIGITS) / b.mantissa,
        //         a.exponent - b.exponent - int256(SIGNIFICANT_DIGITS)
        //     );
    }

    function divide(
        Float memory a,
        uint256 b
    ) internal pure returns (Float memory) {
        return divide(a, Float(b, 0));
    }

    function divide(
        uint256 a,
        Float memory b
    ) internal pure returns (Float memory) {
        return divide(Float(a, 0), b);
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
        Float memory a,
        Float memory b,
        Float memory c
    ) internal pure returns (Float memory) {
        // if (a.mantissa == 0 || b.mantissa == 0) return (0, 0);
        // a = normalize(a);
        // b = normalize(b);
        // c = normalize(c);

        return
            normalize(
                Float(
                    (a.mantissa * b.mantissa * 10 ** SIGNIFICANT_DIGITS) /
                        c.mantissa,
                    a.exponent +
                        b.exponent -
                        c.exponent -
                        int256(SIGNIFICANT_DIGITS)
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
    //     Float memory a,
    //     Float memory b,
    //     Float memory c
    // ) internal pure returns (Float memory) {
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
    //     return Float(mantissa, exponent);
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
        Float memory a,
        Float memory b,
        Float memory db
    ) internal pure returns (Float memory) {
        (b, db) = align(b, db);

        // Normalize result
        return
            normalize(
                Float(
                    (a.mantissa * db.mantissa * 10 ** SIGNIFICANT_DIGITS) /
                        (b.mantissa + db.mantissa),
                    a.exponent - int256(SIGNIFICANT_DIGITS)
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

    function toString(uint256 value) public pure returns (string memory) {
        return string(toStringBytes(value));
    }

    function integerPart(Float memory number) public pure returns (uint256) {
        // Handle the special case of zero.
        if (number.mantissa == 0) {
            return 0;
        } else if (number.exponent >= 0) {
            return number.mantissa * 10 ** uint256(number.exponent);
        } else {
            return number.mantissa / 10 ** uint256(-number.exponent);
        }
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

    function toString(Float memory number) public pure returns (string memory) {
        // Handle the special case of zero.
        if (number.mantissa == 0) {
            return "0.0";
        }

        uint256 integerPartUint = integerPart(number);
        if (number.exponent >= 0) {
            return string(abi.encodePacked(toString(integerPartUint), ".0"));
        }

        Float memory integerPartFloat = Float(integerPartUint, 0);
        Float memory fractionalPartFloat = normalize(
            minus(number, integerPartFloat)
        );

        if (fractionalPartFloat.mantissa == 0) {
            return string(abi.encodePacked(toString(integerPartUint), ".0"));
        }

        // Determine the length of the decimal number.
        uint256 temp = integerPartUint;
        uint256 integerDigits;
        while (temp != 0) {
            integerDigits++;
            temp /= 10;
        }

        uint256 fractionalDigits = SIGNIFICANT_DIGITS - integerDigits;
        uint256 zeroPadding;
        if (
            integerPartUint == 0 &&
            int256(SIGNIFICANT_DIGITS) < -fractionalPartFloat.exponent
        ) {
            zeroPadding = uint256(
                -fractionalPartFloat.exponent - int256(SIGNIFICANT_DIGITS)
            );
        }

        bytes memory fractionalPartBytesFull = toStringBytes(
            fractionalPartFloat.mantissa
        );
        bytes memory fractionalPartBytes = new bytes(
            fractionalDigits + zeroPadding
        );
        for (uint256 i = 0; i < fractionalDigits + zeroPadding; i++) {
            if (i < zeroPadding) {
                fractionalPartBytes[i] = "0";
            } else {
                fractionalPartBytes[i] = fractionalPartBytesFull[
                    i - zeroPadding
                ];
            }
        }
        return
            string(
                abi.encodePacked(
                    toString(integerPartUint),
                    ".",
                    trimStringRight(string(fractionalPartBytes))
                )
            );
    }

    // function toString(Float memory number) public pure returns (string memory) {
    //     // Handle the special case of zero.
    //     if (number.mantissa == 0) {
    //         return "0.0";
    //     }

    //     uint256 integerPartUint = integerPart(number);
    //     if (number.exponent >= EXPONENT_BIAS) {
    //         return string(abi.encodePacked(toString(integerPartUint), ".0"));
    //     }

    //     Float memory fractionalPartFloat = minus(
    //         number,
    //         Float(integerPartUint, 0)
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
    //         times(fractionalPartFloat, Float(10 ** fractionalDigits, 0))
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

    // function toString(Float memory number) public pure returns (string memory) {
    //     // Handle the special case of zero.
    //     if (number.mantissa == 0) {
    //         return "0.0";
    //     }

    //     uint256 integerPartUint = integerPart(number);
    //     if (number.exponent >= EXPONENT_BIAS) {
    //         return string(abi.encodePacked(toString(integerPartUint), ".0"));
    //     }

    //     Float memory fractionalPartFloat = minus(
    //         number,
    //         Float(integerPartUint, 0)
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
    //         times(fractionalPartFloat, Float(10 ** fractionalDigits, 0))
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

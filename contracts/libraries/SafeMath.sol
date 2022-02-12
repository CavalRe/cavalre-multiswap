// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.11;

// From Uniswap v2 (which is from DappHub)
library SafeMath {
    function add(uint x, uint y) internal pure returns (uint z) {
        require((z = x + y) >= x, 'ds-math-add-overflow');
    }

    function sub(uint x, uint y) internal pure returns (uint z) {
        require((z = x - y) <= x, 'ds-math-sub-underflow');
    }

    function mul(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x, 'ds-math-mul-overflow');
    }

    uint constant UNIT = 10 ** 18; // Number of decimals

    function dmul(uint x, uint y) internal pure returns (uint z) {
        z = add(mul(x, y), UNIT / 2) / UNIT;
    }

    function ddiv(uint x, uint y) internal pure returns (uint z) {
        z = add(mul(x, UNIT), y / 2) / y;
    }

    // function dmul(uint x, uint y, uint unit) internal pure returns (uint z) {
    //     z = add(mul(x, y), unit / 2) / unit;
    // }

    // function ddiv(uint x, uint y, uint unit) internal pure returns (uint z) {
    //     z = add(mul(x, unit), y / 2) / y;
    // }
}
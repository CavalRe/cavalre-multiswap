// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// From Uniswap v2 (which is from DappHub)
library DMath {
    uint256 public constant ONE = 10**18; // Number of decimals

    function dmul(uint256 x, uint256 y) internal pure returns (uint256 z) {
        z = (x * y + ONE / 2) / ONE;
    }

    function ddiv(uint256 x, uint256 y) internal pure returns (uint256 z) {
        z = (x * ONE + y / 2) / y;
    }
}

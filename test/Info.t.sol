// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.16;

import { console } from "forge-std/console.sol";
import "./TestRoot.t.sol";
import "../src/Pool.sol";

contract InfoTest is TestRoot {
    /// @dev check number of tokens return is equal to the initial number of tokens
    function testAssets() public {
        AssetWithMetadata[] memory assets = pool.assets();
        assertEq(assets.length, NTOKENS);
        assertEq(assets[0].name, "Token");
        assertEq(assets[0].symbol, "T");
        assertGt(assets[0].balance, 0);
        assertGt(assets[0].decimals, 0);
        assertGt(assets[0].scale, 0);
        assertGt(assets[0].fee, 0);
        assertEq(assets[0].token, address(tokens[0]));
    }

    /// @dev check that `pool` returns expected values
    function testPool() public {
        address poolAddress;
        string memory name;
        string memory symbol;
        uint8 decimals;
        uint256 balance;
        uint256 scale;

        (poolAddress, name, symbol, decimals, balance, scale) = pool.pool();
        assertEq(poolAddress, address(pool));
        assertEq(name, "Pool");
        assertEq(symbol, "P");
    }

    /// @dev check that `balance` returns some balance
    function testBalance() public {
        uint256 balance = pool.balance();
        assertGt(balance, 0);
    }
}

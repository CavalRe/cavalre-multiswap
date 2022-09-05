// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.16;

import { console } from "forge-std/console.sol";
import "./TestRoot.t.sol";
import "../src/Pool.sol";

contract InfoTest is TestRoot {
    /// @dev check number of tokens return is equal to the initial number of tokens
    function testAssets() public {
        Asset[] memory assets = pool.assets();
        assertEq(assets.length, NTOKENS);
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

    /// @dev smoke test for `asset`
    function testAsset() public {
        Asset memory asset = pool.asset(address(tokens[0]));
        assertGt(asset.balance, 0);
    }

    /// @dev `asset` should revert with `AssetNotFound` if the address is not a managed asset
    function testCannotInvalidAsset() public {
        Token token = new Token("Foo", "FOO", 18);
        vm.expectRevert(abi.encodeWithSelector(Pool.AssetNotFound.selector, address(token)));
        pool.asset(address(token));
    }
}

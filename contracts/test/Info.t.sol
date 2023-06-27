// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {console} from "forge-std/console.sol";
import "@cavalre/test/TestRoot.t.sol";
import "@cavalre/Pool.sol";

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
        uint256 meanBalance;
        uint256 meanScale;

        (
            poolAddress,
            name,
            symbol,
            decimals,
            ,
            balance,
            scale,
            meanBalance,
            meanScale
        ) = pool.info();
        assertEq(poolAddress, address(pool));
        assertEq(name, "Pool");
        assertEq(symbol, "P");
        assertEq(balance, meanBalance);
        assertEq(scale, meanScale);
    }

    /// @dev check that `balance` returns some balance
    function testBalance() public {
        uint256 balance = pool.balance();
        assertGt(balance, 0);
    }

    /// @dev smoke test for `asset`
    function testAsset() public {
        Asset memory asset = pool.asset(address(tokens[0]));
        assertGt(asset.state.balance, 0);
    }

    /// @dev `asset` should revert with `AssetNotFound` if the address is not a managed asset
    function testCannotInvalidAsset() public {
        Token token = new Token("Foo", "FOO");
        vm.expectRevert(
            abi.encodeWithSelector(Pool.AssetNotFound.selector, address(token))
        );
        pool.asset(address(token));
    }
}

// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {TestRoot, Token} from "./TestRoot.t.sol";
import {PoolState, IPool, AssetState} from "../contracts/Pool.sol";

contract InfoTest is TestRoot {
    /// @dev check number of tokens return is equal to the initial number of tokens
    function testAssets() public {
        AssetState[] memory assets = pool._assets();
        assertEq(assets.length, NTOKENS);
    }

    /// @dev check that `pool` returns expected values
    function testPool() public {
        PoolState memory pool_ = pool._info();
        assertEq(pool_.token, address(pool));
        assertEq(pool_.name, "Pool");
        assertEq(pool_.symbol, "P");
    }

    /// @dev check that `balance` returns some balance
    function testBalance() public {
        uint256 balance = pool.info().balance;
        assertGt(balance, 0);
    }

    /// @dev smoke test for `asset`
    function testAsset() public {
        AssetState memory asset = pool._asset(address(tokens[0]));
        assertGt(asset.balance.mantissa, 0);
    }

    /// @dev `asset` should revert with `AssetNotFound` if the address is not a managed asset
    function testCannotInvalidAsset() public {
        Token token = new Token("Foo", "FOO", 18);
        vm.expectRevert(
            abi.encodeWithSelector(IPool.AssetNotFound.selector, address(token))
        );
        pool.asset(address(token));
    }
}

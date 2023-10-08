// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "@cavalre/test/Pool.t.sol";

contract UsersTest is PoolTest {
    Pool private pool;
    Token[] private tokens;

    uint256 amount;

    function setUp() public {
        vm.startPrank(alice);

        (pool, tokens) = setUpPool();

        assertEq(pool.owner(), alice, "Owner of pool.");

        USDC.mint(1e24);
        (amount,) = pool.stake(address(USDC), 1e24, 0);
    }

    function testUsers_isAllowed() public {
        assertTrue(
            pool.isAllowed(alice),
            "Alice is allowed."
        );
    }

    function testUsers_setisAllowed() public {
        pool.setIsAllowed(alice, false);

        assertFalse(
            pool.isAllowed(alice),
            "Alice is not allowed after being disappowed."
        );

        assertEq(
            pool.balanceOf(alice),
            0,
            "Alice's balance is 0 after being disallowed."
        );
    }
}

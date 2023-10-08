// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "@cavalre/test/Pool.t.sol";

contract UsersTest is PoolTest {
    Pool private pool;
    Token[] private tokens;

    function setUp() public {
        vm.startPrank(alice);

        (pool, tokens) = setUpPool();

        assertEq(pool.owner(), alice, "Owner of pool.");
    }

    function testUsers_isAllowed() public {
        assertTrue(pool.isAllowed(alice), "Alice is allowed.");
    }

    function testUsers_setIsAllowed() public {
        uint256 usdcBalance = USDC.balanceOf(address(pool));

        emit log("Before mint");
        USDC.mint(usdcBalance/10);
        emit log("After mint");

        pool.stake(address(USDC), usdcBalance/10, 0);
        emit log("After stake");

        assertGt(pool.balanceOf(alice), 0, "Alice's balance is greater than 0.");

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

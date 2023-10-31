// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "../contracts/Users.sol";
import "./Pool.t.sol";

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
        vm.startPrank(bob);

        uint256 amount = USDC.balanceOf(address(pool)) / 10;
        USDC.mint(amount);
        USDC.increaseAllowance(address(pool), amount);
        pool.stake(address(USDC), amount, 0);

        assertGt(pool.balanceOf(bob), 0, "Bob's balance is greater than 0.");

        vm.stopPrank();

        vm.startPrank(alice);

        pool.setIsAllowed(bob, false);

        assertFalse(
            pool.isAllowed(bob),
            "Bob is not allowed after being disappowed."
        );

        assertEq(
            pool.balanceOf(bob),
            0,
            "Bob's balance is 0 after being disallowed."
        );

        vm.expectRevert(
            abi.encodeWithSelector(IUsers.CannotModify.selector, alice)
        );
        pool.setIsAllowed(alice, false);

        vm.stopPrank();
    }
}

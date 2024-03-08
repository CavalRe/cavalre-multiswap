// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.24;

import "../contracts/Users.sol";
import "./Pool.t.sol";

contract UsersTest is PoolTest {
    Pool private pool;
    Token[] private tokens;

    function setUp() public {
        console.log("Setting up UsersTest");

        uint256 startBalance = type(uint256).max / 2;
        vm.deal(alice, startBalance);
        vm.deal(bob, startBalance);
        vm.deal(carol, startBalance);

        console.log("Transferred tokens to users.");

        vm.startPrank(alice);

        (pool, tokens) = setUpPool("Pool", "P", 2e17, 1e16);

        assertEq(pool.owner(), alice, "Owner of pool.");
    }

    function testUsers_isAllowed() public {
        assertTrue(pool.isAllowed(alice), "Alice is allowed.");
    }

    function testUsers_setIsAllowed() public {
        vm.startPrank(bob);

        uint256 amount = USDC.balanceOf(address(pool)) / 10;

        console.log("Minting USDC for Bob.");
        USDC.mint(amount);
        console.log("Approving USDC for Bob.");
        USDC.increaseAllowance(address(pool), amount);
        console.log("Staking USDC");
        pool.stake(address(USDC), amount, 0);
        console.log("Stake completed");

        assertGt(pool.balanceOf(bob), 0, "Bob's balance is greater than 0.");

        vm.stopPrank();

        vm.startPrank(alice);

        console.log("Block bob.");
        pool.setIsAllowed(bob, false);
        console.log("Bob blocked.");

        assertFalse(
            pool.isAllowed(bob),
            "Bob is not allowed after being disappowed."
        );

        assertEq(
            pool.balanceOf(bob),
            0,
            "Bob's balance is 0 after being disallowed."
        );

        console.log("Block alice");

        vm.expectRevert(
            abi.encodeWithSelector(IUsers.CannotModify.selector, alice)
        );
        pool.setIsAllowed(alice, false);

        vm.stopPrank();
    }
}

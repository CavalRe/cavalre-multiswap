// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.16;

import "./TestRoot.t.sol";
import { console } from "forge-std/console.sol";

contract UnstakeTest is TestRoot {
    /*
     * Basic
     */
    function testUnstakeSmoke() public {
        address alice = address(1);
        vm.startPrank(alice);

        Token depositToken = tokens[0];
        uint256 amount = 1e27;
        depositToken.mint(amount);
        depositToken.approve(address(pool), amount);

        uint256 amountOut = pool.stake(address(depositToken), amount, alice);
        pool.approve(address(pool), amountOut);
        pool.unstake(address(depositToken), amountOut, alice);

        assertEq(pool.balanceOf(alice), 0);
        assertEq(depositToken.balanceOf(alice) > 0, true);

        vm.stopPrank();
    }

    function testUnstakeFuzz(uint256 amount, uint256 depositIndex) public {
        address alice = address(1);
        vm.startPrank(alice);

        depositIndex = depositIndex % tokens.length;
        amount = (amount % 1e59) + 1e17;
        Token depositToken = tokens[depositIndex];
        depositToken.mint(amount);
        depositToken.approve(address(pool), amount);

        assertEq(pool.balanceOf(alice), 0);
        assertEq(depositToken.balanceOf(alice) > 0, true);

        uint256 amountOut = pool.stake(address(depositToken), amount, alice);
        pool.approve(address(pool), amountOut);
        pool.unstake(address(depositToken), amountOut, alice);

        assertEq(pool.balanceOf(alice), 0);
        assertEq(depositToken.balanceOf(alice) > 0, true);

        vm.stopPrank();
    }

    function testUnstakeOtherAccount(uint256 depositIndex, uint256 amount) public {
        address alice = address(1);
        vm.startPrank(alice);

        address bob = address(3);
        depositIndex = depositIndex % tokens.length;
        Token depositToken = tokens[depositIndex];
        amount = (amount % 1e30) + 1e17;

        assertEq(depositToken.balanceOf(alice), 0);
        assertEq(depositToken.balanceOf(bob), 0);
        assertEq(pool.balanceOf(alice), 0);
        assertEq(pool.balanceOf(bob), 0);

        depositToken.mint(amount);
        depositToken.approve(address(pool), amount);
        uint256 normalizedAmount = amount * (10**(18 - depositToken.decimals()));
        uint256 stakeOut = pool.stake(address(depositToken), normalizedAmount, alice);
        uint256 unstakeOut = pool.unstake(address(depositToken), stakeOut, bob);

        // alice -> pool -> bob
        assertEq(pool.balanceOf(alice), 0);
        assertEq(depositToken.balanceOf(alice), 0);
        assertEq(pool.balanceOf(bob), 0);
        assertEq(depositToken.balanceOf(bob) > 0, true);
        assertEq(depositToken.balanceOf(bob), unstakeOut);

        vm.stopPrank();
    }

    /*
     * Input Checking (Negative)
     */

    /// @dev `unstake` should revert with `InvalidUnstake` if the address is not a managed asset
    function testBadDepositAddress() public {
        Token token = new Token("Foo", "FOO", 18);
        address withdrawalAddress = address(token);
        vm.expectRevert(abi.encodeWithSelector(Pool.InvalidUnstake.selector, withdrawalAddress));
        pool.unstake(withdrawalAddress, 0, address(1));
    }

    function testUnstakeZeroAmount(uint256 depositIndex) public {
        address alice = address(1);
        vm.startPrank(alice);

        depositIndex = depositIndex % tokens.length;
        Token depositToken = tokens[depositIndex];

        assertEq(pool.balanceOf(alice), 0);
        pool.unstake(address(depositToken), 0, alice);
        assertEq(pool.balanceOf(alice), 0);
        assertEq(depositToken.balanceOf(alice), 0);

        vm.stopPrank();
    }

    // TODO check no balance for other functions
    // TODO is `_burn` as secure as `safeTransfer` ?
    function testUnstakeNoBalance() public {
        address alice = address(1);
        vm.startPrank(alice);

        Token depositToken = tokens[0];
        uint256 amount = 1e18;

        vm.expectRevert("ERC20: burn amount exceeds balance");
        pool.unstake(address(depositToken), amount, alice);

        vm.stopPrank();
    }

    function testUnstakeInsufficientAllowance() public {
        address bob = address(2);
        vm.startPrank(bob);

        Token depositToken = tokens[0];
        uint256 amount = 1e18;

        // TODO is it desirable that `unstake` does not require a specific allowance
        //vm.expectRevert("ERC20: insufficient allowance");
        pool.unstake(address(depositToken), amount, bob);

        vm.stopPrank();
    }

    /*
     * Pathological
     */
    function testFailUnstakeBadToken(uint256 amount) public {
        address alice = address(1);
        vm.startPrank(alice);

        amount = (amount % 1e59) + 1e15;

        pool.stake(address(0), amount, alice);

        vm.stopPrank();
    }
}

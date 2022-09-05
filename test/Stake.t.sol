// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.16;

import { console } from "forge-std/console.sol";
import "./TestRoot.t.sol";

contract StakeTest is TestRoot {
    function testStakeSmoke() public {
        address alice = address(1);
        vm.startPrank(alice);

        Token depositToken = tokens[0];
        uint256 amount = 1e27;
        depositToken.mint(amount);
        depositToken.approve(address(pool), amount);

        pool.stake(address(depositToken), amount, alice);

        vm.stopPrank();
    }

    function testStakeFuzz(uint256 amount, uint256 depositIndex) public {
        address alice = address(1);
        vm.startPrank(alice);

        depositIndex = depositIndex % tokens.length;
        amount = (amount % 1e59) + 1e17;
        Token depositToken = tokens[depositIndex];

        assertEq(pool.balanceOf(alice), 0);

        depositToken.mint(amount);
        depositToken.approve(address(pool), amount);
        pool.stake(address(depositToken), amount, alice);

        assertEq(pool.balanceOf(alice) > 0, true);

        vm.stopPrank();
    }

    function testStakeOtherAccount(uint256 depositIndex, uint256 amount) public {
        address alice = address(1);
        vm.startPrank(alice);

        address bob = address(3);
        depositIndex = depositIndex % tokens.length;
        Token depositToken = tokens[depositIndex];
        amount = (amount % 1e40) + 1e17;

        assertEq(pool.balanceOf(alice), 0);
        assertEq(pool.balanceOf(bob), 0);

        depositToken.mint(amount);
        depositToken.approve(address(pool), amount);
        uint256 amountOut = pool.stake(address(depositToken), amount, bob);
        console.log("AMOUNT OUT", amountOut);

        assertEq(pool.balanceOf(alice), 0);
        assertEq(pool.balanceOf(bob) > 0, true);
        assertEq(pool.balanceOf(bob), amountOut);

        vm.stopPrank();
    }

    /*
     * Input Checking (Negative)
     */

    /// @dev `stake` should revert with `InvalidStake` if the address is not a managed asset
    function testBadDepositAddress() public {
        Token token = new Token("Foo", "FOO", 18);
        address depositAddress = address(token);
        vm.expectRevert(abi.encodeWithSelector(Pool.InvalidStake.selector, depositAddress));
        pool.stake(depositAddress, 0, address(1));
    }

    function testStakeZeroAmount(uint256 depositIndex) public {
        address alice = address(1);
        vm.startPrank(alice);

        depositIndex = depositIndex % tokens.length;
        Token depositToken = tokens[depositIndex];

        assertEq(pool.balanceOf(alice), 0);
        pool.stake(address(depositToken), 0, alice);
        assertEq(pool.balanceOf(alice), 0);

        vm.stopPrank();
    }

    function testStakeNoAllowance() public {
        address alice = address(1);
        vm.startPrank(alice);

        Token depositToken = tokens[0];
        uint256 amount = 1e27;
        depositToken.mint(amount);

        vm.expectRevert("ERC20: insufficient allowance");
        pool.stake(address(depositToken), amount, alice);

        vm.stopPrank();
    }

    /*
     * Pathological
     */
    function testFailStakeBadToken(uint256 amount) public {
        address alice = address(1);
        vm.startPrank(alice);

        amount = (amount % 1e59) + 1e15;

        pool.stake(address(0), amount, alice);

        vm.stopPrank();
    }
}

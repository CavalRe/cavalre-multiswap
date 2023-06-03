// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import { console } from "forge-std/console.sol";
import "@cavalre/test/TestRoot.t.sol";

contract StakeTest is TestRoot {
    function testStakeSmoke() public {
        address alice = address(1);
        vm.startPrank(alice);

        Token depositToken = tokens[0];
        uint256 amount = 1e27;
        depositToken.mint(amount);
        depositToken.approve(address(pool), amount);

        pool.stake(address(depositToken), amount);

        vm.stopPrank();
    }

    function testStakeFuzz(uint256 amount, uint256 depositIndex) public {
        address alice = address(1);
        vm.startPrank(alice);

        depositIndex = depositIndex % tokens.length;
        Token depositToken = tokens[depositIndex];
        Asset memory depositAsset = pool.asset(address(depositToken));

        uint256 balance = depositAsset.state.balance;
        amount = (amount % (8 * balance / 3)) + 1e17;

        assertEq(pool.balanceOf(alice), 0);

        depositToken.mint(amount);
        depositToken.approve(address(pool), amount);
        if (amount * 3 > balance * 4) {
            vm.expectRevert(abi.encodeWithSelector(Pool.TooLarge.selector, amount));
            pool.stake(address(depositToken), amount);
        } else {
            pool.stake(address(depositToken), amount);
            assertGt(pool.balanceOf(alice), 0);
        }

        vm.stopPrank();
    }

    // function testStakeOtherAccount(uint256 depositIndex, uint256 amount) public {
    //     address alice = address(1);
    //     vm.startPrank(alice);

    //     address bob = address(3);
    //     depositIndex = depositIndex % tokens.length;
    //     Token depositToken = tokens[depositIndex];
    //     amount = (amount % 1e59) + 1e17;

    //     assertEq(pool.balanceOf(alice), 0);
    //     assertEq(pool.balanceOf(bob), 0);

    //     depositToken.mint(amount);
    //     depositToken.approve(address(pool), amount);
    //     uint256 amountOut = pool.stake(address(depositToken), amount);
    //     console.log("AMOUNT OUT", amountOut);

    //     assertEq(pool.balanceOf(alice), 0);
    //     assertEq(pool.balanceOf(bob) > 0, true);
    //     assertEq(pool.balanceOf(bob), amountOut);

    //     vm.stopPrank();
    // }

    /*
     * Input Checking (Negative)
     */

    /// @dev `stake` should revert with `InvalidStake` if the address is not a managed asset
    function testBadDepositAddress() public {
        Token token = new Token("Foo", "FOO");
        address depositAddress = address(token);
        vm.expectRevert(abi.encodeWithSelector(Pool.InvalidStake.selector, depositAddress));
        pool.stake(depositAddress, 0);
    }

    function testStakeZeroAmount(uint256 depositIndex) public {
        address alice = address(1);
        vm.startPrank(alice);

        depositIndex = depositIndex % tokens.length;
        Token depositToken = tokens[depositIndex];

        assertEq(pool.balanceOf(alice), 0);
        pool.stake(address(depositToken), 0);
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
        pool.stake(address(depositToken), amount);

        vm.stopPrank();
    }

    /*
     * Pathological
     */
    function testFailStakeBadToken(uint256 amount) public {
        address alice = address(1);
        vm.startPrank(alice);

        amount = (amount % 1e59) + 1e15;

        pool.stake(address(0), amount);

        vm.stopPrank();
    }
}

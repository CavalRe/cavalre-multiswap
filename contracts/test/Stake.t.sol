// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {console} from "forge-std/console.sol";
import "@cavalre/test/TestRoot.t.sol";
import "solady/utils/FixedPointMathLib.sol";

contract StakeTest is TestRoot {
    using FixedPointMathLib for uint256;

    function testStakeSmoke() public {
        Token payToken = tokens[0];
        uint256 payBalance = payToken.balanceOf(alice);
        uint256 poolBalance = pool.balanceOf(alice);

        uint256 amountOut;

        uint256 amount = 1e27;
        payToken.mint(amount);

        assertEq(
            payToken.balanceOf(alice),
            payBalance + amount,
            "Pay token balance before stake."
        );

        payToken.approve(address(pool), amount);

        (amountOut, ) = pool.stake(address(payToken), amount);

        assertEq(
            payToken.balanceOf(alice),
            payBalance,
            "Pay token balance after stake."
        );

        assertEq(
            pool.balanceOf(alice),
            poolBalance + amountOut,
            "Pool balance after stake."
        );
    }

    function testStakeFuzz(uint256 amount, uint256 payIndex) public {
        checkLP();

        payIndex = payIndex % tokens.length;
        Token payToken = tokens[payIndex];
        AssetState memory payAsset = pool.asset(address(payToken));

        uint256 amountOut;

        uint256 balance = payAsset.balance;
        amount = (amount % ((8 * balance) / 3));
        vm.assume(amount > 1e17);

        payToken.mint(amount);
        payToken.approve(address(pool), amount);
        if (amount * 3 > balance) {
            vm.expectRevert(
                abi.encodeWithSelector(Pool.TooLarge.selector, amount)
            );
            pool.stake(address(payToken), amount);
        } else {
            (amountOut, ) = pool.stake(address(payToken), amount);

            checkSF(address(payToken), address(pool), amount, amountOut);

            assertGt(
                pool.balanceOf(alice),
                0,
                "Alice's final pool balance is zero."
            );
            assertEq(
                payToken.balanceOf(alice),
                0,
                "Alice's final deposit token balance is not zero."
            );
            checkLP(amount, amountOut);
        }
    }

    // function testStakeOtherAccount(uint256 payIndex, uint256 amount) public {
    //     address alice = address(1);
    //     vm.startPrank(alice);

    //     address bob = address(3);
    //     payIndex = payIndex % tokens.length;
    //     Token payToken = tokens[payIndex];
    //     amount = (amount % 1e59) + 1e17;

    //     assertEq(pool.balanceOf(alice), 0);
    //     assertEq(pool.balanceOf(bob), 0);

    //     payToken.mint(amount);
    //     payToken.approve(address(pool), amount);
    //     uint256 amountOut = pool.stake(address(payToken), amount);
    //     console.log("AMOUNT OUT", amountOut);

    //     assertEq(pool.balanceOf(alice), 0);
    //     assertEq(pool.balanceOf(bob) > 0, true);
    //     assertEq(pool.balanceOf(bob), amountOut);

    //     vm.stopPrank();
    // }

    /*
     * Input Checking (Negative)
     */

    /// @dev `stake` should revert with `AssetNotFound` if the address is not a managed asset
    function testBadDepositAddress() public {
        Token token = new Token("Foo", "FOO");
        address depositAddress = address(token);
        vm.expectRevert(
            abi.encodeWithSelector(Pool.AssetNotFound.selector, depositAddress)
        );
        pool.stake(depositAddress, 0);
    }

    function testStakeZeroAmount(uint256 payIndex) public {
        payIndex = payIndex % tokens.length;
        Token payToken = tokens[payIndex];

        uint256 balance = pool.balanceOf(alice);

        pool.stake(address(payToken), 0);
        assertEq(pool.balanceOf(alice), balance);
    }

    function testStakeNoAllowance() public {
        Token payToken = tokens[0];
        uint256 amount = 1e27;
        payToken.mint(amount);

        vm.expectRevert("ERC20: insufficient allowance");
        pool.stake(address(payToken), amount);
    }

    /*
     * Pathological
     */
    function testFailStakeBadToken(uint256 amount) public {
        amount = (amount % 1e59) + 1e15;

        pool.stake(address(0), amount);
    }
}

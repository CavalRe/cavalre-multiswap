// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.24;

import {console} from "forge-std/console.sol";
import "./TestRoot.t.sol";
import "solady/src/utils/FixedPointMathLib.sol";

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

        (amountOut, ) = pool.stake(address(payToken), amount, 0);

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
                abi.encodeWithSelector(IPool.TooLarge.selector, amount)
            );
            pool.stake(address(payToken), amount, 0);
        } else {
            (amountOut, ) = pool.stake(address(payToken), amount, 0);

            console.log("Check self financing");
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

    /*
     * Input Checking (Negative)
     */

    /// @dev `stake` should revert with `AssetNotFound` if the address is not a managed asset
    function testBadDepositAddress() public {
        Token token = new Token("Foo", "FOO", 18);
        address depositAddress = address(token);
        vm.expectRevert(
            abi.encodeWithSelector(IPool.AssetNotFound.selector, depositAddress)
        );
        pool.stake(depositAddress, 0, 0);
    }

    function testStakeZeroAmount(uint256 payIndex) public {
        payIndex = payIndex % tokens.length;
        Token payToken = tokens[payIndex];

        uint256 balance = pool.balanceOf(alice);

        vm.expectRevert(
            abi.encodeWithSelector(IPool.ZeroAmount.selector)
        );
        pool.stake(address(payToken), 0, 0);
        assertEq(pool.balanceOf(alice), balance);
    }

    function testStakeNoAllowance() public {
        Token payToken = tokens[0];
        uint256 amount = 1e27;
        payToken.mint(amount);

        vm.expectRevert("ERC20: insufficient allowance");
        pool.stake(address(payToken), amount, 0);
    }

    /*
     * Pathological
     */
    function testFailStakeBadToken(uint256 amount) public {
        amount = (amount % 1e59) + 1e15;

        pool.stake(address(0), amount, 0);
    }
}

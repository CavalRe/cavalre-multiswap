// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {Pool, IPool, FP, UFloat} from "../contracts/Pool.sol";
import {PoolTest, Token} from "./Pool.t.sol";

contract UnstakeTest is PoolTest {
    using FP for uint256;
    using FP for UFloat;

    function setUp() public {
        uint256 startBalance = type(uint256).max / 2;
        vm.deal(alice, startBalance);
        vm.deal(bob, startBalance);
        vm.deal(carol, startBalance);

        vm.startPrank(alice);

        setUpPool("Pool", "P", 2e17);
    }

    /*
     * Basic
     */
    function testUnstakeSmoke() public {
        vm.startPrank(alice);

        Token receiveToken = tokens[0];
        uint256 receiveBalance = receiveToken.balanceOf(alice);
        uint256 poolBalance = pool.balanceOf(alice);

        uint256 receiveAmount;
        uint256 amountOut;
        uint256 feeAmount;

        uint256 amount = receiveToken.balanceOf(address(pool)) / 10;
        receiveToken.mint(amount);

        assertEq(
            receiveToken.balanceOf(alice),
            receiveBalance + amount,
            "Alice's receive token balance before unstake."
        );

        receiveToken.approve(address(pool), amount);

        (amountOut, ) = pool.stake(address(receiveToken), amount, 0);

        assertEq(
            receiveToken.balanceOf(alice),
            receiveBalance,
            "Alice's receive token balance after staking."
        );

        assertEq(
            pool.balanceOf(alice),
            poolBalance + amountOut,
            "Alice's pool balance after staking."
        );

        pool.approve(address(pool), amountOut);

        (receiveAmount, feeAmount) = pool.unstake(
            address(receiveToken),
            amountOut,
            0
        );

        assertEq(
            receiveToken.balanceOf(alice),
            receiveBalance + receiveAmount,
            "Alice's pool balance after unstaking."
        );
        assertApproxEqRel(
            pool.balanceOf(alice),
            poolBalance,
            1e12,
            "Alice's pool balance after unstaking."
        );

        UFloat memory amountFloat = UFloat(amount, -18).normalize();

        setUp();

        checkUnstake(pool, address(receiveToken), amountFloat);
    }

    function testUnstakeFuzz(uint256 amount, uint256 receiveIndex) public {
        vm.assume(amount > 0 && amount <= ((pool.totalSupply() * 9) / 10));

        vm.startPrank(alice);

        receiveIndex = receiveIndex % tokens.length;
        Token receiveToken = tokens[receiveIndex];
        checkUnstake(pool, address(receiveToken), UFloat(amount, -18).normalize());
    }

    /*
     * Input Checking (Negative)
     */

    /// @dev `unstake` should revert with `AssetNotFound` if the address is not a managed asset
    function testBadDepositAddress() public {
        Token token = new Token("Foo", "FOO", 18);
        address withdrawalAddress = address(token);
        vm.expectRevert(
            abi.encodeWithSelector(
                IPool.AssetNotFound.selector,
                withdrawalAddress
            )
        );
        pool.unstake(withdrawalAddress, 0, 0);
    }

    function testUnstakeZeroAmount(uint256 receiveIndex) public {
        receiveIndex = receiveIndex % tokens.length;
        Token receiveToken = tokens[receiveIndex];
        uint256 receiveBalance = receiveToken.balanceOf(alice);
        uint256 poolBalance = pool.balanceOf(alice);

        vm.expectRevert(abi.encodeWithSelector(IPool.ZeroAmount.selector));
        pool.unstake(address(receiveToken), 0, 0);
        assertEq(pool.balanceOf(alice), poolBalance);
        assertEq(receiveToken.balanceOf(alice), receiveBalance);
    }

    // TODO check no balance for other functions
    // TODO is `_burn` as secure as `safeTransfer` ?
    function testUnstakeNoBalance() public {
        Token receiveToken = tokens[0];
        uint256 amount = pool.balanceOf(address(alice)) * 2;

        if (3 * amount > pool.info().balance) {
            vm.expectRevert(
                abi.encodeWithSelector(IPool.TooLarge.selector, amount)
            );
            pool.unstake(address(receiveToken), amount, 0);
        } else {
            vm.expectRevert("ERC20: burn amount exceeds balance");
            pool.unstake(address(receiveToken), amount, 0);
        }
    }

    /*
     * Pathological
     */
    function testFailUnstakeBadToken(uint256 amount) public {
        amount = (amount % 1e59) + 1e15;

        pool.stake(address(0), amount, 0);
    }
}

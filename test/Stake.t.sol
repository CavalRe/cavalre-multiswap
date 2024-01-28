// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {Pool, IPool, AssetState, QuoteState} from "../contracts/Pool.sol";
import {PoolTest, Token} from "./Pool.t.sol";
import {FloatingPoint, UFloat} from "@cavalre/floating-point/FloatingPoint.sol";

import {IERC20Errors} from "@openzeppelin/contracts/interfaces/draft-IERC6093.sol";

contract StakeTest is PoolTest {
    using FloatingPoint for uint256;
    using FloatingPoint for UFloat;

    function setUp() public {
        uint256 startBalance = type(uint256).max / 2;
        vm.deal(alice, startBalance);
        vm.deal(bob, startBalance);
        vm.deal(carol, startBalance);

        vm.startPrank(alice);

        setUpPool("Pool", "P", 2e17);
    }

    function testStakeSmoke() public {
        vm.startPrank(alice);

        Token payToken = tokens[0];

        uint256 balance = payToken.balanceOf(address(pool));
        uint256 payBalance = payToken.balanceOf(alice);

        uint amount = balance / 10;
        payToken.mint(amount);

        assertEq(
            payToken.balanceOf(alice),
            payBalance + amount,
            "Pay token balance before stake."
        );

        payToken.approve(address(pool), amount);

        UFloat memory amountFloat = UFloat(
            amount,
            -int256(int8(payToken.decimals()))
        ).normalize();

        checkStake(pool, address(payToken), amountFloat);
    }

    function testStakeFuzzAmount(uint256 amount, uint8 payIndex) public {
        vm.assume(amount > 0);

        Token payToken = tokens[uint256(payIndex) % tokens.length];
        vm.assume(amount < type(uint256).max - payToken.totalSupply());

        payToken.mint(amount);
        payToken.approve(address(pool), amount);

        UFloat memory amountFloat = UFloat(
            amount,
            -int256(int8(payToken.decimals()))
        ).normalize();

        checkStake(pool, address(payToken), amountFloat);
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

        vm.expectRevert(abi.encodeWithSelector(IPool.ZeroAmount.selector));
        pool.stake(address(payToken), 0, 0);
        assertEq(pool.balanceOf(alice), balance);
    }

    function testStakeNoAllowance() public {
        Token payToken = tokens[0];
        uint256 amount = pool.asset(address(payToken)).balance / 10;
        payToken.mint(amount);
        payToken.approve(address(pool), 0);

        vm.expectRevert(
            abi.encodeWithSelector(
                IERC20Errors.ERC20InsufficientAllowance.selector,
                address(pool),
                0,
                amount
            )
        );
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

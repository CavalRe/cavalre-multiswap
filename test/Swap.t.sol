// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {TestPool, PoolTest, Token, AssetState, FixedPointMathLib} from "./Pool.t.sol";
import {IPool} from "../contracts/Pool.sol";
import "../contracts/Users.sol";

contract SwapTest is PoolTest {
    using FixedPointMathLib for uint256;

    TestPool pool;
    Token[] tokens;

    function setUp() public {
        uint256 startBalance = type(uint256).max / 2;
        vm.deal(alice, startBalance);
        vm.deal(bob, startBalance);
        vm.deal(carol, startBalance);

        vm.startPrank(alice);

        (pool, tokens) = setUpPool("Pool", "P", 2e17, 1e16);
    }

    /*
     * Basic
     */
    function testSwapSmoke() public {
        Token payToken = USDC;
        Token receiveToken = BTCb;
        uint256 depositBalance = payToken.balanceOf(alice);
        uint256 withdrawBalance = receiveToken.balanceOf(alice);
        uint256 amountOut;
        uint256 feeAmount;

        uint256 amount = payToken.balanceOf(address(pool)) / 10;

        payToken.mint(amount);

        assertEq(
            payToken.balanceOf(alice),
            depositBalance + amount,
            "Alice's deposit token balance before swap."
        );

        payToken.approve(address(pool), amount);
        (amountOut, feeAmount) = pool.swap(
            address(payToken),
            address(receiveToken),
            amount,
            0
        );

        assertEq(
            payToken.balanceOf(alice),
            depositBalance,
            "Alice's deposit token balance after swap."
        );
        assertEq(
            receiveToken.balanceOf(alice),
            withdrawBalance + amountOut,
            "Alice's withdraw token balance after swap."
        );

        payToken.mint(amount);
        payToken.approve(address(pool), amount);
        checkSwap(pool, address(payToken), address(receiveToken), amount, 0);
    }

    /// @param depositIndex the index of the token to be deposited in the test token list
    /// @param withdrawalIndex the index of the token to be withdrawn in the test token list
    /// @param amount the amount of deposit token to be deposited
    function testSwapFuzz(
        uint8 depositIndex,
        uint8 withdrawalIndex,
        uint256 amount
    ) public {
        Token payToken = tokens[depositIndex % tokens.length];
        Token receiveToken = tokens[withdrawalIndex % tokens.length];
        vm.assume(address(payToken) != address(receiveToken));

        uint256 balance = payToken.balanceOf(address(pool));
        amount = amount.fullMulDiv(balance, type(uint256).max);
        vm.assume(amount > 0);

        address alice = address(1);
        vm.startPrank(alice);

        payToken.mint(amount);
        payToken.approve(address(pool), amount);

        uint256 amountOut;
        uint256 feeAmount;

        if (amount * 3 > balance) {
            vm.expectRevert(
                abi.encodeWithSelector(IPool.TooLarge.selector, amount)
            );
            pool.swap(address(payToken), address(receiveToken), amount, 0);
        } else {
            // (amountOut, feeAmount) = pool.swap(
            //     address(payToken),
            //     address(receiveToken),
            //     amount,
            //     0
            // );
            // checkSF(
            //     address(payToken),
            //     address(receiveToken),
            //     amount,
            //     amountOut
            // );
            checkSwap(
                pool,
                address(payToken),
                address(receiveToken),
                amount,
                0
            );
            assertGt(receiveToken.balanceOf(alice), 0);
            // checkLP(amount, amountOut);
        }

        vm.stopPrank();
    }

    /*
     * Input Checking (Negative)
     */

    /// @dev `swap` should revert with `AssetNotFound` if the address is not a managed asset
    function testBadDepositAddress() public {
        Token token = new Token("Foo", "FOO", 18);
        address depositAddress = address(token);
        address withdrawAddress = address(tokens[0]);
        vm.expectRevert(
            abi.encodeWithSelector(IPool.AssetNotFound.selector, depositAddress)
        );
        pool.swap(depositAddress, withdrawAddress, 1, 0);
    }

    function testBadWithdrawalAddress() public {
        Token token = new Token("Foo", "FOO", 18);
        address depositAddress = address(tokens[0]);
        address withdrawAddress = address(token);
        vm.expectRevert(
            abi.encodeWithSelector(
                IPool.AssetNotFound.selector,
                withdrawAddress
            )
        );
        pool.swap(depositAddress, withdrawAddress, 1, 0);
    }

    function testSwapDuplicateToken(uint256 index) public {
        index = index % tokens.length;
        uint256 amount = 1e27;
        Token payToken = tokens[index];
        Token receiveToken = tokens[index];
        payToken.mint(amount);
        payToken.approve(address(pool), amount);

        vm.expectRevert(
            abi.encodeWithSelector(
                IPool.DuplicateToken.selector,
                address(payToken)
            )
        );
        pool.swap(address(payToken), address(receiveToken), amount, 0);
    }

    function testSwapZeroDeposit() public {
        Token payToken = tokens[0];
        Token receiveToken = tokens[1];
        uint256 amount = 0;
        payToken.mint(amount);
        payToken.approve(address(pool), amount);

        vm.expectRevert(abi.encodeWithSelector(IPool.ZeroAmount.selector));
        pool.swap(address(payToken), address(receiveToken), amount, 0);
    }

    /*
     * Pathological
     */

    // function testSwapWithdrawNonContract() public {
    //     Token payToken = tokens[0];
    //     uint256 amount = 1e27;
    //     payToken.mint(amount);
    //     payToken.approve(address(pool), amount);

    //     vm.expectRevert(abi.encodeWithSelector(IUsers.ZeroAddress.selector));
    //     pool.swap(address(payToken), address(0), amount, 0);
    // }

    function testSwapWithdrawNotInPool() public {
        Token outside = new Token("Foo", "BAR", 18);
        Token payToken = tokens[0];
        uint256 amount = 1e27;
        payToken.mint(amount);
        payToken.approve(address(pool), amount);

        address[] memory deposits = new address[](1);
        deposits[0] = address(payToken);
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        address[] memory withdrawals = new address[](1);
        withdrawals[0] = address(outside);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = 1e18;

        vm.expectRevert(
            abi.encodeWithSelector(
                IPool.AssetNotFound.selector,
                address(outside)
            )
        );
        pool.swap(address(payToken), address(outside), amount, 0);
    }

    function testSwapDepositNotInPool() public {
        Token payToken = new Token("Foo", "BAR", 18);
        Token receiveToken = tokens[0];
        uint256 amount = 1e27;
        payToken.mint(amount);
        payToken.approve(address(pool), amount);

        vm.expectRevert(
            abi.encodeWithSelector(
                IPool.AssetNotFound.selector,
                address(payToken)
            )
        );
        pool.swap(address(payToken), address(receiveToken), amount, 0);
    }

    /*
     * Pool (staking/unstaking)
     */
    function testFailSwapPoolFuzz(
        uint256 amountA,
        uint256 depositIndexA
    ) public {
        amountA = (amountA % 1e59) + 1e15;
        depositIndexA = depositIndexA % tokens.length;

        address alice = address(1);
        vm.startPrank(alice);

        Token depositTokenA = tokens[depositIndexA];
        depositTokenA.mint(amountA);
        depositTokenA.approve(address(pool), amountA);

        uint256 poolAmount;
        uint256 feeAmount;

        assertEq(depositTokenA.balanceOf(alice) > 0, true);
        assertEq(pool.balanceOf(alice), 0);

        vm.expectRevert(
            abi.encodeWithSelector(
                IPool.InvalidSwap.selector,
                address(depositTokenA),
                address(pool)
            )
        );
        (poolAmount, feeAmount) = pool.swap(
            address(depositTokenA),
            address(pool),
            amountA,
            0
        );

        assertEq(depositTokenA.balanceOf(alice), 0);
        assertEq(pool.balanceOf(alice) > 0, true);

        vm.expectRevert(
            abi.encodeWithSelector(
                IPool.InvalidSwap.selector,
                address(pool),
                address(depositTokenA)
            )
        );
        pool.swap(address(pool), address(depositTokenA), poolAmount, 0);
        assertEq(depositTokenA.balanceOf(alice) > 0, true);
        assertEq(pool.balanceOf(alice), 0);

        vm.stopPrank();
    }
}

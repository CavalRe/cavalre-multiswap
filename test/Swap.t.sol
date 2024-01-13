// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {Pool, PoolTest, Token} from "./Pool.t.sol";
import {IPool, AssetState, QuoteState, FP, UFloat} from "../contracts/Pool.sol";

contract SwapTest is PoolTest {
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
    function testSwapSmoke() public {
        Token payToken = USDC;
        Token receiveToken = BTCb;

        uint256 amount = payToken.balanceOf(address(pool)) / 10;
        UFloat memory amountFloat = UFloat(
            amount,
            -int256(int8(payToken.decimals()))
        ).normalize();

        checkSwap(pool, address(payToken), address(receiveToken), amountFloat);
    }

    /// @param payIndex the index of the token to be deposited in the test token list
    /// @param receiveIndex the index of the token to be withdrawn in the test token list
    /// @param amount the amount of deposit token to be deposited
    function testSwapFuzz(
        uint8 payIndex,
        uint8 receiveIndex,
        uint256 amount
    ) public {
        Token payToken = tokens[payIndex % tokens.length];
        Token receiveToken = tokens[receiveIndex % tokens.length];
        vm.assume(address(payToken) != address(receiveToken));

        vm.assume(
            (amount > 0) &&
                (amount < type(uint256).max - payToken.totalSupply())
        );

        address alice = address(1);
        vm.startPrank(alice);

        payToken.mint(amount);
        payToken.approve(address(pool), amount);

        UFloat memory amountFloat = UFloat(
            amount,
            -int256(int8(payToken.decimals()))
        ).normalize();

        checkSwap(pool, address(payToken), address(receiveToken), amountFloat);
    }

    // /*
    //  * Input Checking (Negative)
    //  */

    // /// @dev `swap` should revert with `AssetNotFound` if the address is not a managed asset
    function testBadDepositAddress() public {
        Token token = new Token("Foo", "FOO", 18);
        address payToken = address(token);
        address receiveToken = address(tokens[0]);
        vm.expectRevert(
            abi.encodeWithSelector(IPool.AssetNotFound.selector, payToken)
        );
        pool.swap(payToken, receiveToken, 1, 0);
    }

    function testBadWithdrawalAddress() public {
        Token token = new Token("Foo", "FOO", 18);
        address payToken = address(tokens[0]);
        address receiveToken = address(token);
        vm.expectRevert(
            abi.encodeWithSelector(
                IPool.AssetNotFound.selector,
                receiveToken
            )
        );
        pool.swap(payToken, receiveToken, 1, 0);
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

    // /*
    //  * Pathological
    //  */

    function testSwapWithdrawNotInPool() public {
        Token outside = new Token("Foo", "BAR", 18);
        Token payToken = tokens[0];
        uint256 amount = 1e27;
        payToken.mint(amount);
        payToken.approve(address(pool), amount);

        address[] memory payTokens = new address[](1);
        payTokens[0] = address(payToken);
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        address[] memory receiveTokens = new address[](1);
        receiveTokens[0] = address(outside);
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
}

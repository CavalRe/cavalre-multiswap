// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "@cavalre/test/TestRoot.t.sol";

contract UnstakeTest is TestRoot {
    /*
     * Basic
     */
    function testUnstakeSmoke() public {
        address alice = address(1);
        vm.startPrank(alice);

        checkLP();

        Token receiveToken = tokens[0];
        uint256 amount = 1e27;
        receiveToken.mint(amount);
        receiveToken.approve(address(pool), amount);

        uint256 amountOut = pool.stake(address(receiveToken), amount);
        pool.approve(address(pool), amountOut);
        uint256 receiveAmount = pool.unstake(address(receiveToken), amountOut);

        checkSF(address(pool), address(receiveToken), amountOut, receiveAmount);

        assertEq(
            pool.balanceOf(alice),
            0,
            "Alice's pool balance is not zero after unstaking."
        );
        assertEq(receiveToken.balanceOf(alice) > 0, true);

        checkLP();

        vm.stopPrank();
    }

    function testUnstakeFuzz(uint256 amount, uint256 receiveIndex) public {
        vm.assume((amount > 1e17) && (amount < 1e50));

        address alice = address(1);
        vm.startPrank(alice);

        checkLP();

        receiveIndex = receiveIndex % tokens.length;
        Token receiveToken = tokens[receiveIndex];
        Asset memory receiveAsset = pool.asset(address(receiveToken));

        uint256 assetBalance = receiveAsset.state.balance;
        vm.assume((amount > 1e17) && (3 * amount < 4 * assetBalance));

        receiveToken.mint(amount);
        receiveToken.approve(address(pool), amount);

        assertEq(
            pool.balanceOf(alice),
            0,
            "Alice's initial pool balance is not zero."
        );
        assertGt(
            receiveToken.balanceOf(alice),
            0,
            "Alice's initial receive token balance is zero."
        );

        uint256 amountOut = pool.stake(address(receiveToken), amount);
        assertGt(
            pool.balanceOf(alice),
            0,
            "Alice's pool balance is zero before unstaking."
        );
        assertEq(
            receiveToken.balanceOf(alice),
            0,
            "Alice's receive token balance is not zero before unstaking."
        );

        uint256 poolBalance = pool.balance();
        pool.approve(address(pool), amountOut);
        if (amountOut * 3 > poolBalance * 4) {
            vm.expectRevert(
                abi.encodeWithSelector(Pool.TooLarge.selector, amountOut)
            );
            pool.unstake(address(receiveToken), amountOut);
        } else {
            uint256 receiveAmount = pool.unstake(
                address(receiveToken),
                amountOut
            );

            checkSF(
                address(pool),
                address(receiveToken),
                amountOut,
                receiveAmount
            );

            assertGt(
                receiveToken.balanceOf(alice),
                0,
                "Alice's receive token balance is zero after unstaking."
            );
            assertEq(
                pool.balanceOf(alice),
                0,
                "Alice's pool balance is not zero after unstaking."
            );
            assertEq(pool.balanceOf(alice), 0, Strings.toString(amountOut));
            checkLP(amountOut, receiveAmount);
        }

        vm.stopPrank();
    }

    // function testUnstakeOtherAccount(
    //     uint256 receiveIndex,
    //     uint256 amount
    // ) public {
    //     address alice = address(1);
    //     vm.startPrank(alice);

    //     address bob = address(3);
    //     receiveIndex = receiveIndex % tokens.length;
    //     Token receiveToken = tokens[receiveIndex];
    //     amount = (amount % 1e59) + 1e17;

    //     assertEq(receiveToken.balanceOf(alice), 0);
    //     assertEq(receiveToken.balanceOf(bob), 0);
    //     assertEq(pool.balanceOf(alice), 0);
    //     assertEq(pool.balanceOf(bob), 0);

    //     receiveToken.mint(amount);
    //     receiveToken.approve(address(pool), amount);
    //     uint256 stakeOut = pool.stake(address(receiveToken), amount);
    //     pool.approve(address(pool), stakeOut);
    //     uint256 unstakeOut = pool.unstake(address(receiveToken), stakeOut);

    //     // alice -> pool -> bob
    //     assertEq(pool.balanceOf(alice), 0);
    //     assertEq(receiveToken.balanceOf(alice), 0);
    //     assertEq(pool.balanceOf(bob), 0);
    //     assertEq(receiveToken.balanceOf(bob) > 0, true);
    //     assertEq(receiveToken.balanceOf(bob), unstakeOut);

    //     vm.stopPrank();
    // }

    /*
     * Input Checking (Negative)
     */

    /// @dev `unstake` should revert with `InvalidUnstake` if the address is not a managed asset
    function testBadDepositAddress() public {
        Token token = new Token("Foo", "FOO");
        address withdrawalAddress = address(token);
        vm.expectRevert(
            abi.encodeWithSelector(
                Pool.InvalidUnstake.selector,
                withdrawalAddress
            )
        );
        pool.unstake(withdrawalAddress, 0);
    }

    function testUnstakeZeroAmount(uint256 receiveIndex) public {
        address alice = address(1);
        vm.startPrank(alice);

        receiveIndex = receiveIndex % tokens.length;
        Token receiveToken = tokens[receiveIndex];

        assertEq(pool.balanceOf(alice), 0);
        pool.unstake(address(receiveToken), 0);
        assertEq(pool.balanceOf(alice), 0);
        assertEq(receiveToken.balanceOf(alice), 0);

        vm.stopPrank();
    }

    // TODO check no balance for other functions
    // TODO is `_burn` as secure as `safeTransfer` ?
    function testUnstakeNoBalance() public {
        address alice = address(1);
        vm.startPrank(alice);

        Token receiveToken = tokens[0];
        uint256 amount = 1e27;

        vm.expectRevert("ERC20: burn amount exceeds balance");
        pool.unstake(address(receiveToken), amount);

        vm.stopPrank();
    }

    function testUnstakeInsufficientAllowance() public {
        address bob = address(2);
        vm.startPrank(bob);

        Token receiveToken = tokens[0];
        uint256 amount = 1e28;

        // TODO is it desirable that `unstake` does not require a specific allowance
        //vm.expectRevert("ERC20: insufficient allowance");
        pool.unstake(address(receiveToken), amount);

        vm.stopPrank();
    }

    /*
     * Pathological
     */
    function testFailUnstakeBadToken(uint256 amount) public {
        address alice = address(1);
        vm.startPrank(alice);

        amount = (amount % 1e59) + 1e15;

        pool.stake(address(0), amount);

        vm.stopPrank();
    }
}

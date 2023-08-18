// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "@cavalre/test/TestRoot.t.sol";

contract UnstakeTest is TestRoot {
    using FixedPointMathLib for uint256;

    /*
     * Basic
     */
    function testUnstakeSmoke() public {
        checkLP();

        Token receiveToken = tokens[0];
        uint256 receiveBalance = receiveToken.balanceOf(alice);
        uint256 poolBalance = pool.balanceOf(alice);

        uint256 receiveAmount;
        uint256 amountOut;
        uint256 feeAmount;

        uint256 amount = 1e27;
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

        vm.roll(block.number + 1);

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

        checkSF(address(pool), address(receiveToken), amountOut, receiveAmount);

        checkLP();
    }

    function testUnstakeFuzz(uint256 amount, uint256 receiveIndex) public {
        // vm.assume((amount > 1e17) && (amount < 1e50));
        checkLP();

        receiveIndex = receiveIndex % tokens.length;
        Token receiveToken = tokens[receiveIndex];
        uint256 assetBalance = receiveToken.balanceOf(address(pool));
        uint256 receiveBalance = receiveToken.balanceOf(alice);
        uint256 poolBalance = pool.balanceOf(alice);

        uint256 receiveAmount;
        uint256 feeAmount;

        vm.assume(
            (amount > 1e17) && (amount < 1e50) && (3 * amount < assetBalance)
        );
        receiveToken.mint(amount);

        assertEq(
            receiveToken.balanceOf(alice),
            receiveBalance + amount,
            "Alice's receive token balance before unstake."
        );

        receiveToken.approve(address(pool), amount);

        uint256 amountOut;
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

        vm.roll(block.number + 1);

        if (amountOut * 3 > pool.info().balance) {
            vm.expectRevert(
                abi.encodeWithSelector(IPool.TooLarge.selector, amountOut)
            );
            pool.unstake(address(receiveToken), amountOut, 0);
        } else {
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
                poolBalance +
                    feeAmount.fullMulDiv(
                        pool.balanceOf(alice),
                        pool.totalSupply()
                    ),
                1e10,
                "Alice's pool balance after unstaking."
            );

            checkSF(
                address(pool),
                address(receiveToken),
                amountOut,
                receiveAmount
            );

            checkLP(amountOut, receiveAmount);
        }
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

        vm.expectRevert(
            abi.encodeWithSelector(IPool.ZeroAmount.selector)
        );
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

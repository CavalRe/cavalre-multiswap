// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "@cavalre/test/TestRoot.t.sol";
import "@cavalre/Pool.sol";
import "@cavalre/Users.sol";

contract SwapTest is TestRoot {
    /*
     * Basic
     */
    function testSwapSmoke() public {
        Token depositToken = tokens[0];
        Token withdrawToken = tokens[1];
        uint256 depositBalance = depositToken.balanceOf(alice);
        uint256 withdrawBalance = withdrawToken.balanceOf(alice);
        // uint256 amount = 1e17;
        uint256 amount = 100000000000100001; // This value was failing the fuzz test before
        uint256 amountOut;
        uint256 feeAmount;
        depositToken.mint(amount);

        assertEq(
            depositToken.balanceOf(alice),
            depositBalance + amount,
            "Alice's deposit token balance before swap."
        );

        depositToken.approve(address(pool), amount);

        (amountOut, feeAmount) = pool.swap(
            address(depositToken),
            address(withdrawToken),
            amount,
            0
        );

        assertEq(
            depositToken.balanceOf(alice),
            depositBalance,
            "Alice's deposit token balance after swap."
        );
        assertEq(
            withdrawToken.balanceOf(alice),
            withdrawBalance + amountOut,
            "Alice's withdraw token balance after swap."
        );

        checkSF(
            address(depositToken),
            address(withdrawToken),
            amount,
            amountOut
        );
    }

    /// @param depositIndex the index of the token to be deposited in the test token list
    /// @param withdrawalIndex the index of the token to be withdrawn in the test token list
    /// @param amount the amount of deposit token to be deposited
    function testSwapFuzz(
        uint256 depositIndex,
        uint256 withdrawalIndex,
        uint256 amount
    ) public {
        depositIndex = depositIndex % tokens.length;
        withdrawalIndex = withdrawalIndex % tokens.length;

        vm.assume(depositIndex != withdrawalIndex);
        vm.assume(amount > 0);

        Token depositToken = tokens[depositIndex];
        Token withdrawToken = tokens[withdrawalIndex];

        AssetState memory depositAsset = pool.asset(address(depositToken));
        uint256 balance = depositAsset.balance;

        amount = (amount % ((8 * balance) / 3));
        vm.assume(amount > 1e17);

        address alice = address(1);
        vm.startPrank(alice);

        depositToken.mint(amount);
        depositToken.approve(address(pool), amount);

        uint256 amountOut;
        uint256 feeAmount;

        if (amount * 3 > balance) {
            vm.expectRevert(
                abi.encodeWithSelector(Pool.TooLarge.selector, amount)
            );
            pool.swap(address(depositToken), address(withdrawToken), amount, 0);
        } else {
            (amountOut, feeAmount) = pool.swap(
                address(depositToken),
                address(withdrawToken),
                amount,
                0
            );
            checkSF(
                address(depositToken),
                address(withdrawToken),
                amount,
                amountOut
            );
            assertGt(withdrawToken.balanceOf(alice), 0);
            checkLP(amount, amountOut);
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
            abi.encodeWithSelector(Pool.AssetNotFound.selector, depositAddress)
        );
        pool.swap(depositAddress, withdrawAddress, 1, 0);
    }

    function testBadWithdrawalAddress() public {
        Token token = new Token("Foo", "FOO", 18);
        address depositAddress = address(tokens[0]);
        address withdrawAddress = address(token);
        vm.expectRevert(
            abi.encodeWithSelector(Pool.AssetNotFound.selector, withdrawAddress)
        );
        pool.swap(depositAddress, withdrawAddress, 1, 0);
    }

    function testSwapDuplicateToken(uint256 index) public {
        index = index % tokens.length;
        uint256 amount = 1e27;
        Token depositToken = tokens[index];
        Token withdrawToken = tokens[index];
        depositToken.mint(amount);
        depositToken.approve(address(pool), amount);

        vm.expectRevert(
            abi.encodeWithSelector(
                Pool.DuplicateToken.selector,
                address(depositToken)
            )
        );
        pool.swap(address(depositToken), address(withdrawToken), amount, 0);
    }

    function testSwapZeroDeposit() public {
        Token depositToken = tokens[0];
        Token withdrawToken = tokens[1];
        uint256 amount = 0;
        depositToken.mint(amount);
        depositToken.approve(address(pool), amount);

        vm.expectRevert(abi.encodeWithSelector(Pool.ZeroAmount.selector));
        pool.swap(address(depositToken), address(withdrawToken), amount, 0);
    }

    /*
     * Pathological
     */

    function testSwapWithdrawNonContract() public {
        Token depositToken = tokens[0];
        uint256 amount = 1e27;
        depositToken.mint(amount);
        depositToken.approve(address(pool), amount);

        vm.expectRevert(abi.encodeWithSelector(Users.ZeroAddress.selector));
        pool.swap(address(depositToken), address(0), amount, 0);
    }

    function testSwapWithdrawNotInPool() public {
        Token outside = new Token("Foo", "BAR", 18);
        Token depositToken = tokens[0];
        uint256 amount = 1e27;
        depositToken.mint(amount);
        depositToken.approve(address(pool), amount);

        address[] memory deposits = new address[](1);
        deposits[0] = address(depositToken);
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        address[] memory withdrawals = new address[](1);
        withdrawals[0] = address(outside);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = 1e18;

        vm.expectRevert(
            abi.encodeWithSelector(
                Pool.AssetNotFound.selector,
                address(outside)
            )
        );
        pool.swap(address(depositToken), address(outside), amount, 0);
    }

    function testSwapDepositNotInPool() public {
        Token depositToken = new Token("Foo", "BAR", 18);
        Token withdrawToken = tokens[0];
        uint256 amount = 1e27;
        depositToken.mint(amount);
        depositToken.approve(address(pool), amount);

        vm.expectRevert(
            abi.encodeWithSelector(
                Pool.AssetNotFound.selector,
                address(depositToken)
            )
        );
        pool.swap(address(depositToken), address(withdrawToken), amount, 0);
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
                Pool.InvalidSwap.selector,
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
                Pool.InvalidSwap.selector,
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

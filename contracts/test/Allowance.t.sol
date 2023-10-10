// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "@cavalre/test/Pool.t.sol";

contract AllowanceTest is PoolTest {
    Pool private pool;
    Token[] private tokens;

    uint256 private receiveAmount;

    function setUp() public {
        vm.startPrank(alice);

        (pool, tokens) = setUpPool();

        assertEq(pool.owner(), alice, "Owner of pool.");
    }

    function testAllowance_full() public {
        vm.startPrank(bob);

        uint256 amount = USDC.balanceOf(address(pool)) / 5;
        USDC.mint(amount);
        USDC.transfer(address(pool), amount);
        (receiveAmount,) = pool.stake(address(USDC), amount, 0);

        emit log_named_uint("receiveAmount (full)", receiveAmount);

        assertGt(pool.balanceOf(bob), 0, "Bob's balance is greater than 0.");

        vm.stopPrank();
    }

    function testAllowance_half() public {
        vm.startPrank(bob);

        uint256 amount = USDC.balanceOf(address(pool)) / 10;
        USDC.mint(2 * amount);
        USDC.transfer(address(pool), amount);
        USDC.increaseAllowance(address(pool), amount);
        (receiveAmount,) = pool.stake(address(USDC), 2 * amount, 0);

        emit log_named_uint("receiveAmount (half)", receiveAmount);

        assertGt(pool.balanceOf(bob), 0, "Bob's balance is greater than 0.");

        vm.stopPrank();
    }

        function testAllowance_zero() public {
        vm.startPrank(bob);

        uint256 amount = USDC.balanceOf(address(pool)) / 5;
        USDC.mint(amount);
        USDC.increaseAllowance(address(pool), amount);
        (receiveAmount,) = pool.stake(address(USDC), amount, 0);

        emit log_named_uint("receiveAmount (zero)", receiveAmount);

        assertGt(pool.balanceOf(bob), 0, "Bob's balance is greater than 0.");

        vm.stopPrank();
    }
}

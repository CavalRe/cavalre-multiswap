// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.16;

import "prb-math/PRBMathUD60x18.sol";
import { console } from "forge-std/console.sol";
import "./TestRoot.t.sol";
import "../src/Pool.sol";

struct State {
    Asset[] assets;
    uint256 poolBalance;
    uint256 poolScale;
}

contract MultiswapTest is TestRoot {
    using PRBMathUD60x18 for uint256;

    /*
    function testMultiSmoke() public {
        Token depositToken = tokens[0];
        Token withdrawToken = tokens[1];
        uint256 amount = 1e27;
        depositToken.mint(amount);
        depositToken.approve(address(pool), amount);

        address[] memory deposits = new address[](1);
        deposits[0] = address(depositToken);
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        address[] memory withdrawals = new address[](1);
        withdrawals[0] = address(withdrawToken);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = 1e18;
        pool.multiswap(deposits, amounts, withdrawals, allocations);
    }

    function testMultiRandomSwap(uint256 depositIndex, uint256 withdrawalIndex) public {
        depositIndex = depositIndex % tokens.length;
        withdrawalIndex = withdrawalIndex % tokens.length;
        vm.assume(depositIndex != withdrawalIndex);
        Token depositToken = tokens[depositIndex];
        Token withdrawToken = tokens[withdrawalIndex];
        uint256 amount = 1e27;
        depositToken.mint(amount);
        depositToken.approve(address(pool), amount);

        address[] memory deposits = new address[](1);
        deposits[0] = address(depositToken);
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        address[] memory withdrawals = new address[](1);
        withdrawals[0] = address(withdrawToken);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = 1e18;
        pool.multiswap(deposits, amounts, withdrawals, allocations);
    }

    function testMultiFuzzAmount(uint256 amount) public {
        amount = (amount % 1e59) + 1e11;

        Token depositToken = tokens[0];
        Token withdrawToken = tokens[1];
        depositToken.mint(amount);
        depositToken.approve(address(pool), amount);

        address[] memory deposits = new address[](1);
        deposits[0] = address(depositToken);
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        address[] memory withdrawals = new address[](1);
        withdrawals[0] = address(withdrawToken);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = 1e18;
        pool.multiswap(deposits, amounts, withdrawals, allocations);
    }

    // TODO what about doubling up on the same side
    function testDuplicateToken(uint256 index) public {
        index = index % tokens.length;
        Token depositToken = tokens[index];
        Token withdrawToken = tokens[index];
        uint256 amount = 1e27;
        depositToken.mint(amount);
        depositToken.approve(address(pool), amount);

        address[] memory deposits = new address[](1);
        deposits[0] = address(depositToken);
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        address[] memory withdrawals = new address[](1);
        withdrawals[0] = address(withdrawToken);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = 1e18;
        vm.expectRevert(abi.encodeWithSelector(Pool.DuplicateToken.selector, address(depositToken)));
        pool.multiswap(deposits, amounts, withdrawals, allocations);
    }

    function testIncorrectAllocation() public {
        Token depositToken = tokens[0];
        Token withdrawToken = tokens[1];
        uint256 amount = 1e27;
        depositToken.mint(amount);
        depositToken.approve(address(pool), amount);

        address[] memory deposits = new address[](1);
        deposits[0] = address(depositToken);
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        address[] memory withdrawals = new address[](1);
        withdrawals[0] = address(withdrawToken);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = 2;
        vm.expectRevert(abi.encodeWithSelector(Pool.IncorrectAllocation.selector, 1e18, 2));
        pool.multiswap(deposits, amounts, withdrawals, allocations);
    }

    function testWithdrawalMismatch() public {
        Token depositToken = tokens[0];
        Token withdrawToken = tokens[1];
        uint256 amount = 1e27;
        depositToken.mint(amount);
        depositToken.approve(address(pool), amount);

        address[] memory deposits = new address[](1);
        deposits[0] = address(depositToken);
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        address[] memory withdrawals = new address[](2);
        withdrawals[0] = address(withdrawToken);
        withdrawals[1] = address(tokens[2]);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = 1e18;
        vm.expectRevert(abi.encodeWithSelector(Pool.LengthMismatch.selector, 2, 1));
        pool.multiswap(deposits, amounts, withdrawals, allocations);
    }

    function testDepositMismatch() public {
        Token depositToken = tokens[0];
        Token withdrawToken = tokens[1];
        uint256 amount = 1e27;
        depositToken.mint(amount);
        depositToken.approve(address(pool), amount);

        address[] memory deposits = new address[](1);
        deposits[0] = address(depositToken);
        uint256[] memory amounts = new uint256[](2);
        amounts[0] = amount;
        amounts[1] = 1e27;
        address[] memory withdrawals = new address[](1);
        withdrawals[0] = address(withdrawToken);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = 1e18;
        vm.expectRevert(abi.encodeWithSelector(Pool.LengthMismatch.selector, 1, 2));
        pool.multiswap(deposits, amounts, withdrawals, allocations);
    }

    function testFailMultiNoWithdrawal() public {
        Token depositToken = tokens[0];
        uint256 amount = 1e27;
        depositToken.mint(amount);
        depositToken.approve(address(pool), amount);

        address[] memory deposits = new address[](1);
        deposits[0] = address(depositToken);
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        address[] memory withdrawals = new address[](0);
        uint256[] memory allocations = new uint256[](0);
        pool.multiswap(deposits, amounts, withdrawals, allocations);
    }

    function testInsufficientAllowance() public {
        Token depositToken = tokens[0];
        Token withdrawToken = tokens[1];
        uint256 amount = 1e27;
        depositToken.mint(amount);

        address[] memory deposits = new address[](1);
        deposits[0] = address(depositToken);
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        address[] memory withdrawals = new address[](1);
        withdrawals[0] = address(withdrawToken);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = 1e18;
        vm.expectRevert("ERC20: insufficient allowance");
        pool.multiswap(deposits, amounts, withdrawals, allocations);
    }

    function testMultiNoDeposit() public {
        Token depositToken = tokens[0];
        Token withdrawToken = tokens[1];
        uint256 amount = 1e27;
        depositToken.mint(amount);
        depositToken.approve(address(pool), amount);

        address[] memory deposits = new address[](0);
        uint256[] memory amounts = new uint256[](0);
        address[] memory withdrawals = new address[](1);
        withdrawals[0] = address(withdrawToken);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = 1e18;
        pool.multiswap(deposits, amounts, withdrawals, allocations);
    }

    function testMultiZeroDeposit() public {
        Token depositToken = tokens[0];
        Token withdrawToken = tokens[1];
        uint256 amount = 0;
        depositToken.mint(amount);
        depositToken.approve(address(pool), amount);

        address[] memory deposits = new address[](1);
        deposits[0] = address(depositToken);
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        address[] memory withdrawals = new address[](1);
        withdrawals[0] = address(withdrawToken);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = 1e18;
        pool.multiswap(deposits, amounts, withdrawals, allocations);
    }

    function testMultiRepeatDeposit() public {
        Token depositToken = tokens[0];
        Token withdrawToken = tokens[1];
        uint256 amount = 1e27;
        depositToken.mint(2 * amount);
        depositToken.approve(address(pool), 2 * amount);

        address[] memory deposits = new address[](2);
        deposits[0] = address(depositToken);
        deposits[1] = address(depositToken);
        uint256[] memory amounts = new uint256[](2);
        amounts[0] = amount;
        amounts[1] = amount;
        address[] memory withdrawals = new address[](1);
        withdrawals[0] = address(withdrawToken);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = 1e18;
        pool.multiswap(deposits, amounts, withdrawals, allocations);
    }

    function testMultiRepeatWithdrawal() public {
        Token depositToken = tokens[0];
        Token withdrawToken = tokens[1];
        uint256 amount = 1e27;
        depositToken.mint(amount);
        depositToken.approve(address(pool), amount);

        address[] memory deposits = new address[](1);
        deposits[0] = address(depositToken);
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        address[] memory withdrawals = new address[](2);
        withdrawals[0] = address(withdrawToken);
        withdrawals[1] = address(withdrawToken);
        uint256[] memory allocations = new uint256[](2);
        allocations[0] = 5e17;
        allocations[1] = 5e17;
        pool.multiswap(deposits, amounts, withdrawals, allocations);
    }

    function testFailMultiWithdrawNonContract() public {
        Token depositToken = tokens[0];
        uint256 amount = 1e27;
        depositToken.mint(amount);
        depositToken.approve(address(pool), amount);

        address[] memory deposits = new address[](1);
        deposits[0] = address(depositToken);
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        address[] memory withdrawals = new address[](1);
        withdrawals[0] = address(0);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = 1e18;
        pool.multiswap(deposits, amounts, withdrawals, allocations);
    }

    function testFailMultiWithdrawNotInPool() public {
        Token outside = new Token("Foo", "BAR");
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
        pool.multiswap(deposits, amounts, withdrawals, allocations);
    }

    function checkScale() internal {
        uint256 scale;
        (, , , , , scale) = pool.pool();
        Asset[] memory initialAssets = pool.assets();
        uint256 scaleSum = 0;

        for (uint256 i; i < initialAssets.length; i++) {
            scaleSum += initialAssets[i].scale;
        }

        assertEq(scaleSum, scale);
    }

    function checkDeltaTrading(State memory one, State memory two) internal {
        //    uint negSum = 0;
        //    uint posSum = 0;
        //        for (uint i; i < one.assets.length; i++) {
        //     if (two.assets[i].balance >= one.assets[i].balance) {
        //    uint deltaAlpha = two.assets[i].balance - one.assets[i].balance;
        //         uint deltaV = (deltaAlpha * one.assets[i].scale * two.poolBalance) / (one.poolScale * two.assets[i].balance);
        //    posSum += deltaV;
        //     } else {
        //    uint deltaAlpha = one.assets[i].balance - two.assets[i].balance;
        //         uint deltaV = (deltaAlpha * one.assets[i].scale * two.poolBalance) / (one.poolScale * two.assets[i].balance);
        //    negSum += deltaV;
        //     }
        //    }
        //assertApproxEqRel(posSum, negSum, 999999999e9);
    }

    function testMultiPoolFuzz(
        uint256 amountA,
        uint256 depositIndexA,
        uint256 amountB,
        uint256 depositIndexB
    ) public {
        // fuzz setup
        amountA = (amountA % 1e48) + 1e15;
        amountB = (amountB % 1e48) + 1e15;
        depositIndexA = depositIndexA % tokens.length;
        depositIndexB = depositIndexB % tokens.length;
        vm.assume(depositIndexA != depositIndexB);

        address alice = address(1);
        vm.startPrank(alice);

        // initial state
        Token depositTokenA = tokens[depositIndexA];
        depositTokenA.mint(amountA);
        depositTokenA.approve(address(pool), amountA);

        Token depositTokenB = tokens[depositIndexB];
        depositTokenB.mint(amountB);
        depositTokenB.approve(address(pool), amountB);

        checkScale();

        // check initial state
        assertEq(depositTokenA.balanceOf(alice) > 0, true);
        assertEq(depositTokenB.balanceOf(alice) > 0, true);
        assertEq(pool.balanceOf(alice), 0);

        // swap
        address[] memory deposits = new address[](2);
        deposits[0] = address(depositTokenA);
        deposits[1] = address(depositTokenB);
        uint256[] memory amounts = new uint256[](2);
        amounts[0] = amountA;
        amounts[1] = amountB;
        address[] memory withdrawals = new address[](1);
        withdrawals[0] = address(pool);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = 1e18;

        pool.multiswap(deposits, amounts, withdrawals, allocations);

        // check post swap state
        assertEq(depositTokenA.balanceOf(alice), 0);
        assertEq(depositTokenB.balanceOf(alice), 0);
        assertEq(pool.balanceOf(alice) > 0, true);

        address[] memory depositsUnstake = new address[](1);
        depositsUnstake[0] = address(pool);
        uint256[] memory amountsUnstake = new uint256[](1);
        amountsUnstake[0] = pool.balanceOf(alice);
        address[] memory withdrawalsUnstake = new address[](1);
        withdrawalsUnstake[0] = address(depositTokenA);
        uint256[] memory allocationsUnstake = new uint256[](1);
        allocationsUnstake[0] = 1e18;

        pool.approve(address(pool), pool.balanceOf(alice));

        pool.multiswap(depositsUnstake, amountsUnstake, withdrawalsUnstake, allocationsUnstake);

        assertEq(depositTokenA.balanceOf(alice) > 0, true);
        assertEq(pool.balanceOf(alice), 0);

        vm.stopPrank();
    }

    function testMultiTrack(uint256 amount) public {
        amount = (amount % 1e59) + 1e11;

        address alice = address(1);
        vm.startPrank(alice);

        Token depositToken = tokens[0];
        Token withdrawalToken = tokens[1];

        // test initial balances
        uint256 initialDepositBalance = depositToken.balanceOf(alice);
        assertEq(initialDepositBalance, 0);
        uint256 initialWithdrawalBalance = withdrawalToken.balanceOf(alice);
        assertEq(initialWithdrawalBalance, 0);

        depositToken.mint(amount);
        depositToken.approve(address(pool), amount);

        // test after mint balances
        uint256 afterMintDepositBalance = depositToken.balanceOf(alice);
        assertEq(afterMintDepositBalance, amount);
        uint256 afterMintWithdrawalBalance = withdrawalToken.balanceOf(alice);
        assertEq(afterMintWithdrawalBalance, 0);

        // perform swap
        pool.swap(address(depositToken), address(withdrawalToken), amount, alice);

        // test after swap balances
        uint256 afterSwapDepositBalance = depositToken.balanceOf(alice);
        assertEq(afterSwapDepositBalance, 0);
        uint256 afterSwapWithdrawalBalance = withdrawalToken.balanceOf(alice);
        assertEq(afterSwapWithdrawalBalance > 0, true);

        vm.stopPrank();
    }

    function testMultiSwapFuzz(
        uint256 amountA,
        uint256 amountB,
        uint256 depositIndexA,
        uint256 depositIndexB,
        uint256 withdrawIndex
    ) public {
        // fuzz setup
        amountA = (amountA % 1e30) + 1e16;
        amountB = (amountB % 1e30) + 1e16;
        depositIndexA = depositIndexA % tokens.length;
        depositIndexB = depositIndexB % tokens.length;
        withdrawIndex = withdrawIndex % tokens.length;
        vm.assume(depositIndexA != depositIndexB);
        vm.assume(depositIndexA != withdrawIndex);
        vm.assume(depositIndexB != withdrawIndex);

        vm.startPrank(address(1));

        // initial state
        Token depositTokenA = tokens[depositIndexA];
        depositTokenA.mint(amountA);
        depositTokenA.approve(address(pool), amountA);

        Token depositTokenB = tokens[depositIndexB];
        depositTokenB.mint(amountB);
        depositTokenB.approve(address(pool), amountB);

        Token withdrawToken = tokens[withdrawIndex];

        State memory beforeState;
        beforeState.assets = pool.assets();
        (, , , , beforeState.poolBalance, beforeState.poolScale) = pool.pool();

        checkScale();

        // check initial state
        assertEq(depositTokenA.balanceOf(address(1)) > 0, true);
        assertEq(depositTokenB.balanceOf(address(1)) > 0, true);
        assertEq(withdrawToken.balanceOf(address(1)), 0);

        // swap
        address[] memory deposits = new address[](2);
        deposits[0] = address(depositTokenA);
        deposits[1] = address(depositTokenB);
        uint256[] memory amounts = new uint256[](2);
        amounts[0] = amountA;
        amounts[1] = amountB;
        address[] memory withdrawals = new address[](1);
        withdrawals[0] = address(withdrawToken);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = 1e18;

        pool.multiswap(deposits, amounts, withdrawals, allocations);
        State memory afterState;
        afterState.assets = pool.assets();
        (, , , , afterState.poolBalance, afterState.poolScale) = pool.pool();

        checkDeltaTrading(beforeState, afterState);
    }
    */

    function testBigSwap() public {
        uint256 numberOfTokens = NTOKENS / 2;
        address[] memory deposits = new address[](numberOfTokens);
        uint256[] memory amounts = new uint256[](numberOfTokens);
        address[] memory withdrawals = new address[](numberOfTokens);
        uint256[] memory allocations = new uint256[](numberOfTokens);

        for (uint256 i; i < numberOfTokens; i++) {
            Token token = tokens[i];
            uint256 amount = 1e27;
            token.mint(amount);
            token.approve(address(pool), amount);

            deposits[i] = address(token);
            amounts[i] = amount;
        }

        uint256 totalAllocation = 1e18;
        for (uint256 i = numberOfTokens; i < NTOKENS; i++) {
            withdrawals[i - numberOfTokens] = address(tokens[i]);
            allocations[i - numberOfTokens] = totalAllocation.div(numberOfTokens.fromUint());
        }
        console.log("ALLOC", totalAllocation);
        console.log("SLICE", totalAllocation.div(numberOfTokens.fromUint()));

        pool.multiswap(0, 0, deposits, amounts, withdrawals, allocations);
    } // !! TODO check that valid deposit/withdrawal addresses are being used
}

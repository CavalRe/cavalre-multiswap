// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "solady/utils/FixedPointMathLib.sol";
import {console} from "forge-std/console.sol";
import "@cavalre/test/TestRoot.t.sol";
import "@cavalre/Pool.sol";

struct State {
    AssetState[] assets;
    uint256 poolBalance;
    uint256 poolScale;
}

contract MultiswapTest is TestRoot {
    using FixedPointMathLib for uint256;

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
        uint256[] memory receiveAmounts = new uint256[](1);
        if (amount * 3 > pool.asset(deposits[0]).balance) {
            vm.expectRevert(
                abi.encodeWithSelector(Pool.TooLarge.selector, amount)
            );
            pool.multiswap(deposits, amounts, withdrawals, allocations);
        } else {
            receiveAmounts = pool.multiswap(
                deposits,
                amounts,
                withdrawals,
                allocations
            );

            checkSF(
                deposits,
                amounts,
                withdrawals,
                allocations,
                receiveAmounts
            );
        }
    }

    function testMultiRandomSwap(
        uint256 depositIndex,
        uint256 withdrawalIndex
    ) public {
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
        vm.assume((amount > 1e17) && (amount < 1e50));

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
        uint256[] memory receiveAmounts = new uint256[](1);
        if (amount * 3 > pool.asset(deposits[0]).balance) {
            vm.expectRevert(
                abi.encodeWithSelector(Pool.TooLarge.selector, amount)
            );
            pool.multiswap(deposits, amounts, withdrawals, allocations);
        } else {
            receiveAmounts = pool.multiswap(
                deposits,
                amounts,
                withdrawals,
                allocations
            );

            checkSF(
                deposits,
                amounts,
                withdrawals,
                allocations,
                receiveAmounts
            );
        }
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
        vm.expectRevert(
            abi.encodeWithSelector(
                Pool.DuplicateToken.selector,
                address(depositToken)
            )
        );
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
        vm.expectRevert(
            abi.encodeWithSelector(Pool.IncorrectAllocation.selector, 1e18, 2)
        );
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
        vm.expectRevert(
            abi.encodeWithSelector(Pool.LengthMismatch.selector, 2, 1)
        );
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
        vm.expectRevert(
            abi.encodeWithSelector(Pool.LengthMismatch.selector, 1, 2)
        );
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
        vm.expectRevert(
            abi.encodeWithSelector(
                Pool.DuplicateToken.selector,
                address(depositToken)
            )
        );
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
        vm.expectRevert(
            abi.encodeWithSelector(
                Pool.DuplicateToken.selector,
                address(withdrawToken)
            )
        );
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
        uint256 scale = pool.info().scale;
        AssetState[] memory initialAssets = pool.assets();
        uint256 scaleSum = 0;

        for (uint256 i; i < initialAssets.length; i++) {
            scaleSum += initialAssets[i].scale;
        }

        assertEq(scaleSum, scale);
    }

    function testMultiPoolFuzz(
        uint256 amountA,
        uint256 depositIndexA,
        uint256 amountB,
        uint256 depositIndexB
    ) public {
        // fuzz setup
        vm.assume((amountA > 1e17) && (amountA < 1e50));
        vm.assume((amountB > 1e17) && (amountB < 1e50));
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
        assertEq(
            depositTokenA.balanceOf(alice) > 0,
            true,
            "Alice's initial balance of depositTokenA is 0"
        );
        assertEq(
            depositTokenB.balanceOf(alice) > 0,
            true,
            "Alice's initial balance of depositTokenB is 0"
        );
        // assertEq(
        //     pool.balanceOf(alice),
        //     0,
        //     "Alice's initial balance of pool is not 0"
        // );

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
        uint256[] memory receiveAmounts = new uint256[](1);
        if (amountA * 3 > pool.asset(deposits[0]).balance) {
            vm.expectRevert(
                abi.encodeWithSelector(Pool.TooLarge.selector, amountA)
            );
            pool.multiswap(deposits, amounts, withdrawals, allocations);
        } else if (amountB * 3 > pool.asset(deposits[1]).balance) {
            vm.expectRevert(
                abi.encodeWithSelector(Pool.TooLarge.selector, amountB)
            );
            pool.multiswap(deposits, amounts, withdrawals, allocations);
        } else {
            receiveAmounts = pool.multiswap(
                deposits,
                amounts,
                withdrawals,
                allocations
            );

            checkSF(
                deposits,
                amounts,
                withdrawals,
                allocations,
                receiveAmounts
            );

            // check post swap state
            assertEq(
                depositTokenA.balanceOf(alice),
                0,
                "Alice's post swap balance of depositTokenA is not 0"
            );
            assertEq(
                depositTokenB.balanceOf(alice),
                0,
                "Alice's post swap balance of depositTokenB is not 0"
            );
            assertEq(
                pool.balanceOf(alice) > 0,
                true,
                "Alice's post swap balance of pool is 0"
            );
        }

        deposits = new address[](1);
        deposits[0] = address(pool);
        amounts = new uint256[](1);
        amounts[0] = pool.balanceOf(alice);
        withdrawals = new address[](1);
        withdrawals[0] = address(depositTokenA);
        allocations = new uint256[](1);
        allocations[0] = 1e18;
        receiveAmounts = new uint256[](1);

        pool.approve(address(pool), pool.balanceOf(alice));

        if (amounts[0] * 3 > pool.info().balance) {
            vm.expectRevert(
                abi.encodeWithSelector(Pool.TooLarge.selector, amounts[0])
            );
            pool.multiswap(deposits, amounts, withdrawals, allocations);
        } else {
            receiveAmounts = pool.multiswap(
                deposits,
                amounts,
                withdrawals,
                allocations
            );

            checkSF(
                deposits,
                amounts,
                withdrawals,
                allocations,
                receiveAmounts
            );
        }

        // assertEq(depositTokenA.balanceOf(alice) > 0, true);
        // assertEq(pool.balanceOf(alice), 0);

        vm.stopPrank();
    }

    function testMultiTrack(uint256 amount) public {
        vm.assume((amount > 1e17) && (amount < 1e50));

        address alice = address(1);
        vm.startPrank(alice);

        Token depositToken = tokens[0];
        Token withdrawalToken = tokens[1];

        // test initial balances
        uint256 initialDepositBalance = depositToken.balanceOf(alice);
        assertEq(initialDepositBalance, 0, "initialDepositBalance is not 0");
        uint256 initialWithdrawalBalance = withdrawalToken.balanceOf(alice);
        assertEq(
            initialWithdrawalBalance,
            0,
            "initialWithdrawalBalance is not 0"
        );

        depositToken.mint(amount);
        depositToken.approve(address(pool), amount);

        // test after mint balances
        uint256 afterMintDepositBalance = depositToken.balanceOf(alice);
        assertEq(
            afterMintDepositBalance,
            amount,
            "afterMintDepositBalance is not amount"
        );
        uint256 afterMintWithdrawalBalance = withdrawalToken.balanceOf(alice);
        assertEq(
            afterMintWithdrawalBalance,
            0,
            "afterMintWithdrawalBalance is not 0"
        );

        // perform swap
        if (amount * 3 > pool.asset(address(depositToken)).balance) {
            vm.expectRevert(
                abi.encodeWithSelector(Pool.TooLarge.selector, amount)
            );
            pool.swap(address(depositToken), address(withdrawalToken), amount);
        } else {
            pool.swap(address(depositToken), address(withdrawalToken), amount);

            // test after swap balances
            uint256 afterSwapDepositBalance = depositToken.balanceOf(alice);
            assertEq(
                afterSwapDepositBalance,
                0,
                "afterSwapDepositBalance is not 0"
            );
            uint256 afterSwapWithdrawalBalance = withdrawalToken.balanceOf(
                alice
            );
            assertEq(
                afterSwapWithdrawalBalance > 0,
                true,
                "afterSwapWithdrawalBalance is not > 0"
            );
        }

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
        vm.assume((amountA > 1e17) && (amountA < 1e50));
        vm.assume((amountB > 1e17) && (amountB < 1e50));
        depositIndexA = (depositIndexA % tokens.length) / 3;
        depositIndexB = ((depositIndexB % tokens.length) / 3) + depositIndexA;
        withdrawIndex = ((withdrawIndex % tokens.length) / 3) + depositIndexB;
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
        uint256[] memory receiveAmounts = new uint256[](1);
        if (amountA * 3 > pool.asset(deposits[0]).balance) {
            vm.expectRevert(
                abi.encodeWithSelector(Pool.TooLarge.selector, amountA)
            );
            pool.multiswap(deposits, amounts, withdrawals, allocations);
        } else if (amountB * 3 > pool.asset(deposits[1]).balance) {
            vm.expectRevert(
                abi.encodeWithSelector(Pool.TooLarge.selector, amountB)
            );
            pool.multiswap(deposits, amounts, withdrawals, allocations);
        } else {
            receiveAmounts = pool.multiswap(
                deposits,
                amounts,
                withdrawals,
                allocations
            );

            checkSF(
                deposits,
                amounts,
                withdrawals,
                allocations,
                receiveAmounts
            );
        }
    }

    function testBigSwap() public {
        uint256 numberOfTokens = NTOKENS / 2;
        address[] memory deposits = new address[](numberOfTokens);
        uint256[] memory amounts = new uint256[](numberOfTokens);
        address[] memory withdrawals = new address[](numberOfTokens);
        uint256[] memory allocations = new uint256[](numberOfTokens);
        uint256[] memory receiveAmounts = new uint256[](numberOfTokens);

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
            allocations[i - numberOfTokens] = totalAllocation / numberOfTokens;
        }

        receiveAmounts = pool.multiswap(
            deposits,
            amounts,
            withdrawals,
            allocations
        );

        checkSF(deposits, amounts, withdrawals, allocations, receiveAmounts);
    } // !! TODO check that valid deposit/withdrawal addresses are being used
}

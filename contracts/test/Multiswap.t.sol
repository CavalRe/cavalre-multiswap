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
        Token payToken = tokens[0];
        Token receiveToken = tokens[1];
        uint256 amount = 1e27;
        payToken.mint(amount);
        payToken.approve(address(pool), amount);

        address[] memory payTokens = new address[](1);
        payTokens[0] = address(payToken);
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        address[] memory receiveTokens = new address[](1);
        receiveTokens[0] = address(receiveToken);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = 1e18;
        uint256[] memory minReceiveAmounts = new uint256[](1);
        uint256[] memory receiveAmounts = new uint256[](1);
        uint256 feeAmount;
        if (amount * 3 > pool.asset(payTokens[0]).balance) {
            vm.expectRevert(
                abi.encodeWithSelector(IPool.TooLarge.selector, amount)
            );
            pool.multiswap(
                payTokens,
                amounts,
                receiveTokens,
                allocations,
                minReceiveAmounts
            );
        } else {
            (receiveAmounts, feeAmount) = pool.multiswap(
                payTokens,
                amounts,
                receiveTokens,
                allocations,
                minReceiveAmounts
            );

            checkSF(
                payTokens,
                amounts,
                receiveTokens,
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
        Token payToken = tokens[depositIndex];
        Token receiveToken = tokens[withdrawalIndex];
        uint256 amount = 1e27;
        payToken.mint(amount);
        payToken.approve(address(pool), amount);

        address[] memory payTokens = new address[](1);
        payTokens[0] = address(payToken);
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        address[] memory receiveTokens = new address[](1);
        receiveTokens[0] = address(receiveToken);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = 1e18;
        uint256[] memory minReceiveAmounts = new uint256[](1);
        pool.multiswap(
            payTokens,
            amounts,
            receiveTokens,
            allocations,
            minReceiveAmounts
        );
    }

    function testMultiFuzzAmount(uint256 amount) public {
        vm.assume((amount > 1e17) && (amount < 1e50));

        Token payToken = tokens[0];
        Token receiveToken = tokens[1];
        payToken.mint(amount);
        payToken.approve(address(pool), amount);

        address[] memory payTokens = new address[](1);
        payTokens[0] = address(payToken);
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        address[] memory receiveTokens = new address[](1);
        receiveTokens[0] = address(receiveToken);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = 1e18;
        uint256[] memory minReceiveAmounts = new uint256[](1);
        uint256[] memory receiveAmounts = new uint256[](1);
        uint256 feeAmount;
        if (amount * 3 > pool.asset(payTokens[0]).balance) {
            vm.expectRevert(
                abi.encodeWithSelector(IPool.TooLarge.selector, amount)
            );
            pool.multiswap(
                payTokens,
                amounts,
                receiveTokens,
                allocations,
                minReceiveAmounts
            );
        } else {
            (receiveAmounts, feeAmount) = pool.multiswap(
                payTokens,
                amounts,
                receiveTokens,
                allocations,
                minReceiveAmounts
            );

            checkSF(
                payTokens,
                amounts,
                receiveTokens,
                allocations,
                receiveAmounts
            );
        }
    }

    // TODO what about doubling up on the same side
    function testDuplicateToken(uint256 index) public {
        index = index % tokens.length;
        Token payToken = tokens[index];
        Token receiveToken = tokens[index];
        uint256 amount = 1e27;
        payToken.mint(amount);
        payToken.approve(address(pool), amount);

        address[] memory payTokens = new address[](1);
        payTokens[0] = address(payToken);
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        address[] memory receiveTokens = new address[](1);
        receiveTokens[0] = address(receiveToken);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = 1e18;
        uint256[] memory minReceiveAmounts = new uint256[](1);
        vm.expectRevert(
            abi.encodeWithSelector(
                IPool.DuplicateToken.selector,
                address(payToken)
            )
        );
        pool.multiswap(
            payTokens,
            amounts,
            receiveTokens,
            allocations,
            minReceiveAmounts
        );

        setUp();
        payTokens[0] = address(pool);
        receiveTokens[0] = address(pool);
        vm.expectRevert(
            abi.encodeWithSelector(IPool.DuplicateToken.selector, address(pool))
        );
        pool.multiswap(
            payTokens,
            amounts,
            receiveTokens,
            allocations,
            minReceiveAmounts
        );
    }

    function testIncorrectAllocation() public {
        Token payToken = tokens[0];
        Token receiveToken = tokens[1];
        uint256 amount = 1e27;
        payToken.mint(amount);
        payToken.approve(address(pool), amount);

        address[] memory payTokens = new address[](1);
        payTokens[0] = address(payToken);
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        address[] memory receiveTokens = new address[](1);
        receiveTokens[0] = address(receiveToken);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = 2;
        uint256[] memory minReceiveAmounts = new uint256[](1);
        vm.expectRevert(
            abi.encodeWithSelector(IPool.IncorrectAllocation.selector, 1e18, 2)
        );
        pool.multiswap(
            payTokens,
            amounts,
            receiveTokens,
            allocations,
            minReceiveAmounts
        );
    }

    function testWithdrawalMismatch() public {
        Token payToken = tokens[0];
        Token receiveToken = tokens[1];
        uint256 amount = 1e27;
        payToken.mint(amount);
        payToken.approve(address(pool), amount);

        address[] memory payTokens = new address[](1);
        payTokens[0] = address(payToken);
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        address[] memory receiveTokens = new address[](2);
        receiveTokens[0] = address(receiveToken);
        receiveTokens[1] = address(tokens[2]);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = 1e18;
        uint256[] memory minReceiveAmounts = new uint256[](1);
        vm.expectRevert(
            abi.encodeWithSelector(IPool.LengthMismatch.selector, 2, 1)
        );
        pool.multiswap(
            payTokens,
            amounts,
            receiveTokens,
            allocations,
            minReceiveAmounts
        );
    }

    function testDepositMismatch() public {
        Token payToken = tokens[0];
        Token receiveToken = tokens[1];
        uint256 amount = 1e27;
        payToken.mint(amount);
        payToken.approve(address(pool), amount);

        address[] memory payTokens = new address[](1);
        payTokens[0] = address(payToken);
        uint256[] memory amounts = new uint256[](2);
        amounts[0] = amount;
        amounts[1] = 1e27;
        address[] memory receiveTokens = new address[](1);
        receiveTokens[0] = address(receiveToken);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = 1e18;
        uint256[] memory minReceiveAmounts = new uint256[](1);
        vm.expectRevert(
            abi.encodeWithSelector(IPool.LengthMismatch.selector, 1, 2)
        );
        pool.multiswap(
            payTokens,
            amounts,
            receiveTokens,
            allocations,
            minReceiveAmounts
        );
    }

    function testMultiNoWithdrawal() public {
        Token payToken = tokens[0];
        uint256 amount = 1e27;
        payToken.mint(amount);
        payToken.approve(address(pool), amount);

        address[] memory payTokens = new address[](1);
        payTokens[0] = address(payToken);
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        address[] memory receiveTokens = new address[](0);
        uint256[] memory allocations = new uint256[](0);
        uint256[] memory minReceiveAmounts = new uint256[](0);
        vm.expectRevert(abi.encodeWithSelector(IPool.ZeroLength.selector));
        pool.multiswap(
            payTokens,
            amounts,
            receiveTokens,
            allocations,
            minReceiveAmounts
        );
    }

    function testMultiNoDeposit() public {
        Token payToken = tokens[0];
        Token receiveToken = tokens[1];
        uint256 amount = 1e27;
        payToken.mint(amount);
        payToken.approve(address(pool), amount);

        address[] memory payTokens = new address[](0);
        uint256[] memory amounts = new uint256[](0);
        address[] memory receiveTokens = new address[](1);
        receiveTokens[0] = address(receiveToken);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = 1e18;
        uint256[] memory minReceiveAmounts = new uint256[](1);
        vm.expectRevert(abi.encodeWithSelector(IPool.ZeroLength.selector));
        pool.multiswap(
            payTokens,
            amounts,
            receiveTokens,
            allocations,
            minReceiveAmounts
        );
    }

    function testMultiZeroDeposit() public {
        Token payToken = tokens[0];
        Token receiveToken = tokens[1];
        uint256 amount = 0;
        payToken.mint(amount);
        payToken.approve(address(pool), amount);

        address[] memory payTokens = new address[](1);
        payTokens[0] = address(payToken);
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        address[] memory receiveTokens = new address[](1);
        receiveTokens[0] = address(receiveToken);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = 1e18;
        uint256[] memory minReceiveAmounts = new uint256[](1);
        vm.expectRevert(abi.encodeWithSelector(IPool.ZeroAmount.selector));
        pool.multiswap(
            payTokens,
            amounts,
            receiveTokens,
            allocations,
            minReceiveAmounts
        );
    }

    function testMultiDuplicateToken() public {
        uint256 amount = 1e27;

        address[] memory duplicateTokens = new address[](2);
        duplicateTokens[0] = addresses[0];
        duplicateTokens[1] = addresses[0];

        address[] memory differentTokens = new address[](2);
        differentTokens[0] = addresses[1];
        differentTokens[1] = addresses[2];

        address[] memory duplicatePool = new address[](2);
        duplicatePool[0] = address(pool);
        duplicatePool[1] = address(pool);

        address[] memory poolSecond = new address[](2);
        poolSecond[0] = addresses[0];
        poolSecond[1] = address(pool);

        uint256[] memory amounts = new uint256[](2);
        amounts[0] = amount;
        amounts[1] = amount;

        uint256[] memory allocations = new uint256[](2);
        allocations[0] = 5e17;
        allocations[0] = 5e17;

        uint256[] memory minReceiveAmounts = new uint256[](2);

        vm.expectRevert(
            abi.encodeWithSelector(
                IPool.DuplicateToken.selector,
                duplicateTokens[0]
            )
        );
        pool.multiswap(
            duplicateTokens,
            amounts,
            differentTokens,
            allocations,
            minReceiveAmounts
        );

        vm.expectRevert(
            abi.encodeWithSelector(
                IPool.DuplicateToken.selector,
                duplicateTokens[0]
            )
        );
        pool.multiswap(
            differentTokens,
            amounts,
            duplicateTokens,
            allocations,
            minReceiveAmounts
        );

        vm.expectRevert(
            abi.encodeWithSelector(IPool.DuplicateToken.selector, address(pool))
        );
        pool.multiswap(
            duplicatePool,
            amounts,
            differentTokens,
            allocations,
            minReceiveAmounts
        );

        vm.expectRevert(
            abi.encodeWithSelector(IPool.DuplicateToken.selector, address(pool))
        );
        pool.multiswap(
            differentTokens,
            amounts,
            duplicatePool,
            allocations,
            minReceiveAmounts
        );

        vm.expectRevert(abi.encodeWithSelector(IPool.LPTokenFirst.selector));
        pool.multiswap(
            poolSecond,
            amounts,
            differentTokens,
            allocations,
            minReceiveAmounts
        );

        vm.expectRevert(abi.encodeWithSelector(IPool.LPTokenFirst.selector));
        pool.multiswap(
            differentTokens,
            amounts,
            poolSecond,
            allocations,
            minReceiveAmounts
        );
    }

    function testFailMultiWithdrawNonContract() public {
        Token payToken = tokens[0];
        uint256 amount = 1e27;
        payToken.mint(amount);
        payToken.approve(address(pool), amount);

        address[] memory payTokens = new address[](1);
        payTokens[0] = address(payToken);
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        address[] memory receiveTokens = new address[](1);
        receiveTokens[0] = address(0);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = 1e18;
        uint256[] memory minReceiveAmounts = new uint256[](1);
        pool.multiswap(
            payTokens,
            amounts,
            receiveTokens,
            allocations,
            minReceiveAmounts
        );
    }

    function testFailMultiWithdrawNotInPool() public {
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
        uint256[] memory minReceiveAmounts = new uint256[](1);
        pool.multiswap(
            payTokens,
            amounts,
            receiveTokens,
            allocations,
            minReceiveAmounts
        );
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

    function testMultiPoolFuzz(uint256 amountA, uint256 amountB) public {
        // fuzz setup
        vm.assume((amountA > 1e17) && (amountA < 1e50));
        vm.assume((amountB > 1e17) && (amountB < 1e50));

        address alice = address(1);
        vm.startPrank(alice);

        // initial state
        tokens[0].mint(amountA);
        tokens[0].approve(address(pool), amountA);

        tokens[1].mint(amountB);
        tokens[1].approve(address(pool), amountB);

        checkScale();

        // check initial state
        assertEq(
            tokens[0].balanceOf(alice) > 0,
            true,
            "Alice's initial balance of payTokenA is 0"
        );
        assertEq(
            tokens[1].balanceOf(alice) > 0,
            true,
            "Alice's initial balance of tokens[1] is 0"
        );
        // assertEq(
        //     pool.balanceOf(alice),
        //     0,
        //     "Alice's initial balance of pool is not 0"
        // );

        // swap
        address[] memory payTokens = new address[](2);
        payTokens[0] = addresses[0];
        payTokens[1] = addresses[1];
        uint256[] memory amounts = new uint256[](2);
        amounts[0] = amountA;
        amounts[1] = amountB;
        address[] memory receiveTokens = new address[](1);
        receiveTokens[0] = address(pool);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = 1e18;
        uint256[] memory minReceiveAmounts = new uint256[](1);
        uint256[] memory receiveAmounts = new uint256[](1);
        uint256 feeAmount;
        if (amountA * 3 > pool.asset(payTokens[0]).balance) {
            vm.roll(block.number + 1);
            vm.expectRevert(
                abi.encodeWithSelector(IPool.TooLarge.selector, amountA)
            );
            pool.multiswap(
                payTokens,
                amounts,
                receiveTokens,
                allocations,
                minReceiveAmounts
            );
        } else if (amountB * 3 > pool.asset(payTokens[1]).balance) {
            vm.roll(block.number + 1);
            vm.expectRevert(
                abi.encodeWithSelector(IPool.TooLarge.selector, amountB)
            );
            pool.multiswap(
                payTokens,
                amounts,
                receiveTokens,
                allocations,
                minReceiveAmounts
            );
        } else {
            vm.roll(block.number + 1);
            (receiveAmounts, feeAmount) = pool.multiswap(
                payTokens,
                amounts,
                receiveTokens,
                allocations,
                minReceiveAmounts
            );

            checkSF(
                payTokens,
                amounts,
                receiveTokens,
                allocations,
                receiveAmounts
            );

            // check post swap state
            assertEq(
                tokens[0].balanceOf(alice),
                0,
                "Alice's post swap balance of payTokenA is not 0"
            );
            assertEq(
                tokens[1].balanceOf(alice),
                0,
                "Alice's post swap balance of tokens[1] is not 0"
            );
            assertEq(
                pool.balanceOf(alice) > 0,
                true,
                "Alice's post swap balance of pool is 0"
            );
        }

        payTokens = new address[](1);
        payTokens[0] = address(pool);
        amounts = new uint256[](1);
        amounts[0] = pool.balanceOf(alice);
        receiveTokens = new address[](1);
        receiveTokens[0] = addresses[0];
        allocations = new uint256[](1);
        allocations[0] = 1e18;
        receiveAmounts = new uint256[](1);

        pool.approve(address(pool), pool.balanceOf(alice));

        if (amounts[0] * 3 > pool.info().balance) {
            vm.roll(block.number + 1);
            vm.expectRevert(
                abi.encodeWithSelector(IPool.TooLarge.selector, amounts[0])
            );
            pool.multiswap(
                payTokens,
                amounts,
                receiveTokens,
                allocations,
                minReceiveAmounts
            );
        } else {
            vm.roll(block.number + 1);
            (receiveAmounts, feeAmount) = pool.multiswap(
                payTokens,
                amounts,
                receiveTokens,
                allocations,
                minReceiveAmounts
            );

            checkSF(
                payTokens,
                amounts,
                receiveTokens,
                allocations,
                receiveAmounts
            );
        }

        vm.stopPrank();
    }

    function testMultiTrack(uint256 amount) public {
        vm.assume((amount > 1e17) && (amount < 1e50));

        address alice = address(1);
        vm.startPrank(alice);

        Token payToken = tokens[0];
        Token withdrawalToken = tokens[1];

        // test initial balances
        uint256 initialDepositBalance = payToken.balanceOf(alice);
        assertEq(initialDepositBalance, 0, "initialDepositBalance is not 0");
        uint256 initialWithdrawalBalance = withdrawalToken.balanceOf(alice);
        assertEq(
            initialWithdrawalBalance,
            0,
            "initialWithdrawalBalance is not 0"
        );

        payToken.mint(amount);
        payToken.approve(address(pool), amount);

        // test after mint balances
        uint256 afterMintDepositBalance = payToken.balanceOf(alice);
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
        if (amount * 3 > pool.asset(address(payToken)).balance) {
            vm.expectRevert(
                abi.encodeWithSelector(IPool.TooLarge.selector, amount)
            );
            pool.swap(address(payToken), address(withdrawalToken), amount, 0);
        } else {
            pool.swap(address(payToken), address(withdrawalToken), amount, 0);

            // test after swap balances
            uint256 afterSwapDepositBalance = payToken.balanceOf(alice);
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

    function testMultiSwapFuzz(uint256 amountA, uint256 amountB) public {
        // fuzz setup
        vm.assume((amountA > 1e17) && (amountA < 1e50));
        vm.assume((amountB > 1e17) && (amountB < 1e50));

        vm.startPrank(address(1));

        // initial state
        tokens[0].mint(amountA);
        tokens[0].approve(address(pool), amountA);

        tokens[1].mint(amountB);
        tokens[1].approve(address(pool), amountB);

        Token receiveToken = tokens[2];

        // check initial state
        assertEq(tokens[0].balanceOf(address(1)) > 0, true);
        assertEq(tokens[1].balanceOf(address(1)) > 0, true);
        assertEq(receiveToken.balanceOf(address(1)), 0);

        // swap
        address[] memory payTokens = new address[](2);
        payTokens[0] = addresses[0];
        payTokens[1] = addresses[1];
        uint256[] memory amounts = new uint256[](2);
        amounts[0] = amountA;
        amounts[1] = amountB;
        address[] memory receiveTokens = new address[](1);
        receiveTokens[0] = address(receiveToken);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = 1e18;
        uint256[] memory minReceiveAmounts = new uint256[](1);
        uint256[] memory receiveAmounts = new uint256[](1);
        uint256 feeAmount;
        if (amountA * 3 > pool.asset(payTokens[0]).balance) {
            vm.expectRevert(
                abi.encodeWithSelector(IPool.TooLarge.selector, amountA)
            );
            pool.multiswap(
                payTokens,
                amounts,
                receiveTokens,
                allocations,
                minReceiveAmounts
            );
        } else if (amountB * 3 > pool.asset(payTokens[1]).balance) {
            vm.expectRevert(
                abi.encodeWithSelector(IPool.TooLarge.selector, amountB)
            );
            pool.multiswap(
                payTokens,
                amounts,
                receiveTokens,
                allocations,
                minReceiveAmounts
            );
        } else {
            (receiveAmounts, feeAmount) = pool.multiswap(
                payTokens,
                amounts,
                receiveTokens,
                allocations,
                minReceiveAmounts
            );

            checkSF(
                payTokens,
                amounts,
                receiveTokens,
                allocations,
                receiveAmounts
            );
        }
    }

    function testBigSwap() public {
        uint256 numberOfTokens = NTOKENS / 2;
        address[] memory payTokens = new address[](numberOfTokens);
        uint256[] memory amounts = new uint256[](numberOfTokens);
        address[] memory receiveTokens = new address[](numberOfTokens);
        uint256[] memory allocations = new uint256[](numberOfTokens);
        uint256[] memory minReceiveAmounts = new uint256[](numberOfTokens);
        uint256[] memory receiveAmounts = new uint256[](numberOfTokens);
        uint256 feeAmount;

        for (uint256 i; i < numberOfTokens; i++) {
            Token token = tokens[i];
            uint256 amount = 1e27;
            token.mint(amount);
            token.approve(address(pool), amount);

            payTokens[i] = address(token);
            amounts[i] = amount;
        }

        uint256 totalAllocation = 1e18;
        for (uint256 i = numberOfTokens; i < NTOKENS; i++) {
            receiveTokens[i - numberOfTokens] = address(tokens[i]);
            allocations[i - numberOfTokens] = totalAllocation / numberOfTokens;
        }

        (receiveAmounts, feeAmount) = pool.multiswap(
            payTokens,
            amounts,
            receiveTokens,
            allocations,
            minReceiveAmounts
        );

        checkSF(payTokens, amounts, receiveTokens, allocations, receiveAmounts);
    } // !! TODO check that valid deposit/withdrawal addresses are being used
}

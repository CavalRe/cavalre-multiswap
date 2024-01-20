// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {console} from "forge-std/console.sol";
import {PoolTest} from "./Pool.t.sol";
import {Pool, FloatingPoint, UFloat, AssetState, AssetStateExternal, QuoteState, IPool} from "../contracts/Pool.sol";
import {Token} from "./Token.t.sol";

struct State {
    AssetState[] assets;
    uint256 poolBalance;
    uint256 poolScale;
}

contract MultiswapTest is PoolTest {
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

    function testMultiSmoke() public {
        vm.startPrank(alice);

        Token payToken = WAVAX;
        Token receiveToken = USDC;
        uint256 amount = payToken.balanceOf(address(pool)) / 10;
        UFloat memory amountFloat;
        amountFloat = UFloat(amount, -int256(int8(payToken.decimals())))
            .normalize();

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

        UFloat[] memory payAmountsFloat = new UFloat[](1);
        payAmountsFloat[0] = amountFloat;
        UFloat[] memory allocationsFloat = new UFloat[](1);
        allocationsFloat[0] = ONE_FLOAT;

        checkMultiwap(
            pool,
            payTokens,
            payAmountsFloat,
            receiveTokens,
            allocationsFloat
        );
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
        uint256 amount = payToken.balanceOf(address(pool)) / 10;
        payToken.mint(amount);
        payToken.approve(address(pool), amount);

        address[] memory payTokens = new address[](1);
        payTokens[0] = address(payToken);
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        address[] memory receiveTokens = new address[](1);
        receiveTokens[0] = address(receiveToken);

        UFloat[] memory amountsFloat = new UFloat[](1);
        amountsFloat[0] = amount.toUFloat(payToken.decimals());
        UFloat[] memory allocationsFloat = new UFloat[](1);
        allocationsFloat[0] = ONE_FLOAT;

        checkMultiwap(
            pool,
            payTokens,
            amountsFloat,
            receiveTokens,
            allocationsFloat
        );
    }

    function testMultiFuzzAmount(uint256 amount) public {
        vm.assume(amount > 0);

        Token payToken = WAVAX;
        Token receiveToken = USDC;

        // payToken.mint(amount);
        payToken.approve(address(pool), amount);

        address[] memory payTokens = new address[](1);
        payTokens[0] = address(payToken);
        address[] memory receiveTokens = new address[](1);
        receiveTokens[0] = address(receiveToken);

        UFloat[] memory amountsFloat = new UFloat[](1);
        amountsFloat[0] = UFloat(amount, -int256(int8(payToken.decimals())));
        UFloat[] memory allocationsFloat = new UFloat[](1);
        allocationsFloat[0] = ONE_FLOAT;

        checkMultiwap(
            pool,
            payTokens,
            amountsFloat,
            receiveTokens,
            allocationsFloat
        );
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
        Token payToken = WAVAX;
        Token receiveToken = USDC;
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
            abi.encodeWithSelector(IPool.IncorrectAmount.selector, 1e18, 2)
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
        Token payToken = WAVAX;
        Token receiveToken = USDC;
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
        Token payToken = WAVAX;
        Token receiveToken = USDC;
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
        Token payToken = WAVAX;
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
        Token payToken = WAVAX;
        Token receiveToken = USDC;
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
        Token payToken = WAVAX;
        Token receiveToken = USDC;
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
        duplicateTokens[0] = address(tokens[0]);
        duplicateTokens[1] = address(tokens[0]);

        address[] memory differentTokens = new address[](2);
        differentTokens[0] = address(tokens[1]);
        differentTokens[1] = address(tokens[3]);

        address[] memory duplicatePool = new address[](2);
        duplicatePool[0] = address(pool);
        duplicatePool[1] = address(pool);

        address[] memory poolSecond = new address[](2);
        poolSecond[0] = address(tokens[0]);
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
        Token payToken = WAVAX;
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
        Token payToken = WAVAX;
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
        AssetStateExternal[] memory initialAssets = pool.assets();
        uint256 scaleSum = 0;

        for (uint256 i; i < initialAssets.length; i++) {
            scaleSum += initialAssets[i].scale;
        }

        assertEq(scaleSum, scale);
    }

    function testMultiPoolFuzz(uint256 amountA, uint256 amountB) public {
        // // fuzz setup
        vm.assume((amountA > 0) && (amountB > 0));
        vm.assume(
            amountA < type(uint256).max - tokens[0].balanceOf(address(pool))
        );
        vm.assume(
            amountB < type(uint256).max - tokens[1].balanceOf(address(pool))
        );

        vm.startPrank(alice);

        // initial state
        tokens[0].burn(tokens[0].balanceOf(alice));
        tokens[1].burn(tokens[1].balanceOf(alice));
        emit log_named_uint("alice balanceA", tokens[0].balanceOf(alice));
        emit log_named_uint(
            "pool balanceA",
            tokens[0].balanceOf(address(pool))
        );
        emit log_named_uint("totalSupplyA", tokens[0].totalSupply());
        emit log_named_uint("alice balanceB", tokens[1].balanceOf(alice));
        emit log_named_uint(
            "pool balanceB",
            tokens[1].balanceOf(address(pool))
        );
        emit log_named_uint("totalSupplyB", tokens[1].totalSupply());
        emit log("Mint token A");
        tokens[0].mint(amountA);
        emit log("Approve token A");
        tokens[0].approve(address(pool), amountA);

        emit log("Mint token B");
        tokens[1].mint(amountB);
        emit log("Approve token B");
        tokens[1].approve(address(pool), amountB);

        // checkScale();

        // assertEq(
        //     pool.balanceOf(alice),
        //     0,
        //     "Alice's initial balance of pool is not 0"
        // );

        // swap
        address[] memory payTokens = new address[](2);
        payTokens[0] = address(tokens[0]);
        payTokens[1] = address(tokens[1]);
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

        QuoteState memory q;
        emit log("Get quote");
        {
            UFloat[] memory amountsFloat = new UFloat[](2);
            amountsFloat[0] = UFloat(
                amountA,
                -int256(int8(tokens[0].decimals()))
            ).normalize();
            amountsFloat[1] = UFloat(
                amountB,
                -int256(int8(tokens[1].decimals()))
            ).normalize();
            emit log_named_string("payAmountFloatA", toString(amountsFloat[0]));
            emit log_named_string("payAmountFloatB", toString(amountsFloat[1]));
            emit log_named_string(
                "balanceFloatA",
                toString(
                    pool.asset(payTokens[0]).balance.toUFloat(
                        tokens[0].decimals()
                    )
                )
            );
            emit log_named_string(
                "balanceFloatB",
                toString(
                    pool.asset(payTokens[1]).balance.toUFloat(
                        tokens[1].decimals()
                    )
                )
            );
            UFloat[] memory allocationsFloat = new UFloat[](1);
            allocationsFloat[0] = ONE_FLOAT;

            q = pool._quoteMultiswap(
                alice,
                payTokens,
                amountsFloat,
                receiveTokens,
                allocationsFloat
            );
            checkSelfFinancing(pool, q, "Self financing");
        }

        if (amountA > tokens[0].balanceOf(address(pool)) / 3) {
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
        } else if (amountB > tokens[1].balanceOf(address(pool)) / 3) {
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

            // check post swap state
            assertEq(
                tokens[0].balanceOf(alice),
                0,
                "Alice's post swap balance of payTokenA is not 0"
            );
            assertEq(
                tokens[1].balanceOf(alice),
                0,
                "Alice's post swap balance of payTokenB is not 0"
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
        receiveTokens[0] = address(tokens[0]);
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
        }

        vm.stopPrank();
    }

    function testMultiTrack(uint256 amount) public {
        vm.assume(amount > 0);
        vm.assume(amount < type(uint256).max - WAVAX.totalSupply());

        address alice = address(1);
        vm.startPrank(alice);

        Token payToken = WAVAX;
        Token receiveToken = USDC;

        // test initial balances
        uint256 initialDepositBalance = payToken.balanceOf(alice);
        payToken.burn(initialDepositBalance);
        assertEq(
            payToken.balanceOf(alice),
            0,
            "initialDepositBalance is not 0"
        );

        uint256 initialWithdrawalBalance = receiveToken.balanceOf(alice);
        receiveToken.burn(initialWithdrawalBalance);
        assertEq(
            receiveToken.balanceOf(alice),
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
        uint256 afterMintWithdrawalBalance = receiveToken.balanceOf(alice);
        assertEq(
            afterMintWithdrawalBalance,
            0,
            "afterMintWithdrawalBalance is not 0"
        );

        QuoteState memory q;
        emit log("Get quote");
        {
            UFloat memory amountFloat = UFloat(
                amount,
                -int256(int8(payToken.decimals()))
            ).normalize();
            emit log_named_string("payAmountFloat", toString(amountFloat));
            emit log_named_string(
                "balanceFloat",
                toString(
                    pool.asset(address(payToken)).balance.toUFloat(
                        payToken.decimals()
                    )
                )
            );

            q = pool._quoteSwap(
                address(payToken),
                address(receiveToken),
                amountFloat
            );
            checkSelfFinancing(pool, q, "Self financing");
        }

        // perform swap
        if (amount > payToken.balanceOf(address(pool)) / 3) {
            emit log("Pay amount is too large");
            vm.expectRevert(
                abi.encodeWithSelector(IPool.TooLarge.selector, amount)
            );
            pool.swap(address(payToken), address(receiveToken), amount, 0);
        } else if (q.receiveAmounts[0].toUInt(receiveToken.decimals()) == 0) {
            emit log("Receive amount is zero");
            vm.expectRevert(abi.encodeWithSelector(IPool.ZeroAmount.selector));
            pool.swap(address(payToken), address(receiveToken), amount, 0);
        } else {
            emit log("Swap it!");
            pool.swap(address(payToken), address(receiveToken), amount, 0);

            // test after swap balances
            uint256 afterSwapDepositBalance = payToken.balanceOf(alice);
            assertEq(
                afterSwapDepositBalance,
                0,
                "afterSwapDepositBalance is not 0"
            );
            uint256 afterSwapWithdrawalBalance = receiveToken.balanceOf(alice);
            assertEq(
                afterSwapWithdrawalBalance > 0,
                true,
                "afterSwapWithdrawalBalance is not > 0"
            );
        }

        vm.stopPrank();
    }

    function testMultiSwapFuzz(uint256 amountA, uint256 amountB) public {
        vm.startPrank(alice);

        // fuzz setup
        vm.assume((amountA > 0) && (amountB > 0));
        vm.assume(
            amountA < type(uint256).max - tokens[0].balanceOf(address(pool))
        );
        vm.assume(
            amountB < type(uint256).max - tokens[1].balanceOf(address(pool))
        );

        Token receiveToken = tokens[2];

        // swap
        address[] memory payTokens = new address[](2);
        payTokens[0] = address(WAVAX);
        payTokens[1] = address(USDC);
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

        // initial state
        tokens[0].burn(tokens[0].balanceOf(alice));
        tokens[1].burn(tokens[1].balanceOf(alice));

        tokens[0].mint(amountA);
        tokens[0].approve(address(pool), amountA);

        tokens[1].mint(amountB);
        tokens[1].approve(address(pool), amountB);

        QuoteState memory q;
        emit log("Get quote");
        {
            UFloat[] memory amountsFloat = new UFloat[](2);
            amountsFloat[0] = UFloat(
                amountA,
                -int256(int8(tokens[0].decimals()))
            ).normalize();
            amountsFloat[1] = UFloat(
                amountB,
                -int256(int8(tokens[1].decimals()))
            ).normalize();
            emit log_named_string("payAmountFloatA", toString(amountsFloat[0]));
            emit log_named_string("payAmountFloatB", toString(amountsFloat[1]));
            emit log_named_string(
                "balanceFloatA",
                toString(
                    pool.asset(payTokens[0]).balance.toUFloat(
                        tokens[0].decimals()
                    )
                )
            );
            emit log_named_string(
                "balanceFloatB",
                toString(
                    pool.asset(payTokens[1]).balance.toUFloat(
                        tokens[1].decimals()
                    )
                )
            );
            UFloat[] memory allocationsFloat = new UFloat[](1);
            allocationsFloat[0] = ONE_FLOAT;

            q = pool._quoteMultiswap(
                alice,
                payTokens,
                amountsFloat,
                receiveTokens,
                allocationsFloat
            );
            checkSelfFinancing(pool, q, "Self financing");
        }

        if (amountA > tokens[0].balanceOf(address(pool)) / 3) {
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
        } else if (amountB > tokens[1].balanceOf(address(pool)) / 3) {
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
        } else if (q.receiveAmounts[0].toUInt(receiveToken.decimals()) == 0) {
            emit log("Receive amount is zero");
            vm.expectRevert(abi.encodeWithSelector(IPool.ZeroAmount.selector));
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
            uint256 amount = token.balanceOf(address(pool)) / 10;
            // token.mint(amount);
            token.approve(address(pool), amount);

            payTokens[i] = address(token);
            amounts[i] = amount;
        }

        for (uint256 i = numberOfTokens; i < NTOKENS; i++) {
            receiveTokens[i - numberOfTokens] = address(tokens[i]);
        }

        uint256 totalAllocation;
        uint256 allocation;
        for (uint256 i = numberOfTokens; i < NTOKENS - 1; i++) {
            allocation = 1e18 / (NTOKENS - numberOfTokens);
            allocations[i - numberOfTokens] = allocation;
            totalAllocation += allocation;
        }
        allocations[NTOKENS - numberOfTokens - 1] = 1e18 - totalAllocation;

        (receiveAmounts, feeAmount) = pool.multiswap(
            payTokens,
            amounts,
            receiveTokens,
            allocations,
            minReceiveAmounts
        );

        // checkSF(payTokens, amounts, receiveTokens, allocations, receiveAmounts);
    } // !! TODO check that valid deposit/withdrawal addresses are being used
}

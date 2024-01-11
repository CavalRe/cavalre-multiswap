// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {console} from "forge-std/console.sol";
import {PoolTest} from "./Pool.t.sol";
import {Pool, FP, UFloat, AssetState, AssetStateExternal, QuoteState, IPool} from "../contracts/Pool.sol";
import {Token} from "./Token.t.sol";

struct State {
    AssetState[] assets;
    uint256 poolBalance;
    uint256 poolScale;
}

contract MultiswapTest is PoolTest {
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

    // function shift(UFloat memory a, int256 i) internal returns (UFloat memory) {
    //     emit log_named_int("Shift", i);
    //     if (a.mantissa == 0) return UFloat(0, 0);
    //     if (i > 0) {
    //         emit log("---------------------------------");
    //         emit log_named_uint("a.mantissa", a.mantissa);
    //         emit log_named_int("a.exponent", a.exponent);
    //         for (int256 j; j < i; j++) {
    //             a.mantissa /= 10;
    //             a.exponent += 1;
    //             emit log("---------------------------------");
    //             emit log_named_uint("a.mantissa", a.mantissa);
    //             emit log_named_int("a.exponent", a.exponent);
    //             if (a.mantissa == 0) return UFloat(0, 0);
    //         }
    //     } else if (i < 0) {
    //         a.mantissa *= 10 ** FP.toUInt(-i);
    //         a.exponent += i;
    //     }
    //     emit log("Lessgooo!");
    //     return a;
    // }

    function testMultiSmoke() public {
        vm.startPrank(alice);

        Token payToken = WAVAX;
        Token receiveToken = USDC;
        // uint256 amount = 1e27;
        uint256 amount;
        // amount = 167898529394108508548957337378873748730842084596241128;
        amount = 40220187134998107484890218317601876816937911541436243019270437539076288474593;
        UFloat memory amountFloat;
        // amountFloat = UFloat(amount, 0);
        // int256 shiftAmount_ = FP.shiftAmount(amount);
        // emit log_named_int("shiftAmount_", shiftAmount_);
        // amountFloat = FP.shift(amountFloat, shiftAmount_);
        // emit log_named_string("amountFloat", amountFloat.toString());

        // amount = 1e49;
        emit log("Normalize amount");
        amountFloat = UFloat(amount, 0).normalize();
        emit log_named_string("amountFloat", amountFloat.toString());
        // emit log_named_uint("amount / type(uint256).max", amount / type(uint256).max);
        // amount = payToken.balanceOf(address(pool)) * (amount / type(uint256).max);
        emit log_named_uint("amount", amount);
        payToken.mint(amount);
        payToken.approve(address(pool), amount);

        address[] memory payTokens = new address[](1);
        payTokens[0] = address(payToken);
        // uint256[] memory amounts = new uint256[](1);
        // amounts[0] = amount;
        address[] memory receiveTokens = new address[](1);
        receiveTokens[0] = address(receiveToken);
        // uint256[] memory allocations = new uint256[](1);
        // allocations[0] = 1e18;
        // uint256[] memory minReceiveAmounts = new uint256[](1);
        // uint256[] memory receiveAmounts = new uint256[](1);
        // uint256 feeAmount;

        amountFloat = UFloat(402201871349981074, 1000);

        UFloat[] memory amountsFloat = new UFloat[](1);
        amountsFloat[0] = amountFloat;
        UFloat[] memory allocationsFloat = new UFloat[](1);
        allocationsFloat[0] = ONE_FLOAT;

        emit log("Get quote");
        QuoteState memory q = pool._quoteMultiswap(
            alice,
            payTokens,
            amountsFloat,
            receiveTokens,
            allocationsFloat
        );
        showQuote(pool, q);
        emit log("Check self financing");
        checkSelfFinancing(pool, q, "Smoke test");

        // if (amount * 3 > pool.asset(payTokens[0]).balance) {
        //     vm.expectRevert(
        //         abi.encodeWithSelector(IPool.TooLarge.selector, amount)
        //     );
        //     pool.multiswap(
        //         payTokens,
        //         amounts,
        //         receiveTokens,
        //         allocations,
        //         minReceiveAmounts
        //     );
        // } else {
        //     (receiveAmounts, feeAmount) = pool.multiswap(
        //         payTokens,
        //         amounts,
        //         receiveTokens,
        //         allocations,
        //         minReceiveAmounts
        //     );
        // }
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

        UFloat[] memory amountsFloat = new UFloat[](1);
        amountsFloat[0] = amount.toUFloat(payToken.decimals());
        UFloat[] memory allocationsFloat = new UFloat[](1);
        allocationsFloat[0] = ONE_FLOAT;

        QuoteState memory q = pool._quoteMultiswap(
            alice,
            payTokens,
            amountsFloat,
            receiveTokens,
            allocationsFloat
        );
        checkSelfFinancing(pool, q, "Smoke test");
    }

    function testMultiFuzzAmount(uint64 amount) public {
        vm.assume(amount > 0);
        UFloat memory amountFloat = UFloat(amount, 0).normalize();

        Token payToken = WAVAX;
        Token receiveToken = USDC;

        // payToken.mint(type(uint256).max);
        // payToken.approve(address(pool), amount);

        address[] memory payTokens = new address[](1);
        payTokens[0] = address(payToken);
        // uint256[] memory amounts = new uint256[](1);
        // amounts[0] = amount;
        address[] memory receiveTokens = new address[](1);
        receiveTokens[0] = address(receiveToken);
        // uint256[] memory allocations = new uint256[](1);
        // allocations[0] = 1e18;
        // uint256[] memory minReceiveAmounts = new uint256[](1);
        // uint256[] memory receiveAmounts = new uint256[](1);
        // uint256 feeAmount;

        UFloat[] memory amounts = new UFloat[](1);
        amounts[0] = amountFloat;
        // amountsFloat[0] = amount.toUFloat(payToken.decimals());
        UFloat[] memory allocations = new UFloat[](1);
        allocations[0] = ONE_FLOAT;

        QuoteState memory q = pool._quoteMultiswap(
            alice,
            payTokens,
            amounts,
            receiveTokens,
            allocations
        );
        checkSelfFinancing(pool, q, "Fuzz test");

        // if (amount * 3 > pool.asset(payTokens[0]).balance) {
        //     vm.expectRevert(
        //         abi.encodeWithSelector(IPool.TooLarge.selector, amount)
        //     );
        //     pool.multiswap(
        //         payTokens,
        //         amounts,
        //         receiveTokens,
        //         allocations,
        //         minReceiveAmounts
        //     );
        // } else if (q.receiveAmounts[0].toUInt(receiveToken.decimals()) == 0) {
        //     vm.expectRevert(
        //         abi.encodeWithSelector(IPool.ZeroAmount.selector)
        //     );
        //     pool.multiswap(
        //         payTokens,
        //         amounts,
        //         receiveTokens,
        //         allocations,
        //         minReceiveAmounts
        //     );
        // } else {
        //     (receiveAmounts, feeAmount) = pool.multiswap(
        //         payTokens,
        //         amounts,
        //         receiveTokens,
        //         allocations,
        //         minReceiveAmounts
        //     );
        // }
    }

    // // TODO what about doubling up on the same side
    // function testDuplicateToken(uint256 index) public {
    //     index = index % tokens.length;
    //     Token payToken = tokens[index];
    //     Token receiveToken = tokens[index];
    //     uint256 amount = 1e27;
    //     payToken.mint(amount);
    //     payToken.approve(address(pool), amount);

    //     address[] memory payTokens = new address[](1);
    //     payTokens[0] = address(payToken);
    //     uint256[] memory amounts = new uint256[](1);
    //     amounts[0] = amount;
    //     address[] memory receiveTokens = new address[](1);
    //     receiveTokens[0] = address(receiveToken);
    //     uint256[] memory allocations = new uint256[](1);
    //     allocations[0] = 1e18;
    //     uint256[] memory minReceiveAmounts = new uint256[](1);
    //     vm.expectRevert(
    //         abi.encodeWithSelector(
    //             IPool.DuplicateToken.selector,
    //             address(payToken)
    //         )
    //     );
    //     pool.multiswap(
    //         payTokens,
    //         amounts,
    //         receiveTokens,
    //         allocations,
    //         minReceiveAmounts
    //     );

    //     setUp();
    //     payTokens[0] = address(pool);
    //     receiveTokens[0] = address(pool);
    //     vm.expectRevert(
    //         abi.encodeWithSelector(IPool.DuplicateToken.selector, address(pool))
    //     );
    //     pool.multiswap(
    //         payTokens,
    //         amounts,
    //         receiveTokens,
    //         allocations,
    //         minReceiveAmounts
    //     );
    // }

    // function testIncorrectAllocation() public {
    //     Token payToken = WAVAX;
    //     Token receiveToken = USDC;
    //     uint256 amount = 1e27;
    //     payToken.mint(amount);
    //     payToken.approve(address(pool), amount);

    //     address[] memory payTokens = new address[](1);
    //     payTokens[0] = address(payToken);
    //     uint256[] memory amounts = new uint256[](1);
    //     amounts[0] = amount;
    //     address[] memory receiveTokens = new address[](1);
    //     receiveTokens[0] = address(receiveToken);
    //     uint256[] memory allocations = new uint256[](1);
    //     allocations[0] = 2;
    //     uint256[] memory minReceiveAmounts = new uint256[](1);
    //     vm.expectRevert(
    //         abi.encodeWithSelector(IPool.IncorrectAmount.selector, 1e18, 2)
    //     );
    //     pool.multiswap(
    //         payTokens,
    //         amounts,
    //         receiveTokens,
    //         allocations,
    //         minReceiveAmounts
    //     );
    // }

    // function testWithdrawalMismatch() public {
    //     Token payToken = WAVAX;
    //     Token receiveToken = USDC;
    //     uint256 amount = 1e27;
    //     payToken.mint(amount);
    //     payToken.approve(address(pool), amount);

    //     address[] memory payTokens = new address[](1);
    //     payTokens[0] = address(payToken);
    //     uint256[] memory amounts = new uint256[](1);
    //     amounts[0] = amount;
    //     address[] memory receiveTokens = new address[](2);
    //     receiveTokens[0] = address(receiveToken);
    //     receiveTokens[1] = address(tokens[2]);
    //     uint256[] memory allocations = new uint256[](1);
    //     allocations[0] = 1e18;
    //     uint256[] memory minReceiveAmounts = new uint256[](1);
    //     vm.expectRevert(
    //         abi.encodeWithSelector(IPool.LengthMismatch.selector, 2, 1)
    //     );
    //     pool.multiswap(
    //         payTokens,
    //         amounts,
    //         receiveTokens,
    //         allocations,
    //         minReceiveAmounts
    //     );
    // }

    // function testDepositMismatch() public {
    //     Token payToken = WAVAX;
    //     Token receiveToken = USDC;
    //     uint256 amount = 1e27;
    //     payToken.mint(amount);
    //     payToken.approve(address(pool), amount);

    //     address[] memory payTokens = new address[](1);
    //     payTokens[0] = address(payToken);
    //     uint256[] memory amounts = new uint256[](2);
    //     amounts[0] = amount;
    //     amounts[1] = 1e27;
    //     address[] memory receiveTokens = new address[](1);
    //     receiveTokens[0] = address(receiveToken);
    //     uint256[] memory allocations = new uint256[](1);
    //     allocations[0] = 1e18;
    //     uint256[] memory minReceiveAmounts = new uint256[](1);
    //     vm.expectRevert(
    //         abi.encodeWithSelector(IPool.LengthMismatch.selector, 1, 2)
    //     );
    //     pool.multiswap(
    //         payTokens,
    //         amounts,
    //         receiveTokens,
    //         allocations,
    //         minReceiveAmounts
    //     );
    // }

    // function testMultiNoWithdrawal() public {
    //     Token payToken = WAVAX;
    //     uint256 amount = 1e27;
    //     payToken.mint(amount);
    //     payToken.approve(address(pool), amount);

    //     address[] memory payTokens = new address[](1);
    //     payTokens[0] = address(payToken);
    //     uint256[] memory amounts = new uint256[](1);
    //     amounts[0] = amount;
    //     address[] memory receiveTokens = new address[](0);
    //     uint256[] memory allocations = new uint256[](0);
    //     uint256[] memory minReceiveAmounts = new uint256[](0);
    //     vm.expectRevert(abi.encodeWithSelector(IPool.ZeroLength.selector));
    //     pool.multiswap(
    //         payTokens,
    //         amounts,
    //         receiveTokens,
    //         allocations,
    //         minReceiveAmounts
    //     );
    // }

    // function testMultiNoDeposit() public {
    //     Token payToken = WAVAX;
    //     Token receiveToken = USDC;
    //     uint256 amount = 1e27;
    //     payToken.mint(amount);
    //     payToken.approve(address(pool), amount);

    //     address[] memory payTokens = new address[](0);
    //     uint256[] memory amounts = new uint256[](0);
    //     address[] memory receiveTokens = new address[](1);
    //     receiveTokens[0] = address(receiveToken);
    //     uint256[] memory allocations = new uint256[](1);
    //     allocations[0] = 1e18;
    //     uint256[] memory minReceiveAmounts = new uint256[](1);
    //     vm.expectRevert(abi.encodeWithSelector(IPool.ZeroLength.selector));
    //     pool.multiswap(
    //         payTokens,
    //         amounts,
    //         receiveTokens,
    //         allocations,
    //         minReceiveAmounts
    //     );
    // }

    // function testMultiZeroDeposit() public {
    //     Token payToken = WAVAX;
    //     Token receiveToken = USDC;
    //     uint256 amount = 0;
    //     payToken.mint(amount);
    //     payToken.approve(address(pool), amount);

    //     address[] memory payTokens = new address[](1);
    //     payTokens[0] = address(payToken);
    //     uint256[] memory amounts = new uint256[](1);
    //     amounts[0] = amount;
    //     address[] memory receiveTokens = new address[](1);
    //     receiveTokens[0] = address(receiveToken);
    //     uint256[] memory allocations = new uint256[](1);
    //     allocations[0] = 1e18;
    //     uint256[] memory minReceiveAmounts = new uint256[](1);
    //     vm.expectRevert(abi.encodeWithSelector(IPool.ZeroAmount.selector));
    //     pool.multiswap(
    //         payTokens,
    //         amounts,
    //         receiveTokens,
    //         allocations,
    //         minReceiveAmounts
    //     );
    // }

    // function testMultiDuplicateToken() public {
    //     uint256 amount = 1e27;

    //     address[] memory duplicateTokens = new address[](2);
    //     duplicateTokens[0] = addresses[0];
    //     duplicateTokens[1] = addresses[0];

    //     address[] memory differentTokens = new address[](2);
    //     differentTokens[0] = addresses[1];
    //     differentTokens[1] = addresses[2];

    //     address[] memory duplicatePool = new address[](2);
    //     duplicatePool[0] = address(pool);
    //     duplicatePool[1] = address(pool);

    //     address[] memory poolSecond = new address[](2);
    //     poolSecond[0] = addresses[0];
    //     poolSecond[1] = address(pool);

    //     uint256[] memory amounts = new uint256[](2);
    //     amounts[0] = amount;
    //     amounts[1] = amount;

    //     uint256[] memory allocations = new uint256[](2);
    //     allocations[0] = 5e17;
    //     allocations[0] = 5e17;

    //     uint256[] memory minReceiveAmounts = new uint256[](2);

    //     vm.expectRevert(
    //         abi.encodeWithSelector(
    //             IPool.DuplicateToken.selector,
    //             duplicateTokens[0]
    //         )
    //     );
    //     pool.multiswap(
    //         duplicateTokens,
    //         amounts,
    //         differentTokens,
    //         allocations,
    //         minReceiveAmounts
    //     );

    //     vm.expectRevert(
    //         abi.encodeWithSelector(
    //             IPool.DuplicateToken.selector,
    //             duplicateTokens[0]
    //         )
    //     );
    //     pool.multiswap(
    //         differentTokens,
    //         amounts,
    //         duplicateTokens,
    //         allocations,
    //         minReceiveAmounts
    //     );

    //     vm.expectRevert(
    //         abi.encodeWithSelector(IPool.DuplicateToken.selector, address(pool))
    //     );
    //     pool.multiswap(
    //         duplicatePool,
    //         amounts,
    //         differentTokens,
    //         allocations,
    //         minReceiveAmounts
    //     );

    //     vm.expectRevert(
    //         abi.encodeWithSelector(IPool.DuplicateToken.selector, address(pool))
    //     );
    //     pool.multiswap(
    //         differentTokens,
    //         amounts,
    //         duplicatePool,
    //         allocations,
    //         minReceiveAmounts
    //     );

    //     vm.expectRevert(abi.encodeWithSelector(IPool.LPTokenFirst.selector));
    //     pool.multiswap(
    //         poolSecond,
    //         amounts,
    //         differentTokens,
    //         allocations,
    //         minReceiveAmounts
    //     );

    //     vm.expectRevert(abi.encodeWithSelector(IPool.LPTokenFirst.selector));
    //     pool.multiswap(
    //         differentTokens,
    //         amounts,
    //         poolSecond,
    //         allocations,
    //         minReceiveAmounts
    //     );
    // }

    // function testFailMultiWithdrawNonContract() public {
    //     Token payToken = WAVAX;
    //     uint256 amount = 1e27;
    //     payToken.mint(amount);
    //     payToken.approve(address(pool), amount);

    //     address[] memory payTokens = new address[](1);
    //     payTokens[0] = address(payToken);
    //     uint256[] memory amounts = new uint256[](1);
    //     amounts[0] = amount;
    //     address[] memory receiveTokens = new address[](1);
    //     receiveTokens[0] = address(0);
    //     uint256[] memory allocations = new uint256[](1);
    //     allocations[0] = 1e18;
    //     uint256[] memory minReceiveAmounts = new uint256[](1);
    //     pool.multiswap(
    //         payTokens,
    //         amounts,
    //         receiveTokens,
    //         allocations,
    //         minReceiveAmounts
    //     );
    // }

    // function testFailMultiWithdrawNotInPool() public {
    //     Token outside = new Token("Foo", "BAR", 18);
    //     Token payToken = WAVAX;
    //     uint256 amount = 1e27;
    //     payToken.mint(amount);
    //     payToken.approve(address(pool), amount);

    //     address[] memory payTokens = new address[](1);
    //     payTokens[0] = address(payToken);
    //     uint256[] memory amounts = new uint256[](1);
    //     amounts[0] = amount;
    //     address[] memory receiveTokens = new address[](1);
    //     receiveTokens[0] = address(outside);
    //     uint256[] memory allocations = new uint256[](1);
    //     allocations[0] = 1e18;
    //     uint256[] memory minReceiveAmounts = new uint256[](1);
    //     pool.multiswap(
    //         payTokens,
    //         amounts,
    //         receiveTokens,
    //         allocations,
    //         minReceiveAmounts
    //     );
    // }

    // function checkScale() internal {
    //     uint256 scale = pool.info().scale;
    //     AssetStateExternal[] memory initialAssets = pool.assets();
    //     uint256 scaleSum = 0;

    //     for (uint256 i; i < initialAssets.length; i++) {
    //         scaleSum += initialAssets[i].scale;
    //     }

    //     assertEq(scaleSum, scale);
    // }

    // function testMultiPoolFuzz(uint256 amountA, uint256 amountB) public {
    //     // fuzz setup
    //     vm.assume((amountA > 1e17) && (amountA < 1e50));
    //     vm.assume((amountB > 1e17) && (amountB < 1e50));

    //     address alice = address(1);
    //     vm.startPrank(alice);

    //     // initial state
    //     WAVAX.mint(amountA);
    //     WAVAX.approve(address(pool), amountA);

    //     USDC.mint(amountB);
    //     USDC.approve(address(pool), amountB);

    //     checkScale();

    //     // check initial state
    //     assertEq(
    //         WAVAX.balanceOf(alice) > 0,
    //         true,
    //         "Alice's initial balance of payTokenA is 0"
    //     );
    //     assertEq(
    //         USDC.balanceOf(alice) > 0,
    //         true,
    //         "Alice's initial balance of USDC is 0"
    //     );
    //     // assertEq(
    //     //     pool.balanceOf(alice),
    //     //     0,
    //     //     "Alice's initial balance of pool is not 0"
    //     // );

    //     // swap
    //     address[] memory payTokens = new address[](2);
    //     payTokens[0] = addresses[0];
    //     payTokens[1] = addresses[1];
    //     uint256[] memory amounts = new uint256[](2);
    //     amounts[0] = amountA;
    //     amounts[1] = amountB;
    //     address[] memory receiveTokens = new address[](1);
    //     receiveTokens[0] = address(pool);
    //     uint256[] memory allocations = new uint256[](1);
    //     allocations[0] = 1e18;
    //     uint256[] memory minReceiveAmounts = new uint256[](1);
    //     uint256[] memory receiveAmounts = new uint256[](1);
    //     uint256 feeAmount;
    //     if (amountA * 3 > pool.asset(payTokens[0]).balance) {
    //         vm.roll(block.number + 1);
    //         vm.expectRevert(
    //             abi.encodeWithSelector(IPool.TooLarge.selector, amountA)
    //         );
    //         pool.multiswap(
    //             payTokens,
    //             amounts,
    //             receiveTokens,
    //             allocations,
    //             minReceiveAmounts
    //         );
    //     } else if (amountB * 3 > pool.asset(payTokens[1]).balance) {
    //         vm.roll(block.number + 1);
    //         vm.expectRevert(
    //             abi.encodeWithSelector(IPool.TooLarge.selector, amountB)
    //         );
    //         pool.multiswap(
    //             payTokens,
    //             amounts,
    //             receiveTokens,
    //             allocations,
    //             minReceiveAmounts
    //         );
    //     } else {
    //         vm.roll(block.number + 1);
    //         (receiveAmounts, feeAmount) = pool.multiswap(
    //             payTokens,
    //             amounts,
    //             receiveTokens,
    //             allocations,
    //             minReceiveAmounts
    //         );

    //         checkSF(
    //             payTokens,
    //             amounts,
    //             receiveTokens,
    //             allocations,
    //             receiveAmounts
    //         );

    //         // check post swap state
    //         assertEq(
    //             WAVAX.balanceOf(alice),
    //             0,
    //             "Alice's post swap balance of payTokenA is not 0"
    //         );
    //         assertEq(
    //             USDC.balanceOf(alice),
    //             0,
    //             "Alice's post swap balance of USDC is not 0"
    //         );
    //         assertEq(
    //             pool.balanceOf(alice) > 0,
    //             true,
    //             "Alice's post swap balance of pool is 0"
    //         );
    //     }

    //     payTokens = new address[](1);
    //     payTokens[0] = address(pool);
    //     amounts = new uint256[](1);
    //     amounts[0] = pool.balanceOf(alice);
    //     receiveTokens = new address[](1);
    //     receiveTokens[0] = addresses[0];
    //     allocations = new uint256[](1);
    //     allocations[0] = 1e18;
    //     receiveAmounts = new uint256[](1);

    //     pool.approve(address(pool), pool.balanceOf(alice));

    //     if (amounts[0] * 3 > pool.info().balance) {
    //         vm.roll(block.number + 1);
    //         vm.expectRevert(
    //             abi.encodeWithSelector(IPool.TooLarge.selector, amounts[0])
    //         );
    //         pool.multiswap(
    //             payTokens,
    //             amounts,
    //             receiveTokens,
    //             allocations,
    //             minReceiveAmounts
    //         );
    //     } else {
    //         vm.roll(block.number + 1);
    //         (receiveAmounts, feeAmount) = pool.multiswap(
    //             payTokens,
    //             amounts,
    //             receiveTokens,
    //             allocations,
    //             minReceiveAmounts
    //         );

    //         checkSF(
    //             payTokens,
    //             amounts,
    //             receiveTokens,
    //             allocations,
    //             receiveAmounts
    //         );
    //     }

    //     vm.stopPrank();
    // }

    // function testMultiTrack(uint256 amount) public {
    //     vm.assume((amount > 1e17) && (amount < 1e50));

    //     address alice = address(1);
    //     vm.startPrank(alice);

    //     Token payToken = WAVAX;
    //     Token withdrawalToken = USDC;

    //     // test initial balances
    //     uint256 initialDepositBalance = payToken.balanceOf(alice);
    //     assertEq(initialDepositBalance, 0, "initialDepositBalance is not 0");
    //     uint256 initialWithdrawalBalance = withdrawalToken.balanceOf(alice);
    //     assertEq(
    //         initialWithdrawalBalance,
    //         0,
    //         "initialWithdrawalBalance is not 0"
    //     );

    //     payToken.mint(amount);
    //     payToken.approve(address(pool), amount);

    //     // test after mint balances
    //     uint256 afterMintDepositBalance = payToken.balanceOf(alice);
    //     assertEq(
    //         afterMintDepositBalance,
    //         amount,
    //         "afterMintDepositBalance is not amount"
    //     );
    //     uint256 afterMintWithdrawalBalance = withdrawalToken.balanceOf(alice);
    //     assertEq(
    //         afterMintWithdrawalBalance,
    //         0,
    //         "afterMintWithdrawalBalance is not 0"
    //     );

    //     // perform swap
    //     if (amount * 3 > pool.asset(address(payToken)).balance) {
    //         vm.expectRevert(
    //             abi.encodeWithSelector(IPool.TooLarge.selector, amount)
    //         );
    //         pool.swap(address(payToken), address(withdrawalToken), amount, 0);
    //     } else {
    //         pool.swap(address(payToken), address(withdrawalToken), amount, 0);

    //         // test after swap balances
    //         uint256 afterSwapDepositBalance = payToken.balanceOf(alice);
    //         assertEq(
    //             afterSwapDepositBalance,
    //             0,
    //             "afterSwapDepositBalance is not 0"
    //         );
    //         uint256 afterSwapWithdrawalBalance = withdrawalToken.balanceOf(
    //             alice
    //         );
    //         assertEq(
    //             afterSwapWithdrawalBalance > 0,
    //             true,
    //             "afterSwapWithdrawalBalance is not > 0"
    //         );
    //     }

    //     vm.stopPrank();
    // }

    // function testMultiSwapFuzz(uint256 amountA, uint256 amountB) public {
    //     // fuzz setup
    //     vm.assume((amountA > 1e17) && (amountA < 1e50));
    //     vm.assume((amountB > 1e17) && (amountB < 1e50));

    //     vm.startPrank(address(1));

    //     // initial state
    //     WAVAX.mint(amountA);
    //     WAVAX.approve(address(pool), amountA);

    //     USDC.mint(amountB);
    //     USDC.approve(address(pool), amountB);

    //     Token receiveToken = tokens[2];

    //     // check initial state
    //     assertEq(WAVAX.balanceOf(address(1)) > 0, true);
    //     assertEq(USDC.balanceOf(address(1)) > 0, true);
    //     assertEq(receiveToken.balanceOf(address(1)), 0);

    //     // swap
    //     address[] memory payTokens = new address[](2);
    //     payTokens[0] = addresses[0];
    //     payTokens[1] = addresses[1];
    //     uint256[] memory amounts = new uint256[](2);
    //     amounts[0] = amountA;
    //     amounts[1] = amountB;
    //     address[] memory receiveTokens = new address[](1);
    //     receiveTokens[0] = address(receiveToken);
    //     uint256[] memory allocations = new uint256[](1);
    //     allocations[0] = 1e18;
    //     uint256[] memory minReceiveAmounts = new uint256[](1);
    //     uint256[] memory receiveAmounts = new uint256[](1);
    //     uint256 feeAmount;
    //     if (amountA * 3 > pool.asset(payTokens[0]).balance) {
    //         vm.expectRevert(
    //             abi.encodeWithSelector(IPool.TooLarge.selector, amountA)
    //         );
    //         pool.multiswap(
    //             payTokens,
    //             amounts,
    //             receiveTokens,
    //             allocations,
    //             minReceiveAmounts
    //         );
    //     } else if (amountB * 3 > pool.asset(payTokens[1]).balance) {
    //         vm.expectRevert(
    //             abi.encodeWithSelector(IPool.TooLarge.selector, amountB)
    //         );
    //         pool.multiswap(
    //             payTokens,
    //             amounts,
    //             receiveTokens,
    //             allocations,
    //             minReceiveAmounts
    //         );
    //     } else {
    //         (receiveAmounts, feeAmount) = pool.multiswap(
    //             payTokens,
    //             amounts,
    //             receiveTokens,
    //             allocations,
    //             minReceiveAmounts
    //         );

    //         checkSF(
    //             payTokens,
    //             amounts,
    //             receiveTokens,
    //             allocations,
    //             receiveAmounts
    //         );
    //     }
    // }

    // function testBigSwap() public {
    //     uint256 numberOfTokens = NTOKENS / 2;
    //     address[] memory payTokens = new address[](numberOfTokens);
    //     uint256[] memory amounts = new uint256[](numberOfTokens);
    //     address[] memory receiveTokens = new address[](numberOfTokens);
    //     uint256[] memory allocations = new uint256[](numberOfTokens);
    //     uint256[] memory minReceiveAmounts = new uint256[](numberOfTokens);
    //     uint256[] memory receiveAmounts = new uint256[](numberOfTokens);
    //     uint256 feeAmount;

    //     for (uint256 i; i < numberOfTokens; i++) {
    //         Token token = tokens[i];
    //         uint256 amount = 1e27;
    //         token.mint(amount);
    //         token.approve(address(pool), amount);

    //         payTokens[i] = address(token);
    //         amounts[i] = amount;
    //     }

    //     uint256 totalAllocation = 1e18;
    //     for (uint256 i = numberOfTokens; i < NTOKENS; i++) {
    //         receiveTokens[i - numberOfTokens] = address(tokens[i]);
    //         allocations[i - numberOfTokens] = totalAllocation / numberOfTokens;
    //     }

    //     (receiveAmounts, feeAmount) = pool.multiswap(
    //         payTokens,
    //         amounts,
    //         receiveTokens,
    //         allocations,
    //         minReceiveAmounts
    //     );

    //     checkSF(payTokens, amounts, receiveTokens, allocations, receiveAmounts);
    // } // !! TODO check that valid deposit/withdrawal addresses are being used
}

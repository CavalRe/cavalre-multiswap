// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {Pool} from "../contracts/Pool.sol";
import {PoolState, AssetState, QuoteState} from "../contracts/interfaces/IPool.sol";
import {Token} from "./Token.t.sol";
import {FixedPointMathLib} from "../contracts/libraries/FixedPointMath/src/FixedPointMathLib.sol";
import {FloatingPoint, UFloat} from "@cavalre/floating-point/FloatingPoint.sol";
import {PoolMintable, PoolUtils} from "./PoolUtils.t.sol";

contract PoolTest is PoolUtils {
    using FixedPointMathLib for uint256;
    using FloatingPoint for uint256;
    using FloatingPoint for int256;
    using FloatingPoint for UFloat;

    uint256 internal constant NTOKENS = 10;

    address internal alice = address(1);
    address internal bob = address(2);
    address internal carol = address(3);

    Pool internal pool;
    Token[] internal tokens;

    // uint256 internal constant INTERNAL_DECIMALS = 27;
    // uint256 internal constant ONE = 10 ** INTERNAL_DECIMALS;
    // uint256 internal constant PCT = 10 ** (INTERNAL_DECIMALS - 2);
    // uint256 internal constant BPS = 10 ** (INTERNAL_DECIMALS - 4);
    uint256 internal constant ONE = 10 ** 18; // 18 decimals
    uint256 internal constant PCT = 10 ** 16; // 18 decimals
    uint256 internal constant BPS = 10 ** 14; // 18 decimals
    uint256 internal constant HALF = 5 * 10 ** 17;

    address internal protocolFeeRecipient = address(4);
    uint256 internal initialTokensPerShare = 3e18; // 18 decimals

    uint256[] internal balances = new uint256[](NTOKENS);
    uint256[] internal fees = new uint256[](NTOKENS);
    uint256[] internal prices = new uint256[](NTOKENS);
    uint256[] internal conversions = new uint256[](NTOKENS);

    uint256 internal marketCap = 1e25;

    function setUpPool(
        string memory name_,
        string memory symbol_,
        uint256 protocolFee_ // 18 decimals
    ) public {
        pool = new PoolMintable(
            name_,
            symbol_,
            protocolFee_, // 18 decimals
            protocolFeeRecipient,
            initialTokensPerShare, // 18 decimals
            address(WAVAX)
        );
        tokens = new Token[](NTOKENS);

        tokens[0] = WAVAX;
        tokens[1] = USDC;
        tokens[2] = USDt;
        tokens[3] = EUROC;
        tokens[4] = USDCe;
        tokens[5] = USDTe;
        tokens[6] = DAIe;
        tokens[7] = WETHe;
        tokens[8] = WBTCe;
        tokens[9] = BTCb;

        fees[0] = 15 * BPS;
        fees[1] = 5 * BPS;
        fees[2] = 5 * BPS;
        fees[3] = 5 * BPS;
        fees[4] = 5 * BPS;
        fees[5] = 5 * BPS;
        fees[6] = 5 * BPS;
        fees[7] = 30 * BPS;
        fees[8] = 30 * BPS;
        fees[9] = 30 * BPS;

        prices[0] = 145e17;
        prices[1] = 1e18;
        prices[2] = 1e18;
        prices[3] = 113e16;
        prices[4] = 1e18;
        prices[5] = 1e18;
        prices[6] = 1e18;
        prices[7] = 1908e18;
        prices[8] = 30065e18;
        prices[9] = 30065e18;

        balances[0] = 689655172413793000000000;
        balances[1] = 10000000000000;
        balances[2] = 10000000000000;
        balances[3] = 8849557522124;
        balances[4] = 10000000000000;
        balances[5] = 10000000000000;
        balances[6] = 10000000000000;
        balances[7] = 5241090146750520000000;
        balances[8] = 33261267254;
        balances[9] = 33261267254;

        Token token;
        uint256 conversion;
        for (uint256 i; i < NTOKENS; i++) {
            token = tokens[i];
            conversion = 10 ** (18 - token.decimals());
            conversions[i] = conversion;
            if (address(token) == address(WAVAX)) {
                vm.deal(address(token), balances[i]);
            }
            token.mint(balances[i]);
            token.approve(address(pool), balances[i]);
            pool.addAsset(address(token), fees[i], balances[i], marketCap);
        }

        pool.initialize();

        for (uint256 i; i < NTOKENS; i++) {
            token = tokens[i];
            if (address(token) == address(WAVAX)) {
                vm.deal(address(token), balances[i]);
            }
            token.mint(balances[i]);
            token.approve(address(pool), balances[i]);
        }
    }

    // function blah() private {
    //     // {
    //     //     //Handle pool balances
    //     //     // emit log("Handle pool balances");
    //     //     c.balanceIncrease[0] += feeAmount * pool.multiplier();
    //     //     if (payTokens[0] == address(pool)) {
    //     //         c.balanceDecrease[0] += amounts[0].mulWadUp(
    //     //             c.initialTokensPerShare
    //     //         );
    //     //     }
    //     //     if (receiveTokens[0] == address(pool)) {
    //     //         c.balanceIncrease[0] += receiveAmounts[0].mulWadUp(
    //     //             c.finalTokensPerShare
    //     //         ); // RIGHT!
    //     //         // balanceIncrease[0] += receiveAmounts[0].mulWadUp(c.initialTokensPerShare); // WRONG!
    //     //     }
    //     //     // emit log_named_uint(
    //     //     //     "Initial pool balance",
    //     //     //     c.initialBalances[0]
    //     //     // );
    //     //     // emit log_named_uint("Fee amount", feeAmount);
    //     //     // emit log_named_uint("Balance increase", c.balanceIncrease[0]);
    //     //     // emit log_named_uint("Balance decrease", c.balanceDecrease[0]);
    //     //     // emit log_named_uint(
    //     //     //     "Final pool balance",
    //     //     //     c.finalBalances[0]
    //     //     // );
    //     //     // emit log("Check pool balance");
    //     //     assertEq(
    //     //         c.initialBalances[0] +
    //     //             c.balanceIncrease[0] -
    //     //             c.balanceDecrease[0],
    //     //         c.finalBalances[0],
    //     //         "Pool balance mismatch"
    //     //     );
    //     //     //Handle asset balances
    //     //     // emit log("Handle asset balances");
    //     //     for (uint256 i; i < amounts.length; i++) {
    //     //         if (payTokens[i] == address(pool)) continue;
    //     //         // emit log(pool.asset(payTokens[i]).symbol);
    //     //         uint256 index = pool.asset(payTokens[i]).index;
    //     //         c.balanceIncrease[index + 1] += amounts[i] * conversions[index];
    //     //     }
    //     //     for (uint256 i; i < receiveAmounts.length; i++) {
    //     //         if (receiveTokens[i] == address(pool)) continue;
    //     //         uint256 index = pool.asset(receiveTokens[i]).index;
    //     //         c.balanceDecrease[index + 1] +=
    //     //             receiveAmounts[i] *
    //     //             conversions[index];
    //     //     }
    //     //     // Check balances and scales
    //     //     for (uint256 i; i < assetStates.length + 1; i++) {
    //     //         // if (i == 0) emit log("Pool balance");
    //     //         // else emit log(assetStates[i + 1].symbol, "balance");
    //     //         assertEq(
    //     //             c.finalBalances[i],
    //     //             c.initialBalances[i] +
    //     //                 c.balanceIncrease[i] -
    //     //                 c.balanceDecrease[i],
    //     //             "Balance mismatch"
    //     //         );
    //     //         assertEq(
    //     //             c.finalScales[i],
    //     //             c.initialScales[i],
    //     //             "Scale mismatch"
    //     //         );
    //     //     }
    //     //     emit log("");
    //     //     emit log("");
    //     //     emit log("");
    //     //     emit log("");
    //     //     emit log("");
    //     //     emit log("");
    //     //     emit log(
    //     //         "==================================================================="
    //     //     );
    //     //     emit log(
    //     //         "Note: Check case where pool token amount in is less than fee amount"
    //     //     );
    //     //     emit log(
    //     //         "==================================================================="
    //     //     );
    //     //     // Compute scaled value flows
    //     //     c.scaledValueIn = 0;
    //     //     c.scaledValueOut = 0;
    //     //     // Handle pool scaled value flows
    //     //     if (payTokens[0] == address(pool)) {
    //     //         if (amounts[0] > feeAmount) {
    //     //             c.scaledValueIn += c.finalScales[0].fullMulDiv(
    //     //                 amounts[0].mulWadUp(c.initialTokensPerShare) -
    //     //                     feeAmount,
    //     //                 c.finalBalances[0]
    //     //             );
    //     //         } else {
    //     //             c.scaledValueOut += c.finalScales[0].fullMulDiv(
    //     //                 feeAmount -
    //     //                     amounts[0].mulWadUp(c.initialTokensPerShare),
    //     //                 c.finalBalances[0]
    //     //             );
    //     //         }
    //     //     } else if (receiveTokens[0] == address(pool)) {
    //     //         c.scaledValueOut += c.finalScales[0].fullMulDiv(
    //     //             receiveAmounts[0].mulWadUp(c.finalTokensPerShare) +
    //     //                 feeAmount,
    //     //             c.finalBalances[0]
    //     //         );
    //     //     } else {
    //     //         c.scaledValueOut += c.finalScales[0].fullMulDiv(
    //     //             feeAmount,
    //     //             c.finalBalances[0]
    //     //         );
    //     //     }
    //     //     // Handle asset scaled value flows
    //     //     for (uint256 i; i < amounts.length; i++) {
    //     //         if (payTokens[i] == address(pool)) continue;
    //     //         uint256 index = pool.asset(payTokens[i]).index;
    //     //         c.scaledValueIn += c.finalScales[index + 1].fullMulDiv(
    //     //             amounts[i] * conversions[index],
    //     //             c.finalBalances[index + 1]
    //     //         );
    //     //     }
    //     //     for (uint256 i; i < receiveAmounts.length; i++) {
    //     //         if (receiveTokens[i] == address(pool)) continue;
    //     //         uint256 index = pool.asset(receiveTokens[i]).index;
    //     //         c.scaledValueOut += c.finalScales[index + 1].fullMulDiv(
    //     //             receiveAmounts[i] * conversions[index],
    //     //             c.finalBalances[index + 1]
    //     //         );
    //     //     }
    //     //     // Determine significant digits
    //     //     uint256 significantDigits = type(uint256).max;
    //     //     for (uint256 i; i < amounts.length; i++) {
    //     //         uint256 digits = countDigits(amounts[i]);
    //     //         if (digits < significantDigits) {
    //     //             significantDigits = digits;
    //     //         }
    //     //     }
    //     //     // Determine the minimum token decimals from payTokens and receiveTokens
    //     //     uint256 minDecimals = type(uint256).max;
    //     //     for (uint256 i; i < payTokens.length; i++) {
    //     //         if (payTokens[i] == address(pool)) continue;
    //     //         uint256 decimals = pool.asset(payTokens[i]).decimals;
    //     //         if (decimals < minDecimals) {
    //     //             minDecimals = decimals;
    //     //         }
    //     //     }
    //     //     for (uint256 i; i < receiveTokens.length; i++) {
    //     //         if (receiveTokens[i] == address(pool)) continue;
    //     //         uint256 decimals = pool.asset(receiveTokens[i]).decimals;
    //     //         if (decimals < minDecimals) {
    //     //             minDecimals = decimals;
    //     //         }
    //     //     }
    //     //     // emit log_named_uint("Significant digits", significantDigits);
    //     //     // emit log_named_uint("Minimum decimals", minDecimals);
    //     //     // assertEq(
    //     //     //     scaledValueIn,
    //     //     //     scaledValueOut,
    //     //     //     "Scaled value in does not equal scaled value out"
    //     //     // );
    //     // assertApproxEqRel(
    //     //     c.scaledValueIn,
    //     //     c.scaledValueOut,
    //     //     10 ** (18 - minDecimals),
    //     //     "Scaled value in does not equal scaled value out"
    //     // );
    //     // }
    //     // fail();
    // }

    // function checkSwap(
    //     Pool pool,
    //     address payToken,
    //     address receiveToken,
    //     uint256 payAmount,
    //     uint256 checkReceiveAmount,
    //     uint256 checkFeeAmount,
    //     string memory message
    // ) public {
    //     address[] memory payTokens = new address[](1);
    //     payTokens[0] = payToken;
    //     uint256[] memory amounts = new uint256[](1);
    //     amounts[0] = payAmount;
    //     address[] memory receiveTokens = new address[](1);
    //     receiveTokens[0] = receiveToken;
    //     uint256[] memory allocations = new uint256[](1);
    //     allocations[0] = ONE;
    //     uint256[] memory checkReceiveAmounts = new uint256[](1);
    //     checkReceiveAmounts[0] = checkReceiveAmount;

    //     checkMultiswap(
    //         pool,
    //         payTokens,
    //         amounts,
    //         receiveTokens,
    //         allocations,
    //         checkReceiveAmounts,
    //         checkFeeAmount,
    //         message
    //     );
    // }

    // function checkStake(
    //     Pool pool,
    //     address payToken,
    //     uint256 amount
    // ) public {
    //     address[] memory payTokens = new address[](1);
    //     payTokens[0] = payToken;
    //     uint256[] memory amounts = new uint256[](1);
    //     amounts[0] = amount;
    //     address[] memory receiveTokens = new address[](1);
    //     receiveTokens[0] = address(pool);
    //     uint256[] memory allocations = new uint256[](1);
    //     allocations[0] = ONE;

    //     checkMultiswap(pool, payTokens, amounts, receiveTokens, allocations);
    // }

    // function checkUnstake(
    //     Pool pool,
    //     address receiveToken,
    //     uint256 amount // Shares 18 decimals
    // ) public {
    //     address[] memory payTokens = new address[](1);
    //     payTokens[0] = address(pool);
    //     uint256[] memory amounts = new uint256[](1);
    //     amounts[0] = amount;
    //     address[] memory receiveTokens = new address[](1);
    //     receiveTokens[0] = receiveToken;
    //     uint256[] memory allocations = new uint256[](1);
    //     allocations[0] = ONE;

    //     checkMultiswap(pool, payTokens, amounts, receiveTokens, allocations);
    // }

    // function checkMixedStake(
    //     Pool pool,
    //     address payToken,
    //     address receiveToken,
    //     uint256 amount
    // ) public {
    //     address[] memory payTokens = new address[](1);
    //     payTokens[0] = payToken;
    //     uint256[] memory amounts = new uint256[](1);
    //     amounts[0] = amount;
    //     address[] memory receiveTokens = new address[](2);
    //     receiveTokens[0] = address(pool);
    //     receiveTokens[1] = receiveToken;
    //     uint256[] memory allocations = new uint256[](2);
    //     allocations[0] = 5e17;
    //     allocations[1] = 5e17;

    //     checkMultiswap(pool, payTokens, amounts, receiveTokens, allocations);
    // }

    // function checkMixedUnstake(
    //     Pool pool,
    //     address payToken,
    //     address receiveToken,
    //     uint256 tokenAmount, // Token decimals
    //     uint256 shareAmount // Shares 18 decimals
    // ) public {
    //     address[] memory payTokens = new address[](2);
    //     payTokens[0] = address(pool);
    //     payTokens[1] = payToken;
    //     uint256[] memory amounts = new uint256[](2);
    //     amounts[0] = shareAmount;
    //     amounts[1] = tokenAmount;
    //     address[] memory receiveTokens = new address[](1);
    //     receiveTokens[0] = receiveToken;
    //     uint256[] memory allocations = new uint256[](1);
    //     allocations[0] = ONE;

    //     checkMultiswap(pool, payTokens, amounts, receiveTokens, allocations);
    // }

    // function checkAddLiquidity(
    //     Pool pool,
    //     address token,
    //     uint256 amount // 18 decimals
    // ) public {
    //     uint256 poolAmount_;
    //     uint256[] memory payAmounts_;
    //     (
    //         poolAmount_, // Internal decimals
    //         payAmounts_ // Internal decimals
    //     ) = pool._quoteAddLiquidity(token, amount);
    //     for (uint256 i; i < payAmounts_.length; i++) {
    //         emit log_named_uint("Pay amount", payAmounts_[i]);
    //     }
    //     emit log_named_uint("Pool amount", poolAmount_);
    // }

    // function checkRemoveLiquidity(
    //     Pool pool,
    //     uint256 amount // Shares 18 decimals
    // ) public {
    //     QuoteState memory q = pool._quoteRemoveLiquidity(amount);
    //     for (uint256 i; i < q.receiveTokens.length; i++) {
    //         emit log_named_uint(
    //             pool.asset(q.receiveTokens[i]).symbol,
    //             q.receiveAmounts[i]
    //         );
    //     }
    //     emit log_named_uint("Fee amount", q.feeAmount);
    // }
}

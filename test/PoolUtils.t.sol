// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {Pool, PoolState, AssetState, QuoteState} from "../contracts/Pool.sol";
import {FloatingPoint, UFloat} from "../contracts/libraries/FloatingPoint/src/FloatingPoint.sol";
import {Token} from "./Token.t.sol";
import {Test} from "forge-std/Test.sol";

contract PoolUtils is Test {
    using FloatingPoint for uint256;
    using FloatingPoint for UFloat;

    UFloat internal ZERO_FLOAT = UFloat(0, 0);
    UFloat internal HALF_FLOAT = UFloat(5, -1).normalize();
    UFloat internal ONE_FLOAT = UFloat(1, 0).normalize();

    Token internal WAVAX = new Token("Wrapped AVAX", "WAVAX", 18);
    Token internal USDC = new Token("USD Coin", "USDC", 6);
    Token internal USDt = new Token("TetherToken", "USDt", 6);
    Token internal EUROC = new Token("Euro Coin", "EUROC", 6);
    Token internal USDCe = new Token("Bridged USDC", "USDC.e", 6);
    Token internal USDTe = new Token("Bridged USDt", "USDT.e", 6);
    Token internal DAIe = new Token("Brdiged DAI", "DAI.e", 18);
    Token internal WETHe = new Token("Bridged WETH", "WETH.e", 18);
    Token internal WBTCe = new Token("Bridged WBTC", "WBTC.e", 8);
    Token internal BTCb = new Token("Bridged BTC", "BTC.b", 8);

    function digits(uint256 number_) public pure returns (uint8) {
        if (number_ == 0) {
            return 1; // Zero has 1 significant digit
        }

        uint8 count = 0;
        while (number_ != 0) {
            count++;
            number_ /= 10; // Remove the least significant digit
        }
        return count;
    }

    function symbol(
        Pool pool,
        address token
    ) public view returns (string memory) {
        if (token == address(pool)) return pool._info().symbol;
        return pool._asset(token).symbol;
    }

    function weight(
        Pool pool,
        address token
    ) public view returns (UFloat memory) {
        return pool._asset(token).scale.divide(pool._info().scale);
    }

    function scale(
        Pool pool,
        address token
    ) public view returns (UFloat memory) {
        if (token == address(pool)) return pool._info().scale;
        return pool._asset(token).scale;
    }

    function balance(
        Pool pool,
        address token
    ) public view returns (UFloat memory) {
        if (token == address(pool)) return pool._info().balance;
        return pool._asset(token).balance;
    }

    function price(
        Pool pool,
        address token,
        address numeraire
    ) public view returns (UFloat memory) {
        UFloat memory scaleToken = scale(pool, token);
        UFloat memory scaleNumeraire = scale(pool, numeraire);
        UFloat memory balanceToken = balance(pool, token);
        UFloat memory balanceNumeraire = balance(pool, numeraire);
        return
            scaleToken.times(balanceNumeraire).divide(
                scaleNumeraire.times(balanceToken)
            );
    }

    function fee(Pool pool, address token) public view returns (UFloat memory) {
        if (token == address(pool)) return ZERO_FLOAT;
        return pool._asset(token).fee;
    }

    function scaledValueIn(
        Pool pool,
        QuoteState memory q
    ) public view returns (UFloat memory) {
        UFloat memory scale_;
        UFloat memory amount_;
        UFloat memory poolIn_;
        UFloat memory finalBalance_;
        UFloat memory scaledValueIn_;
        for (uint256 i; i < q.payTokens.length; i++) {
            address payToken = q.payTokens[i];
            amount_ = q.payAmounts[i];
            if (payToken == address(pool)) {
                poolIn_ = amount_.times(q.initialTokensPerShare);
                continue;
            }
            scale_ = scale(pool, payToken); // Assumes scale does not change
            finalBalance_ = balance(pool, payToken).plus(amount_);
            // scaledValueIn_ = scaledValueIn_.plus(
            //     scale_.times(amount_.divide(finalBalance_))
            // );
            scaledValueIn_ = scaledValueIn_.plus(
                scale_.times(amount_).divide(finalBalance_)
            );
        }
        if (poolIn_.mantissa > 0) {
            scaledValueIn_ = scaledValueIn_.plus(
                scale(pool, address(pool)).times(poolIn_).divide(q.finalTokens)
            );
        }
        return scaledValueIn_;
    }

    function scaledValueOut(
        Pool pool,
        QuoteState memory q
    ) public view returns (UFloat memory) {
        UFloat memory scale_;
        UFloat memory amount_;
        UFloat memory finalBalance_;
        UFloat memory poolScale_;
        UFloat memory poolAmount_;
        UFloat memory scaledValueOut_;
        for (uint256 i; i < q.receiveTokens.length; i++) {
            address receiveToken = q.receiveTokens[i];
            amount_ = q.receiveAmounts[i];
            if (receiveToken == address(pool)) {
                poolAmount_ = amount_.times(q.finalTokensPerShare);
                continue;
            }
            scale_ = scale(pool, receiveToken);
            finalBalance_ = balance(pool, receiveToken).minus(amount_);
            // scaledValueOut_ = scaledValueOut_.plus(
            //     scale_.times(amount_.divide(finalBalance_))
            // );
            scaledValueOut_ = scaledValueOut_.plus(
                scale_.times(amount_).divide(finalBalance_)
            );
        }
        poolScale_ = scale(pool, address(pool));
        scaledValueOut_ = scaledValueOut_.plus(
            poolScale_.times(
                q.feeAmount.plus(poolAmount_).divide(q.finalTokens)
            )
        );
        return scaledValueOut_;
    }

    function showAsset(Pool pool, address token, address numeraire) internal {
        AssetState memory asset = pool._asset(token);
        emit log("-------");
        emit log_named_string("name", asset.name);
        UFloat memory price_ = price(pool, token, numeraire);
        emit log_named_string("price", price_.toString());
        emit log_named_string("balance", asset.balance.toString());
        emit log_named_string(
            "marketcap",
            price_.times(asset.balance).toString()
        );
        emit log_named_string("scale", asset.scale.toString());
        emit log_named_string("fee", asset.fee.toString());
    }

    function showPool(Pool _pool, address numeraire) internal {
        PoolState memory pool_;
        AssetState[] memory assetStates_;
        (pool_, assetStates_) = _pool._state();
        emit log("==================================================");
        emit log("Pool Info");
        // emit log("Name:",poolName);
        // emit log("Symbol:",poolSymbol);
        // emit log_named_uint("Decimals", poolDecimals);
        // emit log_named_uint("totalSupply", pool.totalSupply());
        emit log_named_string("balance", pool_.balance.toString());
        emit log_named_decimal_uint(
            "shares (18 decimals)",
            _pool.totalSupply(),
            18
        );
        emit log_named_string("scale", pool_.scale.toString());
        emit log("");
        emit log("Assets:");
        for (uint256 i; i < assetStates_.length; i++) {
            showAsset(_pool, assetStates_[i].token, numeraire);
        }
    }

    function showQuote(Pool pool, QuoteState memory q) internal {
        // AssetState[] memory assetStates = pool.assets();
        emit log("==================================================");
        emit log("Quote");
        // emit log("");
        // emit log("---------");
        // emit log("Balances:");
        // emit log("---------");
        // emit log_named_uint(
        //     pool.symbol(),
        //     pool.info().balance
        // );
        // for (uint256 i; i < assetStates.length; i++) {
        //     AssetState memory asset_ = assetStates[i];
        //     emit log_named_uint(
        //         asset_.symbol,
        //         asset_.balance
        //     );
        // }
        emit log("");
        emit log("------------");
        emit log("Pay Amounts:");
        emit log("------------");
        for (uint256 i; i < q.payTokens.length; i++) {
            if (q.payTokens[i] == address(pool)) {
                emit log_named_string(
                    "LP Tokens",
                    q.payAmounts[i].times(q.initialTokensPerShare).toString()
                );
            } else {
                emit log_named_string(
                    pool.asset(q.payTokens[i]).symbol,
                    q.payAmounts[i].toString()
                );
            }
        }
        emit log("");
        emit log("----------------");
        emit log("Receive Amounts:");
        emit log("----------------");
        for (uint256 i; i < q.receiveTokens.length; i++) {
            if (q.receiveTokens[i] == address(pool)) {
                emit log_named_string(
                    pool.symbol(),
                    q.receiveAmounts[i].times(q.finalTokensPerShare).toString()
                );
            } else {
                emit log_named_string(
                    pool.asset(q.receiveTokens[i]).symbol,
                    q.receiveAmounts[i].toString()
                );
            }
        }
        emit log("");
        emit log("-----------");
        emit log("Fee Amount:");
        emit log("-----------");
        emit log_named_string("Fee amount", q.feeAmount.toString());
        emit log("");
        emit log("--------------");
        emit log("Miscellaneous:");
        emit log("--------------");
        emit log_named_string("Initial tokens", q.initialTokens.toString());
        emit log_named_string("Initial shares", q.initialShares.toString());
        emit log_named_string(
            "Initial tokens per share",
            q.initialTokensPerShare.toString()
        );
        emit log_named_string("Final tokens", q.finalTokens.toString());
        emit log_named_string("Final shares", q.finalShares.toString());
        emit log_named_string(
            "Final tokens per share",
            q.finalTokensPerShare.toString()
        );
        emit log_named_string("Fee", q.fee.toString());
        emit log_named_string("Discount", q.discount.toString());
        emit log_named_string("Pool allocation", q.poolAlloc.toString());
        emit log_named_string(
            "Last pool balance",
            q.lastPoolBalance.toString()
        );
        emit log_named_string("Scaled pool out", q.scaledPoolOut.toString());
        emit log_named_string("Shares in", q.sharesIn.toString());
        emit log_named_string("Pool in", q.poolIn.toString());
        emit log_named_string("Pool out", q.poolOut.toString());
        emit log_named_string("Scaled value in", q.scaledValueIn.toString());
        emit log("");
    }

    function checkVsExcel(
        Pool pool,
        QuoteState memory q,
        // address[] memory payTokens,
        // UFloat memory[] memory payAmounts, // Token decimals
        // address[] memory receiveTokens,
        // UFloat memory[] memory allocations, // 18 decimals
        UFloat[] memory checkPayAmounts,
        UFloat[] memory checkReceiveAmounts,
        UFloat memory checkFeeAmount,
        string memory message
    ) public {
        for (uint256 i; i < checkPayAmounts.length; i++) {
            if (q.payTokens[i] == address(pool)) {
                checkPayAmounts[i] = checkPayAmounts[i].divide(
                    q.finalTokensPerShare
                );
            }
            (q.payAmounts[i], checkPayAmounts[i]) = q.payAmounts[i].align(
                checkPayAmounts[i]
            );
            assertApproxEqAbs(
                q.payAmounts[i].mantissa,
                checkPayAmounts[i].mantissa,
                1000,
                symbol(pool, q.payTokens[i])
            );
        }

        for (uint256 i; i < checkReceiveAmounts.length; i++) {
            if (q.receiveTokens[i] == address(pool)) {
                checkReceiveAmounts[i] = checkReceiveAmounts[i].divide(
                    q.finalTokensPerShare
                );
            }
            (q.receiveAmounts[i], checkReceiveAmounts[i]) = q
                .receiveAmounts[i]
                .align(checkReceiveAmounts[i]);
            assertApproxEqAbs(
                q.receiveAmounts[i].mantissa,
                checkReceiveAmounts[i].mantissa,
                1000,
                symbol(pool, q.receiveTokens[i])
            );
        }

        (q.feeAmount, checkFeeAmount) = q.feeAmount.align(checkFeeAmount);
        assertApproxEqAbs(
            q.feeAmount.mantissa,
            checkFeeAmount.mantissa,
            1000,
            "fee"
        );

        if (failed) {
            emit log(message);
            showQuote(pool, q);
        }
    }

    function checkSelfFinancing(
        Pool pool,
        QuoteState memory q,
        // address[] memory payTokens,
        // uint256[] memory payAmounts, // Token decimals
        // address[] memory receiveTokens,
        // uint256[] memory allocations, // 18 decimals
        string memory // message
    ) public {
        // showPool(pool, address(USDC));
        // // emit log("Check swap");
        // AssetState[] memory assetStates = pool.assets();
        // uint256[] memory minReceiveAmounts = new uint256[](
        //     receiveTokens.length
        // );

        // uint256 multiplier = pool.conversion(address(pool));

        // CompareState memory c;
        // c.initialTokens = pool.totalTokens();
        // c.initialShares = pool.totalSupply();
        // c.initialTokensPerShare = pool.tokensPerShare();
        // c.initialBalances = getBalances(pool);
        // c.initialScales = getScales(pool);
        // // emit log("Get quote");
        // // showPool(pool, address(USDC));
        // QuoteState memory q = pool._quoteMultiswap(
        //     alice,
        //     payTokens,
        //     payAmounts,
        //     receiveTokens,
        //     allocations
        // );
        // uint8 ndigits;
        // uint8 decimals_;
        // uint256 conversion;
        // ndigits = digits(q.scaledValueIn);
        // decimals_ = pool._info().internalDecimals;
        // if (ndigits > 15) {
        //     decimals_ -= ndigits - 15;
        //     conversion = 10 ** (ndigits - 15);
        // } else {
        //     decimals_ -= 5;
        //     conversion = 1e5;
        // }
        // assertApproxEqAbsDecimal(
        //     q.scaledValueIn / conversion,
        //     scaledValueIn(pool, q) / conversion,
        //     1,
        //     decimals_,
        //     "scaledValueIn"
        // );
        UFloat memory scaledValueInFloat;
        UFloat memory scaledValueOutFloat;
        (scaledValueInFloat, scaledValueOutFloat) = scaledValueIn(pool, q)
            .align(scaledValueOut(pool, q));
        assertApproxEqAbs(
            scaledValueInFloat.mantissa,
            scaledValueOutFloat.mantissa,
            100,
            "Scaled value"
        );

        // // emit log("Execute swap");
        // (receiveAmounts, feeAmount) = pool.multiswap(
        //     payTokens,
        //     amounts,
        //     receiveTokens,
        //     allocations,
        //     minReceiveAmounts
        // );
        // // emit log("Swap executed");
        // c.finalTokens = pool.totalTokens();
        // c.finalShares = pool.totalSupply();
        // c.finalTokensPerShare = pool.tokensPerShare();
        // c.finalBalances = getBalances(pool);
        // c.finalScales = getScales(pool);
        // c.balanceIncrease = new uint256[](assetStates.length + 1);
        // c.balanceDecrease = new uint256[](assetStates.length + 1);

        // emit log("Show quote");
        // if (failed) {
        //     emit log(message);
        //     showQuote(pool, q);
        // }

        // {
        //     // emit log("Check quote");
        //     uint256 initialTokens = q.initialTokens / multiplier;
        //     if (c.initialTokens != initialTokens) {
        //         emit log("=======================");
        //         emit log("Initial tokens mismatch");
        //         emit log("=======================");
        //         emit log_named_uint("Initial tokens         ", c.initialTokens);
        //         emit log_named_uint("Initial tokens (quote) ", initialTokens);
        //         emit log("-----------------------");
        //         emit log_named_uint(
        //             "Delta                  ",
        //             delta(c.initialTokens, initialTokens)
        //         );
        //         fail();
        //     }
        //     uint256 finalTokens = q.finalTokens / multiplier;
        //     if (c.finalTokens != finalTokens) {
        //         emit log("=====================");
        //         emit log("Final tokens mismatch");
        //         emit log("=====================");
        //         emit log_named_uint("Final tokens        ", c.finalTokens);
        //         emit log_named_uint("Final tokens (quote)", finalTokens);
        //         emit log("---------------------");
        //         emit log_named_uint(
        //             "Delta                ",
        //             delta(c.finalTokens, q.finalTokens)
        //         );
        //         emit log_named_uint(
        //             "Increase             ",
        //             delta(c.finalTokens, c.initialTokens)
        //         );
        //         emit log_named_uint(
        //             "Increase (quote)     ",
        //             delta(q.finalTokens, q.initialTokens)
        //         );
        //         fail();
        //     }
        //     uint256 initialShares = q.initialShares / multiplier;
        //     if (c.initialShares != initialShares) {
        //         emit log("=======================");
        //         emit log("Initial shares mismatch");
        //         emit log("=======================");
        //         emit log_named_uint("Initial shares         ", c.initialShares);
        //         emit log_named_uint("Initial shares (quote) ", initialShares);
        //         emit log("-----------------------");
        //         emit log_named_uint(
        //             "Delta                  ",
        //             delta(c.initialShares, initialShares)
        //         );
        //         fail();
        //     }

        //     uint256 finalShares = q.finalShares / multiplier;
        //     if (c.finalShares != finalShares) {
        //         emit log("=====================");
        //         emit log("Final shares mismatch");
        //         emit log("=====================");
        //         emit log_named_uint("Final shares         ", c.finalShares);
        //         emit log_named_uint("Final shares (quote) ", finalShares);
        //         emit log("---------------------");
        //         emit log_named_uint(
        //             "Delta                ",
        //             delta(c.finalShares, finalShares)
        //         );
        //         emit log_named_uint(
        //             "Increase             ",
        //             delta(c.finalShares, initialShares)
        //         );
        //         emit log_named_uint(
        //             "Increase (quote)     ",
        //             delta(q.finalShares, initialShares)
        //         );
        //         fail();
        //     }
        //     uint256 initialTokensPerShare = q.initialTokensPerShare /
        //         multiplier;
        //     if (c.initialTokensPerShare != initialTokensPerShare) {
        //         emit log("=================================");
        //         emit log("Initial tokens per share mismatch");
        //         emit log("=================================");
        //         emit log_named_uint(
        //             "Initial tokens per share         ",
        //             c.initialTokensPerShare
        //         );
        //         emit log_named_uint(
        //             "Initial tokens per share (quote) ",
        //             initialTokensPerShare
        //         );
        //         emit log("---------------------------------");
        //         emit log_named_uint(
        //             "Delta                            ",
        //             delta(c.initialTokensPerShare, initialTokensPerShare)
        //         );
        //         fail();
        //     }
        //     uint256 finalTokensPerShare = q.finalTokensPerShare / multiplier;
        //     if (c.finalTokensPerShare != finalTokensPerShare) {
        //         emit log("===============================");
        //         emit log("Final tokens per share mismatch");
        //         emit log("===============================");
        //         emit log_named_uint(
        //             "Final tokens per share         ",
        //             c.finalTokensPerShare
        //         );
        //         emit log_named_uint(
        //             "Final tokens per share (quote) ",
        //             finalTokensPerShare
        //         );
        //         emit log("-------------------------------");
        //         emit log_named_uint(
        //             "Delta                          ",
        //             delta(c.finalTokensPerShare, finalTokensPerShare)
        //         );
        //         fail();
        //     }
        // }
    }
}

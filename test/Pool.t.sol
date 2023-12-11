// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {Pool, FixedPointMathLib, PoolState, AssetState, QuoteState} from "../contracts/Pool.sol";
import "./Token.t.sol";
import "forge-std/Test.sol";

contract TestPool is Pool {
    constructor(
        string memory name,
        string memory symbol,
        uint256 protocolFee,
        uint256 tau,
        address wavax
    ) Pool(name, symbol, protocolFee, tau, wavax) {}

    function distributeTokens(uint256 amount) public {
        _distributeTokens(amount);
    }
}

struct CompareState {
    uint256 initialTokens;
    uint256 initialShares;
    uint256 initialTokensPerShare;
    uint256[] initialBalances;
    uint256[] initialScales;
    uint256 finalTokens;
    uint256 finalShares;
    uint256 finalTokensPerShare;
    uint256[] finalBalances;
    uint256[] finalScales;
    uint256[] balanceIncrease;
    uint256[] balanceDecrease;
    uint256 scaledValueIn;
    uint256 scaledValueOut;
}

contract PoolTest is Test {
    using FixedPointMathLib for uint256;

    uint256 internal constant NTOKENS = 10;

    address internal alice = address(1);
    address internal bob = address(2);
    address internal carol = address(3);

    uint256[] internal fees = new uint256[](NTOKENS);
    uint256[] internal prices = new uint256[](NTOKENS);
    uint256[] internal conversions = new uint256[](NTOKENS);

    uint256 internal constant ONE = 1e18;
    uint256 internal constant PCT = 1e16;
    uint256 internal constant BPS = 1e14;

    uint256 internal marketCap = 1e25;

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

    uint256[] internal payAmounts;
    uint256[] internal receiveAmounts;
    uint256 internal feeAmount;

    function setUpPool(
        string memory name,
        string memory symbol,
        uint256 protocolFee,
        uint tau
    ) public returns (TestPool pool, Token[] memory tokens) {
        pool = new TestPool(name, symbol, protocolFee, tau, address(WAVAX));
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

        Token token;
        uint256 conversion;
        uint256 balance = marketCap.divWadUp(prices[0]);
        for (uint256 i; i < NTOKENS; i++) {
            token = tokens[i];
            conversion = 10 ** (18 - token.decimals());
            conversions[i] = conversion;
            balance = marketCap.divWadUp(prices[i]) / conversion;
            if (address(token) == address(WAVAX)) {
                vm.deal(address(token), balance);
            }
            token.mint(balance);
            token.approve(address(pool), balance);
            pool.addAsset(address(token), fees[i], balance, marketCap);
        }

        pool.initialize();
        pool.distributeTokens(pool.totalTokens());

        for (uint256 i; i < NTOKENS; i++) {
            token = tokens[i];
            balance = token.balanceOf(address(pool));
            if (address(token) == address(WAVAX)) {
                vm.deal(address(token), balance);
            }
            token.mint(balance);
            token.approve(address(pool), balance);
        }
    }

    function getBalances(TestPool pool) public view returns (uint256[] memory) {
        PoolState memory poolState = pool.info();
        AssetState[] memory assetStates = pool.assets();

        uint256[] memory balances = new uint256[](assetStates.length + 1);
        balances[0] = poolState.balance;
        for (uint256 i; i < assetStates.length; i++) {
            balances[i + 1] = assetStates[i].balance;
        }
        return balances;
    }

    function getScales(TestPool pool) public view returns (uint256[] memory) {
        PoolState memory poolState = pool.info();
        AssetState[] memory assetStates = pool.assets();

        uint256[] memory scales = new uint256[](assetStates.length + 1);
        scales[0] = poolState.scale;
        for (uint256 i; i < assetStates.length; i++) {
            scales[i + 1] = assetStates[i].scale;
        }
        return scales;
    }

    function countDigits(uint256 _number) public pure returns (uint256) {
        if (_number == 0) {
            return 1; // Zero has 1 significant digit
        }

        uint256 count = 0;
        while (_number != 0) {
            count++;
            _number /= 10; // Remove the least significant digit
        }
        return count;
    }

    function delta(uint256 a, uint256 b) internal pure returns (uint256) {
        return a > b ? a - b : b - a;
    }

    function checkMultiswap(
        TestPool pool,
        address[] memory payTokens,
        uint256[] memory amounts,
        address[] memory receiveTokens,
        uint256[] memory allocations,
        uint256[] memory minReceiveAmounts
    ) public {
        AssetState[] memory assetStates = pool.assets();

        CompareState memory c;
        c.initialTokens = pool.totalTokens();
        c.initialShares = pool.totalSupply();
        c.initialTokensPerShare = pool.tokensPerShare();
        c.initialBalances = getBalances(pool);
        c.initialScales = getScales(pool);
        QuoteState memory q = pool._quoteMultiswap(
            alice,
            payTokens,
            amounts,
            receiveTokens,
            allocations
        );
        (receiveAmounts, feeAmount) = pool.multiswap(
            payTokens,
            amounts,
            receiveTokens,
            allocations,
            minReceiveAmounts
        );
        c.finalTokens = pool.totalTokens();
        c.finalShares = pool.totalSupply();
        c.finalTokensPerShare = pool.tokensPerShare();
        c.finalBalances = getBalances(pool);
        c.finalScales = getScales(pool);
        c.balanceIncrease = new uint256[](assetStates.length + 1);
        c.balanceDecrease = new uint256[](assetStates.length + 1);

        if (c.initialTokens != q.initialTokens) {
            emit log("=======================");
            emit log("Initial tokens mismatch");
            emit log("=======================");
            emit log_named_uint("Initial tokens         ", c.initialTokens);
            emit log_named_uint("Initial tokens (quote) ", q.initialTokens);
            emit log("-----------------------");
            emit log_named_uint(
                "Delta                  ",
                delta(c.initialTokens, q.initialTokens)
            );
            fail();
        }
        if (c.finalTokens != q.finalTokens) {
            emit log("=====================");
            emit log("Final tokens mismatch");
            emit log("=====================");
            emit log_named_uint("Final tokens        ", c.finalTokens);
            emit log_named_uint("Final tokens (quote)", q.finalTokens);
            emit log("---------------------");
            emit log_named_uint(
                "Delta                ",
                delta(c.finalTokens, q.finalTokens)
            );
            emit log_named_uint(
                "Increase             ",
                delta(c.finalTokens, c.initialTokens)
            );
            emit log_named_uint(
                "Increase (quote)     ",
                delta(q.finalTokens, q.initialTokens)
            );
            fail();
        }
        if (c.initialShares != q.initialShares) {
            emit log("=======================");
            emit log("Initial shares mismatch");
            emit log("=======================");
            emit log_named_uint("Initial shares         ", c.initialShares);
            emit log_named_uint("Initial shares (quote) ", q.initialShares);
            emit log("-----------------------");
            emit log_named_uint(
                "Delta                  ",
                delta(c.initialShares, q.initialShares)
            );
            fail();
        }


        emit log("");
        emit log_named_uint("Fee amount              ", feeAmount);
        emit log_named_uint("Protocol fee            ", pool.protocolFee());
        emit log_named_uint(
            "Initial tokens per share",
            c.initialTokensPerShare
        );
        emit log_named_uint(
            "Shares allocated        ",
            feeAmount.fullMulDiv(pool.protocolFee(), c.initialTokensPerShare)
        );

        emit log("");
        if (c.finalShares != q.finalShares) {
            emit log("=====================");
            emit log("Final shares mismatch");
            emit log("=====================");
            emit log_named_uint("Final shares         ", c.finalShares);
            emit log_named_uint("Final shares (quote) ", q.finalShares);
            emit log("---------------------");
            emit log_named_uint(
                "Delta                ",
                delta(c.finalShares, q.finalShares)
            );
            emit log_named_uint(
                "Increase             ",
                delta(c.finalShares, c.initialShares)
            );
            emit log_named_uint(
                "Increase (quote)     ",
                delta(q.finalShares, q.initialShares)
            );
            fail();
        }
        if (c.initialTokensPerShare != q.initialTokensPerShare) {
            emit log("=================================");
            emit log("Initial tokens per share mismatch");
            emit log("=================================");
            emit log_named_uint(
                "Initial tokens per share         ",
                c.initialTokensPerShare
            );
            emit log_named_uint(
                "Initial tokens per share (quote) ",
                q.initialTokensPerShare
            );
            emit log("---------------------------------");
            emit log_named_uint(
                "Delta                            ",
                delta(c.initialTokensPerShare, q.initialTokensPerShare)
            );
            fail();
        }
        if (c.finalTokensPerShare != q.finalTokensPerShare) {
            emit log("===============================");
            emit log("Final tokens per share mismatch");
            emit log("===============================");
            emit log_named_uint(
                "Final tokens per share         ",
                c.finalTokensPerShare
            );
            emit log_named_uint(
                "Final tokens per share (quote) ",
                q.finalTokensPerShare
            );
            emit log("-------------------------------");
            emit log_named_uint(
                "Delta                          ",
                delta(c.finalTokensPerShare, q.finalTokensPerShare)
            );
            fail();
        }

        //Handle pool balances
        // emit log("Handle pool balances");
        c.balanceIncrease[0] += feeAmount;

        if (payTokens[0] == address(pool)) {
            c.balanceDecrease[0] += amounts[0].mulWadUp(
                c.initialTokensPerShare
            );
        }

        if (receiveTokens[0] == address(pool)) {
            c.balanceIncrease[0] += receiveAmounts[0].mulWadUp(
                c.finalTokensPerShare
            ); // RIGHT!
            // balanceIncrease[0] += receiveAmounts[0].mulWadUp(c.initialTokensPerShare); // WRONG!
        }

        // emit log_named_uint(
        //     "Initial pool balance",
        //     c.initialBalances[0]
        // );
        // emit log_named_uint("Fee amount", feeAmount);
        // emit log_named_uint("Balance increase", c.balanceIncrease[0]);
        // emit log_named_uint("Balance decrease", c.balanceDecrease[0]);
        // emit log_named_uint(
        //     "Final pool balance",
        //     c.finalBalances[0]
        // );

        // emit log("Check pool balance");
        assertEq(
            c.initialBalances[0] + c.balanceIncrease[0] - c.balanceDecrease[0],
            c.finalBalances[0],
            "Pool balance mismatch"
        );

        //Handle asset balances
        // emit log("Handle asset balances");
        for (uint256 i; i < amounts.length; i++) {
            if (payTokens[i] == address(pool)) continue;
            // emit log(pool.asset(payTokens[i]).symbol);
            uint256 index = pool.asset(payTokens[i]).index;
            c.balanceIncrease[index + 1] += amounts[i] * conversions[index];
        }

        for (uint256 i; i < receiveAmounts.length; i++) {
            if (receiveTokens[i] == address(pool)) continue;
            uint256 index = pool.asset(receiveTokens[i]).index;
            c.balanceDecrease[index + 1] +=
                receiveAmounts[i] *
                conversions[index];
        }

        // Check balances and scales
        for (uint256 i; i < assetStates.length + 1; i++) {
            // if (i == 0) emit log("Pool balance");
            // else emit log(assetStates[i + 1].symbol, "balance");
            assertEq(
                c.finalBalances[i],
                c.initialBalances[i] +
                    c.balanceIncrease[i] -
                    c.balanceDecrease[i],
                "Balance mismatch"
            );
            assertEq(c.finalScales[i], c.initialScales[i], "Scale mismatch");
        }

        emit log("");
        emit log("");
        emit log("");
        emit log("");
        emit log("");
        emit log("");
        emit log(
            "==================================================================="
        );
        emit log(
            "Note: Check case where pool token amount in is less than fee amount"
        );
        emit log(
            "==================================================================="
        );

        // Compute scaled value flows
        c.scaledValueIn = 0;
        c.scaledValueOut = 0;
        // Handle pool scaled value flows
        if (payTokens[0] == address(pool)) {
            if (amounts[0] > feeAmount) {
                c.scaledValueIn += c.finalScales[0].fullMulDiv(
                    amounts[0].mulWadUp(c.initialTokensPerShare) - feeAmount,
                    c.finalBalances[0]
                );
            } else {
                c.scaledValueOut += c.finalScales[0].fullMulDiv(
                    feeAmount - amounts[0].mulWadUp(c.initialTokensPerShare),
                    c.finalBalances[0]
                );
            }
        } else if (receiveTokens[0] == address(pool)) {
            c.scaledValueOut += c.finalScales[0].fullMulDiv(
                receiveAmounts[0].mulWadUp(c.finalTokensPerShare) + feeAmount,
                c.finalBalances[0]
            );
        } else {
            c.scaledValueOut += c.finalScales[0].fullMulDiv(
                feeAmount,
                c.finalBalances[0]
            );
        }

        // Handle asset scaled value flows
        for (uint256 i; i < amounts.length; i++) {
            if (payTokens[i] == address(pool)) continue;
            uint256 index = pool.asset(payTokens[i]).index;
            c.scaledValueIn += c.finalScales[index + 1].fullMulDiv(
                amounts[i] * conversions[index],
                c.finalBalances[index + 1]
            );
        }
        for (uint256 i; i < receiveAmounts.length; i++) {
            if (receiveTokens[i] == address(pool)) continue;
            uint256 index = pool.asset(receiveTokens[i]).index;
            c.scaledValueOut += c.finalScales[index + 1].fullMulDiv(
                receiveAmounts[i] * conversions[index],
                c.finalBalances[index + 1]
            );
        }

        // Determine significant digits
        uint256 significantDigits = type(uint256).max;
        for (uint256 i; i < amounts.length; i++) {
            uint256 digits = countDigits(amounts[i]);
            if (digits < significantDigits) {
                significantDigits = digits;
            }
        }

        // Determine the minimum token decimals from payTokens and receiveTokens
        uint256 minDecimals = type(uint256).max;
        for (uint256 i; i < payTokens.length; i++) {
            if (payTokens[i] == address(pool)) continue;
            uint256 decimals = pool.asset(payTokens[i]).decimals;
            if (decimals < minDecimals) {
                minDecimals = decimals;
            }
        }
        for (uint256 i; i < receiveTokens.length; i++) {
            if (receiveTokens[i] == address(pool)) continue;
            uint256 decimals = pool.asset(receiveTokens[i]).decimals;
            if (decimals < minDecimals) {
                minDecimals = decimals;
            }
        }

        // emit log_named_uint("Significant digits", significantDigits);
        // emit log_named_uint("Minimum decimals", minDecimals);

        // assertEq(
        //     scaledValueIn,
        //     scaledValueOut,
        //     "Scaled value in does not equal scaled value out"
        // );

        assertApproxEqRel(
            c.scaledValueIn,
            c.scaledValueOut,
            10 ** (18 - minDecimals),
            "Scaled value in does not equal scaled value out"
        );
    }

    function checkSwap(
        TestPool pool,
        address payToken,
        address receiveToken,
        uint256 amount,
        uint256 minReceiveAmount
    ) public {
        address[] memory payTokens = new address[](1);
        payTokens[0] = payToken;
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        address[] memory receiveTokens = new address[](1);
        receiveTokens[0] = receiveToken;
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = ONE;
        uint256[] memory minReceiveAmounts = new uint256[](1);
        minReceiveAmounts[0] = minReceiveAmount;

        checkMultiswap(
            pool,
            payTokens,
            amounts,
            receiveTokens,
            allocations,
            minReceiveAmounts
        );
    }

    function checkStake(
        TestPool pool,
        address payToken,
        uint256 amount,
        uint256 minReceiveAmount
    ) public {
        address[] memory payTokens = new address[](1);
        payTokens[0] = payToken;
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        address[] memory receiveTokens = new address[](1);
        receiveTokens[0] = address(pool);
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = ONE;
        uint256[] memory minReceiveAmounts = new uint256[](1);
        minReceiveAmounts[0] = minReceiveAmount;

        checkMultiswap(
            pool,
            payTokens,
            amounts,
            receiveTokens,
            allocations,
            minReceiveAmounts
        );
    }

    function checkUnstake(
        TestPool pool,
        address receiveToken,
        uint256 amount,
        uint256 minReceiveAmount
    ) public {
        address[] memory payTokens = new address[](1);
        payTokens[0] = address(pool);
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        address[] memory receiveTokens = new address[](1);
        receiveTokens[0] = receiveToken;
        uint256[] memory allocations = new uint256[](1);
        allocations[0] = ONE;
        uint256[] memory minReceiveAmounts = new uint256[](1);
        minReceiveAmounts[0] = minReceiveAmount;

        checkMultiswap(
            pool,
            payTokens,
            amounts,
            receiveTokens,
            allocations,
            minReceiveAmounts
        );
    }
}

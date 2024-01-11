// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

// Available Accounts
// ==================

// (0) "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" (10000.000000000000000000 ETH)
// (1) "0x70997970C51812dc3A010C7d01b50e0d17dc79C8" (10000.000000000000000000 ETH)
// (2) "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC" (10000.000000000000000000 ETH)
// (3) "0x90F79bf6EB2c4f870365E785982E1f101E93b906" (10000.000000000000000000 ETH)
// (4) "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65" (10000.000000000000000000 ETH)
// (5) "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc" (10000.000000000000000000 ETH)
// (6) "0x976EA74026E726554dB657fA54763abd0C3a0aa9" (10000.000000000000000000 ETH)
// (7) "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955" (10000.000000000000000000 ETH)
// (8) "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f" (10000.000000000000000000 ETH)
// (9) "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720" (10000.000000000000000000 ETH)

// Private Keys
// ==================

// (0) 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
// (1) 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
// (2) 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
// (3) 0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6
// (4) 0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a
// (5) 0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba
// (6) 0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e
// (7) 0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356
// (8) 0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97
// (9) 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6

import {PoolTest, Token} from "./Pool.t.sol";
import {Pool, AssetState, AssetStateExternal, QuoteState, FP, UFloat} from "../contracts/Pool.sol";
import {Users, IUsers} from "../contracts/Users.sol";

contract BetaTest is PoolTest {
    using FP for uint256;
    using FP for UFloat;

    address internal wrappedNative;

    address[] private oneAsset = new address[](1);
    address[] private anotherAsset = new address[](1);
    address[] private onePool = new address[](1);
    uint256[] private oneAmount = new uint256[](1);
    uint256[] private oneConversion = new uint256[](1);
    uint256[] private anotherConversion = new uint256[](1);
    uint256[] private oneAllocation = new uint256[](1);
    uint256[] private oneMin = new uint256[](1);
    uint256[] private oneMax = new uint256[](1);

    address[] private twoTokens = new address[](2);
    uint256[] private twoAmounts = new uint256[](2);
    uint256[] private twoAllocations = new uint256[](2);
    uint256[] private twoMins = new uint256[](2);

    uint256[] private allAmounts = new uint256[](NTOKENS);
    uint256[] private allMins = new uint256[](NTOKENS);
    uint256[] private allMaxs = new uint256[](NTOKENS);

    // uint256 private amountOut;
    // uint256 private amountQuote;
    // uint256 private feeQuote;
    // uint256[] private payAmountQuotes;
    // uint256[] private receiveAmountQuotes;

    uint256 private TO_INTERNAL;

    function setUp() public {
        uint256 startBalance = type(uint256).max / 2;
        vm.deal(alice, startBalance);
        vm.deal(bob, startBalance);
        vm.deal(carol, startBalance);

        vm.startPrank(alice);

        setUpPool("Pool", "P", 3e17);

        for (uint256 i; i < NTOKENS; i++) {
            allMaxs[i] = type(uint256).max;
        }

        oneAsset[0] = address(USDC);
        oneConversion[0] = conversions[1];
        anotherAsset[0] = address(BTCb);
        anotherConversion[0] = conversions[9];
        onePool[0] = address(pool);
        oneAmount[0] = 1e24;
        oneAllocation[0] = 1e18;
        oneMax[0] = type(uint256).max;
    }

    function testDecimals() public {
        assertEq(tokens[0].decimals(), 18);
        assertEq(tokens[1].decimals(), 6);
        assertEq(tokens[2].decimals(), 6);
        assertEq(tokens[3].decimals(), 6);
        assertEq(tokens[4].decimals(), 6);
        assertEq(tokens[5].decimals(), 6);
        assertEq(tokens[6].decimals(), 18);
        assertEq(tokens[7].decimals(), 18);
        assertEq(tokens[8].decimals(), 8);
        assertEq(tokens[9].decimals(), 8);
    }

    function testNames() public {
        // assertEq(tokens[0].name(), "");
        assertEq(tokens[1].name(), "USD Coin");
        assertEq(tokens[2].name(), "TetherToken");
        assertEq(tokens[3].name(), "Euro Coin");
        assertEq(tokens[4].name(), "Bridged USDC");
        assertEq(tokens[5].name(), "Bridged USDt");
        assertEq(tokens[6].name(), "Brdiged DAI");
        assertEq(tokens[7].name(), "Bridged WETH");
        assertEq(tokens[8].name(), "Bridged WBTC");
        assertEq(tokens[9].name(), "Bridged BTC");
    }

    function testSymbols() public {
        // assertEq(tokens[0].symbol(), "");
        assertEq(tokens[1].symbol(), "USDC");
        assertEq(tokens[2].symbol(), "USDt");
        assertEq(tokens[3].symbol(), "EUROC");
        assertEq(tokens[4].symbol(), "USDC.e");
        assertEq(tokens[5].symbol(), "USDT.e");
        assertEq(tokens[6].symbol(), "DAI.e");
        assertEq(tokens[7].symbol(), "WETH.e");
        assertEq(tokens[8].symbol(), "WBTC.e");
        assertEq(tokens[9].symbol(), "BTC.b");
    }

    function testBetaInit() public {
        AssetState[] memory assets = pool._assets();
        assertEq(assets.length, NTOKENS, "Number of assets in pool");
        assertEq(pool.info().balance, pool.totalTokens(), "Pool balance");
        // emit log_named_uint("Pool balance", pool.info().balance);
        assertEq(pool.info().scale, marketCap * NTOKENS, "Pool scale");
        // emit log_named_uint("Pool scale", pool.info().scale);
        for (uint256 i = 1; i < NTOKENS; i++) {
            assertEq(assets[i].symbol, tokens[i].symbol(), "Asset symbol");
            assertEq(
                assets[i].balance.toUInt(assets[i].decimals),
                tokens[i].balanceOf(address(pool)),
                "Asset balance"
            );
            assertEq(assets[i].scale.toUInt(), marketCap, "Asset scale");
            assertEq(assets[i].fee.toUInt(), fees[i], "Asset fee");
        }
    }

    function _testBetaSwap(
        Token payToken,
        Token receiveToken,
        uint256 payAmount, // Token decimals
        UFloat memory checkReceiveAmount,
        UFloat memory checkFeeAmount,
        string memory message
    ) internal {
        address[] memory payTokens = new address[](1);
        payTokens[0] = address(payToken);
        UFloat[] memory payAmounts = new UFloat[](1);
        payAmounts[0] = payAmount.toUFloat(payToken.decimals());
        address[] memory receiveTokens = new address[](1);
        receiveTokens[0] = address(receiveToken);
        UFloat[] memory allocations = new UFloat[](1);
        allocations[0] = ONE_FLOAT;
        UFloat[] memory checkPayAmounts = new UFloat[](0);
        UFloat[] memory checkReceiveAmounts = new UFloat[](1);
        checkReceiveAmounts[0] = checkReceiveAmount;
        QuoteState memory q = pool._quoteMultiswap(
            alice,
            payTokens,
            payAmounts,
            receiveTokens,
            allocations
        );
        showPool(pool, address(USDC));
        showQuote(pool, q);
        checkSelfFinancing(pool, q, message);
        checkVsExcel(
            pool,
            q,
            checkPayAmounts,
            checkReceiveAmounts,
            checkFeeAmount,
            message
        );

        // uint256 receiveAmount;
        // uint256 feeAmount;
        // (receiveAmount, feeAmount) = pool.swap(
        //     address(payToken),
        //     address(receiveToken),
        //     payAmount,
        //     oneMin[0]
        // );
        // assertEq(
        //     receiveAmount,
        //     q.receiveAmounts[0].toUInt(receiveToken.decimals()),
        //     "receiveAmount"
        // );
        // assertEq(
        //     feeAmount,
        //     q.feeAmount.toUInt(receiveToken.decimals()),
        //     "feeAmount"
        // );
    }

    function test_USDC_BTCb() public {
        uint256 amount;
        UFloat memory checkReceiveAmount;
        UFloat memory checkFeeAmount;
        string memory message;

        amount = USDC.balanceOf(address(pool)) / 10;
        checkReceiveAmount = UFloat(27641479913510000000000000000, -27).normalize();
        checkFeeAmount = UFloat(2727347109466620000000000000000, -27).normalize();
        message = "Amount 10% of pool balance";
        _testBetaSwap(
            USDC,
            BTCb,
            amount,
            checkReceiveAmount,
            checkFeeAmount,
            message
        );

        amount = 1;
        checkReceiveAmount = UFloat(33161483452231400, -27).normalize();
        checkFeeAmount = UFloat(2999999999999700000, -27).normalize();
        message = "Amount is smallest token unit";
        _testBetaSwap(
            USDC,
            BTCb,
            amount,
            checkReceiveAmount,
            checkFeeAmount,
            message
        );

        // pool.swap(address(USDC), address(BTCb), amount, oneMin[0]);
    }

    function test_BTCb_USDC() public {
        uint256 amount;
        UFloat memory checkReceiveAmount;
        UFloat memory checkFeeAmount;
        string memory message;

        amount = BTCb.balanceOf(address(pool)) / 10;
        checkReceiveAmount = UFloat(832951372890395000000000000000000, -27).normalize();
        checkFeeAmount = UFloat(454547520620854000000000000000, -27).normalize();
        message = "Amount 10% of pool balance";
        _testBetaSwap(
            BTCb,
            USDC,
            amount,
            checkReceiveAmount,
            checkFeeAmount,
            message
        );

        amount = 1;
        checkReceiveAmount = UFloat(300499674984487000000000, -27).normalize();
        checkFeeAmount = UFloat(150324999996757000000, -27).normalize();
        message = "Amount is smallest token unit";
        _testBetaSwap(
            BTCb,
            USDC,
            amount,
            checkReceiveAmount,
            checkFeeAmount,
            message
        );
    }

    function test_WAVAX_WETHe() public {
        uint256 amount;
        UFloat memory checkReceiveAmount;
        UFloat memory checkFeeAmount;
        string memory message;

        amount = WAVAX.balanceOf(address(pool)) / 10;
        checkReceiveAmount = UFloat(435556128724704000000000000000, -27).normalize();
        checkFeeAmount = UFloat(2727347109466620000000000000000, -27).normalize();
        message = "Amount 10% of pool balance";
        _testBetaSwap(
            WAVAX,
            WETHe,
            amount,
            checkReceiveAmount,
            checkFeeAmount,
            message
        );

        amount = 1;
        checkReceiveAmount = UFloat(757678197064989,-35).normalize();
        checkFeeAmount = UFloat(4350000000000000,-35).normalize();
        message = "Amount is smallest token unit";
        _testBetaSwap(
            WAVAX,
            WETHe,
            amount,
            checkReceiveAmount,
            checkFeeAmount,
            message
        );
    }

    function test_WAVAX_USDC() public {
        uint256 amount;
        UFloat memory checkReceiveAmount;
        UFloat memory checkFeeAmount;
        string memory message;

        amount = WAVAX.balanceOf(address(pool)) / 10;
        checkReceiveAmount = UFloat(832951372973874000000000000000000, -27).normalize();
        checkFeeAmount = UFloat(454547520670548000000000000000, -27).normalize();
        message = "Amount 10% of pool balance";
        _testBetaSwap(
            WAVAX,
            USDC,
            amount,
            checkReceiveAmount,
            checkFeeAmount,
            message
        );

        amount = 1;
        checkReceiveAmount = UFloat(14492750000, -27).normalize();
        checkFeeAmount = UFloat(7250000, -27).normalize();
        message = "Amount is smallest token unit";
        _testBetaSwap(
            WAVAX,
            USDC,
            amount,
            checkReceiveAmount,
            checkFeeAmount,
            message
        );
    }

    function test_USDC_WAVAX() public {
        uint256 amount;
        UFloat memory checkReceiveAmount;
        UFloat memory checkFeeAmount;
        string memory message;

        // amount = USDC.balanceOf(address(pool)) / 10;
        // checkReceiveAmount = 435556128724704000000000000000;
        // checkFeeAmount = 2727347109466620000000000000000;
        // message = "Amount 10% of pool balance";
        // _testBetaSwap(
        //     USDC,
        //     WAVAX,
        //     amount,
        //     checkReceiveAmount,
        //     checkFeeAmount,
        //     message
        // );

        amount = 1;
        checkReceiveAmount = UFloat(68862068965503500000, -27).normalize();
        checkFeeAmount = UFloat(1499999999999850000, -27).normalize();
        message = "Amount is smallest token unit";
        _testBetaSwap(
            USDC,
            WAVAX,
            amount,
            checkReceiveAmount,
            checkFeeAmount,
            message
        );
    }

    function test_AVAX_BTCb() public {
        vm.startPrank(alice);
        uint256 amount = WAVAX.balanceOf(address(pool)) / 10;
        uint256 amountQuote;
        uint256 feeQuote;
        uint256 amountOut;
        uint256 feeAmount;

        emit log("Get quote");
        (amountQuote, feeQuote) = pool.quoteSwap(
            address(0),
            address(BTCb),
            amount
        );
        emit log_named_uint("amountQuote", amountQuote);
        emit log_named_uint("feeQuote", feeQuote);

        emit log("Execute swap");
        (amountOut, feeAmount) = pool.swap{value: amount}(
            address(0),
            address(BTCb),
            amount,
            oneMin[0]
        );
        emit log_named_uint("amountOut", amountOut);
        emit log_named_uint("feeAmount", feeAmount);

        assertEq(amountQuote, amountOut, "amountOut");
        assertEq(feeQuote, feeAmount, "feeAmount");
    }

    function test_USDC_AVAX() public {
        vm.startPrank(alice);
        uint256 amount = USDC.balanceOf(address(pool)) / 10;
        uint256 amountQuote;
        uint256 feeQuote;
        uint256 amountOut;
        uint256 feeAmount;
        USDC.mint(amount);
        USDC.approve(address(pool), amount);

        emit log("Get quote");
        (amountQuote, feeQuote) = pool.quoteSwap(
            address(USDC),
            address(0),
            amount
        );
        emit log_named_string("Pay amount", amount.toUFloat(USDC.decimals()).toString());
        emit log_named_string("Pay amount", amount.toUFloat(USDC.decimals()).toString());
        emit log_named_string("amountQuote", amountQuote.toUFloat().toString());
        emit log_named_string("feeQuote", feeQuote.toUFloat().toString());

        emit log("Execute swap");
        (amountOut, feeAmount) = pool.swap(
            address(USDC),
            address(0),
            amount,
            oneMin[0]
        );
        emit log_named_string("amountOut", amountOut.toUFloat().toString());
        emit log_named_string("feeAmount", feeAmount.toUFloat().toString());

        assertEq(amountQuote, amountOut, "amountOut");
        assertEq(feeQuote, feeAmount, "feeAmount");
    }

    function _testBetaStake(
        Token payToken,
        uint256 payAmount, // Token decimals
        UFloat memory checkReceiveAmount,
        string memory message
    ) internal {
        address[] memory payTokens = new address[](1);
        payTokens[0] = address(payToken);
        UFloat[] memory payAmounts = new UFloat[](1);
        payAmounts[0] = payAmount.toUFloat(payToken.decimals());
        address[] memory receiveTokens = new address[](1);
        receiveTokens[0] = address(pool);
        UFloat[] memory allocations = new UFloat[](1);
        allocations[0] = ONE_FLOAT;
        UFloat[] memory checkPayAmounts = new UFloat[](0);
        UFloat[] memory checkReceiveAmounts = new UFloat[](1);
        checkReceiveAmounts[0] = checkReceiveAmount;
        QuoteState memory q = pool._quoteMultiswap(
            alice,
            payTokens,
            payAmounts,
            receiveTokens,
            allocations
        );
        checkSelfFinancing(pool, q, message);
        checkVsExcel(pool, q, checkPayAmounts, checkReceiveAmounts, ZERO_FLOAT, message);
    }

    function test_USDC_LP() public {
        uint256 amount;
        UFloat memory checkReceiveAmount;
        string memory message;

        amount = USDC.balanceOf(address(pool)) / 10;
        checkReceiveAmount = UFloat(917431192660551000000000000000000, -27).normalize();  // LP tokens
        message = "Amount 10% of pool balance";
        _testBetaStake(USDC, amount, checkReceiveAmount, message);

        amount = 1;
        checkReceiveAmount = UFloat(999999999999910000000, -27).normalize(); // LP tokens
        message = "Amount is smallest token unit";
        _testBetaStake(USDC, amount, checkReceiveAmount, message);
    }

    function test_WAVAX_LP() public {
        uint256 amount;
        UFloat memory checkReceiveAmount;
        string memory message;

        amount = WAVAX.balanceOf(address(pool)) / 10;
        checkReceiveAmount = UFloat(917431192660551000000000000000000, -27).normalize();
        message = "Amount 10% of pool balance";
        _testBetaStake(WAVAX, amount, checkReceiveAmount, message);

        amount = 1;
        checkReceiveAmount = UFloat(14500000000, -27).normalize();
        message = "Amount is smallest token unit";
        _testBetaStake(WAVAX, amount, checkReceiveAmount, message);
    }

    function test_AVAX_LP() public {
        vm.startPrank(alice);
        uint256 amount = WAVAX.balanceOf(alice) / 10;
        uint256 amountQuote;
        uint256 feeQuote;
        uint256 amountOut;
        uint256 feeAmount;

        emit log("Get quote");
        (amountQuote, feeQuote) = pool.quoteStake(address(0), amount);
        emit log_named_uint("amountQuote", amountQuote);
        emit log_named_uint("feeQuote", feeQuote);

        emit log("Execute swap");
        (amountOut, feeAmount) = pool.stake{value: amount}(
            address(0),
            amount,
            oneMin[0]
        );
        emit log_named_uint("amountOut", amountOut);
        emit log_named_uint("feeAmount", feeAmount);

        assertEq(amountQuote, amountOut, "amountOut");
        assertEq(feeQuote, feeAmount, "feeAmount");
    }

    function _testBetaUnstake(
        Token receiveToken,
        uint256 shareAmount, // Token decimals
        UFloat memory checkReceiveAmount,
        UFloat memory, // checkFeeAmount,
        string memory message
    ) internal {
        address[] memory payTokens = new address[](1);
        payTokens[0] = address(pool);
        UFloat[] memory payAmounts = new UFloat[](1);
        payAmounts[0] = shareAmount.toUFloat();
        address[] memory receiveTokens = new address[](1);
        receiveTokens[0] = address(receiveToken);
        UFloat[] memory allocations = new UFloat[](1);
        allocations[0] = ONE_FLOAT;
        // UFloat[] memory checkPayAmounts = new UFloat[](0);
        UFloat[] memory checkReceiveAmounts = new UFloat[](1);
        checkReceiveAmounts[0] = checkReceiveAmount;
        QuoteState memory q = pool._quoteMultiswap(
            alice,
            payTokens,
            payAmounts,
            receiveTokens,
            allocations
        );
        checkSelfFinancing(pool, q, message);
        // checkVsExcel(
        //     pool,
        //     q,
        //     checkPayAmounts,
        //     checkReceiveAmounts,
        //     checkFeeAmount,
        //     message
        // );
    }

    function test_LP_USDC() public {
        uint256 amount;
        UFloat memory checkReceiveAmount;
        UFloat memory checkFeeAmount;
        string memory message;

        amount = pool.totalSupply() / 10;
        checkReceiveAmount = UFloat(5261772525071730000000000000000000, -27).normalize();
        checkFeeAmount = UFloat(5000000000000000000000000000000, -27).normalize();
        message = "Amount 10% of pool balance";
        _testBetaUnstake(
            USDC,
            amount,
            checkReceiveAmount,
            checkFeeAmount,
            message
        );

        amount = 1;
        checkReceiveAmount = UFloat(2998500000, -27).normalize();
        checkFeeAmount = UFloat(1500000, -27).normalize();
        message = "Amount is smallest token unit";
        _testBetaUnstake(
            USDC,
            amount,
            checkReceiveAmount,
            checkFeeAmount,
            message
        );
    }

    function test_LP_WAVAX() public {
        uint256 amount;
        UFloat memory checkReceiveAmount;
        UFloat memory checkFeeAmount;
        string memory message;

        amount = pool.totalSupply() / 10;
        checkReceiveAmount = UFloat(362689642459207000000000000000000, -27).normalize();
        checkFeeAmount = UFloat(15000000000000000000000000000000, -27).normalize();
        message = "Amount 10% of pool balance";
        _testBetaUnstake(
            WAVAX,
            amount,
            checkReceiveAmount,
            checkFeeAmount,
            message
        );

        amount = 1;
        checkReceiveAmount = UFloat(206586207, -27).normalize();
        checkFeeAmount = UFloat(4500000, -27).normalize();
        message = "Amount is smallest token unit";
        _testBetaUnstake(
            WAVAX,
            amount,
            checkReceiveAmount,
            checkFeeAmount,
            message
        );
    }

    function test_LP_AVAX() public {
        uint256 amountQuote;
        uint256 feeQuote;
        uint256 amountOut;
        uint256 feeAmount;
        (amountQuote, feeQuote) = pool.quoteUnstake(address(0), oneAmount[0]);
        (amountOut, feeAmount) = pool.unstake(
            address(0),
            oneAmount[0],
            oneMin[0]
        );
        assertEq(amountQuote, amountOut, "amountOut");
        assertEq(feeQuote, feeAmount, "feeAmount");
    }

    function _testBetaMixedStake(
        Token payToken,
        Token receiveToken,
        uint256 payAmount, // Token decimals
        UFloat[] memory, // checkReceiveAmounts, // Internal decimals
        UFloat memory, // checkFeeAmount, // Internal decimals
        string memory message
    ) internal {
        address[] memory payTokens = new address[](1);
        payTokens[0] = address(payToken);
        UFloat[] memory payAmounts = new UFloat[](1);
        payAmounts[0] = payAmount.toUFloat(payToken.decimals());
        address[] memory receiveTokens = new address[](2);
        receiveTokens[0] = address(pool);
        receiveTokens[1] = address(receiveToken);
        UFloat[] memory allocations = new UFloat[](2);
        allocations[0] = HALF_FLOAT;
        allocations[1] = HALF_FLOAT;
        // UFloat[] memory checkPayAmounts = new UFloat[](0);
        QuoteState memory q = pool._quoteMultiswap(
            alice,
            payTokens,
            payAmounts,
            receiveTokens,
            allocations
        );
        checkSelfFinancing(pool, q, message);
        // checkVsExcel(
        //     pool,
        //     q,
        //     checkPayAmounts,
        //     checkReceiveAmounts,
        //     checkFeeAmount,
        //     message
        // );
    }

    function test_USDC_LP_BTCb() public {
        uint256 amount;
        UFloat[] memory checkReceiveAmounts = new UFloat[](2);
        UFloat memory checkFeeAmount;
        string memory message;

        amount = USDC.balanceOf(address(pool)) / 10;
        checkReceiveAmounts[0] = UFloat(455939195930566000000000000000000, -27).normalize();
        checkReceiveAmounts[1] = UFloat(14440670197238500000000000000, -27).normalize();
        checkFeeAmount = UFloat(1369872396386280000000000000000, -27).normalize();
        message = "Amount 10% of pool balance";
        _testBetaMixedStake(
            USDC,
            BTCb,
            amount,
            checkReceiveAmounts,
            checkFeeAmount,
            message
        );

        amount = 1;
        checkReceiveAmounts[0] = UFloat(499249999999953000000, -27).normalize();
        checkReceiveAmounts[1] = UFloat(16605687676557000, -27).normalize();
        checkFeeAmount = UFloat(1499999999999860000, -27).normalize();
        message = "Amount is smallest token unit";
        _testBetaMixedStake(
            USDC,
            BTCb,
            amount,
            checkReceiveAmounts,
            checkFeeAmount,
            message
        );
    }

    function test_WAVAX_LP_WETHe() public {
        uint256 amount;
        UFloat[] memory checkReceiveAmounts = new UFloat[](2);
        UFloat memory checkFeeAmount;
        string memory message;

        amount = WAVAX.balanceOf(address(pool)) / 10;
        checkReceiveAmounts[0] = UFloat(455939195930566000000000000000000, -27).normalize();
        checkReceiveAmounts[1] = UFloat(227546514404435000000000000000, -27).normalize();
        checkFeeAmount = UFloat(1369872396386280000000000000000, -27).normalize();
        message = "Amount 10% of pool balance";
        _testBetaMixedStake(
            WAVAX,
            WETHe,
            amount,
            checkReceiveAmounts,
            checkFeeAmount,
            message
        );

        amount = 1;
        checkReceiveAmounts[0] = UFloat(7239125000, -27).normalize();
        checkReceiveAmounts[1] = UFloat(3794091, -27).normalize();
        checkFeeAmount = UFloat(21750000, -27).normalize();
        message = "Amount is smallest token unit";
        _testBetaMixedStake(
            WAVAX,
            WETHe,
            amount,
            checkReceiveAmounts,
            checkFeeAmount,
            message
        );
    }

    // function test_AVAX_LP_BTCb() public {
    //     vm.startPrank(alice);
    //     uint256 amount = WAVAX.balanceOf(alice) / 10;
    //     address[] memory payTokens = new address[](1);
    //     payTokens[0] = address(0);
    //     uint256[] memory amounts = new uint256[](1);
    //     amounts[0] = amount;

    //     address[] memory receiveTokens = new address[](2);
    //     uint256[] memory allocations = new uint256[](2);
    //     receiveTokens[0] = address(pool);
    //     receiveTokens[1] = address(BTCb);
    //     allocations[0] = 5e17;
    //     allocations[1] = 5e17;
    //     (receiveAmountQuotes, feeQuote) = pool.quoteMultiswap(
    //         payTokens,
    //         amounts,
    //         receiveTokens,
    //         allocations
    //     );
    //     (receiveAmounts, feeAmount) = pool.multiswap{value: amounts[0]}(
    //         payTokens,
    //         amounts,
    //         receiveTokens,
    //         allocations,
    //         twoMins
    //     );
    //     assertEq(receiveAmountQuotes[0], receiveAmounts[0], "amountOut 1");
    //     assertEq(receiveAmountQuotes[1], receiveAmounts[1], "amountOut 2");
    //     assertEq(feeQuote, feeAmount, "feeAmount");
    // }

    // function test_USDC_LP_AVAX() public {
    //     address[] memory payTokens = new address[](1);
    //     payTokens[0] = address(USDC);
    //     uint256[] memory amounts = new uint256[](1);
    //     amounts[0] = USDC.balanceOf(address(pool)) / 10;

    //     address[] memory receiveTokens = new address[](2);
    //     uint256[] memory allocations = new uint256[](2);
    //     receiveTokens[0] = address(pool);
    //     receiveTokens[1] = address(0);
    //     allocations[0] = 5e17;
    //     allocations[1] = 5e17;
    //     (receiveAmountQuotes, feeQuote) = pool.quoteMultiswap(
    //         payTokens,
    //         amounts,
    //         receiveTokens,
    //         allocations
    //     );
    //     (receiveAmounts, feeAmount) = pool.multiswap(
    //         payTokens,
    //         amounts,
    //         receiveTokens,
    //         allocations,
    //         twoMins
    //     );
    //     assertEq(receiveAmountQuotes[0], receiveAmounts[0], "amountOut 1");
    //     assertEq(receiveAmountQuotes[1], receiveAmounts[1], "amountOut 2");
    //     assertEq(feeQuote, feeAmount, "feeAmount");
    // }

    function _testBetaMixedUnstake(
        address payToken,
        address receiveToken,
        uint256[] memory payAmounts, // Token decimals
        UFloat[] memory, // checkReceiveAmounts,
        UFloat memory, // checkFeeAmount,
        string memory message
    ) internal {
        address[] memory payTokens = new address[](2);
        payTokens[0] = address(pool);
        payTokens[1] = payToken;
        UFloat[] memory payAmountsFloat = new UFloat[](2);
        payAmountsFloat[0] = payAmounts[0].toUFloat();
        payAmountsFloat[1] = payAmounts[1].toUFloat(
            pool.asset(payToken).decimals
        );
        address[] memory receiveTokens = new address[](1);
        receiveTokens[0] = receiveToken;
        UFloat[] memory allocations = new UFloat[](1);
        allocations[0] = ONE_FLOAT;
        // UFloat[] memory checkPayAmounts = new UFloat[](0);
        QuoteState memory q = pool._quoteMultiswap(
            alice,
            payTokens,
            payAmountsFloat,
            receiveTokens,
            allocations
        );
        checkSelfFinancing(pool, q, message);
        // checkVsExcel(
        //     pool,
        //     q,
        //     checkPayAmounts,
        //     checkReceiveAmounts,
        //     checkFeeAmount,
        //     message
        // );
    }

    function test_LP_USDC_BTCb() public {
        uint256[] memory payAmounts = new uint256[](2);
        UFloat[] memory checkReceiveAmounts = new UFloat[](1);
        UFloat memory checkFeeAmount;
        string memory message;

        payAmounts[0] = pool.totalSupply() / 10;
        payAmounts[1] = USDC.balanceOf(address(pool)) / 10;
        checkReceiveAmounts[0] = UFloat(181288544939099000000000000000, -27).normalize();
        checkFeeAmount = UFloat(32455430602652800000000000000000, -27).normalize();
        message = "Amount 10% of pool balance";
        _testBetaMixedUnstake(
            address(USDC),
            address(BTCb),
            payAmounts,
            checkReceiveAmounts,
            checkFeeAmount,
            message
        );

        payAmounts[0] = 1;
        payAmounts[1] = 1;
        checkReceiveAmounts[0] = UFloat(33161483452330900, -27).normalize();
        checkFeeAmount = UFloat(3000000000008700000, -27).normalize();
        message = "Amount is smallest token unit";
        _testBetaMixedUnstake(
            address(USDC),
            address(BTCb),
            payAmounts,
            checkReceiveAmounts,
            checkFeeAmount,
            message
        );
    }

    function test_LP_WAVAX_WETHe() public {
        uint256[] memory payAmounts = new uint256[](2);
        UFloat[] memory checkReceiveAmounts = new UFloat[](1);
        UFloat memory checkFeeAmount;
        string memory message;

        payAmounts[0] = pool.totalSupply() / 10;
        payAmounts[1] = WAVAX.balanceOf(address(pool)) / 10;
        checkReceiveAmounts[0] = UFloat(2856624792264290000000000000000, -27).normalize();
        checkFeeAmount = UFloat(32455430602652800000000000000000, -27).normalize();
        message = "Amount 10% of pool balance";
        _testBetaMixedUnstake(
            address(WAVAX),
            address(WETHe),
            payAmounts,
            checkReceiveAmounts,
            checkFeeAmount,
            message
        );

        payAmounts[0] = 1;
        payAmounts[1] = 1;
        checkReceiveAmounts[0] = UFloat(9144392, -27).normalize();
        checkFeeAmount = UFloat(52500000, -27).normalize();
        message = "Amount is smallest token unit";
        _testBetaMixedUnstake(
            address(WAVAX),
            address(WETHe),
            payAmounts,
            checkReceiveAmounts,
            checkFeeAmount,
            message
        );
    }

    // function testBetaMixedUnstakePayAVAX() public {
    //     vm.startPrank(alice);
    //     uint256 amount = WAVAX.balanceOf(alice) / 10;
    //     address[] memory payTokens = new address[](2);
    //     payTokens[0] = address(pool);
    //     payTokens[1] = address(0);
    //     uint256[] memory amounts = new uint256[](2);
    //     amounts[0] = pool.info().balance / 10;
    //     amounts[1] = amount;
    //     address[] memory receiveTokens = new address[](1);
    //     receiveTokens[0] = address(BTCb);
    //     (receiveAmountQuotes, feeQuote) = pool.quoteMultiswap(
    //         payTokens,
    //         amounts,
    //         receiveTokens,
    //         oneAllocation
    //     );
    //     (receiveAmounts, feeAmount) = pool.multiswap{value: amounts[1]}(
    //         payTokens,
    //         amounts,
    //         receiveTokens,
    //         oneAllocation,
    //         oneMin
    //     );
    //     assertEq(receiveAmountQuotes[0], receiveAmounts[0], "amountOut");
    //     assertEq(feeQuote, feeAmount, "feeAmount");
    // }

    // function testBetaMixedUnstakeReceiveAVAX() public {
    //     vm.startPrank(alice);
    //     address[] memory payTokens = new address[](2);
    //     payTokens[0] = address(pool);
    //     payTokens[1] = address(USDC);
    //     uint256[] memory amounts = new uint256[](2);
    //     amounts[0] = pool.info().balance / 10;
    //     amounts[1] = USDC.balanceOf(alice) / 10;
    //     address[] memory receiveTokens = new address[](1);
    //     receiveTokens[0] = address(0);
    //     (receiveAmountQuotes, feeQuote) = pool.quoteMultiswap(
    //         payTokens,
    //         amounts,
    //         receiveTokens,
    //         oneAllocation
    //     );
    //     (receiveAmounts, feeAmount) = pool.multiswap(
    //         payTokens,
    //         amounts,
    //         receiveTokens,
    //         oneAllocation,
    //         oneMin
    //     );
    //     assertEq(receiveAmountQuotes[0], receiveAmounts[0], "amountOut");
    //     assertEq(feeQuote, feeAmount, "feeAmount");
    // }

    function _testBetaAddLiquidity(
        address token,
        uint256 amount, // Token decimals
        string memory message
    ) internal {
        emit log("Get quote");
        UFloat memory amountFloat;
        if (token == address(pool)) {
            amountFloat = amount.toUFloat();
        } else {
            amountFloat = amount.toUFloat(pool.asset(token).decimals);
        }
        QuoteState memory q = pool._quoteAddLiquidity(
            token,
            amountFloat
        );

        emit log("Check self financing");
        checkSelfFinancing(pool, q, message);
    }

    function test_USDC_AddLiquidity() public {
        uint256 amount;
        string memory message;

        amount = USDC.balanceOf(address(pool)) / 10;
        message = "Amount 10% of pool balance";
        _testBetaAddLiquidity(address(USDC), amount, message);

        amount = 1;
        message = "Amount is smallest token unit";
        _testBetaAddLiquidity(address(USDC), amount, message);
    }

    function test_WAVAX_AddLiquidity() public {
        uint256 amount;
        string memory message;

        amount = WAVAX.balanceOf(address(pool)) / 10;
        message = "Amount 10% of pool balance";
        _testBetaAddLiquidity(address(WAVAX), amount, message);

        // amount = 1;
        // message = "Amount is smallest token unit";
        // _testBetaAddLiquidity(
        //     address(WAVAX),
        //     amount,
        //     message
        // );
    }

    function test_LP_AddLiquidity() public {
        emit log("Start LP add liquidity");

        uint256 amount;
        string memory message;

        amount = pool.totalSupply() / 10;
        message = "Amount 10% of pool balance";
        _testBetaAddLiquidity(address(pool), amount, message);

        // amount = pool.totalSupply() / 10 ** 12;
        // message = "Amount is smallest token unit";
        // _testBetaAddLiquidity(
        //     address(pool),
        //     amount,
        //     message
        // );
    }

    function test_LP_RemoveLiquidity() public {
        uint256 amount = pool.totalSupply() / 10;
        string memory message = "Amount 10% of pool balance";
        QuoteState memory q = pool._quoteRemoveLiquidity(amount.toUFloat());

        checkSelfFinancing(pool, q, message);
    }

    // function testBetaRemoveLiquidity() public {
    //     // vm.startPrank(alice);
    //     // uint256 amount = pool.balanceOf(alice);
    //     // (receiveAmountQuotes, feeQuote) = pool.quoteRemoveLiquidity(amount);
    //     // (receiveAmounts, feeAmount) = pool.removeLiquidity(amount, allMins);
    //     // for (uint256 i; i < NTOKENS; i++) {
    //     //     assertEq(
    //     //         receiveAmountQuotes[i],
    //     //         receiveAmounts[i],
    //     //         "receiveAmount"
    //     //     );
    //     // }
    //     // assertEq(feeQuote, feeAmount, "feeAmount");

    //     // setUp();

    //     // amount = pool.balanceOf(alice) / 2;
    //     // (receiveAmountQuotes, feeQuote) = pool.quoteRemoveLiquidity(amount);
    //     // (receiveAmounts, feeAmount) = pool.removeLiquidity(amount, allMins);
    //     // for (uint256 i; i < NTOKENS; i++) {
    //     //     assertEq(
    //     //         receiveAmountQuotes[i],
    //     //         receiveAmounts[i],
    //     //         "receiveAmount"
    //     //     );
    //     // }
    //     // assertEq(feeQuote, feeAmount, "feeAmount");

    //     // setUp();

    //     // amount = pool.balanceOf(alice) / 10;

    //     checkRemoveLiquidity(pool, pool.totalSupply() / 10);

    //     // emit log("=================");
    //     // emit log("State after removeLiquidity");
    //     // emit log("");
    //     // for (uint256 i; i < NTOKENS; i++) {
    //     //     emit log_named_uint("amountOut", receiveAmounts[i]);
    //     // }
    //     // emit log_named_uint("feeAmount", feeAmount);
    //     // emit log("");
    //     // showPool(pool);
    //     // emit log("");
    // }

    // function testBetaDiscount() public {
    //     emit log("Start prank on alice");
    //     vm.startPrank(alice);

    //     emit log("Set bob discount to 100%");
    //     pool.setDiscount(bob, ONE);

    //     emit log("Stop prank on alice");
    //     vm.stopPrank();

    //     emit log("Start prank on bob");
    //     vm.startPrank(bob);

    //     emit log("Mint USDC");
    //     uint256 amount = oneAmount[0] / oneConversion[0];
    //     USDC.mint(amount);
    //     USDC.approve(address(pool), amount);

    //     emit log("Quote swap");
    //     (amountQuote, feeQuote) = pool.quoteSwap(
    //         oneAsset[0],
    //         anotherAsset[0],
    //         amount
    //     );

    //     emit log("Swap");
    //     (amountOut, feeAmount) = pool.swap(
    //         oneAsset[0],
    //         anotherAsset[0],
    //         amount,
    //         oneMin[0]
    //     );

    //     assertEq(amountQuote, amountOut, "amountOut");
    //     assertEq(feeQuote, feeAmount, "feeAmount");
    //     assertEq(feeAmount, 0, "feeAmount");

    //     emit log("Stop prank on bob");
    //     vm.stopPrank();

    //     emit log("Start prank on alice");
    //     vm.startPrank(alice);

    //     emit log("Expect invalid discount");
    //     emit log_named_uint("alice discount", 2 * ONE);
    //     vm.expectRevert(
    //         abi.encodeWithSelector(
    //             IUsers.InvalidDiscount.selector,
    //             2 * ONE * TO_INTERNAL
    //         )
    //     );
    //     pool.setDiscount(alice, 2 * ONE);
    // }
}

// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "@cavalre/Pool.sol";
import "@cavalre/test/Token.t.sol";
import "forge-std/Test.sol";

contract TestPool is Pool {
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 tau_
    ) Pool(name_, symbol_, tau_) {}

    function fromCanonical_(
        uint256 amount_,
        uint8 decimals_
    ) public pure returns (uint256) {
        return super.fromCanonical(amount_, decimals_);
    }
}

contract BetaTest is Test {
    using FixedPointMathLib for uint256;

    uint256 private constant NTOKENS = 10;

    mapping(string => Token) private tokens;
    string[] private symbols = new string[](NTOKENS);
    TestPool private pool;
    address private alice = address(1);
    address private bob = address(2);
    address private carol = address(3);

    uint256[] private fees = new uint256[](NTOKENS);
    uint256[] private prices = new uint256[](NTOKENS);

    uint256 private tau = 1e16;
    uint256 private bps = 1e14;

    uint256 private marketCap = 1e25;

    address[] private oneAsset = new address[](1);
    address[] private anotherAsset = new address[](1);
    address[] private onePool = new address[](1);
    uint256[] private oneAmount = new uint256[](1);
    uint256[] private oneAllocation = new uint256[](1);
    uint256[] private oneMin = new uint256[](1);

    address[] private twoTokens = new address[](2);
    uint256[] private twoAmounts = new uint256[](2);
    uint256[] private twoAllocations = new uint256[](2);
    uint256[] private twoMins = new uint256[](2);

    uint256[] private allAmounts = new uint256[](NTOKENS);
    uint256[] private allMins = new uint256[](NTOKENS);

    uint256 private amountOut;
    uint256[] private receiveAmounts;
    uint256 private feeAmount;

    function setUp() public {
        vm.startPrank(alice);
        vm.roll(1);

        Token token;
        token = new Token("Wrapped AVAX", "WAVAX", 18);
        symbols[0] = token.symbol();
        tokens[token.symbol()] = token;
        token = new Token("USD Coin", "USDC", 6);
        symbols[1] = token.symbol();
        tokens[token.symbol()] = token;
        token = new Token("TetherToken", "USDt", 6);
        symbols[2] = token.symbol();
        tokens[token.symbol()] = token;
        token = new Token("Euro Coin", "EUROC", 6);
        symbols[3] = token.symbol();
        tokens[token.symbol()] = token;
        token = new Token("Bridged USDC", "USDC.e", 6);
        symbols[4] = token.symbol();
        tokens[token.symbol()] = token;
        token = new Token("Bridged USDt", "USDT.e", 6);
        symbols[5] = token.symbol();
        tokens[token.symbol()] = token;
        token = new Token("Brdiged DAI", "DAI.e", 18);
        symbols[6] = token.symbol();
        tokens[token.symbol()] = token;
        token = new Token("Bridged WETH", "WETH.e", 18);
        symbols[7] = token.symbol();
        tokens[token.symbol()] = token;
        token = new Token("Bridged WBTC", "WBTC.e", 8);
        symbols[8] = token.symbol();
        tokens[token.symbol()] = token;
        token = new Token("Bridged BTC", "BTC.b", 8);
        symbols[9] = token.symbol();
        tokens[token.symbol()] = token;

        pool = new TestPool("Pool", "P", tau);

        fees[0] = 15 * bps;
        fees[1] = 5 * bps;
        fees[2] = 5 * bps;
        fees[3] = 5 * bps;
        fees[4] = 5 * bps;
        fees[5] = 5 * bps;
        fees[6] = 5 * bps;
        fees[7] = 30 * bps;
        fees[8] = 30 * bps;
        fees[9] = 30 * bps;

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

        uint256 balance;
        for (uint256 i; i < NTOKENS; i++) {
            token = tokens[symbols[i]];

            balance = marketCap.divWadUp(prices[i]);
            token.mint(balance);
            token.approve(address(pool), balance);
            pool.addAsset(address(token), balance, fees[i], marketCap);
        }

        pool.initialize();

        for (uint256 i; i < NTOKENS; i++) {
            token = tokens[symbols[i]];
            balance = token.balanceOf(address(pool));
            token.mint(balance);
            token.approve(address(pool), balance);
        }

        oneAsset[0] = address(tokens["USDC"]);
        anotherAsset[0] = address(tokens["BTC.b"]);
        onePool[0] = address(pool);
        oneAmount[0] = 1e24;
        oneAllocation[0] = 1e18;
    }

    function testDecimals() public {
        assertEq(tokens[symbols[0]].decimals(), 18);
        assertEq(tokens[symbols[1]].decimals(), 6);
        assertEq(tokens[symbols[2]].decimals(), 6);
        assertEq(tokens[symbols[3]].decimals(), 6);
        assertEq(tokens[symbols[4]].decimals(), 6);
        assertEq(tokens[symbols[5]].decimals(), 6);
        assertEq(tokens[symbols[6]].decimals(), 18);
        assertEq(tokens[symbols[7]].decimals(), 18);
        assertEq(tokens[symbols[8]].decimals(), 8);
        assertEq(tokens[symbols[9]].decimals(), 8);
    }

    function testNames() public {
        assertEq(tokens[symbols[0]].name(), "Wrapped AVAX");
        assertEq(tokens[symbols[1]].name(), "USD Coin");
        assertEq(tokens[symbols[2]].name(), "TetherToken");
        assertEq(tokens[symbols[3]].name(), "Euro Coin");
        assertEq(tokens[symbols[4]].name(), "Bridged USDC");
        assertEq(tokens[symbols[5]].name(), "Bridged USDt");
        assertEq(tokens[symbols[6]].name(), "Brdiged DAI");
        assertEq(tokens[symbols[7]].name(), "Bridged WETH");
        assertEq(tokens[symbols[8]].name(), "Bridged WBTC");
        assertEq(tokens[symbols[9]].name(), "Bridged BTC");
    }

    function testSymbols() public {
        assertEq(tokens[symbols[0]].symbol(), "WAVAX");
        assertEq(tokens[symbols[1]].symbol(), "USDC");
        assertEq(tokens[symbols[2]].symbol(), "USDt");
        assertEq(tokens[symbols[3]].symbol(), "EUROC");
        assertEq(tokens[symbols[4]].symbol(), "USDC.e");
        assertEq(tokens[symbols[5]].symbol(), "USDT.e");
        assertEq(tokens[symbols[6]].symbol(), "DAI.e");
        assertEq(tokens[symbols[7]].symbol(), "WETH.e");
        assertEq(tokens[symbols[8]].symbol(), "WBTC.e");
        assertEq(tokens[symbols[9]].symbol(), "BTC.b");
    }

    function testInit() public {
        AssetState[] memory assets = pool.assets();
        assertEq(assets.length, NTOKENS, "Number of assets in pool");
        assertEq(pool.info().balance, pool.totalSupply(), "Pool balance");
        assertEq(pool.info().scale, marketCap * NTOKENS, "Pool scale");
        for (uint256 i; i < NTOKENS; i++) {
            assertEq(assets[i].symbol, symbols[i], "Asset symbol");
            assertEq(
                pool.fromCanonical_(assets[i].balance, assets[i].decimals),
                tokens[symbols[i]].balanceOf(address(pool)),
                "Asset balance"
            );
            assertEq(assets[i].scale, marketCap, "Asset scale");
            assertEq(assets[i].fee, fees[i], "Asset fee");
        }
    }

    function showAsset(AssetState memory _asset) internal {
        // emit log_named_string("name", _asset.name);
        emit log_named_string("symbol", _asset.symbol);
        // emit log_named_uint("balanceOf", _asset.token.balanceOf(address(pool)));
        emit log_named_uint("balance", _asset.balance);
        emit log_named_uint("scale", _asset.scale);
        emit log_named_uint("fee", _asset.fee);
        emit log("-------");
    }

    function showPool(Pool _pool) internal {
        PoolState memory pool_;
        emit log("Pool Info");
        emit log("=========");
        pool_ = _pool.info();
        // emit log("Name:",poolName);
        // emit log("Symbol:",poolSymbol);
        // emit log_named_uint("Decimals", poolDecimals);
        // emit log_named_uint("totalSupply", pool.totalSupply());
        emit log_named_uint("balance", pool_.balance);
        emit log_named_uint("scale", pool_.scale);
        emit log("");
        emit log("Assets:");
        emit log("-------");
        Token token;
        for (uint256 i; i < NTOKENS; i++) {
            token = tokens[symbols[i]];
            showAsset(pool.asset(address(token)));
        }
    }

    function testBetaSwap() public {
        emit log("Initial state");
        emit log("");
        showPool(pool);
        emit log("");
        emit log_named_uint("amountIn", oneAmount[0]);
        emit log_named_uint("balance", pool.asset(oneAsset[0]).balance);
        (amountOut, feeAmount) = pool.swap(
            oneAsset[0],
            anotherAsset[0],
            oneAmount[0],
            oneMin[0]
        );
        emit log("State after swap");
        emit log("");
        emit log_named_uint("amountIn", oneAmount[0]);
        emit log_named_uint("amountOut", amountOut);
        emit log_named_uint("feeAmount", feeAmount);
        emit log("");
        showPool(pool);
        emit log("");
    }

    function testBetaStake() public {
        emit log("Initial state");
        emit log("");
        showPool(pool);
        emit log("");
        emit log_named_uint("amountIn", oneAmount[0]);
        emit log_named_uint("balance", pool.asset(oneAsset[0]).balance);
        (amountOut, feeAmount) = pool.stake(
            oneAsset[0],
            oneAmount[0],
            oneMin[0]
        );
        emit log("State after stake");
        emit log("");
        emit log_named_uint("amountOut", amountOut);
        emit log_named_uint("feeAmount", feeAmount);
        emit log("");
        showPool(pool);
        emit log("");
    }

    function testBetaUnstake() public {
        emit log("Initial state");
        emit log("");
        showPool(pool);
        emit log("");
        emit log_named_uint("amountIn", oneAmount[0]);
        emit log_named_uint("balance", pool.asset(oneAsset[0]).balance);
        (amountOut, feeAmount) = pool.unstake(
            anotherAsset[0],
            oneAmount[0],
            oneMin[0]
        );
        emit log("State after stake");
        emit log("");
        emit log_named_uint("amountOut", amountOut);
        emit log_named_uint("feeAmount", feeAmount);
        emit log("");
        showPool(pool);
        emit log("");
    }

    function testBetaMixedStake() public {
        twoTokens[0] = address(pool);
        twoTokens[1] = anotherAsset[0];
        twoAmounts[0] = 5e17;
        twoAmounts[1] = 5e17;
        emit log("Initial state");
        emit log("");
        showPool(pool);
        emit log("");
        emit log_named_uint("amountIn", oneAmount[0]);
        emit log_named_uint("balance", pool.asset(oneAsset[0]).balance);
        (receiveAmounts, feeAmount) = pool.multiswap(
            oneAsset,
            oneAmount,
            twoTokens,
            twoAmounts,
            twoMins
        );
        emit log("State after stake");
        emit log("");
        emit log_named_uint("amountOut 1", receiveAmounts[0]);
        emit log_named_uint("amountOut 2", receiveAmounts[1]);
        emit log_named_uint("feeAmount", feeAmount);
        emit log("");
        showPool(pool);
        emit log("");
    }

    function testBetaMixedUnstake() public {
        twoTokens[0] = address(pool);
        twoTokens[1] = oneAsset[0];
        twoAmounts[0] = oneAmount[0];
        twoAmounts[1] = oneAmount[0];
        emit log("=============");
        emit log("Initial state");
        emit log("");
        showPool(pool);
        emit log("");
        emit log_named_uint("amountIn 1", twoAmounts[0]);
        emit log_named_uint("amountIn 2", twoAmounts[1]);
        emit log("");
        (receiveAmounts, feeAmount) = pool.multiswap(
            twoTokens,
            twoAmounts,
            anotherAsset,
            oneAllocation,
            oneMin
        );
        emit log("=================");
        emit log("State after stake");
        emit log("");
        emit log_named_uint("amountOut", receiveAmounts[0]);
        emit log_named_uint("feeAmount", feeAmount);
        emit log("");
        showPool(pool);
        emit log("");
    }

    function testBetaAddLiquidity() public {
        emit log("=============");
        emit log("Initial state");
        emit log("");
        showPool(pool);
        emit log("");
        emit log_named_uint("amountIn", oneAmount[0]);
        emit log_named_uint("balance", pool.asset(oneAsset[0]).balance);
        emit log("");
        amountOut = pool.addLiquidity(oneAsset[0], oneAmount[0], oneMin[0]);
        emit log("=================");
        emit log("State after addLiquidity");
        emit log("");
        emit log_named_uint("amountOut", amountOut);
        emit log_named_uint("feeAmount", feeAmount);
        emit log("");
        showPool(pool);
        emit log("");
    }

    function testBetaRemoveLiquidity() public {
        emit log("=============");
        emit log("Initial state");
        emit log("");
        showPool(pool);
        emit log("");
        emit log_named_uint("amountIn", oneAmount[0]);
        emit log_named_uint("balance", pool.asset(oneAsset[0]).balance);
        emit log("");
        (receiveAmounts, feeAmount) = pool.removeLiquidity(marketCap, allMins);
        emit log("=================");
        emit log("State after removeLiquidity");
        emit log("");
        for (uint256 i; i < NTOKENS; i++) {
            emit log_named_uint("amountOut", receiveAmounts[i]);
        }
        emit log_named_uint("feeAmount", feeAmount);
        emit log("");
        showPool(pool);
        emit log("");
    }
}

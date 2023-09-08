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

import "@cavalre/Pool.sol";
import "@cavalre/test/Token.t.sol";
import "@cavalre/Users.sol";
import "forge-std/Test.sol";

contract BetaTest is Test {
    using FixedPointMathLib for uint256;

    uint256 private constant NTOKENS = 10;

    mapping(string => Token) private tokens;
    string[] private symbols = new string[](NTOKENS);
    Pool private pool;
    address private alice = address(1);
    address private bob = address(2);
    address private carol = address(3);

    uint256[] private fees = new uint256[](NTOKENS);
    uint256[] private prices = new uint256[](NTOKENS);
    uint256[] private conversions = new uint256[](NTOKENS);

    uint256 private constant ONE = 1e18;
    uint256 private tau = 1e16;
    uint256 private bps = 1e14;

    uint256 private marketCap = 1e25;

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

        pool = new Pool("Pool", "P", tau);

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

        uint256 conversion;
        uint256 balance;
        for (uint256 i; i < NTOKENS; i++) {
            token = tokens[symbols[i]];
            conversion = 10 ** (18 - token.decimals());
            conversions[i] = conversion;
            balance = marketCap.divWadUp(prices[i]) / conversion;
            token.mint(balance);
            token.approve(address(pool), balance);
            pool.addAsset(
                address(token),
                fees[i],
                balance,
                marketCap
            );
            // emit log("----------------");
            // emit log_named_string("Symbol", token.symbol());
            // emit log_named_uint("Conversion", conversion);
            // emit log_named_uint("Balance", balance);
            // emit log_named_string("Minted", token.symbol());
            // emit log_named_string("Approved", token.symbol());
            // emit log_named_string("Added", token.symbol());
        }

        pool.initialize();

        for (uint256 i; i < NTOKENS; i++) {
            token = tokens[symbols[i]];
            balance = token.balanceOf(address(pool));
            token.mint(balance);
            token.approve(address(pool), balance);
            allMaxs[i] = type(uint256).max;
        }

        oneAsset[0] = address(tokens["USDC"]);
        oneConversion[0] = conversions[1];
        anotherAsset[0] = address(tokens["BTC.b"]);
        anotherConversion[0] = conversions[9];
        onePool[0] = address(pool);
        oneAmount[0] = 1e24;
        oneAllocation[0] = 1e18;
        oneMax[0] = type(uint256).max;
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
                assets[i].balance / assets[i].conversion,
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
        vm.startPrank(bob);

        uint256 amount = oneAmount[0] / oneConversion[0];
        tokens["USDC"].mint(amount);
        tokens["USDC"].approve(address(pool), amount);

        emit log("Initial state");
        emit log("");
        showPool(pool);
        emit log("");
        emit log_named_uint("amountIn", amount);
        emit log_named_uint("balance", pool.asset(oneAsset[0]).balance);
        (amountOut, feeAmount) = pool.swap(
            oneAsset[0],
            anotherAsset[0],
            amount,
            oneMin[0]
        );
        emit log("State after swap");
        emit log("");
        emit log_named_uint("amountIn", amount);
        emit log_named_uint("amountOut", amountOut);
        emit log_named_uint("feeAmount", feeAmount);
        emit log("");
        showPool(pool);
        emit log("");
    }

    function testBetaStake() public {
        uint256 amount = oneAmount[0] / oneConversion[0];

        emit log("Initial state");
        emit log("");
        showPool(pool);
        emit log("");
        emit log_named_uint("amountIn", amount);
        emit log_named_uint("balance", pool.asset(oneAsset[0]).balance);
        (amountOut, feeAmount) = pool.stake(oneAsset[0], amount, oneMin[0]);
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
        uint256[] memory amount = new uint256[](1);
        amount[0] = oneAmount[0] / oneConversion[0];

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
            amount,
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
        twoAmounts[1] = oneAmount[0] / oneConversion[0];
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
        emit log_named_uint("balance", pool.info().balance);
        emit log("");
        pool.addLiquidity(oneAmount[0], allMaxs);
        emit log("=================");
        emit log("State after addLiquidity");
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

    function testDiscount() public {
        pool.addUser(bob, 0);
        pool.setDiscount(bob, ONE);

        vm.startPrank(bob);
        uint256 amount = oneAmount[0] / oneConversion[0];
        tokens["USDC"].mint(amount);
        tokens["USDC"].approve(address(pool), amount);

        pool.swap(oneAsset[0], anotherAsset[0], amount, oneMin[0]);

        vm.stopPrank();

        vm.startPrank(alice);

        vm.expectRevert(
            abi.encodeWithSelector(IUsers.InvalidDiscount.selector, 2 * ONE)
        );
        pool.setDiscount(alice, 2 * ONE);
    }
}

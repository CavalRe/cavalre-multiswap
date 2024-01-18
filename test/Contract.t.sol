// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "forge-std/Test.sol";

import {Token} from "./Token.t.sol";
import {Pool, FP, UFloat, PoolState, AssetState, IPool} from "../contracts/Pool.sol";
import {PoolUtils} from "./PoolUtils.t.sol";

contract ContractTest is Context, PoolUtils {
    using FP for uint256;
    using FP for UFloat;

    uint256 private constant NTOKENS = 10;

    address private alice = address(1);

    Token[] private tokens;

    Pool private pool;
    Token private token;

    uint256 private protocolFee = 5e17;
    address private feeRecipient = vm.envAddress("FEE_RECIPIENT");
    uint256 private tokensPerShare = 1e18;
    uint256 private tau = 1e16;

    address private sender = address(this);

    address[] private addresses;
    uint256[] private fees;
    uint256[] private scales;
    uint256[] private amounts;

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

    uint256[] private allMins = new uint256[](NTOKENS);
    uint256[] private allMaxs = new uint256[](NTOKENS);

    uint256 private amountOut;
    uint256[] private receiveAmounts;
    uint256 private feeAmount;

    function setUp() public {
        vm.startPrank(alice);
        vm.roll(1);

        tokens = new Token[](NTOKENS);

        addresses = new address[](NTOKENS);
        amounts = new uint256[](NTOKENS);
        fees = new uint256[](NTOKENS);
        scales = new uint256[](NTOKENS);

        uint256 amount;
        uint256 balance;
        uint256 scale = 1e27;
        uint256 fee = 1e15;

        string memory name;
        string memory symbol;

        for (uint256 i; i < NTOKENS; i++) {
            amount = (i + 1) * 1e27;
            balance = 100 * amount;
            scale = balance;
            name = string(abi.encodePacked("Token ", Strings.toString(i + 1)));
            symbol = string(abi.encodePacked("T", Strings.toString(i + 1)));
            token = new Token(name, symbol, 18);
            token.mint(balance);

            tokens[i] = token;

            addresses[i] = address(token);
            amounts[i] = amount;
            fees[i] = fee;
            scales[i] = scale;
        }

        pool = new Pool(
            "Pool",
            "P",
            protocolFee,
            feeRecipient,
            tokensPerShare,
            address(1234)
        );

        for (uint256 i; i < NTOKENS; i++) {
            amount = (i + 1) * 1e27;
            balance = 100 * amount;
            scale = balance;
            tokens[i].approve(address(pool), balance);
            pool.addAsset(address(tokens[i]), fee, balance, scale);
        }

        pool.initialize();

        // emit log_named_string("name", pool.name());
        // emit log_named_uint("balance", pool.info().balance);
        for (uint256 i; i < NTOKENS; i++) {
            token = tokens[i];
            balance = token.balanceOf(address(pool));
            token.mint(balance);
            token.approve(address(pool), balance);
            allMaxs[i] = type(uint256).max;
            // emit log_named_string("name", token.name());
            // emit log_named_uint("balance", balance);
            // emit log_named_uint(
            //     "allowance",
            //     token.allowance(alice, address(pool))
            // );
        }

        oneAsset[0] = addresses[0];
        anotherAsset[0] = addresses[1];
        onePool[0] = address(pool);
        oneAmount[0] = amounts[0];
        oneAllocation[0] = 1e18;
    }

    function showAsset(AssetState memory _asset) internal {
        emit log_named_string("name", _asset.name);
        // emit log_named_string("symbol", _asset.symbol);
        // emit log_named_uint("balanceOf", _asset.token.balanceOf(address(pool)));
        emit log_named_string("balance", toString(_asset.balance));
        emit log_named_string("scale", toString(_asset.scale));
        emit log_named_string("fee", toString(_asset.fee));
        emit log("-------");
    }

    function showPool(Pool _pool) internal {
        PoolState memory pool_;
        emit log("Pool Info");
        emit log("=========");
        pool_ = _pool._info();
        // emit log("Name:",poolName);
        // emit log("Symbol:",poolSymbol);
        // emit log_named_uint("Decimals", poolDecimals);
        // emit log_named_uint("totalSupply", pool.totalSupply());
        emit log_named_string("balance", toString(pool_.balance));
        emit log_named_string("scale", toString(pool_.scale));
        emit log("");
        emit log("Assets:");
        emit log("-------");
        for (uint256 i; i < NTOKENS; i++) {
            showAsset(pool._asset(addresses[i]));
        }
    }

    function testGasMultiswap() public {
        pool.multiswap(
            oneAsset,
            oneAmount,
            anotherAsset,
            oneAllocation,
            oneMin
        );
    }

    function testGasSwap() public {
        pool.swap(oneAsset[0], anotherAsset[0], oneAmount[0], oneMin[0]);
    }

    function testGasMultistake() public {
        pool.multiswap(oneAsset, oneAmount, onePool, oneAllocation, oneMin);
    }

    function testGasStake() public {
        pool.stake(oneAsset[0], oneAmount[0], oneMin[0]);
    }

    function testGasMultiunstake() public {
        pool.multiswap(oneAsset, oneAmount, onePool, oneAllocation, oneMin);
    }

    function testGasUnstake() public {
        pool.unstake(oneAsset[0], oneAmount[0], oneMin[0]);
    }

    function testGasRemoveLiquidity() public {
        pool.removeLiquidity(oneAmount[0], allMins);
    }

    function test2_Swapping() public {
        // emit log("Initial state");
        // emit log("");
        // showPool(pool);
        // emit log("");
        (receiveAmounts, feeAmount) = pool.multiswap(
            oneAsset,
            oneAmount,
            anotherAsset,
            oneAllocation,
            oneMin
        );
        // emit log("State after multiswap");
        // emit log("");
        // emit log_named_uint("amountIn", oneAmount[0]);
        // emit log_named_uint("amountOut", receiveAmounts[0]);
        // emit log_named_uint("feeAmount", feeAmount);
        // emit log("");
        // showPool(pool);
        // emit log("");

        setUp();
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

        vm.roll(block.number + 1);
        vm.expectRevert(
            abi.encodeWithSelector(
                IPool.InvalidSwap.selector,
                address(pool),
                anotherAsset[0]
            )
        );
        pool.swap(address(pool), anotherAsset[0], oneAmount[0], oneMin[0]);

        vm.roll(block.number + 1);
        vm.expectRevert(
            abi.encodeWithSelector(
                IPool.InvalidSwap.selector,
                oneAsset[0],
                address(pool)
            )
        );
        pool.swap(oneAsset[0], address(pool), oneAmount[0], oneMin[0]);
    }

    function test2_Staking() public {
        (receiveAmounts, feeAmount) = pool.multiswap(
            oneAsset,
            oneAmount,
            onePool,
            oneAllocation,
            oneMin
        );
        amountOut = receiveAmounts[0];
        emit log("Multiswap:");
        emit log("");
        emit log_named_uint("amountIn", oneAmount[0]);
        emit log_named_uint("amountOut", amountOut);
        emit log("");

        setUp();
        (amountOut, ) = pool.stake(oneAsset[0], amounts[0], oneMin[0]);

        emit log("Stake:");
        emit log("");
        emit log_named_uint("amountIn", amounts[0]);
        emit log_named_uint("amountOut", amountOut);

        vm.roll(block.number + 1);
        vm.expectRevert(
            abi.encodeWithSelector(IPool.InvalidStake.selector, address(pool))
        );
        pool.stake(address(pool), amounts[0], oneMin[0]);
    }

    function test2_Unstaking() public {
        emit log("Initial state");
        emit log("");
        showPool(pool);
        emit log("");
        (receiveAmounts, feeAmount) = pool.multiswap(
            onePool,
            oneAmount,
            anotherAsset,
            oneAllocation,
            oneMin
        );
        amountOut = receiveAmounts[0];
        emit log("State after multiswap");
        emit log("");
        emit log_named_string("Pay token:", pool.info().name);
        emit log_named_string(
            "Receive token:",
            pool.asset(anotherAsset[0]).name
        );
        emit log_named_uint("amountIn", oneAmount[0]);
        emit log_named_uint("amountOut", amountOut);
        emit log_named_uint("feeAmount", feeAmount);
        emit log("");
        showPool(pool);
        emit log("");

        setUp();
        (amountOut, feeAmount) = pool.unstake(
            anotherAsset[0],
            oneAmount[0],
            oneMin[0]
        );
        emit log("State after unstake");
        emit log("");
        emit log_named_uint("amountIn", oneAmount[0]);
        emit log_named_uint("amountOut", amountOut);
        emit log_named_uint("feeAmount", feeAmount);
        emit log("");
        showPool(pool);
        emit log("");

        vm.roll(block.number + 1);
        vm.expectRevert(
            abi.encodeWithSelector(IPool.InvalidUnstake.selector, address(pool))
        );
        pool.unstake(address(pool), amounts[0], oneMin[0]);
    }

    function test2_MixedStaking() public {
        twoTokens[0] = address(pool);
        twoTokens[1] = anotherAsset[0];
        twoAmounts[0] = 5e17;
        twoAmounts[1] = 5e17;
        emit log("Initial state");
        emit log("");
        showPool(pool);
        emit log("");
        (receiveAmounts, feeAmount) = pool.multiswap(
            oneAsset,
            oneAmount,
            twoTokens,
            twoAmounts,
            twoMins
        );
        emit log("State after mixed stake");
        emit log("");
        emit log_named_string("Pay token:", pool.info().name);
        emit log_named_string("Receive token 1:", pool.info().name);
        emit log_named_string(
            "Receive token 2:",
            pool.asset(anotherAsset[0]).name
        );
        emit log_named_uint("amountIn", oneAmount[0]);
        emit log_named_uint("amountOut 1", receiveAmounts[0]);
        emit log_named_uint("amountOut 2", receiveAmounts[1]);
        emit log_named_uint("feeAmount", feeAmount);
        emit log_named_uint("poolOut", receiveAmounts[0] + feeAmount);
        emit log("");
        showPool(pool);
        emit log("");
    }

    function test2_MixedUnstaking() public {
        twoTokens[0] = address(pool);
        twoTokens[1] = oneAsset[0];
        twoAmounts[0] = oneAmount[0];
        twoAmounts[1] = oneAmount[0];
        emit log("Initial state");
        emit log("");
        showPool(pool);
        emit log("");
        (receiveAmounts, feeAmount) = pool.multiswap(
            twoTokens,
            twoAmounts,
            anotherAsset,
            oneAllocation,
            oneMin
        );
        emit log("State after mixed unstake");
        emit log("");
        emit log_named_string("Pay token 1:", pool.info().name);
        emit log_named_string("Pay token 2:", pool.asset(oneAsset[0]).name);
        emit log_named_string(
            "Receive token:",
            pool.asset(anotherAsset[0]).name
        );
        emit log_named_uint("amountIn 1", twoAmounts[0]);
        emit log_named_uint("amountIn 2", twoAmounts[1]);
        emit log_named_uint("amountOut", receiveAmounts[0]);
        emit log_named_uint("feeAmount", feeAmount);
        emit log("");
        showPool(pool);
        emit log("");
    }

    function test2_addLiquidity() public {
        vm.startPrank(alice);

        UFloat[] memory preTradePrices = new UFloat[](addresses.length);
        UFloat[] memory postTradePrices = new UFloat[](addresses.length);
        for (uint256 i; i < addresses.length; i++) {
            preTradePrices[i] = price(pool, addresses[i], address(pool));
        }
        // emit log("=============");
        // emit log("Initial state");
        // emit log("=============");
        // emit log("");
        // showPool(pool);
        // emit log("");
        uint256[] memory payAmounts;
        (payAmounts,) = pool.addLiquidity(address(pool), 1e18, allMaxs);
        emit log("======================");
        for (uint256 i; i < addresses.length; i++) {
            postTradePrices[i] = price(pool, addresses[i], address(pool));
            emit log_named_uint("Pay Amount", payAmounts[i]);
            emit log_named_uint("Pre-Trade Price", preTradePrices[i].toUInt(tokens[i].decimals()));
            emit log_named_uint("Post-Trade Price", postTradePrices[i].toUInt(tokens[i].decimals()));
            emit log("");
        }
        emit log("======================");
        emit log("===========");
        emit log("Final state");
        emit log("===========");
        emit log("");
        showPool(pool);
        emit log("");
    }

    function test2_removeLiquidity() public {
        vm.startPrank(alice);
        uint256 amount_;
        // uint256[] memory preTradePrices = new uint256[](addresses.length);
        // uint256[] memory midTradePrices = new uint256[](addresses.length);
        // uint256[] memory postTradePrices = new uint256[](addresses.length);
        // for (uint256 i; i < addresses.length; i++) {
        //     preTradePrices[i] = price(addresses[i]);
        // }
        // emit log("");
        // emit log("=============");
        // emit log("Initial state");
        // emit log("=============");
        // emit log("");
        // showPool(pool);
        // emit log("");
        // amount_ = tokens[0].balanceOf(address(pool)) / 2;
        // pool.addLiquidity(address(pool), oneAmount[0], allMaxs);
        // for (uint256 i; i < addresses.length; i++) {
        //     midTradePrices[i] = price(addresses[i]);
        // }
        // emit log("======================");
        // emit log("After adding liquidity");
        // emit log("======================");
        // emit log("");
        // showPool(pool);
        // emit log("");
        vm.roll(block.number + 1);
        amount_ = pool.info().balance / 3;
        emit log("======================");
        emit log("Remove Liquidity");
        emit log("======================");
        (receiveAmounts, feeAmount) = pool.removeLiquidity(amount_, allMins);
        // emit log("======================");
        // for (uint256 i; i < addresses.length; i++) {
        //     postTradePrices[i] = price(addresses[i]);
        //     emit log_named_uint("Pre-Trade Price", preTradePrices[i]);
        //     emit log_named_uint("Mid-Trade Price", midTradePrices[i]);
        //     emit log_named_uint("Post-Trade Price", postTradePrices[i]);
        //     emit log("");
        // }
        // emit log("======================");
        // emit log("========================");
        // emit log("After rmeoving liquidity");
        // emit log("========================");
        // emit log("");
        // emit log_named_uint("feeAmount", feeAmount);
        // showPool(pool);
        // emit log("");
    }
}

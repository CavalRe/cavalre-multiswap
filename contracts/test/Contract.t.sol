// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "forge-std/Test.sol";

import "@cavalre/test/Token.t.sol";
import "@cavalre/Pool.sol";

contract ContractTest is Context, Test {
    uint256 private constant NTOKENS = 2;

    Token[] private tokens;

    Pool private pool;

    address private sender = address(this);

    address[] private addresses;
    uint256[] private fees;
    uint256[] private scales;
    uint256[] private amounts;

    address private pay1Asset;
    address private receive1Asset;
    address private poolAddress;

    uint256 private pay1Amount;
    uint256[] private assetIndices1 = new uint256[](1);
    uint256[] private assetIndices2 = new uint256[](1);
    address[] private pay1Assets = new address[](1);
    address[] private pay1Pools = new address[](1);
    uint256[] private pay1Amounts = new uint256[](1);
    address[] private receive1Assets = new address[](1);
    address[] private receive1Pools = new address[](1);
    uint256[] private allocations1 = new uint256[](1);

    uint256 amountOut;

    function setUp() public {
        address alice = address(1);

        vm.startPrank(alice);

        pool = new Pool("Pool", "P", int256(1e16));
        tokens = new Token[](NTOKENS);

        pool.addUser(alice, 0);

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

        for (uint256 i = 0; i < NTOKENS; i++) {
            amount = (i + 1) * 1e27;
            balance = 100 * amount;
            scale = balance;
            name = string(abi.encodePacked("Token ", Strings.toString(i + 1)));
            symbol = string(abi.encodePacked("T", Strings.toString(i + 1)));
            Token token = new Token(name, symbol);
            token.mint(balance);
            token.approve(address(pool), balance);
            tokens[i] = token;

            pool.addAsset(address(token), balance, fee, scale);

            addresses[i] = address(token);
            amounts[i] = amount;
            fees[i] = fee;
            scales[i] = scale;
        }

        pool.initialize();

        pay1Asset = addresses[0];
        receive1Asset = addresses[1];
        poolAddress = address(pool);
        pay1Amount = amounts[0];

        pay1Assets[0] = addresses[0];
        assetIndices1[0] = 1;
        assetIndices2[0] = 2;
        pay1Pools[0] = address(pool);
        pay1Amounts[0] = amounts[0];

        receive1Assets[0] = addresses[1];
        receive1Pools[0] = address(pool);
        allocations1[0] = 1e18;

        tokens[0].mint(pay1Amounts[0]);
        tokens[0].approve(address(pool), pay1Amounts[0]);
    }

    function showAsset(AssetState memory _asset) internal {
        emit log_named_string("name", _asset.name);
        // emit log_named_string("symbol", _asset.symbol);
        // emit log_named_uint("balanceOf", _asset.token.balanceOf(poolAddress));
        emit log_named_uint("balance", _asset.balance);
        // emit log_named_uint("scale", _asset.scale);
        console.log("-------");
    }

    function showPool(Pool _pool) internal {
        PoolState memory pool_;
        console.log("Pool Info");
        console.log("=========");
        pool_ = _pool.info();
        // console.log("Name:",poolName);
        // console.log("Symbol:",poolSymbol);
        // emit log_named_uint("Decimals", poolDecimals);
        // emit log_named_uint("totalSupply", pool.totalSupply());
        emit log_named_uint("balance", pool_.balance);
        // emit log_named_uint("scale", pool_.scale);
        console.log("");
        console.log("Assets:");
        console.log("-------");
        for (uint256 i; i < NTOKENS; i++) {
            showAsset(pool.asset(addresses[i]));
        }
    }

    // function test1_0_SFMM() public {
    //     assertEq(pool.totalSupply(), 1e23);
    //     for (uint256 i = 0; i < NTOKENS; i++) {
    //         Token token = tokens[i];
    //         uint256 supply = (i+1)*1e22;
    //         uint256 amount = supply / 10;
    //         assertEq(token.totalSupply(), supply);
    //         assertEq(pool.amount(address(token)), amount);
    //         assertEq(token.balanceOf(address(this)), supply - amount);
    //     }
    //     vm.expectRevert(abi.encodeWithSelector(Pool.AlreadyInitialized.selector));
    //     pool.initialize();
    //     pool.pool();
    // }

    function test1_1_Multiswap() public {
        pool.multiswap(pay1Assets, pay1Amounts, receive1Assets, allocations1);
    }

    function test1_2_Swap() public {
        pool.swap(pay1Asset, receive1Asset, pay1Amount);
    }

    function test1_3_Multistake() public {
        pool.multiswap(pay1Assets, pay1Amounts, receive1Pools, allocations1);
    }

    function test1_4_Stake() public {
        pool.stake(pay1Asset, amounts[0]);
    }

    function test1_5_Multiunstake() public {
        pool.multiswap(pay1Pools, pay1Amounts, pay1Assets, allocations1);
    }

    function test1_6_Unstake() public {
        pool.unstake(pay1Asset, pay1Amount);
    }

    function test2_1_Swapping() public {
        emit log("Initial state");
        emit log("");
        showPool(pool);
        emit log("");
        amountOut = pool.multiswap(
            pay1Assets,
            pay1Amounts,
            receive1Assets,
            allocations1
        )[0];
        emit log("State after multiswap");
        emit log("");
        emit log_named_uint("amountIn", pay1Amounts[0]);
        emit log_named_uint("amountOut", amountOut);
        emit log("");
        showPool(pool);
        emit log("");

        // vm.expectRevert("ERC20: insufficient allowance");
        // pool.multiswap(pay1Assets, pay1Amounts, receive1Assets, allocations1);

        setUp();
        amountOut = pool.swap(pay1Asset, receive1Asset, pay1Amount);
        emit log("State after swap");
        emit log("");
        emit log_named_uint("amountIn", pay1Amounts[0]);
        emit log_named_uint("amountOut", amountOut);
        emit log("");
        showPool(pool);
        emit log("");

        // vm.expectRevert("ERC20: insufficient allowance");
        // pool.swap(pay1Asset, receive1Asset, pay1Amount);

        vm.expectRevert(
            abi.encodeWithSelector(
                Pool.InvalidSwap.selector,
                poolAddress,
                receive1Asset
            )
        );
        pool.swap(poolAddress, receive1Asset, pay1Amount);

        vm.expectRevert(
            abi.encodeWithSelector(
                Pool.InvalidSwap.selector,
                pay1Asset,
                poolAddress
            )
        );
        pool.swap(pay1Asset, poolAddress, pay1Amount);
    }

    function test2_2_Staking() public {
        amountOut = pool.multiswap(
            pay1Assets,
            pay1Amounts,
            receive1Pools,
            allocations1
        )[0];
        emit log("Multiswap:");
        emit log("");
        emit log_named_uint("amountIn", pay1Amounts[0]);
        emit log_named_uint("amountOut", amountOut);
        emit log("");

        setUp();
        amountOut = pool.stake(pay1Asset, amounts[0]);

        emit log("Stake:");
        emit log("");
        emit log_named_uint("amountIn", amounts[0]);
        emit log_named_uint("amountOut", amountOut);

        vm.expectRevert(
            abi.encodeWithSelector(Pool.InvalidStake.selector, poolAddress)
        );
        pool.stake(poolAddress, amounts[0]);
    }

    function test2_3_Unstaking() public {
        emit log("Initial state");
        emit log("");
        showPool(pool);
        emit log("");
        amountOut = pool.multiswap(
            pay1Pools,
            pay1Amounts,
            receive1Assets,
            allocations1
        )[0];
        emit log("State after multiswap");
        emit log("");
        emit log_named_string("Pay token:", pool.info().name);
        emit log_named_string("Receive token:", pool.asset(receive1Assets[0]).name);
        emit log_named_uint("amountIn", pay1Amounts[0]);
        emit log_named_uint("amountOut", amountOut);
        emit log("");
        showPool(pool);
        emit log("");

        setUp();
        amountOut = pool.unstake(receive1Asset, pay1Amount);
        emit log("State after unstake");
        emit log("");
        emit log_named_uint("amountIn", pay1Amount);
        emit log_named_uint("amountOut", amountOut);
        emit log("");
        showPool(pool);
        emit log("");

        vm.expectRevert(
            abi.encodeWithSelector(Pool.InvalidUnstake.selector, poolAddress)
        );
        pool.unstake(poolAddress, amounts[0]);
    }
}

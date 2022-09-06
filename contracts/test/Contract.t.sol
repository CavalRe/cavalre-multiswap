// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@cavalre/test/Token.t.sol";
import "@cavalre//Pool.sol";
import "@cavalre/libraries/ds-test/src/test.sol";

interface VM {
    // Expects an error on next call
    function expectRevert() external;
    function expectRevert(bytes calldata) external;
    function expectRevert(bytes4) external;
}

contract ContractTest is Context, DSTest {

    uint256 private constant NTOKENS = 10;
    VM private vm = VM(HEVM_ADDRESS);

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

    address[] private pay2Assets = new address[](2);
    uint256[] private pay2Amounts = new uint256[](2);
    address[] private receive2Assets = new address[](2);
    address[] private receive1Asset1Pool = new address[](2);
    uint256[] private allocations2 = new uint256[](2);

    function setUp() public {
        pool = new Pool("Pool", "P");
        tokens = new Token[](NTOKENS);

        addresses = new address[](NTOKENS);
        amounts = new uint256[](NTOKENS);
        fees = new uint256[](NTOKENS);
        scales = new uint256[](NTOKENS);

        uint256 scale = 1e27;
        uint256 fee = 1e15;

        for (uint256 i = 0; i < NTOKENS; i++) {
            uint256 amount = (i+1)*1e27;
            uint256 balance = 100*amount;
            string memory name = string(abi.encodePacked("Token ", Strings.toString(i + 1)));
            string memory symbol = string(abi.encodePacked("T", Strings.toString(i + 1)));
            Token token = new Token(name,symbol);
            token.mint(balance);
            token.approve(address(pool), balance);
            tokens[i] = token;
 
            pool.addAsset(
                address(token),
                balance,
                fee,
                scale
            );

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

        pay2Assets[0] = addresses[0];
        pay2Assets[1] = addresses[2];
        pay2Amounts[0] = amounts[0];
        pay2Amounts[1] = amounts[2];

        receive2Assets[0] = addresses[1];
        receive2Assets[1] = addresses[3];

        receive1Asset1Pool[0] = addresses[0];
        receive1Asset1Pool[1] = address(pool);

        tokens[0].mint(pay1Amounts[0]);
        tokens[0].approve(address(pool),pay1Amounts[0]);
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
        pool.swap(pay1Asset, receive1Asset, pay1Amount, sender);
    }

    function test1_3_Multistake() public {
        pool.multiswap(pay1Assets, pay1Amounts, receive1Pools, allocations1);
    }

    function test1_4_Stake() public {
        pool.stake(pay1Asset, amounts[0], sender);
    }

    function test1_5_Multiunstake() public {
        pool.multiswap(pay1Pools, pay1Amounts, pay1Assets, allocations1);
    }

    function test1_6_Unstake() public {
        pool.approve(address(pool),pay1Amount);
        pool.unstake(pay1Asset, pay1Amount, sender);
    }

    function test2_1_Swapping() public {
        // 2-Asset Swaps
        tokens[0].mint(pay1Amounts[0]);
        tokens[0].approve(address(pool),pay1Amounts[0]);
        emit log_named_uint("Sender pay balance (before)", tokens[0].balanceOf(sender));
        emit log_named_uint("Sender receive balance (before)", tokens[1].balanceOf(sender));
        emit log_named_uint("Pool pay balance I (before)", pool.asset(addresses[0]).balance);
        emit log_named_uint("Pool pay balance II (before)", tokens[0].balanceOf(address(pool)));
        emit log_named_uint("Pool receive balance I (before)", pool.asset(addresses[1]).balance);
        emit log_named_uint("Pool receive balance II (before)", tokens[1].balanceOf(address(pool)));
        emit log_named_uint("Pay token scale (before)", pool.asset(addresses[0]).scale);
        emit log_named_uint("Receive token scale (before)", pool.asset(addresses[1]).scale);
        emit log_named_uint("Amount in", pay1Amounts[0]);
        uint256 amountOut = pool.multiswap(pay1Assets, pay1Amounts, receive1Assets, allocations1)[0];
        emit log_named_uint("Amount out", amountOut);
        emit log_named_uint("Sender pay balance (after)", tokens[0].balanceOf(sender));
        emit log_named_uint("Sender receive balance (after)", tokens[1].balanceOf(sender));
        emit log_named_uint("Pool pay balance I (after)", pool.asset(addresses[0]).balance);
        emit log_named_uint("Pool pay balance II (after)", tokens[0].balanceOf(address(pool)));
        emit log_named_uint("Pool receive balance I (after)", pool.asset(addresses[1]).balance);
        emit log_named_uint("Pool receive balance II (after)", tokens[1].balanceOf(address(pool)));
        emit log_named_uint("Pay token scale (after)", pool.asset(addresses[0]).scale);
        emit log_named_uint("Receive token scale (after)", pool.asset(addresses[1]).scale);
        console.log("Revert 1");
        vm.expectRevert("ERC20: insufficient allowance");
        pool.multiswap(pay1Assets, pay1Amounts, receive1Assets, allocations1);
        console.log("********************************************************");
        setUp();
        tokens[0].mint(pay1Amount);
        tokens[0].approve(address(pool),pay1Amount);
        emit log_named_uint("Allowance",tokens[0].allowance(sender,address(pool)));
        emit log_named_uint("Sender pay balance (before)", tokens[0].balanceOf(sender));
        emit log_named_uint("Sender receive balance (before)", tokens[1].balanceOf(sender));
        emit log_named_uint("Pool pay balance I (before)", pool.asset(addresses[0]).balance);
        emit log_named_uint("Pool pay balance II (before)", tokens[0].balanceOf(address(pool)));
        emit log_named_uint("Pool receive balance I (before)", pool.asset(addresses[1]).balance);
        emit log_named_uint("Pool receive balance II (before)", tokens[1].balanceOf(address(pool)));
        emit log_named_uint("Pay token scale (before)", pool.asset(addresses[0]).scale);
        emit log_named_uint("Receive token scale (before)", pool.asset(addresses[1]).scale);
        emit log_named_uint("Amount in", pay1Amounts[0]);
        amountOut = pool.swap(pay1Asset, receive1Asset, pay1Amount, sender);
        emit log_named_uint("Amount out", amountOut);
        emit log_named_uint("Sender pay balance (after)", tokens[0].balanceOf(sender));
        emit log_named_uint("Sender receive balance (after)", tokens[1].balanceOf(sender));
        emit log_named_uint("Pool pay balance I (after)", pool.asset(addresses[0]).balance);
        emit log_named_uint("Pool pay balance II (after)", tokens[0].balanceOf(address(pool)));
        emit log_named_uint("Pool receive balance I (after)", pool.asset(addresses[1]).balance);
        emit log_named_uint("Pool receive balance II (after)", tokens[1].balanceOf(address(pool)));
        emit log_named_uint("Pay token scale (after)", pool.asset(addresses[0]).scale);
        emit log_named_uint("Receive token scale (after)", pool.asset(addresses[1]).scale);
        console.log("Revert 2");
        vm.expectRevert("ERC20: insufficient allowance");
        pool.swap(pay1Asset, receive1Asset, pay1Amount, sender);
        console.log("Revert 3");
        vm.expectRevert(abi.encodeWithSelector(Pool.InvalidSwap.selector,poolAddress,receive1Asset));
        pool.swap(poolAddress, receive1Asset, pay1Amount, sender);
        console.log("Revert 4");
        vm.expectRevert(abi.encodeWithSelector(Pool.InvalidSwap.selector,pay1Asset, poolAddress));
        pool.swap(pay1Asset, poolAddress, pay1Amount, sender);
    }

    function test2_2_Staking() public {
        // Staking
        tokens[0].mint(pay1Amounts[0]);
        tokens[0].approve(address(pool),pay1Amounts[0]);
        emit log_named_uint("Sender pay balance (before)", tokens[0].balanceOf(sender));
        emit log_named_uint("Sender receive balance (before)", pool.balanceOf(sender));
        emit log_named_uint("Pool pay balance I (before)", pool.asset(addresses[0]).balance);
        emit log_named_uint("Pool pay balance II (before)", tokens[0].balanceOf(address(pool)));
        emit log_named_uint("Pool receive balance I (before)", pool.balance());
        emit log_named_uint("Pool receive balance II (before)", pool.totalSupply());
        emit log_named_uint("Pay token scale (before)", pool.asset(addresses[0]).scale);
        emit log_named_uint("Amount in", pay1Amounts[0]);
        uint256 amountOut = pool.multiswap(pay1Assets, pay1Amounts, receive1Pools, allocations1)[0];
        emit log_named_uint("Amount out", amountOut);
        emit log_named_uint("Sender pay balance (after)", tokens[0].balanceOf(sender));
        emit log_named_uint("Sender receive balance (after)", pool.balanceOf(sender));
        emit log_named_uint("Pool pay balance I (after)", pool.asset(addresses[0]).balance);
        emit log_named_uint("Pool pay balance II (after)", tokens[0].balanceOf(address(pool)));
        emit log_named_uint("Pool receive balance I (after)", pool.balance());
        emit log_named_uint("Pool receive balance II (after)", pool.totalSupply());
        emit log_named_uint("Pay token scale (after)", pool.asset(addresses[0]).scale);
        console.log("********************************************************");
        setUp();
        tokens[0].mint(amounts[0]);
        tokens[0].approve(address(pool),amounts[0]);
        emit log_named_uint("Sender pay balance (before)", tokens[0].balanceOf(sender));
        emit log_named_uint("Sender receive balance (before)", pool.balanceOf(sender));
        emit log_named_uint("Pool pay balance I (before)", pool.asset(addresses[0]).balance);
        emit log_named_uint("Pool pay balance II (before)", tokens[0].balanceOf(address(pool)));
        emit log_named_uint("Pool receive balance I (before)", pool.balance());
        emit log_named_uint("Pool receive balance II (before)", pool.totalSupply());
        emit log_named_uint("Pay token scale (before)", pool.asset(addresses[0]).scale);
        emit log_named_uint("Amount in", pay1Amounts[0]);
        amountOut = pool.stake(pay1Asset, amounts[0], sender);
        emit log_named_uint("Amount out", amountOut);
        emit log_named_uint("Sender pay balance (after)", tokens[0].balanceOf(sender));
        emit log_named_uint("Sender receive balance (after)", pool.balanceOf(sender));
        emit log_named_uint("Pool pay balance I (after)", pool.asset(addresses[0]).balance);
        emit log_named_uint("Pool pay balance II (after)", tokens[0].balanceOf(address(pool)));
        emit log_named_uint("Pool receive balance I (after)", pool.balance());
        emit log_named_uint("Pool receive balance II (after)", pool.totalSupply());
        emit log_named_uint("Pay token scale (after)", pool.asset(addresses[0]).scale);
    }

    function test2_3_Unstaking() public {
        pool.approve(address(pool),pay1Amounts[0]);
        emit log_named_uint("Sender pay balance (before)", pool.balanceOf(sender));
        emit log_named_uint("Sender receive balance (before)", tokens[1].balanceOf(sender));
        emit log_named_uint("Pool pay balance I (before)", pool.balance());
        emit log_named_uint("Pool pay balance II (before)", pool.totalSupply());
        emit log_named_uint("Pool receive balance I (before)", pool.asset(addresses[1]).balance);
        emit log_named_uint("Pool receive balance II (before)", tokens[1].balanceOf(address(pool)));
        emit log_named_uint("Receive token scale (before)", pool.asset(addresses[1]).scale);
        emit log_named_uint("Amount in", pay1Amounts[0]);
        uint256 amountOut = pool.multiswap(pay1Pools, pay1Amounts, receive1Assets, allocations1)[0];
        emit log_named_uint("Amount out", amountOut);
        emit log_named_uint("Sender pay balance (after)", pool.balanceOf(sender));
        emit log_named_uint("Sender receive balance (after)", tokens[1].balanceOf(sender));
        emit log_named_uint("Pool pay balance I (after)", pool.balance());
        emit log_named_uint("Pool pay balance II (after)", pool.totalSupply());
        emit log_named_uint("Pool receive balance I (after)", pool.asset(addresses[1]).balance);
        emit log_named_uint("Pool receive balance II (after)", tokens[1].balanceOf(address(pool)));
        emit log_named_uint("Receive token scale (after)", pool.asset(addresses[1]).scale);
        console.log("********************************************************");
        setUp();
        pool.approve(address(pool),pay1Amount);
        emit log_named_uint("Sender pay balance (before)", pool.balanceOf(sender));
        emit log_named_uint("Sender receive balance (before)", tokens[1].balanceOf(sender));
        emit log_named_uint("Pool pay balance I (before)", pool.balance());
        emit log_named_uint("Pool pay balance II (before)", pool.totalSupply());
        emit log_named_uint("Pool receive balance I (before)", pool.asset(addresses[1]).balance);
        emit log_named_uint("Pool receive balance II (before)", tokens[1].balanceOf(address(pool)));
        emit log_named_uint("Receive token scale (before)", pool.asset(addresses[1]).scale);
        emit log_named_uint("Amount in", pay1Amounts[0]);
        amountOut = pool.unstake(receive1Asset, pay1Amount, sender);
        emit log_named_uint("Amount out", amountOut);
        emit log_named_uint("Sender pay balance (after)", pool.balanceOf(sender));
        emit log_named_uint("Sender receive balance (after)", tokens[1].balanceOf(sender));
        emit log_named_uint("Pool pay balance I (after)", pool.balance());
        emit log_named_uint("Pool pay balance II (after)", pool.totalSupply());
        emit log_named_uint("Pool receive balance I (after)", pool.asset(addresses[1]).balance);
        emit log_named_uint("Pool receive balance II (after)", tokens[1].balanceOf(address(pool)));
        emit log_named_uint("Receive token scale (after)", pool.asset(addresses[1]).scale);
    }
}

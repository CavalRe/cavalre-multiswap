// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "../Token.sol";
import "../SFMM.sol";
import "../libraries/ds-test/src/test.sol";

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

    SFMM private sfmm;

    address private sender;

    string[] private names;
    string[] private symbols;

    address[] private addresses;
    uint256[] private reserves;
    uint256[] private fees;
    uint256[] private weights;
    uint256[] private ks;
    uint256[] private amounts;

    address private pay1Asset;
    address private receive1Asset;
    address private poolAddress;

    uint256 private pay1Amount;

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
        names = new string[](NTOKENS);
        symbols = new string[](NTOKENS);
        for (uint256 i = 0; i < NTOKENS; i++) {
            names[i] = string(abi.encodePacked("Token ", Strings.toString(i + 1)));
            symbols[i] = string(abi.encodePacked("T", Strings.toString(i + 1)));
        }

        TokenFactory factory = new TokenFactory();
        tokens = factory.create(names, symbols);

        sfmm = new SFMM("Pool", "P");

        addresses = new address[](NTOKENS);
        amounts = new uint256[](NTOKENS);
        reserves = new uint256[](NTOKENS);
        fees = new uint256[](NTOKENS);
        weights = new uint256[](NTOKENS);
        ks = new uint256[](NTOKENS);

        for (uint256 i = 0; i < NTOKENS; i++) {
            uint256 supply = (i+1)*1e22;
            uint256 balance = supply / 10;
            Token token = tokens[i];
            token.mint(supply);
            token.approve(address(sfmm), balance);
            tokens[i] = token;

            //Generate asset info
            addresses[i] = address(token);
            reserves[i] = balance;
            fees[i] = 3e15;
            weights[i] = 1e18 / NTOKENS;
            ks[i] = 1e18;
        }

        sfmm.initialize(1e23, addresses, reserves, fees, weights, ks);

        sender = address(this);

        for (uint256 i = 0; i < NTOKENS; i++) {
            amounts[i] = sfmm.balance(addresses[i]) / 10;
            tokens[i].increaseAllowance(address(sfmm), amounts[i]);
        }

        sfmm.increaseAllowance(address(sfmm), amounts[0]);
        
        pay1Asset = addresses[0];
        receive1Asset = addresses[1];
        poolAddress = address(sfmm);
        pay1Amount = amounts[0];
        
        pay1Assets[0] = addresses[0];
        pay1Pools[0] = address(sfmm);
        pay1Amounts[0] = amounts[0];

        receive1Assets[0] = addresses[1];
        receive1Pools[0] = address(sfmm);
        allocations1[0] = 1e18;

        pay2Assets[0] = addresses[0];
        pay2Assets[1] = addresses[2];
        pay2Amounts[0] = amounts[0];
        pay2Amounts[1] = amounts[2];

        receive2Assets[0] = addresses[1];
        receive2Assets[1] = addresses[3];

        receive1Asset1Pool[0] = addresses[0];
        receive1Asset1Pool[1] = address(sfmm);
    }

    function test1_0_Pool() public {
        assertEq(sfmm.totalSupply(), 1e23);
        for (uint256 i = 0; i < NTOKENS; i++) {
            Token token = tokens[i];
            uint256 supply = (i+1)*1e22;
            uint256 balance = supply / 10;
            assertEq(token.totalSupply(), supply);
            assertEq(sfmm.balance(address(token)), balance);
            assertEq(token.balanceOf(address(this)), supply - balance);
        }
        vm.expectRevert(abi.encodeWithSelector(SFMM.AlreadyInitialized.selector));
        sfmm.initialize(1e23, addresses, reserves, fees, weights, ks);
    }

    function test1_1_Multiswap() public {
        sfmm.multiswap(pay1Assets, pay1Amounts, receive1Assets, allocations1);
    }

    function test1_2_Swap() public {
        sfmm.swap(pay1Asset, receive1Asset, pay1Amount, sender);
    }

    function test1_3_Multistake() public {
        sfmm.multiswap(pay1Assets, pay1Amounts, receive1Pools, allocations1);
    }

    function test1_4_Stake() public {
        sfmm.stake(pay1Asset, amounts[0], sender);
    }

    function test1_5_Multiunstake() public {
        sfmm.multiswap(pay1Pools, pay1Amounts, pay1Assets, allocations1);
    }

    function test1_6_Unstake() public {
        sfmm.unstake(pay1Asset, pay1Amount, sender);
    }

    function test2_1_Swapping() public {
        // 2-Asset Swaps
        emit log_named_uint("Sender pay balance (before)", tokens[0].balanceOf(sender));
        emit log_named_uint("Sender receive balance (before)", tokens[1].balanceOf(sender));
        emit log_named_uint("SFMM pay balance I (before)", sfmm.balance(addresses[0]));
        emit log_named_uint("SFMM pay balance II (before)", tokens[0].balanceOf(address(sfmm)));
        emit log_named_uint("SFMM receive balance I (before)", sfmm.balance(addresses[1]));
        emit log_named_uint("SFMM receive balance II (before)", tokens[1].balanceOf(address(sfmm)));
        emit log_named_uint("Pay token scale (before)", sfmm.scale(addresses[0]));
        emit log_named_uint("Pay token weight (before)", sfmm.weight(addresses[0]));
        emit log_named_uint("Receive token scale (before)", sfmm.scale(addresses[1]));
        emit log_named_uint("Receive token weight (before)", sfmm.weight(addresses[1]));
        emit log_named_uint("Amount in", pay1Amounts[0]);
        uint256 amountOut = sfmm.multiswap(pay1Assets, pay1Amounts, receive1Assets, allocations1)[0];
        emit log_named_uint("Amount out", amountOut);
        emit log_named_uint("Sender pay balance (after)", tokens[0].balanceOf(sender));
        emit log_named_uint("Sender receive balance (after)", tokens[1].balanceOf(sender));
        emit log_named_uint("SFMM pay balance I (after)", sfmm.balance(addresses[0]));
        emit log_named_uint("SFMM pay balance II (after)", tokens[0].balanceOf(address(sfmm)));
        emit log_named_uint("SFMM receive balance I (after)", sfmm.balance(addresses[1]));
        emit log_named_uint("SFMM receive balance II (after)", tokens[1].balanceOf(address(sfmm)));
        emit log_named_uint("Pay token scale (after)", sfmm.scale(addresses[0]));
        emit log_named_uint("Pay token weight (after)", sfmm.weight(addresses[0]));
        emit log_named_uint("Receive token scale (after)", sfmm.scale(addresses[1]));
        emit log_named_uint("Receive token weight (after)", sfmm.weight(addresses[1]));
        vm.expectRevert(abi.encodeWithSelector(SFMM.InsufficientAllowance.selector,0,pay1Amount));
        sfmm.multiswap(pay1Assets, pay1Amounts, receive1Assets, allocations1);
        console.log("********************************************************");
        setUp();
        emit log_named_uint("Sender pay balance (before)", tokens[0].balanceOf(sender));
        emit log_named_uint("Sender receive balance (before)", tokens[1].balanceOf(sender));
        emit log_named_uint("SFMM pay balance I (before)", sfmm.balance(addresses[0]));
        emit log_named_uint("SFMM pay balance II (before)", tokens[0].balanceOf(address(sfmm)));
        emit log_named_uint("SFMM receive balance I (before)", sfmm.balance(addresses[1]));
        emit log_named_uint("SFMM receive balance II (before)", tokens[1].balanceOf(address(sfmm)));
        emit log_named_uint("Pay token scale (before)", sfmm.scale(addresses[0]));
        emit log_named_uint("Pay token weight (before)", sfmm.weight(addresses[0]));
        emit log_named_uint("Receive token scale (before)", sfmm.scale(addresses[1]));
        emit log_named_uint("Receive token weight (before)", sfmm.weight(addresses[1]));
        emit log_named_uint("Amount in", pay1Amounts[0]);
        amountOut = sfmm.swap(pay1Asset, receive1Asset, pay1Amount, sender);
        emit log_named_uint("Amount out", amountOut);
        emit log_named_uint("Sender pay balance (after)", tokens[0].balanceOf(sender));
        emit log_named_uint("Sender receive balance (after)", tokens[1].balanceOf(sender));
        emit log_named_uint("SFMM pay balance I (after)", sfmm.balance(addresses[0]));
        emit log_named_uint("SFMM pay balance II (after)", tokens[0].balanceOf(address(sfmm)));
        emit log_named_uint("SFMM receive balance I (after)", sfmm.balance(addresses[1]));
        emit log_named_uint("SFMM receive balance II (after)", tokens[1].balanceOf(address(sfmm)));
        emit log_named_uint("Pay token scale (after)", sfmm.scale(addresses[0]));
        emit log_named_uint("Pay token weight (after)", sfmm.weight(addresses[0]));
        emit log_named_uint("Receive token scale (after)", sfmm.scale(addresses[1]));
        emit log_named_uint("Receive token weight (after)", sfmm.weight(addresses[1]));
        vm.expectRevert(abi.encodeWithSelector(SFMM.InsufficientAllowance.selector,0,pay1Amount));
        sfmm.swap(pay1Asset, receive1Asset, pay1Amount, sender);
        vm.expectRevert(abi.encodeWithSelector(SFMM.InvalidSwap.selector,poolAddress,receive1Asset));
        sfmm.swap(poolAddress, receive1Asset, pay1Amount, sender);
        vm.expectRevert(abi.encodeWithSelector(SFMM.InvalidSwap.selector,pay1Asset, poolAddress));
        sfmm.swap(pay1Asset, poolAddress, pay1Amount, sender);
    }

    function test2_2_Staking() public {
        // Staking
        emit log_named_uint("Sender pay balance (before)", tokens[0].balanceOf(sender));
        emit log_named_uint("Sender receive balance (before)", sfmm.balanceOf(sender));
        emit log_named_uint("SFMM pay balance I (before)", sfmm.balance(addresses[0]));
        emit log_named_uint("SFMM pay balance II (before)", tokens[0].balanceOf(address(sfmm)));
        emit log_named_uint("SFMM receive balance I (before)", sfmm.balance());
        emit log_named_uint("SFMM receive balance II (before)", sfmm.totalSupply());
        emit log_named_uint("Pay token scale (before)", sfmm.scale(addresses[0]));
        emit log_named_uint("Pay token weight (before)", sfmm.weight(addresses[0]));
        emit log_named_uint("Amount in", pay1Amounts[0]);
        uint256 amountOut = sfmm.multiswap(pay1Assets, pay1Amounts, receive1Pools, allocations1)[0];
        emit log_named_uint("Amount out", amountOut);
        emit log_named_uint("Sender pay balance (after)", tokens[0].balanceOf(sender));
        emit log_named_uint("Sender receive balance (after)", sfmm.balanceOf(sender));
        emit log_named_uint("SFMM pay balance I (after)", sfmm.balance(addresses[0]));
        emit log_named_uint("SFMM pay balance II (after)", tokens[0].balanceOf(address(sfmm)));
        emit log_named_uint("SFMM receive balance I (after)", sfmm.balance());
        emit log_named_uint("SFMM receive balance II (after)", sfmm.totalSupply());
        emit log_named_uint("Pay token scale (after)", sfmm.scale(addresses[0]));
        emit log_named_uint("Pay token weight (after)", sfmm.weight(addresses[0]));
        console.log("********************************************************");
        setUp();
        emit log_named_uint("Sender pay balance (before)", tokens[0].balanceOf(sender));
        emit log_named_uint("Sender receive balance (before)", sfmm.balanceOf(sender));
        emit log_named_uint("SFMM pay balance I (before)", sfmm.balance(addresses[0]));
        emit log_named_uint("SFMM pay balance II (before)", tokens[0].balanceOf(address(sfmm)));
        emit log_named_uint("SFMM receive balance I (before)", sfmm.balance());
        emit log_named_uint("SFMM receive balance II (before)", sfmm.totalSupply());
        emit log_named_uint("Pay token scale (before)", sfmm.scale(addresses[0]));
        emit log_named_uint("Pay token weight (before)", sfmm.weight(addresses[0]));
        emit log_named_uint("Amount in", pay1Amounts[0]);
        amountOut = sfmm.stake(pay1Asset, amounts[0], sender);
        emit log_named_uint("Amount out", amountOut);
        emit log_named_uint("Sender pay balance (after)", tokens[0].balanceOf(sender));
        emit log_named_uint("Sender receive balance (after)", sfmm.balanceOf(sender));
        emit log_named_uint("SFMM pay balance I (after)", sfmm.balance(addresses[0]));
        emit log_named_uint("SFMM pay balance II (after)", tokens[0].balanceOf(address(sfmm)));
        emit log_named_uint("SFMM receive balance I (after)", sfmm.balance());
        emit log_named_uint("SFMM receive balance II (after)", sfmm.totalSupply());
        emit log_named_uint("Pay token scale (after)", sfmm.scale(addresses[0]));
        emit log_named_uint("Pay token weight (after)", sfmm.weight(addresses[0]));
    }

    function test2_3_Unstaking() public {
        emit log_named_uint("Sender pay balance (before)", sfmm.balanceOf(sender));
        emit log_named_uint("Sender receive balance (before)", tokens[1].balanceOf(sender));
        emit log_named_uint("SFMM pay balance I (before)", sfmm.balance());
        emit log_named_uint("SFMM pay balance II (before)", sfmm.totalSupply());
        emit log_named_uint("SFMM receive balance I (before)", sfmm.balance(addresses[1]));
        emit log_named_uint("SFMM receive balance II (before)", tokens[1].balanceOf(address(sfmm)));
        emit log_named_uint("Receive token scale (before)", sfmm.scale(addresses[1]));
        emit log_named_uint("Receive token weight (before)", sfmm.weight(addresses[1]));
        emit log_named_uint("Amount in", pay1Amounts[0]);
        uint256 amountOut = sfmm.multiswap(pay1Pools, pay1Amounts, receive1Assets, allocations1)[0];
        emit log_named_uint("Amount out", amountOut);
        emit log_named_uint("Sender pay balance (after)", sfmm.balanceOf(sender));
        emit log_named_uint("Sender receive balance (after)", tokens[1].balanceOf(sender));
        emit log_named_uint("SFMM pay balance I (after)", sfmm.balance());
        emit log_named_uint("SFMM pay balance II (after)", sfmm.totalSupply());
        emit log_named_uint("SFMM receive balance I (after)", sfmm.balance(addresses[1]));
        emit log_named_uint("SFMM receive balance II (after)", tokens[1].balanceOf(address(sfmm)));
        emit log_named_uint("Receive token scale (after)", sfmm.scale(addresses[1]));
        emit log_named_uint("Receive token weight (after)", sfmm.weight(addresses[1]));
        console.log("********************************************************");
        setUp();
        emit log_named_uint("Sender pay balance (before)", sfmm.balanceOf(sender));
        emit log_named_uint("Sender receive balance (before)", tokens[1].balanceOf(sender));
        emit log_named_uint("SFMM pay balance I (before)", sfmm.balance());
        emit log_named_uint("SFMM pay balance II (before)", sfmm.totalSupply());
        emit log_named_uint("SFMM receive balance I (before)", sfmm.balance(addresses[1]));
        emit log_named_uint("SFMM receive balance II (before)", tokens[1].balanceOf(address(sfmm)));
        emit log_named_uint("Receive token scale (before)", sfmm.scale(addresses[1]));
        emit log_named_uint("Receive token weight (before)", sfmm.weight(addresses[1]));
        emit log_named_uint("Amount in", pay1Amounts[0]);
        amountOut = sfmm.unstake(receive1Asset, pay1Amount, sender);
        emit log_named_uint("Amount out", amountOut);
        emit log_named_uint("Sender pay balance (after)", sfmm.balanceOf(sender));
        emit log_named_uint("Sender receive balance (after)", tokens[1].balanceOf(sender));
        emit log_named_uint("SFMM pay balance I (after)", sfmm.balance());
        emit log_named_uint("SFMM pay balance II (after)", sfmm.totalSupply());
        emit log_named_uint("SFMM receive balance I (after)", sfmm.balance(addresses[1]));
        emit log_named_uint("SFMM receive balance II (after)", tokens[1].balanceOf(address(sfmm)));
        emit log_named_uint("Receive token scale (after)", sfmm.scale(addresses[1]));
        emit log_named_uint("Receive token weight (after)", sfmm.weight(addresses[1]));
    }


    // function testSwapVerbose() public {
    //     emit log("============");
    //     emit log("Before swap:");
    //     emit log("============");
    //     emit log_named_uint("Weight 1", sfmm.weight(addresses[0]));
    //     emit log_named_uint("Weight 2", sfmm.weight(addresses[1]));
    //     emit log_named_uint("Reserve 0", sfmm.totalSupply());
    //     emit log_named_uint("Balance 1", tokens[0].balanceOf(address(sfmm)));
    //     emit log_named_uint("Reserve 1", sfmm.balance(addresses[0]));
    //     emit log_named_uint("Balance 2", tokens[1].balanceOf(address(sfmm)));
    //     emit log_named_uint("Reserve 2", sfmm.balance(addresses[1]));
    //     emit log_named_uint("Swap In Amount", amountIn);

    //     amountOut = sfmm.swap(addresses[0], addresses[1], amountIn, sender);

    //     emit log("===========");
    //     emit log("After swap:");
    //     emit log("===========");
    //     emit log_named_uint("Swap Out Amount", amountOut);
    //     emit log_named_uint("Weight 1", sfmm.weight(addresses[0]));
    //     emit log_named_uint("Weight 2", sfmm.weight(addresses[1]));
    //     emit log_named_uint("Reserve 0", sfmm.totalSupply());
    //     emit log_named_uint("Balance 1", tokens[0].balanceOf(address(sfmm)));
    //     emit log_named_uint("Reserve 1", sfmm.balance(addresses[0]));
    //     emit log_named_uint("Balance 2", tokens[1].balanceOf(address(sfmm)));
    //     emit log_named_uint("Reserve 2", sfmm.balance(addresses[1]));
    // }

    // function testStakeVerbose() public {
    //     emit log("=============");
    //     emit log("Before stake:");
    //     emit log("=============");
    //     emit log_named_uint("Weight 1", sfmm.weight(addresses[0]));
    //     emit log_named_uint("Weight 2", sfmm.weight(addresses[1]));
    //     emit log_named_uint("Reserve 0", sfmm.totalSupply());
    //     emit log_named_uint("Balance 1", tokens[0].balanceOf(address(sfmm)));
    //     emit log_named_uint("Reserve 1", sfmm.balance(addresses[0]));
    //     emit log_named_uint("Balance 2", tokens[1].balanceOf(address(sfmm)));
    //     emit log_named_uint("Reserve 2", sfmm.balance(addresses[1]));
    //     emit log_named_uint("Swap In Amount", amountIn);

    //     amountOut = sfmm.stake(addresses[0], amountIn, sender);

    //     emit log("============");
    //     emit log("After stake:");
    //     emit log("============");
    //     emit log_named_uint("Swap Out Amount", amountOut);
    //     emit log_named_uint("Weight 1", sfmm.weight(addresses[0]));
    //     emit log_named_uint("Weight 2", sfmm.weight(addresses[1]));
    //     emit log_named_uint("Reserve 0", sfmm.totalSupply());
    //     emit log_named_uint("Balance 1", tokens[0].balanceOf(address(sfmm)));
    //     emit log_named_uint("Reserve 1", sfmm.balance(addresses[0]));
    //     emit log_named_uint("Balance 2", tokens[1].balanceOf(address(sfmm)));
    //     emit log_named_uint("Reserve 2", sfmm.balance(addresses[1]));
    // }

    // function testStakeBatch() public {
    //     for (uint256 i = 0; i < NTOKENS; i++) {
    //         tokens[i].increaseAllowance(address(sfmm), amountIn);
    //     }

    //     amountOut = sfmm.stakeBatch(addresses, amounts, sender);
    // }

    // function testCompareStakes() public {
    //     tokens[0].increaseAllowance(address(sfmm), 2 * amountIn);

    //     uint256 amountSingle = sfmm.stake(addresses[0], amountIn, sender);

    //     setUp();

    //     address[] memory addressInArray = new address[](1);
    //     uint256[] memory amountInArray = new uint256[](1);
    //     addressInArray[0] = addresses[0];
    //     amountInArray[0] = amountIn;

    //     uint256 amountBatch = sfmm.stakeBatch(
    //         addressInArray,
    //         amountInArray,
    //         sender
    //     );

    //     assertEq(
    //         amountSingle,
    //         amountBatch,
    //         "Single stake and batch stake do not agrees."
    //     );
    // }



    // function testFailUnstakeNoAllowance() public {
    //     amountOut = sfmm.unstake(addresses[0], amountIn, sender);
    // }

    // function testUnstakeVerbose() public {
    //     sfmm.increaseAllowance(address(sfmm), amountIn);

    //     emit log("===============");
    //     emit log("Before unstake:");
    //     emit log("===============");
    //     emit log_named_uint("Weight 1", sfmm.weight(addresses[0]));
    //     emit log_named_uint("Weight 2", sfmm.weight(addresses[1]));
    //     emit log_named_uint("Reserve 0", sfmm.totalSupply());
    //     emit log_named_uint("Balance 1", tokens[0].balanceOf(address(sfmm)));
    //     emit log_named_uint("Reserve 1", sfmm.balance(addresses[0]));
    //     emit log_named_uint("Balance 2", tokens[1].balanceOf(address(sfmm)));
    //     emit log_named_uint("Reserve 2", sfmm.balance(addresses[1]));
    //     emit log_named_uint("Swap In Amount", amountIn);

    //     amountOut = sfmm.unstake(addresses[0], amountIn, sender);

    //     emit log("==============");
    //     emit log("After unstake:");
    //     emit log("==============");
    //     emit log_named_uint("Swap Out Amount", amountOut);
    //     emit log_named_uint("Weight 1", sfmm.weight(addresses[0]));
    //     emit log_named_uint("Weight 2", sfmm.weight(addresses[1]));
    //     emit log_named_uint("Reserve 0", sfmm.totalSupply());
    //     emit log_named_uint("Balance 1", tokens[0].balanceOf(address(sfmm)));
    //     emit log_named_uint("Reserve 1", sfmm.balance(addresses[0]));
    //     emit log_named_uint("Balance 2", tokens[1].balanceOf(address(sfmm)));
    //     emit log_named_uint("Reserve 2", sfmm.balance(addresses[1]));
    // }

    // function testAddAsset() public {
    //     tokens[0].increaseAllowance(address(sfmm), amountIn);
    //     tokenNew.increaseAllowance(address(sfmm), amountNew);

    //     sfmm.addAsset(
    //         addresses[0],
    //         addressNew,
    //         amountIn,
    //         amountNew,
    //         3e15,
    //         1e18,
    //         sender
    //     );
    // }
}

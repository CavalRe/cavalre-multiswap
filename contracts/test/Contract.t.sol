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
    uint256[] private poolIndices = new uint256[](1);
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
        poolIndices[0] = 0;
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
        pool.multiswap(assetIndices1, pay1Amounts, assetIndices2, allocations1);
    }

    function test1_2_Swap() public {
        pool.swap(1, 2, pay1Amount);
    }

    function test1_3_Multistake() public {
        pool.multiswap(assetIndices1, pay1Amounts, poolIndices, allocations1);
    }

    function test1_4_Stake() public {
        pool.stake(1, pay1Amount);
    }

    function test1_5_Multiunstake() public {
        pool.multiswap(poolIndices, pay1Amounts, assetIndices1, allocations1);
    }

    function test1_6_Unstake() public {
        pool.unstake(1, pay1Amount);
    }

    function test2_1_Swapping() public {
        // 2-Asset Swaps
        emit log_named_uint("Pool token balance (before)", pool.balance());
        emit log_named_uint("Pool token supply (before)", pool.totalSupply());
        emit log_named_uint("Sender pay asset balanceOf (before)", tokens[0].balanceOf(sender));
        emit log_named_uint("Sender receive asset balanceOf (before)", tokens[1].balanceOf(sender));
        emit log_named_uint("Pool pay asset balance (before)", pool.asset(0).balance);
        emit log_named_uint("Pool pay asset balanceOf (before)", tokens[0].balanceOf(address(pool)));
        emit log_named_uint("Pool receive asset balance (before)", pool.asset(1).balance);
        emit log_named_uint("Pool receive asset balanceOf (before)", tokens[1].balanceOf(address(pool)));
        emit log_named_uint("Pay asset scale (before)", pool.asset(0).scale);
        emit log_named_uint("Receive asset scale (before)", pool.asset(1).scale);
        emit log_named_uint("Amount in", pay1Amounts[0]);
        uint256 amountOut = pool.multiswap(assetIndices1, pay1Amounts, assetIndices2, allocations1)[0];
        emit log_named_uint("Amount out", amountOut);
        emit log_named_uint("Pool token balance (after)", pool.balance());
        emit log_named_uint("Pool token supply (after)", pool.totalSupply());
        emit log_named_uint("Sender pay asset balanceOf (after)", tokens[0].balanceOf(sender));
        emit log_named_uint("Sender receive asset balanceOf (after)", tokens[1].balanceOf(sender));
        emit log_named_uint("Pool pay asset balance (after)", pool.asset(0).balance);
        emit log_named_uint("Pool pay asset balanceOf (after)", tokens[0].balanceOf(address(pool)));
        emit log_named_uint("Pool receive asset balance (after)", pool.asset(1).balance);
        emit log_named_uint("Pool receive asset balanceOf (after)", tokens[1].balanceOf(address(pool)));
        emit log_named_uint("Pay asset scale (after)", pool.asset(0).scale);
        emit log_named_uint("Receive asset scale (after)", pool.asset(1).scale);
        console.log("Revert 1");
        vm.expectRevert("ERC20: insufficient allowance");
        pool.multiswap(assetIndices1, pay1Amounts, assetIndices2, allocations1);
        console.log("********************************************************");
        setUp();
        emit log_named_uint("Pool token balance (before)", pool.balance());
        emit log_named_uint("Pool token supply (before)", pool.totalSupply());
        emit log_named_uint("Sender pay asset balanceOf (before)", tokens[0].balanceOf(sender));
        emit log_named_uint("Sender receive asset balanceOf (before)", tokens[1].balanceOf(sender));
        emit log_named_uint("Pool pay asset balance (before)", pool.asset(0).balance);
        emit log_named_uint("Pool pay asset balanceOf (before)", tokens[0].balanceOf(address(pool)));
        emit log_named_uint("Pool receive asset balance (before)", pool.asset(1).balance);
        emit log_named_uint("Pool receive asset balanceOf (before)", tokens[1].balanceOf(address(pool)));
        emit log_named_uint("Pay asset scale (before)", pool.asset(0).scale);
        emit log_named_uint("Receive asset scale (before)", pool.asset(1).scale);
        emit log_named_uint("Amount in", pay1Amounts[0]);
        amountOut = pool.swap(1, 2, pay1Amount);
        emit log_named_uint("Amount out", amountOut);
        emit log_named_uint("Pool token balance (after)", pool.balance());
        emit log_named_uint("Pool token supply (after)", pool.totalSupply());
        emit log_named_uint("Sender pay asset balanceOf (after)", tokens[0].balanceOf(sender));
        emit log_named_uint("Sender receive asset balanceOf (after)", tokens[1].balanceOf(sender));
        emit log_named_uint("Pool pay asset balance (after)", pool.asset(0).balance);
        emit log_named_uint("Pool pay asset balanceOf (after)", tokens[0].balanceOf(address(pool)));
        emit log_named_uint("Pool receive asset balance (after)", pool.asset(1).balance);
        emit log_named_uint("Pool receive asset balanceOf (after)", tokens[1].balanceOf(address(pool)));
        emit log_named_uint("Pay asset scale (after)", pool.asset(0).scale);
        emit log_named_uint("Receive asset scale (after)", pool.asset(1).scale);
        console.log("Revert 2");
        vm.expectRevert("ERC20: insufficient allowance");
        pool.swap(1, 2, pay1Amount);
        console.log("Revert 3");
        vm.expectRevert(abi.encodeWithSelector(Pool.InvalidSwap.selector,0,1));
        pool.swap(0, 1, pay1Amount);
        console.log("Revert 4");
        vm.expectRevert(abi.encodeWithSelector(Pool.InvalidSwap.selector,1, 0));
        pool.swap(1, 0, pay1Amount);
        console.log("Revert 5");
        vm.expectRevert(abi.encodeWithSelector(Pool.InvalidSwap.selector,1, 1));
        pool.swap(1, 1, pay1Amount);
    }

    function test2_2_Staking() public {
        // Staking
        emit log_named_uint("Pool token balance (before)", pool.balance());
        emit log_named_uint("Pool token supply (before)", pool.totalSupply());
        emit log_named_uint("Sender pay asset balanceOf (before)", tokens[0].balanceOf(sender));
        emit log_named_uint("Sender receive asset balanceOf (before)", tokens[1].balanceOf(sender));
        emit log_named_uint("Pool pay asset balance (before)", pool.asset(0).balance);
        emit log_named_uint("Pool pay asset balanceOf (before)", tokens[0].balanceOf(address(pool)));
        emit log_named_uint("Pool receive asset balance (before)", pool.asset(1).balance);
        emit log_named_uint("Pool receive asset balanceOf (before)", tokens[1].balanceOf(address(pool)));
        emit log_named_uint("Pay asset scale (before)", pool.asset(0).scale);
        emit log_named_uint("Receive asset scale (before)", pool.asset(1).scale);
        emit log_named_uint("Amount in", pay1Amounts[0]);
        uint256 amountOut = pool.multiswap(assetIndices1, pay1Amounts, poolIndices, allocations1)[0];
        emit log_named_uint("Amount out", amountOut);
        emit log_named_uint("Pool token balance (after)", pool.balance());
        emit log_named_uint("Pool token supply (after)", pool.totalSupply());
        emit log_named_uint("Sender pay asset balanceOf (after)", tokens[0].balanceOf(sender));
        emit log_named_uint("Sender receive asset balanceOf (after)", tokens[1].balanceOf(sender));
        emit log_named_uint("Pool pay asset balance (after)", pool.asset(0).balance);
        emit log_named_uint("Pool pay asset balanceOf (after)", tokens[0].balanceOf(address(pool)));
        emit log_named_uint("Pool receive asset balance (after)", pool.asset(1).balance);
        emit log_named_uint("Pool receive asset balanceOf (after)", tokens[1].balanceOf(address(pool)));
        emit log_named_uint("Pay asset scale (after)", pool.asset(0).scale);
        emit log_named_uint("Receive asset scale (after)", pool.asset(1).scale);
        console.log("********************************************************");
        setUp();
        emit log_named_uint("Pool token balance (before)", pool.balance());
        emit log_named_uint("Pool token supply (before)", pool.totalSupply());
        emit log_named_uint("Sender pay asset balanceOf (before)", tokens[0].balanceOf(sender));
        emit log_named_uint("Sender receive asset balanceOf (before)", tokens[1].balanceOf(sender));
        emit log_named_uint("Pool pay asset balance (before)", pool.asset(0).balance);
        emit log_named_uint("Pool pay asset balanceOf (before)", tokens[0].balanceOf(address(pool)));
        emit log_named_uint("Pool receive asset balance (before)", pool.asset(1).balance);
        emit log_named_uint("Pool receive asset balanceOf (before)", tokens[1].balanceOf(address(pool)));
        emit log_named_uint("Pay asset scale (before)", pool.asset(0).scale);
        emit log_named_uint("Receive asset scale (before)", pool.asset(1).scale);
        emit log_named_uint("Amount in", pay1Amounts[0]);
        amountOut = pool.stake(1, amounts[0]);
        emit log_named_uint("Amount out", amountOut);
        emit log_named_uint("Pool token balance (after)", pool.balance());
        emit log_named_uint("Pool token supply (after)", pool.totalSupply());
        emit log_named_uint("Sender pay asset balanceOf (after)", tokens[0].balanceOf(sender));
        emit log_named_uint("Sender receive asset balanceOf (after)", tokens[1].balanceOf(sender));
        emit log_named_uint("Pool pay asset balance (after)", pool.asset(0).balance);
        emit log_named_uint("Pool pay asset balanceOf (after)", tokens[0].balanceOf(address(pool)));
        emit log_named_uint("Pool receive asset balance (after)", pool.asset(1).balance);
        emit log_named_uint("Pool receive asset balanceOf (after)", tokens[1].balanceOf(address(pool)));
        emit log_named_uint("Pay asset scale (after)", pool.asset(0).scale);
        emit log_named_uint("Receive asset scale (after)", pool.asset(1).scale);
    }

    function test2_3_Unstaking() public {
        emit log_named_uint("Pool token balance (before)", pool.balance());
        emit log_named_uint("Pool token supply (before)", pool.totalSupply());
        emit log_named_uint("Sender pay asset balanceOf (before)", tokens[0].balanceOf(sender));
        emit log_named_uint("Sender receive asset balanceOf (before)", tokens[1].balanceOf(sender));
        emit log_named_uint("Pool pay asset balance (before)", pool.asset(0).balance);
        emit log_named_uint("Pool pay asset balanceOf (before)", tokens[0].balanceOf(address(pool)));
        emit log_named_uint("Pool receive asset balance (before)", pool.asset(1).balance);
        emit log_named_uint("Pool receive asset balanceOf (before)", tokens[1].balanceOf(address(pool)));
        emit log_named_uint("Pay asset scale (before)", pool.asset(0).scale);
        emit log_named_uint("Receive asset scale (before)", pool.asset(1).scale);
        emit log_named_uint("Amount in", pay1Amounts[0]);
        uint256 amountOut = pool.multiswap(poolIndices, pay1Amounts, assetIndices2, allocations1)[0];
        emit log_named_uint("Amount out", amountOut);
        emit log_named_uint("Pool token balance (after)", pool.balance());
        emit log_named_uint("Pool token supply (after)", pool.totalSupply());
        emit log_named_uint("Sender pay asset balanceOf (after)", tokens[0].balanceOf(sender));
        emit log_named_uint("Sender receive asset balanceOf (after)", tokens[1].balanceOf(sender));
        emit log_named_uint("Pool pay asset balance (after)", pool.asset(0).balance);
        emit log_named_uint("Pool pay asset balanceOf (after)", tokens[0].balanceOf(address(pool)));
        emit log_named_uint("Pool receive asset balance (after)", pool.asset(1).balance);
        emit log_named_uint("Pool receive asset balanceOf (after)", tokens[1].balanceOf(address(pool)));
        emit log_named_uint("Pay asset scale (after)", pool.asset(0).scale);
        emit log_named_uint("Receive asset scale (after)", pool.asset(1).scale);
        console.log("********************************************************");
        setUp();
        emit log_named_uint("Pool token balance (before)", pool.balance());
        emit log_named_uint("Pool token supply (before)", pool.totalSupply());
        emit log_named_uint("Sender pay asset balanceOf (before)", tokens[0].balanceOf(sender));
        emit log_named_uint("Sender receive asset balanceOf (before)", tokens[1].balanceOf(sender));
        emit log_named_uint("Pool pay asset balance (before)", pool.asset(0).balance);
        emit log_named_uint("Pool pay asset balanceOf (before)", tokens[0].balanceOf(address(pool)));
        emit log_named_uint("Pool receive asset balance (before)", pool.asset(1).balance);
        emit log_named_uint("Pool receive asset balanceOf (before)", tokens[1].balanceOf(address(pool)));
        emit log_named_uint("Pay asset scale (before)", pool.asset(0).scale);
        emit log_named_uint("Receive asset scale (before)", pool.asset(1).scale);
        emit log_named_uint("Amount in", pay1Amounts[0]);
        amountOut = pool.unstake(2, pay1Amount);
        emit log_named_uint("Amount out", amountOut);
        emit log_named_uint("Pool token balance (after)", pool.balance());
        emit log_named_uint("Pool token supply (after)", pool.totalSupply());
        emit log_named_uint("Sender pay asset balanceOf (after)", tokens[0].balanceOf(sender));
        emit log_named_uint("Sender receive asset balanceOf (after)", tokens[1].balanceOf(sender));
        emit log_named_uint("Pool pay asset balance (after)", pool.asset(0).balance);
        emit log_named_uint("Pool pay asset balanceOf (after)", tokens[0].balanceOf(address(pool)));
        emit log_named_uint("Pool receive asset balance (after)", pool.asset(1).balance);
        emit log_named_uint("Pool receive asset balanceOf (after)", tokens[1].balanceOf(address(pool)));
        emit log_named_uint("Pay asset scale (after)", pool.asset(0).scale);
        emit log_named_uint("Receive asset scale (after)", pool.asset(1).scale);
    }
}

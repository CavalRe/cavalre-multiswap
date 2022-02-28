// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./Token.sol";
import "../Pool.sol";
import "../libraries/ds-test/src/test.sol";
import "../libraries/SafeMath.sol";

contract ContractTest is Context, DSTest {
    using SafeMath for uint;

    uint constant ntokens = 10;
    Token[] tokens;

    Pool pool;

    address sender;
    Token tokenIn;
    Token tokenOut;
    Token tokenNew;
    address addressIn;
    address addressOut;
    address addressNew;
    uint amountIn;
    uint amountOut;
    uint amountNew;

    address[] addresses;
    uint[] amounts;

    function setUp() public {
        tokens = new Token[](ntokens);

        pool = new Pool("Pool","P");

        addresses = new address[](ntokens);
        amounts = new uint[](ntokens);
        uint256[] memory reserves = new uint256[](ntokens);
        uint256[] memory fees = new uint256[](ntokens);
        uint256[] memory weights = new uint256[](ntokens);
        uint256[] memory ks = new uint256[](ntokens);

        for (uint i=0; i<ntokens; i++) {
            // Generate token
            string memory name = string(abi.encodePacked("Token ", Strings.toString(i+1)));
            string memory symbol = string(abi.encodePacked("T", Strings.toString(i+1)));
            uint supply = i.add(1).mul(1e18);
            uint reserve = supply/10;
            Token token = new Token(name,symbol,supply);
            token.approve(address(pool),reserve);
            tokens[i] = token;

            //Generate asset info
            addresses[i] = address(token);
            reserves[i] = reserve;
            fees[i] = 3e15;
            weights[i] = 1e18/ntokens;
            ks[i] = 1e18;
        }

        pool.initialize(1e23, addresses, reserves, fees, weights, ks);
        
        sender = address(this);
        tokenIn = tokens[0];
        tokenOut = tokens[1];
        addressIn = address(tokenIn);
        addressOut = address(tokenOut);
        amountIn = tokenIn.balanceOf(sender)/1000000;

        tokenNew = new Token("Token 11","T11",11e18);
        addressNew = address(tokenNew);
        amountNew = 11e17;

        for (uint i=0; i<ntokens; i++) {
            amounts[i] = amountIn;
            tokens[i].increaseAllowance(address(pool),amountIn);
        }
    }

    function testPool() public {
        assertEq(pool.totalSupply(),1e23);
        for (uint i=0; i<ntokens; i++) {
            Token token = tokens[i];
            uint supply = i.add(1).mul(1e18);
            uint reserve = supply/10;
            assertEq(token.totalSupply(),supply);
            assertEq(pool.reserve(address(token)),reserve);
            assertEq(token.balanceOf(address(this)),supply.sub(reserve));
        }
    }

    function testSwap() public {
        tokenIn.increaseAllowance(address(pool),amountIn);

        amountOut = pool.swap(
            addressIn,
            addressOut,
            amountIn,
            sender
        );
    }

    function testSwapVerbose() public {
        tokenIn.increaseAllowance(address(pool),amountIn);

        emit log("============");
        emit log("Before swap:");
        emit log("============");
        emit log_named_uint("Weight 1", pool.weight(addressIn));
        emit log_named_uint("Weight 2", pool.weight(addressOut));
        emit log_named_uint("Reserve 0", pool.totalSupply());
        emit log_named_uint("Balance 1", tokenIn.balanceOf(address(pool)));
        emit log_named_uint("Reserve 1", pool.reserve(addressIn));
        emit log_named_uint("Balance 2", tokenOut.balanceOf(address(pool)));
        emit log_named_uint("Reserve 2", pool.reserve(addressOut));
        emit log_named_uint("Swap In Amount", amountIn);

        amountOut = pool.swap(
            addressIn,
            addressOut,
            amountIn,
            sender
        );

        emit log("===========");
        emit log("After swap:");
        emit log("===========");
        emit log_named_uint("Swap Out Amount", amountOut);
        emit log_named_uint("Weight 1", pool.weight(addressIn));
        emit log_named_uint("Weight 2", pool.weight(addressOut));
        emit log_named_uint("Reserve 0", pool.totalSupply());
        emit log_named_uint("Balance 1", tokenIn.balanceOf(address(pool)));
        emit log_named_uint("Reserve 1", pool.reserve(addressIn));
        emit log_named_uint("Balance 2", tokenOut.balanceOf(address(pool)));
        emit log_named_uint("Reserve 2", pool.reserve(addressOut));
    }

    function testStake() public {
        tokenIn.increaseAllowance(address(pool),amountIn);

        amountOut = pool.stake(
            addressIn,
            amountIn,
            sender
        );
    }

    function testStakeVerbose() public {
        tokenIn.increaseAllowance(address(pool),amountIn);

        emit log("=============");
        emit log("Before stake:");
        emit log("=============");
        emit log_named_uint("Weight 1", pool.weight(addressIn));
        emit log_named_uint("Weight 2", pool.weight(addressOut));
        emit log_named_uint("Reserve 0", pool.totalSupply());
        emit log_named_uint("Balance 1", tokenIn.balanceOf(address(pool)));
        emit log_named_uint("Reserve 1", pool.reserve(addressIn));
        emit log_named_uint("Balance 2", tokenOut.balanceOf(address(pool)));
        emit log_named_uint("Reserve 2", pool.reserve(addressOut));
        emit log_named_uint("Swap In Amount", amountIn);

        amountOut = pool.stake(
            addressIn,
            amountIn,
            sender
        );

        emit log("============");
        emit log("After stake:");
        emit log("============");
        emit log_named_uint("Swap Out Amount", amountOut);
        emit log_named_uint("Weight 1", pool.weight(addressIn));
        emit log_named_uint("Weight 2", pool.weight(addressOut));
        emit log_named_uint("Reserve 0", pool.totalSupply());
        emit log_named_uint("Balance 1", tokenIn.balanceOf(address(pool)));
        emit log_named_uint("Reserve 1", pool.reserve(addressIn));
        emit log_named_uint("Balance 2", tokenOut.balanceOf(address(pool)));
        emit log_named_uint("Reserve 2", pool.reserve(addressOut));
    }

    function testStakeBatch() public {
        for (uint i=0; i<ntokens; i++) {
            tokens[i].increaseAllowance(address(pool),amountIn);
        }

        amountOut = pool.stakeBatch(
            addresses,
            amounts,
            sender
        );
    }

    function testCompareStakes() public {
        tokenIn.increaseAllowance(address(pool),2*amountIn);

        uint amountSingle = pool.stake(
            addressIn,
            amountIn,
            sender
        );

        setUp();

        address[] memory addressInArray = new address[](1);
        uint[] memory amountInArray = new uint[](1);
        addressInArray[0] = addressIn;
        amountInArray[0] = amountIn;

        uint amountBatch = pool.stakeBatch(
            addressInArray,
            amountInArray,
            sender
        );

        assertEq(amountSingle,amountBatch,"Single stake and batch stake do not agrees.");
    }

    function testUnstake() public {
        pool.increaseAllowance(address(pool),amountIn);

        amountOut = pool.unstake(
            addressIn,
            amountIn,
            sender
        );
    }

    function testUnstakeVerbose() public {
        pool.increaseAllowance(address(pool),amountIn);

        emit log("===============");
        emit log("Before unstake:");
        emit log("===============");
        emit log_named_uint("Weight 1", pool.weight(addressIn));
        emit log_named_uint("Weight 2", pool.weight(addressOut));
        emit log_named_uint("Reserve 0", pool.totalSupply());
        emit log_named_uint("Balance 1", tokenIn.balanceOf(address(pool)));
        emit log_named_uint("Reserve 1", pool.reserve(addressIn));
        emit log_named_uint("Balance 2", tokenOut.balanceOf(address(pool)));
        emit log_named_uint("Reserve 2", pool.reserve(addressOut));
        emit log_named_uint("Swap In Amount", amountIn);

        amountOut = pool.unstake(
            addressIn,
            amountIn,
            sender
        );

        emit log("==============");
        emit log("After unstake:");
        emit log("==============");
        emit log_named_uint("Swap Out Amount", amountOut);
        emit log_named_uint("Weight 1", pool.weight(addressIn));
        emit log_named_uint("Weight 2", pool.weight(addressOut));
        emit log_named_uint("Reserve 0", pool.totalSupply());
        emit log_named_uint("Balance 1", tokenIn.balanceOf(address(pool)));
        emit log_named_uint("Reserve 1", pool.reserve(addressIn));
        emit log_named_uint("Balance 2", tokenOut.balanceOf(address(pool)));
        emit log_named_uint("Reserve 2", pool.reserve(addressOut));
    }

    function testAddAsset() public {
        tokenIn.increaseAllowance(address(pool),amountIn);
        tokenNew.increaseAllowance(address(pool),amountNew);

        pool.addAsset(
            addressIn,
            addressNew,
            amountIn,
            amountNew,
            3e15,
            1e18,
            sender
        );
    }

}

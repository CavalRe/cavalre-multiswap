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
    Token[ntokens] tokens;

    Pool pool;

    function setUp() public {}

    function testCreatePool() public {
        pool = new Pool("Pool","P");

        address[] memory addresses = new address[](ntokens);
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
            assertEq(token.balanceOf(address(this)),supply);
            assertEq(token.totalSupply(),supply);
            assertEq(token.allowance(address(this), address(pool)), reserve);
            tokens[i] = token;

            //Generate asset
            addresses[i] = address(token);
            reserves[i] = reserve;
            fees[i] = 3e15;
            weights[i] = 1e18/ntokens;
            ks[i] = 1e18;
        }

        pool.initialize(addresses, reserves, fees, weights, ks);
    }

    // function testSafeMath() public {
    //     uint x = 10 ** 9;
    //     assertEq(x.dmul(x),1);
    // }

    // function testCreateTokens() public {
    //     // Generate tokens and mint for address(this)
    //     tokens = new Token[](ntokens);
    //     pool = new Pool("Pool","P");
    //     assets = new Asset[](ntokens);
    //     for (uint i=0; i<ntokens; i++) {
    //         string memory name = string(abi.encodePacked("Token ", Strings.toString(i+1)));
    //         string memory symbol = string(abi.encodePacked("T", Strings.toString(i+1)));
    //         Token token = new Token(name,symbol,i.add(1).mul(1e18));
    //         token.approve(address(pool),token.balanceOf(address(this))/10);
    //         // console.log(name,symbol,address(token));
    //         // console.log("Balance",token.balanceOf(address(this)));
    //         assertEq(token.balanceOf(address(this)),i.add(1).mul(1e18));
    //         assertEq(token.totalSupply(),i.add(1).mul(1e18));
    //         tokens[i] = token;
    //     }
    // }

    // function test2CreatePool() public {
    //     // Generate pool
    //     pool = new Pool("Pool","P");
    //     // console.log("Pool",address(pool));
    //     assertEq(pool.totalSupply(),0);
    //     assertEq(pool.name(),"Pool");
    //     assertEq(pool.symbol(),"P");
    // }

    // function test3CreateAssets() public {
    //     assets = new Asset[](ntokens);
    //     for (uint i=0; i<ntokens; i++) {
    //         Token token = tokens[i];
    //         console.log("Balance",token.balanceOf(address(this)));
    //         // token.approve(address(pool),token.balanceOf(address(this)));
    //     }
    // }

    // function testInitializePool() public {
        // console.log("Sender:",_msgSender());
        /* struct Asset {

            address token;
            uint fee; // Transaction fee, e.g. 0.003
            uint reserve; // Number of asset tokens in pool
            uint weight; // Market value weight of this asset token, sum_i w_i = 10^18
            uint k; // AMM parameter for this asset token
            bool isActive; // Flag to indicate whether this asset token is actively traded

        } */

        // Asset[] memory assets = new Asset[](3);
        // console.log("Construct assets");
        // assets[0] = new Asset("USDC","USDC",USDC,1,1,50e16,1,true);
        // console.log("Finished USDC");
        // assets[1] = new Asset("WETH","WETH",WETH,2,2,25e16,2,true);
        // assets[2] = new Asset("WBTC","WBTC",WBTC,3,3,25e16,3,true);

        // pool = new Pool("Test","T",totalSupply,assets);

        // assertEq(pool.totalSupply(),totalSupply);
        // assertEq(pool.name(),"Test");
        // assertEq(pool.symbol(),"T");
        // assertEq(pool.getAsset(USDC).totalSupply(),1);
        // assertEq(pool.getAsset(WETH).totalSupply(),2);
        // assertEq(pool.getAsset(WBTC).totalSupply(),3);
        // console.log("Finished");

    // }

}

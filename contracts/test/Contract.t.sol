// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.11;

import "hardhat/console.sol";
import "../Pool.sol";
import "../libraries/ds-test/src/test.sol";
import "../libraries/SafeMath.sol";

contract ContractTest is DSTest {
    using SafeMath for uint;

    address USDC;
    address WETH;
    address WBTC;

    // Pool.Asset[] assets;

    uint totalSupply;

    Pool pool;

    function setUp() public {

        USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
        WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
        WBTC = 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599;

        totalSupply = 1;

    }

    function testSafeMath() public {

        uint x = 10 ** 9;
        assertEq(x.dmul(x),1);

    }

    function testCreatePool() public {

        /* struct Asset {

            address token;
            uint fee; // Transaction fee, e.g. 0.003
            uint reserve; // Number of asset tokens in pool
            uint weight; // Market value weight of this asset token, sum_i w_i = 10^18
            uint k; // AMM parameter for this asset token
            bool isActive; // Flag to indicate whether this asset token is actively traded

        } */

        Pool.Asset[] memory assets = new Pool.Asset[](3);
        assets[0] = Pool.Asset(USDC,1,1,50e16,1,true);
        assets[1] = Pool.Asset(WETH,2,2,25e16,2,true);
        assets[2] = Pool.Asset(WBTC,3,3,25e16,3,true);

        pool = new Pool("Test","T",totalSupply,assets);

        assertEq(pool.totalSupply(),totalSupply);
        assertEq(pool.name(),"Test");
        assertEq(pool.symbol(),"T");
        assertEq(pool.getAsset(USDC).reserve,1);
        assertEq(pool.getAsset(WETH).reserve,2);
        assertEq(pool.getAsset(WBTC).reserve,3);

    }

}

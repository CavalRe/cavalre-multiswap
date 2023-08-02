// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@cavalre/Pool.sol";
import "@cavalre/test/Token.t.sol";
import "forge-std/Script.sol";
import "forge-std/Test.sol";
import {FixedPointMathLib} from "solady/utils/FixedPointMathLib.sol";

contract DeployPoolScript is Script, Test {
    using FixedPointMathLib for uint256;

    uint256 public deployerPrivateKey = vm.envUint("PRIVATE_KEY");

    Pool private pool;
    uint256 private tau = 1e16;
    uint256 private bps = 1e14;
    uint256 private marketCap = 1e26;

    address[] private tokens = new address[](10);

    Token token;
    uint256[] private fees = new uint256[](10);
    uint256[] private prices = new uint256[](10);
    uint256[] private weights = new uint256[](10);

    function setUp() public {
        fees[0] = 20 * bps;
        fees[1] = 1 * bps;
        fees[2] = 1 * bps;
        fees[3] = 1 * bps;
        fees[4] = 1 * bps;
        fees[5] = 1 * bps;
        fees[6] = 1 * bps;
        fees[7] = 20 * bps;
        fees[8] = 20 * bps;
        fees[9] = 20 * bps;

        prices[0] = 127e17;
        prices[1] = 1e18;
        prices[2] = 1e18;
        prices[3] = 110e16;
        prices[4] = 1e18;
        prices[5] = 1e18;
        prices[6] = 1e18;
        prices[7] = 1848e18;
        prices[8] = 29173e18;
        prices[9] = 29173e18;

        weights[0] = 250e15;
        weights[1] = 250e15;
        weights[2] = 100e15;
        weights[3] = 50e15;
        weights[4] = 25e15;
        weights[5] = 50e15;
        weights[6] = 25e15;
        weights[7] = 100e15;
        weights[8] = 25e15;
        weights[9] = 125e15;

        // Anvil Addresses
        // tokens[0] = address(0xFD471836031dc5108809D173A067e8486B9047A3);
        // tokens[1] = address(0xcbEAF3BDe82155F56486Fb5a1072cb8baAf547cc);
        // tokens[2] = address(0x1429859428C0aBc9C2C47C8Ee9FBaf82cFA0F20f);
        // tokens[3] = address(0xB0D4afd8879eD9F52b28595d31B441D079B2Ca07);
        // tokens[4] = address(0x162A433068F51e18b7d13932F27e66a3f99E6890);
        // tokens[5] = address(0x922D6956C99E12DFeB3224DEA977D0939758A1Fe);
        // tokens[6] = address(0x5081a39b8A5f0E35a8D959395a630b68B74Dd30f);
        // tokens[7] = address(0x1fA02b2d6A771842690194Cf62D91bdd92BfE28d);
        // tokens[8] = address(0xdbC43Ba45381e02825b14322cDdd15eC4B3164E6);
        // tokens[9] = address(0x04C89607413713Ec9775E14b954286519d836FEf);

        // Fuji Addresses
        tokens[0] = address(0xA522590D29B1FdDaEE466e030466049026A3aA74);
        tokens[1] = address(0x2fC48766348bcfEe0C9E7862Eb5061eBe0c2603a);
        tokens[2] = address(0x8379AFd301280E4E96a97731008f71115Eb1Dd70);
        tokens[3] = address(0xF069957aa8857DEdAe9b2d9987E7442d04A2C0E7);
        tokens[4] = address(0xb18e99763E3786d0e9F565d5e036c252c02B60f3);
        tokens[5] = address(0x0D0DFF6fD685BD301E61c61E1C9E5A7C1F7D0388);
        tokens[6] = address(0x7850624E557A05290E316ed5504a7Ae1551baDbc);
        tokens[7] = address(0x99fe5f92F503eDCbe0F55066D9C7A2Ac4746E8E4);
        tokens[8] = address(0xa1F06C36F208Eed4bF7a4a3092d099b9d59B59Bd);
        tokens[9] = address(0xb2c6463E50179Ba18A53Ae6Ea1705CAFA4b2F12F);
    }

    function run() external {
        emit log_named_uint("deployer", deployerPrivateKey);

        vm.startBroadcast(deployerPrivateKey);

        pool = new Pool("Pool", "P", tau);

        emit log_named_address("pool address", address(pool));
        emit log_named_address("pool owner", address(pool.owner()));
        emit log_named_address("sender", msg.sender);

        uint256 value;
        uint256 balance;
        for (uint256 i; i < 10; i++) {
            value = marketCap.mulWadUp(weights[i]);
            balance = value.divWadUp(prices[i]);
            token = Token(tokens[i]);
            token.mint(balance);
            token.approve(address(pool), balance);
            pool.addAsset(address(token), balance, fees[i], value);
        }

        pool.initialize();
    }
}

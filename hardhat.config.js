require("@nomicfoundation/hardhat-verify");
require("@nomicfoundation/hardhat-foundry");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "avax",
  solidity: {
    version: "0.8.19",
    settings: {
      evmVersion: "london",
      // remappings: [
      //   "@openzeppelin/=node_modules/@openzeppelin/",
      //   "ds-test/=contracts/libraries/ds-test/src/",
      //   "forge-std/=node_modules/forge-std/src/",
      //   "solady/=node_modules/solady/src/",
      // ],
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  sourcify: {
    enabled: true,
  },
  networks: {
    avax: {
      url: "https://api.avax.network/ext/bc/C/rpc",
    },
  },
  etherscan: {
    apiKey: {
      avalanche: process.env.ETHERSCAN_API_KEY,
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

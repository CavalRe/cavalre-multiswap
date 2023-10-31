require("@nomicfoundation/hardhat-verify");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "avax",
  solidity: {
    version: "0.8.19",
    settings: {
      evmVersion: "london",
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

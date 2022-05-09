import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

// Tasks
import { hhKeys } from "./tasks/accounts";
import "./tasks/faucet";
import "./tasks/initialize";

dotenv.config();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.13",
  networks: {
    localhost: {
      from: "0xAdb2f6a8aA0A7212CF5f3d41ef77641ca0853021",
      url: "http://localhost:8545",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [
          process.env.PRIVATE_KEY,
          "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
        ] : [],
    },
    ropsten: {
      from: "0xAdb2f6a8aA0A7212CF5f3d41ef77641ca0853021",
      url: process.env.ROPSTEN_URL || "",
      gas: 1000000,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;

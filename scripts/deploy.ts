// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { BigNumber } from "ethers";

type Asset = {
  token: string,
  fee: BigNumber,
  reserve: BigNumber,
  weight: BigNumber,
  k: BigNumber,
  isActive: boolean
};

const one: BigNumber = BigNumber.from(10).pow(18);

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  
  const one: BigNumber = BigNumber.from(10).pow(18);
  
  const mainAddress = "0x97FBc7Bb43EAce2013861B65C75e4A0198149537";
  const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const WBTC = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";

  const assets: Asset[] = [
    {
      token: USDC,
      fee: BigNumber.from(1),
      reserve: BigNumber.from(1),
      weight: one.div(100).mul(50),
      k: BigNumber.from(1),
      isActive: true
    },
    {
      token: WETH,
      fee: BigNumber.from(1),
      reserve: BigNumber.from(1),
      weight: one.div(100).mul(25),
      k: BigNumber.from(1),
      isActive: true
    },
    {
      token: WBTC,
      fee: BigNumber.from(1),
      reserve: BigNumber.from(1),
      weight: one.div(100).mul(25),
      k: BigNumber.from(1),
      isActive: true
    }
  ];

  const Token = await ethers.getContractFactory("Token")

  const T1 = await Token.deploy("Token 1","T1",one)

  // We get the contract to deploy
  const Pool = await ethers.getContractFactory("Pool");

  const pool = await Pool.deploy("Test","T",one,assets);

  await pool.deployed();

  console.log("Pool deployed to:", pool.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

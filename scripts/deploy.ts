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

  const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

  const assets: Asset[] = [
    {
      token: USDC,
      fee: BigNumber.from(1),
      reserve: BigNumber.from(1),
      weight: one,
      k: BigNumber.from(1),
      isActive: true
    }
  ];

  // We get the contract to deploy
  const Pool = await ethers.getContractFactory("Pool");
  const pool = await Pool.deploy("Test","T",1,assets);

  await pool.deployed();

  console.log("Pool deployed to:", pool.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

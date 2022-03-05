// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { BigNumber } from "ethers";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const ntokens = 10;
  const addresses: string[] = [];
  
  const Token = await ethers.getContractFactory("Token");

  console.log("Begin generating tokens");
  for (let i = 0; i < ntokens; i++) {
    let name: string = `Token ${i + 1}`;
    let symbol: string = `T${i + 1}`;
    let supply: BigNumber = BigNumber.from(10).pow(23).mul(BigNumber.from(i + 1));

    const token = await Token.deploy(name, symbol, supply);
    await token.deployed();

    addresses.push(token.address);

    console.log(`${name} deployed to:`, token.address);
  };
  console.log(addresses);
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

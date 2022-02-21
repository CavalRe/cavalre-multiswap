import { ethers } from "hardhat";
import { BigNumber } from "ethers";

// type Asset = {
//   name: string,
//   symbol: string,
//   token: string,
//   fee: BigNumber,
//   reserve: BigNumber,
//   weight: BigNumber,
//   k: BigNumber,
//   isActive: boolean
// };

const ntokens = 10;
const tokens: any[] = [];
const assets: any[] = [];

describe("Pool", function () {
  it(`Should generate a pool with ${ntokens} tokens and verify the correct reserves`, async function () {
    const Token = await ethers.getContractFactory("Token");
    const Asset = await ethers.getContractFactory("Asset");
    const Pool = await ethers.getContractFactory("Pool");

    const one: BigNumber = BigNumber.from(10).pow(18);
    console.log("Begin generating tokens");
    for (let i=0; i<ntokens; i++) {
      const token = await Token.deploy(`Token ${i+1}`,`T${i+1}`,one.mul(1000));
      // token.approve()
      tokens.push(token);
      await token.deployed();
      console.log(`Token ${i+1} was created`);

      const asset = await Asset.deploy(
          await token.name(),
          await token.symbol(),
          token.address,
          one,
          one.div(1000).mul(3),
          one.div(ntokens),
          one,
          true
      )
      assets.push(asset);

      console.log(`Token ${i+1} deployed to:`, tokens[i].address);
    }

    const P = await Pool.deploy("Pool","P",1,assets);
    await P.deployed();

    console.log("Pool deployed to:", P.address);

    // expect(await (await P.getAsset(tokens[0].address)).totalSupply()).to.equal(one);

    // const Greeter = await ethers.getContractFactory("Greeter");
    // const greeter = await Greeter.deploy("Hello, world!");
    // await greeter.deployed();

    // expect(await greeter.greet()).to.equal("Hello, world!");

    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

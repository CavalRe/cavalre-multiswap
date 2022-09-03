import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { expect } from "chai";

const ntokens = 10;
const tokens: any[] = [];

const sender: string = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

describe("Pool", function () {
  it(`Should generate a pool with ${ntokens} tokens and verify the correct reserves`, async function () {
    const Token = await ethers.getContractFactory("Token");
    const Pool = await ethers.getContractFactory("Pool");

    const pool = await Pool.deploy("Pool","P");
    await pool.deployed();

    const one: BigNumber = BigNumber.from(10).pow(18);

    const addresses: string[] = [];
    const reserves: BigNumber[] = [];
    const fees: BigNumber[] = [];
    const weights: BigNumber[] = [];
    const ks: BigNumber[] = [];

    console.log("Begin generating tokens");
    for (let i=0; i<ntokens; i++) {
      let name: string = `Token ${i+1}`;
      let symbol: string = `T${i+1}`;
      let supply: BigNumber = BigNumber.from(i+1).mul(one);
      let reserve: BigNumber = supply.div(10);

      const token = await Token.deploy(name,symbol,supply);
      await token.approve(pool.address,reserve);
      tokens.push(token);
      await token.deployed();

      expect(await token.balanceOf(sender)).to.equal(supply);
      expect(await token.totalSupply()).to.equal(supply);
      expect(await token.allowance(sender, pool.address)).to.equal(reserve);

      addresses.push(token.address);
      reserves.push(reserve);
      fees.push(one.div(1000).mul(3));
      weights.push(one.div(ntokens));
      ks.push(one);

      console.log(`${name} deployed to:`, tokens[i].address);
    }

    await pool.initialize(one.mul(100000), addresses, reserves, fees, weights, ks);
    for (let i=0; i<ntokens; i++) {
      let reserve: BigNumber = await pool.reserve(tokens[i].address);
      let supply: BigNumber = await pool.totalSupply();
      console.log(reserve);
      console.log(supply);
    }

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

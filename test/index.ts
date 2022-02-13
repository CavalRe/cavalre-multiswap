import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";

describe("Pool", function () {
  it("Should generate a pool and verify the correct USDC fee", async function () {
    const Pool = await ethers.getContractFactory("Pool");

    const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    const WBTC = 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599;

    /*
      Argument of type 

      { 
        token: number; 
        fee: number; 
        reserve: number; 
        weight: number; 
        k: number; 
        isActive: boolean; 
      }[]
        
      is not assignable to parameter of type 
      
      { 
        token: string; 
        fee: BigNumberish; 
        reserve: BigNumberish; 
        weight: BigNumberish; 
        k: BigNumberish; 
        isActive: boolean; 
      }[]

      Type 
      
      { 
        token: number; 
        fee: number; 
        reserve: number; 
        weight: number; 
        k: number; 
        isActive: boolean; 
      }
      
      is not assignable to type 
      
      { 
        token: string; 
        fee: BigNumberish; 
        reserve: BigNumberish; 
        weight: BigNumberish; 
        k: BigNumberish; 
        isActive: boolean; 
      }

      Types of property 'token' are incompatible.
      Type 'number' is not assignable to type 'string'.

      23     const pool = await Pool.deploy("Test","T",1,assets);
    */

    type Asset = {
      token: string,
      fee: BigNumber,
      reserve: BigNumber,
      weight: BigNumber,
      k: BigNumber,
      isActive: boolean
    };

    const one: BigNumber = BigNumber.from(10).pow(18);

    const assets: Asset[] = [
      {
        token: USDC,
        fee: BigNumber.from(1),
        reserve: BigNumber.from(1),
        weight: one,
        k: BigNumber.from(1),
        isActive: true
      }
    ]

    const pool = await Pool.deploy("Test","T",1,assets);
    await pool.deployed();

    expect(await (await pool.getAsset(USDC)).fee).to.equal(1);

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

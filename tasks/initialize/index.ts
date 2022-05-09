import { task } from "hardhat/config";
import { BigNumber } from "ethers";

import { abi as poolAbi } from "../../artifacts/contracts/Pool.sol/Pool.json";
import { abi as tokenAbi } from "../../artifacts/contracts/Token.sol/Token.json";

import { tokens } from "../tokens";

const reserves: BigNumber[] = [];
const fees: BigNumber[] = [];
const weights: BigNumber[] = [];
const ks: BigNumber[] = [];

task("initialize", "Initialize the pool")
.addPositionalParam("poolAddress", "The address of the pool to initialize.")
.setAction(async ({ poolAddress }, hre) => {
    const [owner] = await hre.ethers.getSigners();
    const ownerAddress = await owner.getAddress();
    console.log(`Owner: ${ownerAddress}`);
    
    const one: BigNumber = BigNumber.from(10).pow(18);

    const pool = new hre.ethers.Contract(poolAddress, poolAbi, owner);
    console.log(await pool.name());
    console.log(`Pool: ${pool.address}`);

    const poolTokens = await pool.totalSupply();
    console.log(`Pool tokens (before): ${poolTokens}`);

    for (let i = 0; i < tokens.length; i++) {
        console.log("--------------------------------------------------------")
        console.log(`Token ${i + 1}: ${tokens[i]}`);

        // const reserve: BigNumber = BigNumber.from(10).pow(21).mul(i + 1);

        const token = new hre.ethers.Contract(tokens[i], tokenAbi, owner);
        const balance: BigNumber = await token.totalSupply();
        console.log(`Balance: ${balance}`);

        const reserve: BigNumber = balance.div(100);
        console.log(`Reserve: ${reserve}`);
        // await token.increaseAllowance(poolAddress, reserve);
        // await token.approve(poolAddress, reserve);
        const allowance = await token.allowance(ownerAddress, poolAddress);
        console.log(`Allowance: ${allowance}`);

        reserves.push(reserve);
        fees.push(one.div(1000).mul(3));
        weights.push(one.div(tokens.length));
        ks.push(one);
    }

    console.log(`Reserves: ${reserves}`);

    console.log("Initializing pool");
    await pool.initialize(one.mul(100000), tokens, reserves, fees, weights, ks);

    console.log(`Pool tokens (after): ${await pool.totalSupply()}`);

});

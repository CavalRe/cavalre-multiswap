import { task } from "hardhat/config";
import { BigNumber } from "ethers";

import { abi as poolAbi } from "../../artifacts/contracts/Pool.sol/Pool.json";
import { abi as tokenAbi } from "../../artifacts/contracts/Token.sol/Token.json";

import { tokens } from "../tokens";

// // Localhost
// const tokens: string[] = [
//     '0x90cdC6AE916Be7616397550FAA982A50c45e5a2A',
//     '0x8d2932d999CE5a4c3202A978cfc9EB2A10f23371',
//     '0x5f1e8eD8468232Bab71EDa9F4598bDa3161F48eA',
//     '0x75B5F2dC2912D12463d164417dcce28b63b0cE5E',
//     '0x9741411D4379e0c359E45fCb3FbC8E1442DC2963',
//     '0x55720E5663Bc6f6918E4140f785281449DBb1cCD',
//     '0xE2cd9e8F6b489445199D0655bAC076D945d9Fec4',
//     '0xCD681C51cAc3E8aa2e1c1a78E4D95B67e13c4AB8',
//     '0x6C96C8876668D02f136aEc4BB5f3aA0DF5226832',
//     '0x5869c4cFEB622231a0b32Fd896fFFfF081E65b95'
// ]
// // Ropsten
// // const tokens: string[] = [
// //   '0x90cdC6AE916Be7616397550FAA982A50c45e5a2A',
// //   '0x8d2932d999CE5a4c3202A978cfc9EB2A10f23371',
// //   '0x5f1e8eD8468232Bab71EDa9F4598bDa3161F48eA',
// //   '0x75B5F2dC2912D12463d164417dcce28b63b0cE5E',
// //   '0x9741411D4379e0c359E45fCb3FbC8E1442DC2963',
// //   '0x55720E5663Bc6f6918E4140f785281449DBb1cCD',
// //   '0xE2cd9e8F6b489445199D0655bAC076D945d9Fec4',
// //   '0xCD681C51cAc3E8aa2e1c1a78E4D95B67e13c4AB8',
// //   '0x6C96C8876668D02f136aEc4BB5f3aA0DF5226832',
// //   '0x5869c4cFEB622231a0b32Fd896fFFfF081E65b95'
// // ]
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

        // await token.increaseAllowance(pool, reserve);

        const reserve: BigNumber = balance.div(100);
        console.log(`Reserve: ${reserve}`);
        await token.approve(poolAddress, reserve);
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

import { task } from "hardhat/config";
import { BigNumber } from "ethers";
import { abi as tokenAbi } from "../../artifacts/contracts/Token.sol/Token.json";

export const tokens: string[] = [
    '0x90cdC6AE916Be7616397550FAA982A50c45e5a2A',
    '0x8d2932d999CE5a4c3202A978cfc9EB2A10f23371',
    '0x5f1e8eD8468232Bab71EDa9F4598bDa3161F48eA',
    '0x75B5F2dC2912D12463d164417dcce28b63b0cE5E',
    '0x9741411D4379e0c359E45fCb3FbC8E1442DC2963',
    '0x55720E5663Bc6f6918E4140f785281449DBb1cCD',
    '0xE2cd9e8F6b489445199D0655bAC076D945d9Fec4',
    '0xCD681C51cAc3E8aa2e1c1a78E4D95B67e13c4AB8',
    '0x6C96C8876668D02f136aEc4BB5f3aA0DF5226832',
    '0x5869c4cFEB622231a0b32Fd896fFFfF081E65b95'
]

const one: BigNumber = BigNumber.from(10).pow(18);

task(
    "totalSupplies",
    "Total supply of each asset token."
).setAction(async (_, hre) => {
    const [owner] = await hre.ethers.getSigners();
    const ownerAddress = await owner.getAddress();
    console.log(`Owner: ${ownerAddress}`);

    for (let i = 0; i < tokens.length; i++) {
        const token = new hre.ethers.Contract(tokens[i], tokenAbi, owner);
        console.log("--------------------------------------------------------")
        console.log(`Token ${i + 1}: ${token.address}`);
        const supply = await token.totalSupply();
        console.log(`Total Supply: ${supply}`);
    }
});

task(
    "balances",
    "Retrieve the sender's balances for each asset token."
).addPositionalParam(
    "sender",
    "The address of the sender."
).setAction(async ({ sender }, hre) => {
    const [owner] = await hre.ethers.getSigners();
    const ownerAddress = await owner.getAddress();
    console.log(`Owner: ${ownerAddress}`);
    console.log(`Sender: ${sender}`);

    for (let i = 0; i < tokens.length; i++) {
        const token = new hre.ethers.Contract(tokens[i], tokenAbi, owner);
        console.log("--------------------------------------------------------")
        console.log(`Token ${i + 1}: ${token.address}`);
        const balance = await token.balanceOf(sender);
        console.log(`Balance: ${balance}`);
    }
});

task(
    "allowances",
    "Retrieve the sender's allowances for each asset token."
).addPositionalParam(
    "spender",
    "The address of the spender."
).setAction(async ({ spender }, hre) => {
    const [owner] = await hre.ethers.getSigners();
    const ownerAddress = await owner.getAddress();
    console.log(`Owner: ${ownerAddress}`);

    for (let i = 0; i < tokens.length; i++) {
        const token = new hre.ethers.Contract(tokens[i], tokenAbi, owner);
        console.log("--------------------------------------------------------")
        console.log(`Token ${i + 1}: ${token.address}`);
        const value = await token.allowance(ownerAddress, spender);
        console.log(`Allowance: ${value}`);
    }
});

task(
    "increaseAllowances",
    "Retrieve the sender's allowances for each asset token."
).addPositionalParam(
    "spender",
    "The address of the spender."
).addPositionalParam(
    "addedValue",
    "The amount to increase the allowance."
).setAction(async ({ spender, addedValue }, hre) => {
    const [owner] = await hre.ethers.getSigners();
    const ownerAddress = await owner.getAddress();
    console.log(`Owner: ${ownerAddress}`);

    for (let i = 0; i < tokens.length; i++) {
        const token = new hre.ethers.Contract(tokens[i], tokenAbi, owner);
        console.log("--------------------------------------------------------")
        console.log(`Token ${i + 1}: ${token.address}`);
        await token.increaseAllowance(spender, addedValue);
        console.log(`Added Value: ${addedValue}`);
    }
});


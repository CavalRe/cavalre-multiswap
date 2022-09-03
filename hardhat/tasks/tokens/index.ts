import { task } from "hardhat/config";
import { BigNumber } from "ethers";
import { abi as tokenAbi } from "../../artifacts/contracts/Token.sol/Token.json";

// export const tokens: string[] = [
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
// ];

// export const tokens: string[] = [
//     '0xdA0CAAb82F3c1B6008420E0272bf15b3a36339E2',
//     '0x66cD24506897Ab1af348f1518941125A3621Ae80',
//     '0xa3299197A9b141817C073C0a00e18FA93bc17F1d',
//     '0xdBE713b6cE2A36b4E85F86009C97A6f0E390E410',
//     '0xe60D94b6aF6ABf963f3e337d605FE85910fE93F6',
//     '0x1a9c3549be7bd880a99E455AdcdC32c1074E491b',
//     '0xB634D323D8c97191a83C166a80060E7310251E8D',
//     '0x287FB1E6B2Cd671Edd84F4895aB4b00650Bd1F3B',
//     '0xA0d31DDCe2890dcd8c6Dd56f8ded183e05aADD45',
//     '0x1467ad30C6e1862AA10Ff22C7058730D7607Fd8f'
// ];

export const tokens: string[] = [
    '0x4bc8bE0A8A9b70DbabbB40Bd534989C49CFf95ba',
    '0xa66Fe7786a95889971910a20f4F20C28FE2421bF',
    '0x6aFd3985E34373fd420613f93B07f9263738BFEf',
    '0xD3D3Df6A09C05de845980C04d18666C036c98E3E',
    '0xFf2EBFeB702ebE812c85616d3fBf40615e24B8AA'
];

export const names: string[] = [
    "Wrapped Ether",
    "Wrapped Bitcoin",
    "USD Coin",
    "Tether USD",
    "DAI Stablecoin"
];

export const symbols: string[] = [
    "WETH",
    "WBTC",
    "USDC",
    "USDT",
    "DAI"
];

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
        console.log(`${names[i]}: ${token.address}`);
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
        console.log(`${names[i]}: ${token.address}`);
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

    const token = new hre.ethers.Contract(spender, tokenAbi, owner);
    console.log("--------------------------------------------------------")
    console.log(`Pool: ${token.address}`);
    const value = await token.allowance(ownerAddress, spender);
    console.log(`Allowance: ${value}`);

    for (let i = 0; i < tokens.length; i++) {
        const token = new hre.ethers.Contract(tokens[i], tokenAbi, owner);
        console.log("--------------------------------------------------------")
        console.log(`${names[i]}: ${token.address}`);
        const value = await token.allowance(ownerAddress, spender);
        console.log(`Allowance: ${value}`);
    }
});

task(
    "approve",
    "Retrieve the sender's allowances for each asset token."
).addPositionalParam(
    "spender",
    "The address of the spender."
).setAction(async ({ spender }, hre) => {
    const [owner] = await hre.ethers.getSigners();
    const ownerAddress = await owner.getAddress();
    console.log(`Owner: ${ownerAddress}`);

    const token = new hre.ethers.Contract(spender, tokenAbi, owner);
    console.log("--------------------------------------------------------")
    console.log(`Pool: ${token.address}`);
    // await token.increaseAllowance(spender, addedValue);
    // console.log(`Added Value: ${addedValue}`);

    for (let i = 3; i < tokens.length; i++) {
        const token = new hre.ethers.Contract(tokens[i], tokenAbi, owner);
        console.log("--------------------------------------------------------")
        console.log(`${names[i]}: ${token.address}`);
        
        const balance = await token.balanceOf(ownerAddress);
        const reserve = balance.div(100);
        await token.approve(spender, reserve);
        console.log(`Approved Value: ${reserve}`);
    }
});


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

  const [owner] = await ethers.getSigners();

  const ntokens = 10;
  const one: BigNumber = BigNumber.from(10).pow(18);

  const Pool = await ethers.getContractFactory("Pool");

  const pool = await Pool.deploy("Pool", "P");
  await pool.deployed();

  console.log("Pool deployed to:", pool.address);

  const abi = [
    // Read-Only Functions
    "function increaseAllowance(address spender, uint256 addedValue) public returns (bool)",
    // "function balanceOf(address owner) view returns (uint256)",
    // "function decimals() view returns (uint8)",
    // "function symbol() view returns (string)",

    // Authenticated Functions
    // "function transfer(address to, uint amount) returns (bool)",

    // Events
    // "event Transfer(address indexed from, address indexed to, uint amount)"
  ];

  // Localhost
  const addresses: string[] = [
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
  // Ropsten
  // const addresses: string[] = [
  //   '0x90cdC6AE916Be7616397550FAA982A50c45e5a2A',
  //   '0x8d2932d999CE5a4c3202A978cfc9EB2A10f23371',
  //   '0x5f1e8eD8468232Bab71EDa9F4598bDa3161F48eA',
  //   '0x75B5F2dC2912D12463d164417dcce28b63b0cE5E',
  //   '0x9741411D4379e0c359E45fCb3FbC8E1442DC2963',
  //   '0x55720E5663Bc6f6918E4140f785281449DBb1cCD',
  //   '0xE2cd9e8F6b489445199D0655bAC076D945d9Fec4',
  //   '0xCD681C51cAc3E8aa2e1c1a78E4D95B67e13c4AB8',
  //   '0x6C96C8876668D02f136aEc4BB5f3aA0DF5226832',
  //   '0x5869c4cFEB622231a0b32Fd896fFFfF081E65b95'
  // ]
  const reserves: BigNumber[] = [];
  const fees: BigNumber[] = [];
  const weights: BigNumber[] = [];
  const ks: BigNumber[] = [];

  for (let i = 0; i < ntokens; i++) {
    const reserve: BigNumber = BigNumber.from(10).pow(21).mul(i + 1);

    const token = new ethers.Contract(addresses[i], abi, owner);
    await token.increaseAllowance(pool.address, reserve);

    reserves.push(reserve);
    fees.push(one.div(1000).mul(3));
    weights.push(one.div(ntokens));
    ks.push(one);
  }

  await pool.initialize(one.mul(100000), addresses, reserves, fees, weights, ks);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

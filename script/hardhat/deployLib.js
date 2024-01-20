// const hre = require("hardhat");

// async function main() {
//   const pool = await hre.ethers.deployContract(
//     "Pool",
//     [
//       "Mulitswap Beta 1.1",
//       "β1.1",
//       BigInt(5e17),
//       process.env.FEE_RECIPIENT,
//       BigInt(1e18),
//       process.env.WRAPPED_NATIVE_TOKEN,
//     ],
//     {}
//   );

//   await pool.waitForDeployment();
//   console.log(`Pool deployed to ${pool.target}`);
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

// scripts/deploy.js

// const hre = require("hardhat");

// async function main() {
//   // Deploy the FloatingPoint library
//   const floatingPoint = await hre.ethers.deployContract("FloatingPoint");
//   await floatingPoint.waitForDeployment();

//   console.log("FloatingPoint library deployed to:", floatingPoint.address);

//   // Now deploy the Pool contract
//   const pool = await hre.ethers.deployContract(
//     "Pool",
//     [
//       "Mulitswap Beta 1.1",
//       "β1.1",
//       BigInt(5e17),
//       process.env.FEE_RECIPIENT,
//       BigInt(1e18),
//       process.env.WRAPPED_NATIVE_TOKEN,
//     ],
//     {
//       libraries: {
//         FloatingPoint: floatingPoint.address,
//       },
//     }
//   );
//   await pool.waitForDeployment();
//   console.log("Pool deployed to:", pool.address);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

const hre = require("hardhat");

async function main() {
  // Deploy the FloatingPoint library
  console.log("Deploying FloatingPoint library...");
  const FloatingPoint = await hre.ethers.getContractFactory("FloatingPoint");
  console.log("Get contract factory...");
  const floatingPoint = await FloatingPoint.deploy();
  console.log("Deploy contract...");
  await floatingPoint.waitForDeployment();
  const floatingPointAddress = await floatingPoint.getAddress();
  console.log("FloatingPoint library deployed to:", floatingPointAddress);

  // Now deploy the Pool contract
  const Pool = await hre.ethers.getContractFactory("Pool", {
    libraries: {
      FloatingPoint: floatingPointAddress,
    },
  });

  const pool = await Pool.deploy(
    "Multiswap Beta 1.1",
    "β1.1",
    BigInt(5e17),
    process.env.FEE_RECIPIENT,
    BigInt(1e18),
    process.env.WRAPPED_NATIVE_TOKEN
  );

  await pool.waitForDeployment();
  const poolAddress = await pool.getAddress();
  console.log("Pool deployed to:", poolAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

const hre = require("hardhat");

async function main() {
  const pool = await hre.ethers.deployContract(
    "Pool",
    [
      "Mulitswap Beta 1.1",
      "β1.1",
      BigInt(5e17),
      process.env.FEE_RECIPIENT,
      BigInt(1e18),
      process.env.WRAPPED_NATIVE_TOKEN
    ],
    {}
  );

  await pool.waitForDeployment();
  console.log(`Pool deployed to ${pool.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

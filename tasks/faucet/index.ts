import { task } from "hardhat/config";

task("faucet", "Sends ETH from an account (1-20) to an address")
  .addPositionalParam("senderStr", "The account # (1-20) that will send ETH")
  .addPositionalParam("receiver", "The address that will receive ETH")
  .setAction(async ( { senderStr, receiver }, { ethers }) => {

    const senders = await ethers.getSigners();

    const sender = senders[parseInt(senderStr)];

    const tx = await sender.sendTransaction({
      to: receiver,
      value: ethers.constants.WeiPerEther,
    });
    await tx.wait();

    console.log(`Transferred 1 ETH to ${receiver}`);
  });
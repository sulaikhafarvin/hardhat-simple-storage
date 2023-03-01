// scripts
// imports
const { ethers, run, network } = require("hardhat");

//async main

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract....");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Deploying contract to : ${simpleStorage.address}`);

  // if we have testnets, then verify contract

  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations....");
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }
  // Update the current value
  const currentValue = await simpleStorage.retrieve();
  console.log(`Current Value: ${currentValue}`);

  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);

  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated Value: ${updatedValue}`);
}
// verify function
async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verfied!");
    } else {
      console.log(e);
    }
  }
}

// main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// scripts for local environment and tasks for plugin

// task
const { task } = require("hardhat/config");

task("block-number", "Prints the current block number").setAction(
  // this means
  // const blockTask = async function() => {}
  // async function blockTask() {}
  // this is called anonymous function
  async (taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(`Current block number: ${blockNumber}`);
  }
);

module.exports = {};

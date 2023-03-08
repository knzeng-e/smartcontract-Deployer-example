// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {


  const Lock = await hre.ethers.getContractFactory("Lock1");
  const lock = await Lock.deploy();

  const implementationContract = await lock.deployed();

  console.log(
    `Lock1 implementation deployed to ${implementationContract.address}`
  );


  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const TEN_MINUTES_IN_SECS = 10 * 60;
  const unlockTime = currentTimestampInSeconds + TEN_MINUTES_IN_SECS;

  const lockedAmount = hre.ethers.utils.parseEther("1");

  const ProxyLock = await hre.ethers.getContractFactory("ProxyLock");
  const proxy = await ProxyLock.deploy(implementationContract.address, unlockTime, { value: lockedAmount });

  console.log(
    `Proxy deployed to ${proxy.address}`
  );

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

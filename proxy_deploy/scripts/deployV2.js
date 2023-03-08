// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
require("dotenv").config();

const provider = new hre.ethers.providers.JsonRpcProvider("https://volta-rpc.energyweb.org")
const adminWallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);

async function main() {

  const Lock2 = await hre.ethers.getContractFactory("Lock2");
  const lock2 = await Lock2.deploy();

  const newImplementationContract = await lock2.deployed();
  const proxyAddress = "0xFAe81bd5b4C6398de0A1BcB495A8775e08dB4975";

  console.log(
    `Lock2 deployed to ${newImplementationContract.address}\n`
  );

  const ProxyLock = await hre.ethers.getContractFactory("ProxyLock");

  const Proxy = ProxyLock.attach(proxyAddress);
  const upgradeTX = await Proxy.connect(adminWallet).upgrade(newImplementationContract.address);

  await upgradeTX.wait(4);
  console.log(`Upgrade TX :`, upgradeTX);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

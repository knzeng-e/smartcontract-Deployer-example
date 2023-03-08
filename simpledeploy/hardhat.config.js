require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.17",
      },
    ],
  },
  networks: {
    ganache: {
      url: "http://localhost:8545",
    },
    volta: {
      url: "https://volta-rpc.energyweb.org",
      chainId: 73799,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    }
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 21,
    enabled: false,
    coinmarketcap: process.env.COIN_MARKET_CAP_API,
    token: "EWT",
    enabled: process.env.GAS_REPORTING == "activate" ?  true : false
  },
};
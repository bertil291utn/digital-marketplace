/* hardhat.config.js */
require("@nomiclabs/hardhat-waffle")
require('dotenv').config();

module.exports = {
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {
      chainId: 31337
    },
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com/',
      accounts: [`0x${process.env.PRIVATE_WALLET_KEY}`]
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
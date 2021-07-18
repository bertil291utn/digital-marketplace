/* hardhat.config.js */
require("@nomiclabs/hardhat-waffle")
require('dotenv').config();

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    // hardhat: {
    //   chainId: 1337
    // },
    hardhat:{},
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${process.env.PROJECT_ID}`,
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
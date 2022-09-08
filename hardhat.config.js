/* hardhat.config.js */
require('@nomiclabs/hardhat-waffle');
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

module.exports = {
  defaultNetwork: 'mumbai',
  networks: {
    hardhat: {
      chainId: 31337,
    },
    mumbai: {
      url: process.env.NEXT_PUBLIC_ALCHEMY_NODE_URL,
      accounts: { mnemonic: process.env.NEXT_PUBLIC_MNEMONIC },
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  etherscan: {
    apiKey: { polygonMumbai: process.env.NEXT_PUBLIC_POLYGON_SCAN_URL },
  },
  solidity: {
    version: '0.8.16',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

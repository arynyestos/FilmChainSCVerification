require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    }
  },
  networks: {
    bsc: {
      url: 'https://bsc.drpc.org/', // Public RPC
    }
  },
  etherscan: {
    apiKey: process.env.BSC_SCAN_API_KEY
  }
};

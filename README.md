# FilmChain Smart Contract Verification

This repo showcases the work done to verify the [FILMChain smart contract](https://bscscan.com/address/0x17e842bec4d8c6fa612a21c087599698de5afd0a#code). This was a challenge given to me by the guys at [FilmChain](https://filmchain.xyz/). They sent me the .sol file, the URL to BSC Scan and told me it had been compiled using 200 optimization runs.

The first thing that came to mind to verify the contract was to try to do it on BSC Scan directly, however this of course couldn't be done, since the contract has several imports. Therefore, the best approach seemed to create a Hardhat project and do it from there.

## Hardhat project

This was a simple project with just the FILMChain.sol contract under `contracts`. 

### Hardhat config

The hardhat.config.js was configured setting BSC as the network and an API key for BSCScan. Also the Solidity version configured was 0.8.9, the same as the contract's, and the optimizer settings, enabled with 200 runs, as specified. However, after attempting to run the verification for the first time, Hardhat threw an error message saying version 0.8.18 was used to compile the contract at the specified address.

```JavaScript
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

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
```

### OpenZeppelin contracts

In order to verify the contract, the necessary OZ imports needed to be installed. For this, we looked at the date of deployment of the contract and searched in OZ's [releases](https://github.com/OpenZeppelin/openzeppelin-contracts/releases) page for a version of the contracts that could have been used by then. We installed version 4.9.2:
```bash
npm install @openzeppelin/contracts@4.9.2
```

### Verification

Finally, we verified the contract. For this, we compiled and run the verification command, specifying the network and the contract's address:
```bash
npx hardhat compile
npx hardhat verify --network bsc 0x17e842BEC4D8c6FA612A21c087599698dE5aFd0a
```

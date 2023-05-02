/** @type import('hardhat/config').HardhatUserConfig */
// Import the Ethers, Hardhat Toolbox, and Etherscan plugins 
// required to interact with our contracts
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require('@nomiclabs/hardhat-ethers');

// Import your private key from your pre-funded testing account
const { privateKeyMoonbase1, privateKeyMoonbase2,
  privateKeyAlithDev, privateKeyBaltatharDev
  // 可以根据下面链接的教程来获取Moonscan的API：
  // https://docs.moonbeam.network/cn/builders/build/eth-api/verify-contracts/etherscan-plugins/#moonscan-api
  , moonbeamMoonscanAPIKey
 } = require('./secrets.json');

module.exports = {
  solidity: "0.8.18",

  networks: {
    // Add the Moonbase Alpha and dev node network specification
    moonbase: {
      url: 'https://rpc.api.moonbase.moonbeam.network',
      chainId: 1287, // 0x507 in hex,
      accounts: [privateKeyMoonbase1, privateKeyMoonbase2]
    },
    dev: {
      url: 'http://127.0.0.1:9944',
      chainId: 1281, // 0x501 in hex,
      accounts: [privateKeyAlithDev, privateKeyBaltatharDev]
    }
  },
  // Set up your Moonscan API key for contract verification
  // Moonbeam and Moonbase Alpha Moonscan use the same API key
  etherscan: {
    apiKey: {
      // get the network name("moonbaseAlpha") used below from "npx hardhat verify --list-networks"
      moonbaseAlpha: moonbeamMoonscanAPIKey, // Moonbase Moonscan API Key
    }
  }
};

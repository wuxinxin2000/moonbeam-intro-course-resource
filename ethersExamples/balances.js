const ethers = require('ethers');

/*
   -- Define Provider & Variables --
*/
// Define network configurations
const providerRPC = {
   dev: {
     name: 'moonbeam-development',
     rpc: 'http://127.0.0.1:9944',
     chainId: 1281, // 0x501 in hex,
   },
   moonbase: {
      name: 'moonbase-alpha',
      rpc: 'https://rpc.api.moonbase.moonbeam.network',
      chainId: 1287, // 0x507 in hex,
   }
 };
 // Create ethers provider
 const provider = new ethers.JsonRpcProvider(
   providerRPC.dev.rpc, 
   {
     chainId: providerRPC.dev.chainId,
     name: providerRPC.dev.name,
   }
 ); //Change to correct network

// Variables
const addressFrom = 'ADDRESS-FROM-HERE'; // 
const addressTo = 'ADDRESS-TO-HERE';  // 

/*
   -- Balance Call Function --
*/
const balances = async () => {

   const balanceFrom = ethers.formatEther(await provider.getBalance(addressFrom));
   const balanceTo = ethers.formatEther(await provider.getBalance(addressTo));

   console.log(`The balance of ${addressFrom} is: ${balanceFrom} ETH`);
   console.log(`The balance of ${addressTo} is: ${balanceTo} ETH`);
};

balances();
const ethers = require('ethers');
const { abi } = require('./compile');

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
 };
 // Create ethers provider
 const provider = new ethers.JsonRpcProvider(
   providerRPC.dev.rpc, 
   {
     chainId: providerRPC.dev.chainId,
     name: providerRPC.dev.name,
   }
 );

// Variables
const contractAddress = '0x598efcBD0B5b4Fd0142bEAae1a38f6Bd4d8a218d'; // 'CONTRACT-ADDRESS-HERE';

/*
   -- Call Function --
*/
// Create Contract Instance
const incrementer = new ethers.Contract(contractAddress, abi, provider);

const get = async () => {
   console.log(`Making a call to contract at address: ${contractAddress}`);

   // Call Contract
  const data = await incrementer.number();

   console.log(`The current number stored is: ${data}`);
};

get();
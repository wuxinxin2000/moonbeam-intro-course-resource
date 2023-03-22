const ethers = require('ethers');
const contractFile = require('./compile');

/*
   -- Define Provider & Variables --
*/
// Provider
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
// The accounts info for Moonbeam development node can be found:
// https://docs.moonbeam.network/cn/builders/get-started/networks/moonbeam-dev/#pre-funded-development-accounts
const account_from = {
   privateKey: 'YOUR-PRIVATE-KEY-HERE',  // You can also put the private key in another file, export it and then import it here
};

const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

/*
   -- Deploy Contract --
*/
const deploy = async () => {
   let wallet = new ethers.Wallet(account_from.privateKey, provider);
   console.log(`Attempting to deploy from account ${wallet.address}`);

   // Create Contract Instance
   const incrementer = new ethers.ContractFactory(abi,bytecode, wallet);

   const contract = await incrementer.deploy(5);
   const txReceipt = await contract.deploymentTransaction().wait();

   console.log(
      `Contract deployed at address: ${txReceipt.contractAddress}`
   );
};

deploy();
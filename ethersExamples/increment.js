const ethers = require('ethers');
const { abi } = require('./compile');

/*
   -- Define Provider & Variables --
*/

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
const account_from = {
   privateKey: '0x5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5bdc4da702133',  // 'YOUR-PRIVATE-KEY-HERE'
};
const contractAddress = '0x598efcBD0B5b4Fd0142bEAae1a38f6Bd4d8a218d'; // 'CONTRACT-ADDRESS-HERE'
const _value = 3;

/*
   -- Send Function --
*/
// Create wallet
let wallet = new ethers.Wallet(account_from.privateKey, provider);

// Create contract instance with signer
const incrementer = new ethers.Contract(contractAddress, abi, wallet);

const increment = async () => {
   console.log(
      `Calling the increment by ${_value} function in contract at address: ${contractAddress}`
   );
   
  // Sign and send tx and wait for receipt
  const createReceipt = await incrementer.increment(_value);
  await createReceipt.wait();
   console.log(`Tx successful with hash: ${createReceipt.hash}`);
};

increment();
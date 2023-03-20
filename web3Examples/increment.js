const Web3 = require('web3');
const { abi } = require('./compile');

/*
   -- Define Provider & Variables --
*/
// Provider
const providerRPC = {
   development: 'http://localhost:9944',
   moonbase: 'https://rpc.api.moonbase.moonbeam.network',
};
const web3 = new Web3(providerRPC.development); //Change to correct network

// Variables
const account_from = {
   privateKey: '0x5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5bdc4da702133',  // 'YOUR-PRIVATE-KEY-HERE'
};
const contractAddress = '0x3469E1DaC06611030AEce8209F07501E9A7aCC69'; // 'CONTRACT-ADDRESS-HERE'
const _value = 3;

/*
   -- Send Function --
*/
// Create Contract Instance
const incrementer = new web3.eth.Contract(abi, contractAddress);

// Build Increment Tx
const incrementTx = incrementer.methods.increment(_value);

const increment = async () => {
   console.log(
      `Calling the increment by ${_value} function in contract at address: ${contractAddress}`
   );

   // Sign Tx with PK
   const createTransaction = await web3.eth.accounts.signTransaction(
      {
         to: contractAddress,
         data: incrementTx.encodeABI(),
         gas: await incrementTx.estimateGas(),
      },
      account_from.privateKey
   );

   // Send Tx and Wait for Receipt
   const createReceipt = await web3.eth.sendSignedTransaction(
      createTransaction.rawTransaction
   );
   console.log(`Tx successful with hash: ${createReceipt.transactionHash}`);
};

increment();
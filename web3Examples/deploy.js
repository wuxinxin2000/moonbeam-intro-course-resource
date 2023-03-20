const Web3 = require('web3');
const contractFile = require('./compile');

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
// The accounts info for Moonbeam development node can be found:
// https://docs.moonbeam.network/cn/builders/get-started/networks/moonbeam-dev/#pre-funded-development-accounts
const account_from = {
   privateKey: '0x5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5bdc4da702133',  // 'YOUR-PRIVATE-KEY-HERE'
   address: '0xf24FF3a9CF04c71Dbc94D0b566f7A27B94566cac',  // 'PUBLIC-ADDRESS-OF-PK-HERE'
};

const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

/*
   -- Deploy Contract --
*/
const deploy = async () => {
   console.log(`Attempting to deploy from account ${account_from.address}`);

   // Create Contract Instance
   const incrementer = new web3.eth.Contract(abi);

   // Create Constructor Tx
   const incrementerTx = incrementer.deploy({
      data: bytecode,
      arguments: [5],
   });

   // Sign Transacation and Send
   const createTransaction = await web3.eth.accounts.signTransaction(
      {
         data: incrementerTx.encodeABI(),
         gas: await incrementerTx.estimateGas(),
      },
      account_from.privateKey
   );

   // Send Tx and Wait for Receipt
   const createReceipt = await web3.eth.sendSignedTransaction(
      createTransaction.rawTransaction
   );
   console.log(
      `Contract deployed at address: ${createReceipt.contractAddress}`
   );
};

deploy();
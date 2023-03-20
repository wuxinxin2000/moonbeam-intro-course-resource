const Web3 = require('web3');

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
const addressFrom = '0xf24FF3a9CF04c71Dbc94D0b566f7A27B94566cac'; // 'ADDRESS-FROM-HERE'
const addressTo = '0x3Cd0A705a2DC65e5b1E1205896BaA2be8A07c6e0';  // 'ADDRESS-TO-HERE'

/*
   -- Balance Call Function --
*/
const balances = async () => {
   const balanceFrom = web3.utils.fromWei(
      await web3.eth.getBalance(addressFrom),
      'ether'
   );
   const balanceTo = web3.utils.fromWei(
      await web3.eth.getBalance(addressTo),
      'ether'
   );

   console.log(`The balance of ${addressFrom} is: ${balanceFrom} ETH`);
   console.log(`The balance of ${addressTo} is: ${balanceTo} ETH`);
};

balances();
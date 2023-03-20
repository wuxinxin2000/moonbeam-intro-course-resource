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

// The accounts info for Moonbeam development node can be found:
// https://docs.moonbeam.network/cn/builders/get-started/networks/moonbeam-dev/#pre-funded-development-accounts
const account_from = {
   privateKey: '0x5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5bdc4da702133',  // 'YOUR-PRIVATE-KEY-HERE'
};
const addressTo = '0x3Cd0A705a2DC65e5b1E1205896BaA2be8A07c6e0'; // 'Change addressTo'

 // Create wallet
 let wallet = new ethers.Wallet(account_from.privateKey, provider);

/*
   -- Create and Send Transaction --
*/
const send = async () => {
   
   console.log(`Attempting to send transaction from ${wallet.address} to ${addressTo}`);

// Create tx object
   const tx = {
      to: addressTo,
      value: ethers.parseEther('1'),
    };
  
    // 6. Sign and send tx - wait for receipt
    const createReceipt = await wallet.sendTransaction(tx);
    await createReceipt.wait();
    console.log(`Transaction successful with hash: ${createReceipt.hash}`);
};

send();
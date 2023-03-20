const Web3 = require('web3');
// Below link is where we can find the network endpoints of Moonbase Alpha
// https://docs.moonbeam.network/cn/learn/platform/networks/moonbase/#network-endpoints
const web3 = new Web3('wss://wss.api.moonbase.moonbeam.network');

web3.eth.subscribe('newBlockHeaders', (error, result) => {
    if (error)
        console.error(error);
})
    .on("connected", function (subscriptionId) {
        console.log(subscriptionId);
    })
    .on("data", function (log) {
        console.log(log);
    });
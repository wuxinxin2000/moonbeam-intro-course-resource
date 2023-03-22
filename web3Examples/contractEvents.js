const Web3 = require('web3');
const web3 = new Web3('ws://localhost:9944');

web3.eth.subscribe('logs', {
    address: 'CONTRACT-ADDRESS-HERE',
    topics: []
}, (error, result) => {
    if (error)
        console.error(error);
})
    .on("connected", function (subscriptionId) {
        console.log(subscriptionId);
    })
    .on("data", function (log) {
        console.log(log);
    });
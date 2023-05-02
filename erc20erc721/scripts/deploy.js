// scripts/deploy.js
async function main() {
    // 1. Get the contract to deploy
    const MyToken = await ethers.getContractFactory('MyToken');
    console.log('Deploying MyToken...');
 
    // 2. Instantiating a new MyToken smart contract
    const myToken = await MyToken.deploy();
 
    // 3. Waiting for the deployment to resolve
    await myToken.deployed();
 
    // 4. Use the contract instance to get the contract address
    console.log('MyToken deployed to:', myToken.address);

    // deploy MyNFTToken
    const MyNFTToken = await ethers.getContractFactory('MyNFTToken');
    console.log('Deploying MyNFTToken...');
    const myNFTToken = await MyNFTToken.deploy();
    await myNFTToken.deployed();
    console.log('MyNFTToken deployed to:', myNFTToken.address);
 }
 
 main()
    .then(() => process.exit(0))
    .catch((error) => {
       console.error(error);
       process.exit(1);
    });
 
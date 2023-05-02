// 导入必要的库和模块
const { assert, expect } = require("chai");
const { ethers } = require('hardhat');
require("@nomicfoundation/hardhat-toolbox");


// 使用 describe 函数来创建测试套件，并在其中编写相关的测试用例。
describe('MyNFTToken', function () {
    let myNFTToken;
    let owner;
    let addr1;
    let tokenUri;

    // 在每个测试用例之前部署合约
    beforeEach(async function () {
        // 部署合约
        const MyNFTToken = await ethers.getContractFactory('MyNFTToken');
        myNFTToken = await MyNFTToken.deploy();
        await myNFTToken.deployed();
        console.log('MyNFTToken deployed to:', myNFTToken.address);
        tokenUri = 'https://gateway.pinata.cloud/ipfs/bafkreietmmyxwlrcwab4f3icrdwsgyhjfc2ln7xsu7fynhl6cl4kxdpds4';

        // 获取测试账户，可以使用它们进行一系列交易的签名和发送等操作
        [owner, addr1] = await ethers.getSigners();
    });

    // 使用 it 函数来创建测试用例
    it('应正确初始化代币名称、符号和余额', async function () {
        const name = await myNFTToken.name();
        const symbol = await myNFTToken.symbol();
        const ownerBalance = await myNFTToken.balanceOf(owner.address);
        assert.equal(name, 'MyNFTToken', '代币名称不正确');
        assert.equal(symbol, 'MNFT', '代币符号不正确');
        assert.equal(ownerBalance.toString(), '0', '所有者的余额不正确');
    });

    it('铸造NFT', async function () {
        // 铸造一个NFT
        let tx_receipt = await myNFTToken.safeMint(addr1.address, tokenUri);
        // 等待交易完成
        await tx_receipt.wait();

        // 检查铸造后addr1的账户余额
        const addr1Balance = await myNFTToken.balanceOf(addr1.address);
        assert.equal(addr1Balance.toString(), '1', '接收地址的余额不正确');

        const uri = await myNFTToken.tokenURI(0);
        assert.equal(uri, tokenUri, '铸造的uri不正确');

        const tokenOwner = await myNFTToken.ownerOf(0);
        assert.equal(tokenOwner, addr1.address, '铸造的NFT所有者不正确');
    });

    it('转账NFT', async function () {
        // 铸造一个NFT
        let tx_receipt = await myNFTToken.safeMint(owner.address, tokenUri);
        // 等待交易完成
        await tx_receipt.wait();

        // 检查铸造后owner的账户余额
        let ownerBalance = await myNFTToken.balanceOf(owner.address);
        assert.equal(ownerBalance.toString(), '1', '发送地址的余额不正确');
        let addr1Balance = await myNFTToken.balanceOf(addr1.address);
        assert.equal(addr1Balance.toString(), '0', '接收地址的余额不正确');
        let tokenOwner = await myNFTToken.ownerOf(0);
        assert.equal(tokenOwner, owner.address, '铸造的NFT所有者不正确');

        let tx_receipt2 = await myNFTToken[('safeTransferFrom(address,address,uint256)')](owner.address, addr1.address, 0);
        // 等待交易完成
        await tx_receipt2.wait();

        // 检查转账后的账户余额
        ownerBalance = await myNFTToken.balanceOf(owner.address);
        assert.equal(ownerBalance.toString(), '0', '转账后发送地址的余额不正确');
        addr1Balance = await myNFTToken.balanceOf(addr1.address);
        assert.equal(addr1Balance.toString(), '1', '转账后接收地址的余额不正确');
        tokenOwner = await myNFTToken.ownerOf(0);
        assert.equal(tokenOwner, addr1.address, '转账后铸造的NFT所有者不正确');
    });
});

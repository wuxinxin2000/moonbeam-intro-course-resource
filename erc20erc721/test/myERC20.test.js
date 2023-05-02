// 导入必要的库和模块
const { assert, expect } = require("chai");
const { ethers } = require('hardhat');
require("@nomicfoundation/hardhat-toolbox");


// 使用 describe 函数来创建测试套件，并在其中编写相关的测试用例。
describe('MyToken', function () {
    let myToken;
    let owner;
    let addr1;

    // 在每个测试用例之前部署合约
    beforeEach(async function () {
        // 部署合约
        const MyToken = await ethers.getContractFactory('MyToken');
        myToken = await MyToken.deploy();
        await myToken.deployed();
        console.log('MyToken deployed to:', myToken.address);

        // 获取测试账户，可以使用它们进行一系列交易的签名和发送等操作
        [owner, addr1] = await ethers.getSigners();
    });

    // 使用 it 函数来创建测试用例
    it('应正确初始化代币名称、符号、发行总量和余额', async function () {
        const name = await myToken.name();
        const symbol = await myToken.symbol();
        const totalSupply = await myToken.totalSupply();
        const ownerBalance = await myToken.balanceOf(owner.address);
        assert.equal(name, 'MyToken', '代币名称不正确');
        assert.equal(symbol, 'MTK', '代币符号不正确');
        assert.equal(totalSupply.toString(), ethers.utils.parseUnits('1000', 18).toString(), '代币发行总量不正确');
        assert.equal(ownerBalance.toString(), totalSupply.toString(), '所有者的余额不正确');
    });

    it('转账代币', async function () {
        // 转账金额
        const amount = ethers.utils.parseUnits('100', 18);
        // 从owner转账给addr1 100代币
        let tx_receipt = await myToken.transfer(addr1.address, amount);
        // 等待转账完成
        await tx_receipt.wait();

        // 检查转账后owner的账户余额
        const ownerBalance = await myToken.balanceOf(owner.address);
        assert.equal(ownerBalance.toString(), ethers.utils.parseUnits('900', 18).toString(), '发送地址的余额不正确');

        // 检查转账后addr1的账户余额
        const addr1Balance = await myToken.balanceOf(addr1.address);
        assert.equal(addr1Balance.toString(), amount.toString(), '接收地址的余额不正确');
    });

    it('授权代币', async function () {
        const amount = ethers.utils.parseUnits('100', 18);

        // owner尚未给addr1授权，所以addr1不能代表owner转走owner的代币
        await expect(myToken.connect(addr1).transferFrom(owner.address, addr1.address, amount))
            .to.be.revertedWith("ERC20: insufficient allowance");

        // owner授权addr1 100个代币的操作权。授权后，这100个代币还是属于owner，但是addr1可以代表owner转走给任何人，包括他自己
        await (await myToken.connect(owner).approve(addr1.address, amount)).wait();

        // addr1代表owner，把owner的100代币转给了addr1
        let tx_receipt = await myToken.connect(addr1).transferFrom(owner.address, addr1.address, amount);
        await tx_receipt.wait();

        // 检查转账后owner的账户余额
        const ownerBalance = await myToken.balanceOf(owner.address);
        assert.equal(ownerBalance.toString(), ethers.utils.parseUnits('900', 18).toString(), '余额不正确');

        // 检查转账后addr1的账户余额
        const addr1Balance = await myToken.balanceOf(addr1.address);
        assert.equal(addr1Balance.toString(), amount.toString(), '余额不正确');
    });
});

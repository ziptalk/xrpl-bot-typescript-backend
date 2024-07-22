const { expect } = require("chai");

describe("ArbitrageContract", function () {
    let ArbitrageContract, arbitrageContract, owner, addr1;

    beforeEach(async function () {
        [owner, addr1, _] = await ethers.getSigners();
        ArbitrageContract = await ethers.getContractFactory("ArbitrageContract");
        arbitrageContract = await ArbitrageContract.deploy();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await arbitrageContract.owner()).to.equal(owner.address);
        });
    });

    describe("Transactions", function () {
        it("Should deposit tokens", async function () {
            await token.approve(arbitrageContract.address, ethers.utils.parseUnits("100", 18));
            await arbitrageContract.deposit(ethers.utils.parseUnits("100", 18), token.address);

            const deposits = await arbitrageContract.deposits(owner.address);
            expect(deposits[0].amount).to.equal(ethers.utils.parseUnits("100", 18));
            expect(deposits[0].token).to.equal(token.address);
        });

        it("Should execute arbitrage", async function () {
            await token.approve(arbitrageContract.address, ethers.utils.parseUnits("100", 18));
            await arbitrageContract.deposit(ethers.utils.parseUnits("100", 18), token.address);

            // Assume profit calculation returns 50 tokens as profit
            await arbitrageContract.executeArbitrage(owner.address, token.address);

            const balance = await token.balanceOf(owner.address);
            expect(balance).to.equal(ethers.utils.parseUnits("50", 18)); // Initial 1000 - 100 deposit + 50 profit
        });
    });
});


const { expect } = require("chai");

describe("ArbitrageContract", function () {
    let PriceOracle, priceOracle, ArbitrageContract, arbitrageContract, owner, addr1, token;

    beforeEach(async function () {
        [owner, addr1, _] = await ethers.getSigners();

        // Deploy PriceOracle
        PriceOracle = await ethers.getContractFactory("PriceOracle");
        priceOracle = await PriceOracle.deploy();
        await priceOracle.deployed();

        // Deploy ArbitrageContract with PriceOracle address
        ArbitrageContract = await ethers.getContractFactory("ArbitrageContract");
        arbitrageContract = await ArbitrageContract.deploy(priceOracle.address);
        await arbitrageContract.deployed();

        // Deploy mock token
        const Token = await ethers.getContractFactory("ERC20Token");
        token = await Token.deploy("Mock Token", "MTK", ethers.utils.parseUnits("1000000", 18));
        await token.deployed();
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

            // Set prices in the oracle
            await priceOracle.setCurrentPrice(token.address, ethers.utils.parseUnits("100", 18));
            await priceOracle.setArbitragePrice(token.address, ethers.utils.parseUnits("150", 18));

            // Execute arbitrage assuming profit calculation is correct
            await arbitrageContract.executeArbitrage(owner.address, token.address);

            // Verify the profit
            const balance = await token.balanceOf(owner.address);
            const expectedProfit = ethers.utils.parseUnits("50", 18); // Example profit
            expect(balance).to.equal(expectedProfit);
        });
    });
});


// const { expect } = require("chai");

// describe("ArbitrageContract", function () {
//     let ArbitrageContract, arbitrageContract, owner, addr1;

//     beforeEach(async function () {
//         [owner, addr1, _] = await ethers.getSigners();
//         ArbitrageContract = await ethers.getContractFactory("ArbitrageContract");
//         arbitrageContract = await ArbitrageContract.deploy();
//     });

//     describe("Deployment", function () {
//         it("Should set the right owner", async function () {
//             expect(await arbitrageContract.owner()).to.equal(owner.address);
//         });
//     });

//     describe("Transactions", function () {
//         it("Should deposit tokens", async function () {
//             await token.approve(arbitrageContract.address, ethers.utils.parseUnits("100", 18));
//             await arbitrageContract.deposit(ethers.utils.parseUnits("100", 18), token.address);

//             const deposits = await arbitrageContract.deposits(owner.address);
//             expect(deposits[0].amount).to.equal(ethers.utils.parseUnits("100", 18));
//             expect(deposits[0].token).to.equal(token.address);
//         });

//         it("Should execute arbitrage", async function () {
//             await token.approve(arbitrageContract.address, ethers.utils.parseUnits("100", 18));
//             await arbitrageContract.deposit(ethers.utils.parseUnits("100", 18), token.address);

//             // Assume profit calculation returns 50 tokens as profit
//             await arbitrageContract.executeArbitrage(owner.address, token.address);

//             const balance = await token.balanceOf(owner.address);
//             expect(balance).to.equal(ethers.utils.parseUnits("50", 18)); // Initial 1000 - 100 deposit + 50 profit
//         });
//     });
// });

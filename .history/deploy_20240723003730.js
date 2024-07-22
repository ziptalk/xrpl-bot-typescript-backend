async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const PriceOracle = await ethers.getContractFactory("PriceOracle");
    const priceOracle = await PriceOracle.deploy();
    await priceOracle.deployed();

    console.log("PriceOracle deployed to:", priceOracle.address);

    const ArbitrageContract = await ethers.getContractFactory("ArbitrageContract");
    const arbitrageContract = await ArbitrageContract.deploy(priceOracle.address);
    await arbitrageContract.deployed();

    console.log("ArbitrageContract deployed to:", arbitrageContract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

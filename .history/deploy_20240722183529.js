async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const ArbitrageContract = await ethers.getContractFactory("ArbitrageContract");
    const arbitrageContract = await ArbitrageContract.deploy();
    console.log("ArbitrageContract deployed to:", arbitrageContract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

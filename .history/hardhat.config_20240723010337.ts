import { HardhatUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";

const config: HardhatUserConfig = {
  solidity: "0.8.0",
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
};

export default config;

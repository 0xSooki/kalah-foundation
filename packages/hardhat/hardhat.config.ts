import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: { enabled: true, runs: 1000 },
    },
  },

  defaultNetwork: "hardhat",

  networks: {
    hardhat: {
      chainId: 1337,
    },
    optimismGoerli: {
      url: process.env.OPTIMISM_KEY,
      accounts: [process.env.PRIVATE_KEY as string],
    },
    baseGoerli: {
      url: process.env.BASE_GOERLI_RPC,
      accounts: [process.env.PRIVATE_KEY as string],
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY as string],
    },
    zoraGoerli: {
      url: "https://testnet.rpc.zora.energy/",
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },

  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY as string,
      optimisticGoerli: process.env.OPSCAN_API_KEY as string,
      baseGoerli: process.env.BASESCAN_API_KEY as string,
    },
  },

  gasReporter: {
    currency: "CHF",
    gasPrice: 21,
    enabled: true,
  },
};

export default config;

# Kalah Foundation

Welcome to Kalah Foundation! The first ever permissionless competitive kalah platform
governed by the law of code and math. Now live on [Optimism](https://goerli-optimism.etherscan.io/address/0x08700007D55d4c087d472c1e294DC792EC3F2272), [Base](https://goerli.basescan.org//address/0x505366E325FB6a80bfb44eA23e3eEEeC475172ab), and [Zora](https://testnet.explorer.zora.energy/address/0x505366E325FB6a80bfb44eA23e3eEEeC475172ab)

## Description

The Kalah Foundation is aiming to be an innovative decentralized gaming platform that brings classic board games, starting with Kalah, onto various networks. The platform enables players to engage in exciting matches of Kalah against each other in a trustless and transparent environment.

Players can create their game rooms or join existing ones, challenging friends or other users from around the world to a game of Kalah. What makes this platform even more exciting is the ability to put currency on the line. Players can wager their preferred currencies, such as USDC or other supported tokens, and the stakes are held in a secure contract until the game concludes.

## Getting Started

1. **Clone the Repository**: Begin by cloning this repository to your local machine using the following command:

   ```
   git clone git@github.com:0xSooki/kalah-foundation.git
   ```

2. **Navigate to the Project Directory**: Move into the project directory:

   ```
   cd kalah-foundation
   ```

3. **Install Dependencies**: To set up your development environment, run the following command:

   ```
   yarn install
   ```

## Available Scripts

In the project directory, you can use the following scripts to manage and deploy your Dapp:

- **`nextjs`**: Start the Next.js development server.

  ```
  yarn nextjs
  ```

- **`hnode`**: Start the Hardhat node for local blockchain development.

  ```
  yarn hnode
  ```

- **`deploy`**: Deploy your smart contracts to the blockchain.

  ```
  yarn deploy
  ```

- **`export`**: Export your hardhat artifacts.

  ```
  yarn export
  ```

- **`install`**: Install dependencies for both the Next.js and Hardhat packages.

  ```
  yarn install
  ```

## Package Structure

This project is organized into two packages:

1. **Next.js Package (`packages/nextjs`)**: This package contains your Dapp's front-end code developed using Next.js, along with related dependencies.

2. **Hardhat Package (`packages/hardhat`)**: This package holds your smart contracts and the configuration for deploying and interacting with them using Hardhat.

3. **Graph Package (`packages/graph`)**: This package includes The Graph protocol integration for efficient blockchain data indexing and querying.

## Contributing

Feel free to contribute to this repo by submitting pull requests or reporting issues.

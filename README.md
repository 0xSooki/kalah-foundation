# dapp-starter

Welcome to dapp-starter! This repository serves as a foundation for your decentralized application (Dapp) development using a combination of Next.js and Hardhat. It provides you with essential scripts to streamline your development process.

## Getting Started

1. **Clone the Repository**: Begin by cloning this repository to your local machine using the following command:

   ```
   git clone git@github.com:0xSooki/dapp-starter.git
   ```

2. **Navigate to the Project Directory**: Move into the project directory:

   ```
   cd dapp-starter
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

## Contributing

Feel free to contribute to this repo by submitting pull requests or reporting issues.

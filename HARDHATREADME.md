# Multiswap

Multiswap is an awesome, self-financing AMM model.

## Getting Setup

This project uses Hardhat for smart contract development in Solidity. Follow these instructions to set up your environment.

## Introduction to Hardhat

Hardhat is a development environment to compile, deploy, test, and debug Ethereum software. It's designed to help developers manage and automate the recurring tasks inherent to the process of building smart contracts and dApps.

### Prerequisites

- Node.js (version 16.0 or higher)
- NPM (Node Package Manager)

### Installation

1. **Clone the Repository**

2. **Install Dependencies**

`npm install --save-dev hardhat`
`npm install --save-dev @nomicfoundation/hardhat-verify`

To work along side foundry also install this plugin:

`npm install --save-dev hardhat @nomicfoundation/hardhat-foundry`

3. **Set up Environment Variables**

Create a `.env` file in the root directory and add necessary environment variables, e.g., private keys, etherscan API key, etc.

### Basic Commands

1. **Compile Contracts**

Compile your Solidity contracts with Hardhat.

`npx hardhat compile`

2. **Running Tests**

Test your contracts using Hardhat.

`npx hardhat test`

3. **Deploy Contracts**

Deploy your contracts to a specified network.

`npx hardhat run scripts/<deploy script> --network <network-name>`

4. **Verify Contracts**

Verify you contracts for block explorers. Make sure to set up your hardhat.config.js file to handle the network and explorer you want to verify for.

`npx hardhat verify --network <network-name> <contract-address> <constructor params>`

5. **Local Development Network**

Run a local Ethereum network for development.

`npx hardhat node`

6. **Interact with a Smart Contract**

Use Hardhat console to interact with your contracts.

`npx hardhat console --network <network-name>`

7. **Hardhat Help**

Get a list of available tasks and their descriptions.

`npx hardhat help`

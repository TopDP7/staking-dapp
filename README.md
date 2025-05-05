# 🪙 Token Staking DApp (Solidity + Hardhat + BSC Testnet)

This project is a simple decentralized staking application where users can stake ERC20 tokens and earn rewards over time.

Built with **Solidity**, **Hardhat**, and deployed to **Binance Smart Chain Testnet**, this project is ideal for demonstrating basic smart contract development and interaction.

---

## 📦 Overview

- 🧱 ERC20 token (`Token.sol`)
- 🔒 Staking contract (`StakingContract.sol`)
- 🛠 Deployment scripts (`deploy.js`)
- 🤝 Interaction script to simulate staking/unstaking (`interact.js`)
- ✅ Fully deployed on **BSC Testnet**

---

## 🔗 Live Contracts on BSC Testnet

- **Token Contract:** [`0x9Def5EC986ED1070dE7413e125b91BeBcfe82faa`](https://testnet.bscscan.com/address/0x9Def5EC986ED1070dE7413e125b91BeBcfe82faa)
- **Staking Contract:** [`0xd6Cb9d7A59bCD1DcBe5C2472593F799632bAE936`](https://testnet.bscscan.com/address/0xd6Cb9d7A59bCD1DcBe5C2472593F799632bAE936)

---

## 🚀 How It Works

### 1. Token Deployment

The ERC20 token is minted with a fixed supply of **1,000,000 TTK** tokens and assigned to the deployer.

### 2. Staking Logic

- Users stake a chosen amount of tokens via `stake(amount)`
- Tokens are locked in the contract
- Reward is calculated as a **10% annual yield**, prorated to the staking duration
- After a waiting period, users can call `unstake()` to withdraw their tokens + reward

---

## 🧪 Test Locally with Hardhat

### 1. Install dependencies

```bash
npm install

## 👤 Author

Built by [TopDP7](https://github.com/TopDP7)  
Telegram: @d_kw_f  
LinkedIn: linkedin.com/in/oleksandr-kosenko-/

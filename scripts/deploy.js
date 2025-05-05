const { ethers } = require("hardhat");

async function main() {
  // Deploy ERC20 Token
  const Token = await ethers.getContractFactory("Token");
  const initialSupply = ethers.parseUnits("1000000", 18); // 1,000,000 tokens with 18 decimals
  const token = await Token.deploy(initialSupply);
  await token.waitForDeployment();
  console.log("Token deployed to:", token.target);

  // Deploy Staking Contract, passing token address to constructor
  const Staking = await ethers.getContractFactory("StakingContract");
  const staking = await Staking.deploy(token.target);
  await staking.waitForDeployment();
  console.log("StakingContract deployed to:", staking.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

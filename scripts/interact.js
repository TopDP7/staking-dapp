const { ethers } = require("hardhat");

async function main() {
  // Contract addresses on BSC Testnet
  const tokenAddress = "0x9Def5EC986ED1070dE7413e125b91BeBcfe82faa";
  const stakingAddress = "0xd6Cb9d7A59bCD1DcBe5C2472593F799632bAE936";

  const [deployer] = await ethers.getSigners();
  console.log("\n👤 Deployer address:", deployer.address);

  const Token = await ethers.getContractAt("Token", tokenAddress);
  const Staking = await ethers.getContractAt("StakingContract", stakingAddress);

  const balanceBefore = await Token.balanceOf(deployer.address);
  console.log("💰 Token balance before staking:", ethers.formatUnits(balanceBefore, 18));

  const stakeAmount = ethers.parseUnits("1000", 18);
  console.log("🔐 Approving staking contract to spend 1000 tokens...");
  const approveTx = await Token.approve(stakingAddress, stakeAmount);
  await approveTx.wait();
  console.log("✅ Approved.");

  console.log("📥 Staking 1000 tokens...");
  const stakeTx = await Staking.stake(stakeAmount);
  await stakeTx.wait();
  console.log("✅ Staked.");

  const [stakedAmount, stakedAt, rewardNow] = await Staking.getStakeInfo(deployer.address);
  console.log("\n📊 Stake Info:");
  console.log("  Amount:", ethers.formatUnits(stakedAmount, 18));
  console.log("  Timestamp:", stakedAt.toString());
  console.log("  Estimated reward (now):", ethers.formatUnits(rewardNow, 18));

  console.log("\n⏳ Waiting 10 seconds before unstaking...");
  await new Promise((resolve) => setTimeout(resolve, 10000));

  const [amountBeforeUnstake, , rewardBeforeUnstake] = await Staking.getStakeInfo(deployer.address);
  console.log("\n🔍 Checking stake before unstaking...");
  console.log("  Amount:", ethers.formatUnits(amountBeforeUnstake, 18));
  console.log("  Reward:", ethers.formatUnits(rewardBeforeUnstake, 18));

  if (amountBeforeUnstake == 0n) {
    console.log("❌ No tokens staked. Cannot proceed with unstake.");
    return;
  }

  // At this point, unstake only proceeds if tokens are actually staked
  console.log("📤 Unstaking...");
  const unstakeTx = await Staking.unstake();
  await unstakeTx.wait();
  console.log("✅ Unstaked and reward claimed!");

  const balanceAfter = await Token.balanceOf(deployer.address);
  console.log("\n💰 Token balance after unstake:", ethers.formatUnits(balanceAfter, 18));
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exitCode = 1;
});

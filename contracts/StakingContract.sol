// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StakingContract {
    IERC20 public stakingToken;
    uint256 public rewardRate = 10; // 10% annual rate
    uint256 public constant SECONDS_IN_YEAR = 24 * 60 * 60; // testing = 1 day

    struct Stake {
        uint256 amount;
        uint256 timestamp;
    }

    mapping(address => Stake) public stakes;

    constructor(address _tokenAddress) {
        stakingToken = IERC20(_tokenAddress);
    }

    function stake(uint256 _amount) external {
        require(_amount > 0, "Amount must be > 0");
        require(stakingToken.transferFrom(msg.sender, address(this), _amount), "Transfer failed");

        // Overwrites any existing stake with new amount and timestamp
        stakes[msg.sender] = Stake({
            amount: _amount,
            timestamp: block.timestamp
        });
    }

    function calculateReward(address _user) public view returns (uint256) {
        Stake memory userStake = stakes[_user];
        if (userStake.amount == 0) return 0;

        uint256 stakedTime = block.timestamp - userStake.timestamp;

        // Annual reward formula based on time elapsed
        uint256 reward = (userStake.amount * rewardRate * stakedTime) / (SECONDS_IN_YEAR * 100);

        return reward;
    }

    function unstake() external {
        Stake memory userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No tokens staked");

        uint256 reward = calculateReward(msg.sender);
        uint256 totalAmount = userStake.amount + reward;

        delete stakes[msg.sender];

        require(stakingToken.transfer(msg.sender, totalAmount), "Transfer failed");
    }

    function getStakeInfo(address _user) external view returns (
        uint256 amount,
        uint256 timestamp,
        uint256 reward
    ) {
        Stake memory s = stakes[_user];
        return (s.amount, s.timestamp, calculateReward(_user));
    }
}

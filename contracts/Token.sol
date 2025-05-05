// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor(uint256 initialSupply) ERC20("TestToken", "TTK") {
        // Mint the full initial supply to the deployer
        _mint(msg.sender, initialSupply);
    }
}

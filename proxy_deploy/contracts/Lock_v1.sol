// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Lock1 {
    uint public unlockTime;
    address payable public owner;

    constructor() {}

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");

        payable(msg.sender).transfer(address(this).balance);
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Lock2 {
    address private implementation;
    address admin;
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        payable(msg.sender).transfer(address(this).balance);
    }
}

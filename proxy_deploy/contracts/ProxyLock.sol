// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ProxyLock {
    address private implementation;
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(address implementationAddress, uint _unlockTime) payable {
        implementation = implementationAddress;
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        require(msg.value > 0, "No funds provided");

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function upgrade(address newImplementation) external {
        require(msg.sender == owner, "Not Allowed");
        implementation = newImplementation;
    }

    fallback() external payable {

        (bool isTxSuccessful, ) = implementation.delegatecall(
            abi.encodeWithSignature("withdraw()")
        );

        require(isTxSuccessful, "Something went wrong during delegation call");
    }

    receive() external payable {}
}

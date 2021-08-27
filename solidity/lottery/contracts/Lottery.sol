// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

contract Lottery{
    address public manager;

    constructor(){
        manager = msg.sender;
    }
}
pragma solidity ^0.8.7;

contract Inbox{
    string public message;
    
    constructor (string memory message_) {
        message = message_;
    }
    
    function setMessage(string calldata message_) public{
        message = message_;
    }

}

/*
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Inbox{
    string public message;
    
    constructor (string memory message_) {
        message = message_;
    }
    
    function setMessage(string calldata message_) public{
        message = message_;
    }
    
    function getMessage() public view returns(string memory){
        return message;
    }
}
*/

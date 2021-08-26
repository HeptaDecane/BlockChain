pragma solidity ^0.7.6;

contract Inbox{
    string public message;
    
    constructor (string memory message_) {
        message = message_;
    }
    
    function setMessage(string memory message_) public{
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
    
    function setMessage(string memory message_) public{
        message = message_;
    }
    
    function getMessage() public view returns(string memory){
        return message;
    }
}
*/

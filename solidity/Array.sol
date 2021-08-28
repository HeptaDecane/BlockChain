// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Array{
    uint256[] public array;
    
    function getArray() public view returns(uint256[] memory){
        return array;
    }
    
    function getLength() public view returns(uint256){
        return array.length;
    }
    
    function pushElement(uint256 element) public{
        array.push(element);
    }
    
    function popElement() public{
        array.pop();
    }
    
    function setElement(uint256 i, uint256 element) public{
        array[i] = element;
    }
}
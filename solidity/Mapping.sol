// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Mapping{
    mapping(uint256=>string) map;
    mapping(uint256=>bool) boolMap;
    
    function addOrUpdate(uint256 key, string memory value) public{
        map[key] = value;
        boolMap[key] = true;
    }
    
    function get(uint256 key) public view returns(string memory){
        return map[key];
    }
    
    function contains(uint256 key) public view returns(bool){
        return boolMap[key];
    }
    
    function deleteEntry(uint256 key) public{
        delete map[key];
        boolMap[key] = false;
    }

}

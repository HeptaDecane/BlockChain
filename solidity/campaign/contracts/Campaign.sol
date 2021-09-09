// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Campaign{
    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool completed;
        uint256 approvalsCount;
        mapping(address=>bool) approvals;
    }
    
    address public manager;
    uint256 public minimumContribution;
    uint256 public nContributors;
    mapping(address=>bool) public contributors;
    Request[] public requests;
    
    
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    
    constructor(uint256 _minimumContribution){
        manager = msg.sender;
        minimumContribution = _minimumContribution;
        nContributors = 0;
    }
    
    function contribute() public payable{
        require(msg.value >= minimumContribution);
        
        if(!contributors[msg.sender])
            nContributors++;
            
        contributors[msg.sender] = true;
    }
    
    function createRequest(string calldata description, uint256 value, address recipient) public restricted{
        Request storage request = requests.push();
        
        request.description = description;
        request.value =  value;
        request.recipient = recipient;
        request.completed = false;
        request.approvalsCount = 0;
    }
    
    function approveRequest(uint256 index) public {
        Request storage request = requests[index];
        
        require(contributors[msg.sender]);
        require(!request.approvals[msg.sender]);
        
        request.approvals[msg.sender] = true;
        request.approvalsCount++;
    }
    
}

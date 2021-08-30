// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Lottery{
    address public manager;
    address[] public players;

    constructor(){
        manager = msg.sender;
    }

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    function enter() public payable {
        require(msg.value >= 0.01 ether);

        players.push(msg.sender);
    }

    function getPlayers() public view returns(address[] memory){
        return players;
    }

    function getCount() public view returns(uint256){
        return players.length;
    }

    function pickWinner() public restricted returns(address){
        require(players.length > 0);

        uint256 index = random() % players.length;
        address winner = players[index];
        payable(winner).transfer(address(this).balance);

        players = new address[](0);
        return winner;
    }

    function random() private view returns(uint256){
        uint256 source = block.difficulty + block.timestamp + address(this).balance;
        return uint256(keccak256(abi.encodePacked(source)));
    }

}
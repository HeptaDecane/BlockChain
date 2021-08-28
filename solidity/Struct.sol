// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

contract Struct{
    struct Date {
        string day;
        uint16 date;
        uint16 month;
        uint16 year;
    }
    
    Date public today;
    
    constructor(string memory day, uint16 date, uint16 month, uint16 year){
        // today = Date(day,date,month,year);
        today = Date({
            day: day,
            date: date,
            month: month,
            year: year
        });
    }
    
    function setDay(string calldata day) public{
        today.day = day;
    }
    function setDate(uint16 date) public{
        today.date = date;
    }
    function setMonth(uint16 month) public{
        today.month = month;
    }
    function setYear(uint16 year) public{
        today.year = year;
    }
    
    function getDay() public view returns(string memory){
        return today.day;
    }
    function getDate() public view returns(uint16){
        return today.date;
    }
    function getMonth() public view returns(uint16){
        return today.month;
    }function getYear() public view returns(uint16){
        return today.year;
    }
    
}
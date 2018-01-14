pragma solidity ^0.4.10;

contract Trace {
    string storedData;
    
	event Temp(string data);
	
	function set(string data) {
	    storedData = data;
	    Temp(storedData);	
	    
	}
    
	function get() constant returns (string retVal) {
        return storedData;
	}
}

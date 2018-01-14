// import ethereum web3 nodejs library
var Web3 = require('web3');

// set your web3 object
var web3 = new Web3();



// set the web3 object local blockchain node
//web3.setProvider(new web3.providers.HttpProvider('ws://localhost:8545'));
web3.setProvider(new web3.providers.WebsocketProvider('ws://localhost:8546'));
// log some web3 object values to make sure we're all connected
console.log(web3.version.api);

//  ABI - Application Binary Interface Definition for the contract that we want to interact with.
var abi='[{"constant":false,"inputs":[{"name":"data","type":"string"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"retVal","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"data","type":"string"}],"name":"Temp","type":"event"}]';

var ABI = JSON.parse(abi);
var trace_contract = '0xB7DDf60DfA9a068A4c574B60f47C3e6C55BBab66';




// now retrieve your contract object with the ABI and contract address values


var trace = new web3.eth.Contract(ABI, trace_contract);

// indefinite recursive loop to read the 'ItBlinks' event in the blink contract.
var event = trace.events.Temp( {}, function(error, result) {
  if (error) {
      console.log(error); 
  }
  else{
  	// when ItBlinks event is fired, output the value 'data' from the result object and the block number
    var msg = "\n\n*********";
    msg += "Blink!: " + result.raw.data + " (block:" + result.blockNumber + ")";
    msg += "*********";
    
    console.log(msg);

  }
}).on('data', function(event){
    console.log(event); // same results as the optional callback above
})
.on('changed', function(event){
    // remove event from local database
})
.on('error', console.error);



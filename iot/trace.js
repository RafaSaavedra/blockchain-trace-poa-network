// import ethereum web3 nodejs library
var Web3 = require('web3');

// set your web3 object
var web3 = new Web3();

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://192.168.2.1')
web3.setProvider(new web3.providers.WebsocketProvider('ws://localhost:8546'));

client.on('connect', function () {
  client.subscribe('stats');
})

var abi='[{"constant":false,"inputs":[{"name":"data","type":"string"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"retVal","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"data","type":"string"}],"name":"Temp","type":"event"}]';

var ABI = JSON.parse(abi);
var trace_contract = '0xB7DDf60DfA9a068A4c574B60f47C3e6C55BBab66';

var trace = new web3.eth.Contract(ABI, trace_contract);

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  trace.methods.set(message).send({from: '0x1927655a916D59d4fab274615545827BACF03038'}).on('transactionHash', function(hash){
  console.log('hash>',hash);
  }).on('error', console.error);
});











const Telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')

var Web3 = require('web3');

const bot = new Telegraf(process.env.BOT_TOKEN)
const telegram = new Telegram(process.env.BOT_TOKEN)

// set your web3 object
var web3 = new Web3();

chatId = 0

function registerSession(ctx) {
  chatId = ctx.chat.id
}

// function sendPing() {
//   if ( chatId != 0 ) {
//     telegram.sendMessage(chatId, 'Ping')
//   }
//   setTimeout(sendPing, 5000)
// }


bot.start((ctx) => {
  console.log('started:', ctx.from.id)
  return ctx.reply('Welcome!')
  resgisterSession(ctx)
})

bot.command('help', (ctx) => ctx.reply('Try send a sticker!'))
bot.hears('hi', (ctx) => {
    ctx.reply('Hey there!')
    if ( chatId == 0 ) {
      registerSession(ctx)
    } 
  })
bot.hears(/buy/i, (ctx) => ctx.reply('Buy-buy!'))
bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.startPolling()


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
    var msg = "Coffee drying temperature update:\n";
    msg += JSON.stringify(result.returnValues.data);
    
    console.log(msg);

    if ( chatId != 0 ) {
      telegram.sendMessage(chatId, msg)
    }
    
    console.log(msg);
    
  }
}).on('data', function(event){
    console.log(event);
})
.on('changed', function(event){
  console.log(event);
})
.on('error', console.error);


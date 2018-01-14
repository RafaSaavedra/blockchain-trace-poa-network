const Telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')
const bot = new Telegraf(process.env.BOT_TOKEN)
const telegram = new Telegram(process.env.BOT_TOKEN)

chatId = 0

function registerSession(ctx) {
  chatId = ctx.chat.id
}

function sendPing() {
  if ( chatId != 0 ) {
    telegram.sendMessage(chatId, 'Ping')
  }
  setTimeout(sendPing, 5000)
}


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

setTimeout(sendPing, 5000)
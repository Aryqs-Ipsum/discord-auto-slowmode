const Discord = require('discord.js')
const client = new Discord.Client()

var lastset = Date.now(),
    seconds = 0

// transform chars number into time for slowmode
function charsTotime(x) {
    return x >= 32 ? -22 + 6.44 * Math.log(x) : 0
}

client.on('message', msg => {
    // check delay between 2 messages, less than 10s
    if(Date.now() - lastset < 10000) {
        delayOffset = 10000 - (Date.now() - lastset)
        msg.channel.setRateLimitPerUser(delayOffset > 0 ? delayOffset / 1000 : 0)
    }
    // setup new slowmode if last slowmode time is passed
    else if(msg.content && lastset + seconds * 1000 < Date.now()) {
        lastset = Date.now()
        seconds = charsTotime(msg.content.length)
        msg.channel.setRateLimitPerUser(seconds)
    }
    // check if contain medias
    if (msg.attachments.size > 0) {
        msg.channel.setRateLimitPerUser(10)
    }
})

client.login(BOT_TOKEN)
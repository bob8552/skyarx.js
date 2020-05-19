const Discord = require("discord.js");
module.exports = {
    name: "ping",
    aliases: ["latency"],
    category: "misc",
    description: "ping and stuff",
    usage: "[command | alias]",
    run: async (bot, message, args) => {
      message.channel.send(`🏓 Pong ! \n 🏓 Your Latency is ${Date.now() - message.createdTimestamp}ms \n 🏓 My latency is ${Math.round(bot.ws.ping)}ms !`);
    }
}
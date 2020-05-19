const Discord = require("discord.js");
module.exports = {
    name: "test",
    aliases: ["amievenworking?"],
    category: "misc",
    description: "Sends a message",
    usage: "[command | alias]",
    run: async (bot, message, args) => {
        message.reply('Test')
        }
    }

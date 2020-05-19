const Discord = require("discord.js");
module.exports = {
    name: "avatar",
    aliases: ["a","pfp"],
    category: "misc",
    description: "Gives profile image",
    usage: "[command | alias]",
    run: async (bot, message, args) => {
            var member = message.mentions.users.first()
            if(!member) return message.channel.send('Please tag a user.')
            message.channel.send(member.avatarURL())
        }
    }
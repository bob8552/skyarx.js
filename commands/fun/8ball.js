const Discord = require("discord.js");
module.exports = {
    name: "8ball",
    aliases: ["eightball"],
    category: "fun",
    description: "Randomised answers to questions",
    usage: "[command | alias]",
    run: async (bot, message, args) => {

        var eightball = [
            "Yes.",
            "No.",
            "Maybe?",
            "Probably.",
            "I don't think so.",
            "No, not at all.",
            "You can think so...",
            "Up to you!",
            "Bruh..?",
        ]

        if (!args[0]) message.reply("**Please provide a question.**")
        else message.reply(eightball[Math.floor(Math.random() * eightball.length).toString(16)]);
    }
}
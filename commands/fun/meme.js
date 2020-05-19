const Discord = require("discord.js");
const fetch = require('node-fetch');
module.exports = {
    name: "meme",
    aliases: ["funny"],
    category: "fun",
    description: "Uses meme API to send a randomised meme.",
    usage: "[command | alias]",
    run: async (bot, message, args) => {
        const msg = await message.channel.send("**Fetching meme, please wait...**")
        fetch('https://meme-api.herokuapp.com/gimme')
            .then(res => res.json())
            .then(json => {
                let embed = new Discord.MessageEmbed()
                    .setTitle(json.title)
                    .setImage(json.url)
                    .setFooter(`${json.postLink} | ${json.subreddit}`)
                    .setColor('RANDOM')
                msg.edit(embed)
            });
    }
}
const Discord = require("discord.js");
module.exports = {
    name: "botinfo",
    aliases: ["binfo"],
    category: "misc",
    description: "bot info",
    usage: "[command | alias]",
    run: async (bot, message, args) => {
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Information')
        .setDescription('A bot for discord')
        .addFields(
            { name: 'Help & Extra Info', value: 'https://discord.gg/tcxbt5p' },
            { name: 'Version', value: bot.version }
        )
        .setTimestamp()
        .setFooter(`${message.author.username}`);
    
    message.channel.send(exampleEmbed);
    }
}

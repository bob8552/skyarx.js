const Discord = require("discord.js");
module.exports = {
    name: "help",
    aliases: ["hp"],
    category: "misc",
    description: "Gives information for help",
    usage: "[command | alias]",
    run: async (bot, message, args) => {
        const embedhelp = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Help')
            .setDescription('**Use >botinfo for bot information or >cmds for commands.**')
            .addFields(
            { name: '**Required roles**', value: '**`"Muted", "Verified"`**' },
            { name: '**Required channels**', value: '**`"logs", "verify", "polls"`**' }
            )
            .setTimestamp()
            .setFooter(`${message.author.username}`);

            message.channel.send(embedhelp);
        }
    }

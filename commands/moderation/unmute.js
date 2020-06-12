const Discord = require("discord.js");
module.exports = {
    name: "unmute",
    aliases: ["unsilence"],
    category: "moderation",
    description: "Removes the mute role from a user",
    usage: "[command | alias]",
    run: async (bot, message, args) => {
        if (message.deletable) message.delete();
        const toWarn = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
        const logchannel = message.guild.channels.cache.find(c => c.name === bot.logchans) || message.channel;

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("❌ **You dont have permission to unmute people !**")
        }


        if (!toWarn) {
            return message.reply(`❌ **I couldn't find that member !**`)
        }

        const role = message.channel.guild.roles.cache.find(role => role.name === "Muted");
        if (!toWarn.roles.cache.some(r => r.name === role.name)) return message.reply("**This user isnt already muted.**");

        toWarn.roles.remove(role)
        .catch(err => {
            const errbed = new Discord.MessageEmbed()
                .setColor('#ff1100')
                .setTitle('Error !')
                .setDescription(`**An error has occured, are they not already muted ?:** \`${err}\``)
            if (err) return message.channel.send(errbed)
        });

        return message.channel.send(`:white_check_mark: ${toWarn} **has been sucessfuly unmuted !**`).then(logchannel.send(`${toWarn} has been unmuted !`))
            .catch(err => {
                const errbed = new Discord.MessageEmbed()
                    .setColor('#ff1100')
                    .setTitle('Error !')
                    .setDescription(`**An error has occured:** \`${err}\``)
                if (err) return message.channel.send(errbed)
            });
        }
    }
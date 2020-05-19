const Discord = require("discord.js");
module.exports = {
    name: "warn",
    aliases: ["w"],
    category: "moderation",
    description: "Warn a user.",
    usage: "[command | alias]",
    run: async (bot, message, args) => {
        if (message.deletable) message.delete();
        const toWarn = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
        const logchannel = message.guild.channels.cache.find(c => c.name === "logs") || message.channel;

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("❌ **You dont have permission to warn people**")
        }


        if (!toWarn) {
            return message.reply(`❌ **I cannot find this user !**`)
        }

        const reason = args.slice(1).join(" ");

        if (!args[1]) {
            return message.reply("❌ **Supply a reason to warn**")
        }

        const embedyeet = new Discord.MessageEmbed()
            .setColor(`GREEN`)
            .setTitle('User Warned !')
            .setDescription("Details:")
            .setThumbnail(toWarn.user.avatarURL())
            .addFields(
                { name: "Moderator", value: `\`${message.author.tag}\``, inline: true },
                { name: "Moderator ID", value: `\`${message.author.id}\``, inline: true },
                { name: "User", value: `${toWarn}`, inline: true },
                { name: "User ID", value: `\`${toWarn.id}\``, inline: true },
                { name: "Warned in", value: `\`${message.channel.name}\``, inline: true },
                { name: "Reason", value: `\`${reason}\``, inline: true },
            )
            .setTimestamp()
            .setFooter(`${message.author.username}`)

        return logchannel.send(embedyeet).then(message.channel.send(`:white_check_mark: ${toWarn} **has been sucessfuly warned ! Check** ${logchannel} **for information.**`).then(toWarn.send(`**You have been warned in** \`${message.guild.name}\` **by** \`${message.author.tag}\` **due to** \`${reason}\` **!**`)))
            .catch(err => {
                const errbed = new Discord.MessageEmbed()
                    .setColor('#ff1100')
                    .setTitle('Error !')
                    .setDescription(`❌ **An error has occured:** \`${err}\``)
                if (err) return message.channel.send(errbed)
            });

    }
}

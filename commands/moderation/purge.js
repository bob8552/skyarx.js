const Discord = require("discord.js");
module.exports = {
    name: "purge",
    aliases: ["delete"],
    category: "moderation",
    description: "Deletes the amount of messages specified",
    usage: "[command | alias]",
    run: async (bot, message, args) => {
        const logChannel = message.guild.channels.cache.find(c => c.name === bot.logchans) || message.channel;
        const amount = args.join(' ');

        if (message.deletable) message.delete();

        if (!amount) {
            return message.reply("**Specify an amount of messages to purge !**");

        }

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.reply("**You cant purge messages**");
        }

        if (isNaN(amount)) {
            return message.reply("❌ **Please input a number**");

        }

        if (amount > 100) {
            return message.reply("❌ **You can't delete more than 100 messages**");
        }

        if (amount < 2) {
            return message.reply("❌ **You need to delete at least 2 messages**");
        }

        message.channel.bulkDelete(amount)
            .catch(err => {
                const errbed = new Discord.MessageEmbed()
                    .setColor('#ff1100')
                    .setTitle('❌ Error !')
                    .setDescription(`\`${err}\``)
                if (err) return message.channel.send(errbed)
            });

        let embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle(`Messages Deleted`)
            .setFooter(message.author.tag)
            .setTimestamp()
            .addFields(
                { name: 'Amount', value: `\`${amount}\``, inline: true },
                { name: 'Deleted in', value: `\`${message.channel.name}\``, inline: true },
                { name: 'Deleted by', value: `\`${message.author.tag}\``, inline: true },

                { name: 'Channel ID', value: `\`${message.channel.id}\``, inline: true },
                { name: 'Member ID', value: `\`${message.author.id}\``, inline: true },
            )
            .setDescription(`**Information**`);

        return logChannel.send(embed)
    }
}
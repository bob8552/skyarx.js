const Discord = require('discord.js');

module.exports = {
    name: "mute",
    aliases: ["silence"],
    category: "moderation",
    description: "Mute a user.",
    usage: "[command | alias]",
    run: async (bot, message, args) => {
        if (message.deletable) message.delete();
        const toWarn = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
        const logchannel = message.guild.channels.cache.find(c => c.name === "logs") || message.channel;
        const role = message.channel.guild.roles.cache.find(role => role.name === "Muted");

        if (!message.member.hasPermission("MANAGE_MESSAGES")) { 
          return message.reply("❌ **You do not have permission to mute users !**")
        }
    
    
        if (!toWarn) {
            return message.reply('❌ **I couldn\'t find that member !**')
        }

        const reason = args.slice(1).join(" ");
    
        if(!args[1]) {
            return message.reply("❌ **You need to provide a reason to mute someone !**")
        }

        if (toWarn.roles.cache.some(r => r.name === role.name)) return message.reply("**This user is already muted.**");
    
        toWarn.roles.add(role)
        .catch(err => {
            const errbed = new Discord.MessageEmbed()
                .setColor('#ff1100')
                .setTitle('Error !')
                .setDescription(`❌ **An error has occured, have you made a role named "Muted" ? Do they have higher permissions ?**`)
            if (err) return message.channel.send(errbed)
        });
    
        const embedyeet = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('User muted !')
            .setDescription("Details:")
            .setThumbnail(toWarn.user.avatarURL())
            .addFields(
                { name: "Moderator", value: `\`${message.author.tag}\``, inline: true },
                { name: "Moderator ID", value: `\`${message.author.id}\``, inline: true },
                { name: "User", value: `${toWarn}`, inline: true },
                { name: "User ID", value: `\`${toWarn.id}\``, inline: true },
                { name: "Muted in", value: `\`${message.channel.name}\``, inline: true },
                { name: "Reason", value: `\`${reason}\``, inline: true },
            )
            .setTimestamp()
            .setFooter(`${message.author.username}`)
    
        return logchannel.send(embedyeet).then(message.channel.send(`:white_check_mark: ${toWarn} **has been successfully muted for the reason** \`${reason}\``).then(toWarn.send(`**You have been muted in** \`${message.guild.name}\` **by** \`${message.author.tag}\` **due to** \`${reason}\` **!**`)))
            .catch(err => {
                const errbed = new Discord.MessageEmbed()
                    .setColor('#ccc920')
                    .setTitle('Error !')
                    .setDescription(`**❌ An error has occured, does the "logs" channel exist ?:** \`${err}\``)
                if (err) return message.channel.send(errbed)
            });
        }
    }
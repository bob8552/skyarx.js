const Discord = require("discord.js");
module.exports = {
    name: "kick",
    aliases: ["exile"],
    category: "moderation",
    description: "Kick a mentioned user",
    usage: "[command | alias]",
    run: async (bot, message, args) => {
            
      //Patch for the ">b a n" bug.
      
      try{
      
        if (message.deletable) message.delete();

        const logs3 = message.guild.channels.cache.find(c => c.name === bot.logchans) || message.channel;

        if (!args[0]) {
            return message.reply("❌ **Please provide a person to kick !**")
        }

        if (!args[1]) {
            return message.reply("❌ **Provide a reason for kick !**");
        }

        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply("❌ **You cannot kick members !**");

        }

        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.reply("❌ **I cannot kick members !**");
        }

        const toBan = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (!toBan) {
            return message.reply("❌ **I couldn't find that member !**");
        }

        if (toBan.id === message.author.id) {
            return message.reply("❌ **You cannot kick yourself !**");
        }

        if (!toBan.kickable) {
            return message.reply("❌ **I cannot kick them: Please check our permissions !**")
        }

        const embedddette = new Discord.MessageEmbed()
            .setTitle('**Member kicked !**')
            .setDescription(`**Information:**`)
            .setColor('RED')
            .setThumbnail(toBan.user.avatarURL())
            .addFields(
                { name: 'Member kicked', value: `${toBan}` },
                { name: 'Member ID', value: `\`${toBan.id}\`` },
                { name: 'Moderator', value: `\`${message.author.tag}\`` },
                { name: 'Moderator ID', value: `\`${message.author.id}\`` },
                { name: 'Reason', value: `\`${args.slice(1).join(" ")}\`` },
                { name: 'Channel', value: `\`${message.channel.name}\`` },
              )
        setTimeout(function () {
        toBan.kick(args.slice(1).join(" "))
        }, 5000);
        return logs3.send(embedddette).then(message.channel.send(`:white_check_mark:  ${toBan} **has successfully been kicked ! Check** ${logs3} **for more information !**`).then(toBan.send(`**You have been kicked from** \`${message.guild.name}\` **by** \`${message.author.tag}\` **due to** \`${args.slice(1).join(" ")}\` **!**`)))
        .catch(err => {
            const errbed = new Discord.MessageEmbed()
                .setColor('#ff1100')
                .setTitle('Error !')
                .setDescription(`❌ **An error has occured:** \`${err}\``)
            if (err) return message.channel.send(errbed)
        });
        
      } catch (e) {
        message.reply(`Something went wrong, DM \`Bob8552#0471\` or use >bugreport to report the bug.`)
      }


    }


}
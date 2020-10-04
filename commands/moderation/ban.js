const Discord = require("discord.js");
module.exports = {
    name: "ban",
    aliases: ["permexile"],
    category: "moderation",
    description: "Ban a certain user",
    usage: "[command | alias]",
    run: async (bot, message, args) => {
      
      //Patch for the ">b a n" bug.
      
      try{
      
        if (message.deletable) message.delete();

        const logs3 = message.guild.channels.cache.find(c => c.name === bot.logchans) || message.channel;

        if (!args[0]) {
            return message.reply("❌ **Please provide a person to ban !**")
        }

        if (!args[1]) {
            return message.reply("❌ **Provide a reason for ban !**");
        }

        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply("❌ **You cannot ban members !**");

        }

        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.reply("❌ **I cannot ban members !**");
        }

        const toBan = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if (!toBan) {
            return message.reply("❌ **I couldn't find that member !**");
        }

        if (toBan.id === message.author.id) {
            return message.reply("❌ **You cannot ban yourself !**");
        }

        if (!toBan.bannable) {
            return message.reply("❌ **I cannot ban them: Please check our permissions !**")
        }

        const embedddette = new Discord.MessageEmbed()
            .setTitle('**Member banned !**')
            .setDescription(`**Information:**`)
            .setColor('RED')
            .setThumbnail(toBan.user.avatarURL())
            .addFields(
                { name: 'Member banned', value: `${toBan}` },
                { name: 'Member ID', value: `\`${toBan.id}\`` },
                { name: 'Moderator', value: `\`${message.author.tag}\`` },
                { name: 'Moderator ID', value: `\`${message.author.id}\`` },
                { name: 'Reason', value: `\`${args.slice(1).join(" ")}\`` },
                { name: 'Channel', value: `\`${message.channel.name}\`` },
              )
        setTimeout(function () {
        	toBan.ban(args.slice(1).join(" "))
        }, 5000);
        return logs3.send(embedddette).then(message.channel.send(`:white_check_mark:  ${toBan} **has successfully been banned ! Check** ${logs3} **for more information !**`).then(toBan.send(`**You have been banned from** \`${message.guild.name}\` **by** \`${message.author.tag}\` **due to** \`${args.slice(1).join(" ")}\` **!**`)))
        .catch(err => {
            const errbed = new Discord.MessageEmbed()
                .setColor('#ff1100')
                .setTitle('Error !')
                .setDescription(`❌ **An error has occured:** \`${err}\``)
            if (err) return message.channel.send(errbed)
        });
        
      } catch (e) {
        message.reply(`Something went wrong.`)
      }


    }


}

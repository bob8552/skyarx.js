module.exports={
    name: "slowmode",
    aliases: ["sm"],
    category: "utility",
    description: "Set the slowmode in a channel",
    usage: "[command | alias]",
    run: async (bot, message, args) => {
        const logchannel = message.guild.channels.cache.find(c => c.name === bot.logchans) || message.channel;
        const Discord = require('discord.js')

        if (!message.member.hasPermission("MANAGE_MESSAGES")) { 
            return message.reply("❌ **You do not have permission to add slowmode !**")
        }

        if(!args[0]) return message.reply(`**You did not specify the time in seconds you wish to set this channel's slow mode to!**`);
        if(isNaN(args[0]))return message.reply(`That is not a number.`);
        if(args[0] > 21600) return message.reply("**Please input a number less than 21600 !**");
        let reason = args.slice(1).join(" ");
        if(!reason) return message.reply("**Please add a reason for slow mode !**");
        message.channel.setRateLimitPerUser(args[0],reason);

        const embedddette = new Discord.MessageEmbed()
        .setTitle('**Slowmode Enabled**')
        .setDescription(`**Information:**`)
        .setColor('GREEN')
        .addFields(
            { name: 'Moderator', value: `\`${message.author.tag}\``, inline: true },
            { name: 'Moderator ID', value: `\`${message.author.id}\``, inline: true },
            { name: 'Slowmode time', value: `\`${args[0]}\``, inline: true },
            { name: 'Reason', value: `\`${reason}\``, inline: true },
            { name: 'Channel', value: `\`${message.channel.name}\``, inline: true },
          { name: 'Channel ID', value: `\`${message.channel.id}\``, inline: true },
          )

        message.channel.send(`**Set the slowmode of this channel to \`${args[0]}\` with the reason: \`${reason}\`**`).then(logchannel.send(embedddette));
    }
}
const Discord = require("discord.js");
module.exports = {
  name: "poll",
  aliases: ["vote"],
  category: "info",
  description: "Vote for whatever you want !",
  usage: "[command | alias]",
  run: async (bot, message, args) => {
    if (message.deletable) message.delete();

    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.reply("❌ **You dont have permission to make polls !**");
    }

    const pollchannel =
      message.guild.channels.cache.find(c => c.name === "polls") ||
      message.guild.channels.cache.find(c => c.name === "announcements") ||
      message.guild.channels.cache.find(c => c.name === "public-announcements");
    
    if(!pollchannel) return message.reply("❌ **Please make a 'polls' or 'announcements' channel !**");
    if(!args.join(" ")) return message.reply("❌ **Please add something to vote on.**");

    const reason = args.join(" ");

    const emb = new Discord.MessageEmbed()
      .setColor(`GREEN`)
      .setFooter(`✅: Yes, ❎: No, ❔: Not sure`)
      .setDescription(`${reason}`)
      .setTitle(`New poll by ${message.author.tag}`)
      .setTimestamp();

    message.reply("✅ **Your poll has been successfully posted !**");
    const poll1 = await pollchannel.send(emb);
    poll1.react("✅");
    poll1.react("❎");
    poll1.react("❔");
  }
};

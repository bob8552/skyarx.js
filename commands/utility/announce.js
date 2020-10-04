const Discord = require("discord.js");
module.exports = {
  name: "announce",
  aliases: ["annc"],
  category: "utility",
  description: "Announce stuff",
  usage: "[command | alias]",
  run: async (bot, message, args) => {
    if (message.deletable) message.delete();

    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.reply("❌ **You dont have permission to make announcements !**");
    }

    const pollchannel =
      message.guild.channels.cache.find(c => c.name === "announcements") ||
      message.guild.channels.cache.find(c => c.name === "public-announcements");
    
    if(!pollchannel) return message.reply("❌ **Please make an 'announcements' channel !**");

		const title = args[0];
    if (!title) return message.reply("❌ **Please add a title.**");

		const reason = args.slice(1).join(" ");
    if (!reason) return message.reply("❌ **Please add some content.**");

    const emb = new Discord.MessageEmbed()
      .setColor(`GREEN`)
      .setFooter(`Announcement by ${message.author.tag}`)
      .setDescription(`${reason}`)
      .setTitle(`${title}`)
      .setTimestamp();

    message.reply("✅ **Your announcement has been successfully posted !**");
    pollchannel.send(emb);
  }
};

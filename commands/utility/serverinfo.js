const Discord = require("discord.js");
module.exports = {
  name: "serverinfo",
  aliases: ["serverstats", "sinfo"],
  category: "utility",
  description: "Returns server information",
  usage: "[command | alias]",
  run: async (bot, message, args) => {
    const embedhelpserverinfo = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Server Info")
      .setDescription("Information about the server")
      .setTimestamp()
      .setFooter(`${message.author.tag}`)
      .addFields(
        { name: "**Server Name**", value: `> ${message.guild.name}` },
        { name: "**Server ID**", value: `> ${message.guild.id}` },
        { name: "**Owner**", value: `> <@${message.guild.ownerID}>` },
        { name: "**Owner's ID**", value: `> ${message.guild.ownerID}` },
        { name: "**Server Region**", value: `> ${message.guild.region}` },
        { name: "**Member Count**", value: `> ${message.guild.memberCount}` }
      );
    message.channel.send(embedhelpserverinfo);
  }
};
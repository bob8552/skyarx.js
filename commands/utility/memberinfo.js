const Discord = require("discord.js");
module.exports = {
  name: "memberinfo",
  aliases: ["userinfo", "whois", "minfo"],
  category: "utility",
  description: "Gives information of a member",
  usage: "[command | alias]",
  run: async (bot, message, args) => {
    const member = message.mentions.members.first();

    if (!member) {
      return message.channel.send("User not found.");
    }

    const joined = member.joinedAt;

    const embedd = new Discord.MessageEmbed()
      .setFooter(`${message.guild.name}`)
      .setThumbnail(member.user.avatarURL())
      .setColor("RANDOM")
      .setTitle("User Information")

      .addFields(
        { name: "Nickname: ", value: `> ${member.displayName}` },
        { name: "Joined at: ", value: `> ${joined}` },
        { name: "Guild: ", value: `> ${message.channel.guild}` }
      )
      .setDescription(`**Member:** ${member}`)
      .addFields(
        { name: "Account ID: ", value: `> ${member.user.id}` },
        { name: "Account discriminator: ", value: `> ${member.user.tag}` },
        { name: "Account Username: ", value: `> ${member.user.username}` },
        { name: "Account created at", value: `> ${member.user.createdAt}`}
      )

      .setTimestamp();

    message.channel.send(embedd);
  }
};

const Discord = require("discord.js");
module.exports = {
  name: "uptime",
  aliases: ["ut"],
  category: "misc",
  description: "Gives bot uptime.",
  usage: "[command | alias]",
  run: async (bot, message, args) => {
    let totalSeconds = bot.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    const ebbet = new Discord.MessageEmbed()
      .setTitle("Uptime")
      .setDescription(
        `**Days: \`${days}\`, Hours: \`${hours}\`, Minutes: \`${minutes}\`, Seconds: \`${seconds}\`**`
      )
      .setColor("RANDOM")
      .setFooter(message.author.username)
      .setTimestamp();
    message.channel.send(ebbet);
  }
};

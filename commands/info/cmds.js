const Discord = require("discord.js");
module.exports = {
  name: "cmds",
  aliases: ["commands"],
  category: "misc",
  description: "List of every command",
  usage: "[command | alias]",
  run: async (bot, message, args) => {
    const embedcmds = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`**Commands ${bot.version}**`)
      .addFields(
        {
          name: "**Info commands**",
          value:"**`>botinfo, >help, >ping, >bugreport, >uptime, >cmds`**"
        },

        {
          name: "**Fun commands**",
          value: "**`>8ball, >meme, >die, >textart`**"
        },
        
        {
          name: "**Utility commands**",
          value: "**`>avatar, >memberinfo, >serverinfo, >verify, >poll, >slowmode, >channel`**"
        },

        {
          name: "**Moderator commands**",
          value: "**`>ban, >kick, >mute, >unmute, >warn, >purge`**"
        },
        
        {
          name: "**Owner only commands**",
          value: "**`>say, >shutdown, >eval`**"
        },

        {
          name: `**Changelog ${bot.version}**`,
          value: "**`Rebranded the bot.`**"
        }
      )
      .setTimestamp()
      .setFooter(`${message.author.username}`);

    message.channel.send(embedcmds).catch(err => {
      if (err) return message.channel.send(`An error has occured: ${err}`);
    });
  }
};

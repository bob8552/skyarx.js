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
      .setTitle("**Commands V1.1.0**")
      .addFields(
        {
          name: "**Info commands**",
          value:"**`>botinfo, >help, >test, >ping, >bugreport, >uptime, >cmds`**"
        },

        {
          name: "**Fun commands**",
          value: "**`>8ball, >meme, >die`**"
        },
        
        {
          name: "**Utility commands**",
          value: "**`>avatar, >memberinfo, >serverinfo, >verify, >poll, >slowmode`**"
        },

        {
          name: "**Moderator commands**",
          value: "**`>ban, >kick, >mute, >unmute, >warn, >purge`**"
        },
        
        {
          name: "**Owner only commands**",
          value: "**`>leave, >say`**"
        },

        {
          name: "**1.1.0 Changelog**",
          value: "**`Slowmode command added, more command catergories and reorganised the code into other folders.`**"
        }
      )
      .setTimestamp()
      .setFooter(`${message.author.username}`);

    message.channel.send(embedcmds).catch(err => {
      if (err) return message.channel.send(`An error has occured: ${err}`);
    });
  }
};

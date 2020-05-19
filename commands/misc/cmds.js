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
      .setTitle("Commands V1.0.0")
      .addFields(
        {
          name: "**Misc**",
          value:"**`>botinfo, >help, >test, >ping, >serverinfo, >userinfo, >avatar, >bugreport, >say (Owner only), >uptime`**"
        },

        {
          name: "**Fun**",
          value: "**`>8ball, >meme, >die`**"
        },

        {
          name: "**Moderator commands**",
          value: "**`>ban, >mute, >unmute, >warn, >purge, >poll (requires 'poll' or 'announcements' channel), >verify (not necessarily moderator only)`**"
        },

        {
          name: "**1.0.0 Changelog**",
          value: "**`Perfected logging embeds. After 1.0.0 release, updates will become less frequent. Updates will not cease, though.`**"
        }
      )
      .setTimestamp()
      .setFooter(`${message.author.username}`);

    message.channel.send(embedcmds).catch(err => {
      if (err) return message.channel.send(`An error has occured: ${err}`);
    });
  }
};

module.exports = {
  name: "channel",
  aliases: ["chan"],
  category: "utility",
  description: "Create a channel or delete one",
  usage: "[command | alias]",
  run: async (bot, message, args) => {
    const logchannel =
      message.guild.channels.cache.find(c => c.name === bot.logchans) ||
      message.channel;
    const Discord = require("discord.js");
    try {
      if (!message.member.hasPermission("MANAGE_CHANNELS")) {
        return message.reply(
          "You don't have the correct permissions to do this."
        );
      }
      if (!args[0]) return message.reply(`You did not specify an action.`);
      if (args[0].toLowerCase() === "create") {
        let name = args.slice(1).join(" ");
        //i actually need to use these for once
        const embedddette = new Discord.MessageEmbed()
          .setTitle("**Channel created**")
          .setDescription(`**Information:**`)
          .setColor("GREEN")
          .addFields(
            {
              name: "Creator",
              value: `\`${message.author.tag}\``,
              inline: true
            },
            {
              name: "Creator ID",
              value: `\`${message.author.id}\``,
              inline: true
            },
            { name: "Channel Name", value: `\`${name}\``, inline: true }
          );

        if (!name) {
          return message.reply("Please input a channel name.");
        } else {
          if (name.length > 100)
            return message.reply(
              "You can't make a channel with a name more than 100 characters"
            );
          return message.guild.channels
            .create(name)
            .then(
              message.reply("✅ **I was able to make the channel**")
                .then(logchannel.send(embedddette))
            );
        }
      } else if (args[0].toLowerCase() === "delete") {
        let name = args.slice(1).join(" ");
        const embedddette66 = new Discord.MessageEmbed()
          .setTitle("**Channel deleted**")
          .setDescription(`**Information:**`)
          .setColor("RED")
          .addFields(
            {
              name: "Deleted by",
              value: `\`${message.author.tag}\``,
              inline: true
            },
            {
              name: "User ID",
              value: `\`${message.author.id}\``,
              inline: true
            },
            { name: "Channel Name", value: `\`${name}\``, inline: true }
          );
        if (!name) {
          return message.reply("Please input a channel name to delete.");
        } else {
          const channeltodel = message.guild.channels.cache.find(
            c => c.name === name
          );
          if (!channeltodel) return message.reply("This channel dosent exist.");
          return channeltodel
            .delete()
            .then(
              message
                .reply("✅ **I was able to delete that channel**")
                .then(logchannel.send(embedddette66))
            );
        }
      } else {
        message.reply("This is not a valid action.");
      }
    } catch (e) {
      message.reply(
        `Something went wrong, DM \`Bob8552#7468\` or use >bugreport to report the bug.`
      );
    }
  }
};

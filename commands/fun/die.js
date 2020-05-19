const Discord = require("discord.js");
module.exports = {
  name: "die",
  aliases: ["death"],
  category: "fun",
  description: "Uses arguments for a death thing",
  usage: "[command | alias]",
  run: async (bot, message, args) => {
    if (!args[0])
      return message.reply("Input args 1 ! `>die <name> <died from> <by>`");

    if (!args[1])
      return message.reply("Input args 2 ! `>die <name> <died from> <by>`");

    if (!args[2])
      return message.reply("Input args 3 ! `>die <name> <died from> <by>`");

    message.channel.send(`**${args[0]}** died from a **${args[1]}** by **${args.slice(2).join(" ")}**`)
      .catch(err => {
        const errbed = new Discord.MessageEmbed()
          .setColor("#ff1100")
          .setTitle("Error !")
          .setDescription(`❌ **An error has occured`);
        if (err) return message.channel.send(errbed);
      });
  }
};

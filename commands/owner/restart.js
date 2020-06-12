const Discord = require("discord.js");
module.exports = {
  name: "shutdown",
  aliases: ["sd"],
  category: "owner",
  description: "Owner only, shutoff bot",
  usage: "[command | alias]",
  run: async (bot, message, args) => {
    if (message.deletable) message.delete();

    const logss =
      message.guild.channels.cache.find(c => c.name === bot.logchans) ||
      message.channel;

    if (!bot.owner.includes(message.author.id)) {
      return message.channel.send("You cannot run this command!");
    }

    /*bot.destroy();
    console.log("Bot restarted !");
    setTimeout(() => {
      bot.login(process.env.TOKEN);
      logss.send("Bot has been restarted at " + Date.now().toLocaleString());
      message.channel.send("Bot restarted.");
    }, 1000);*/

    message.channel
      .send("Shutting down...")
      .then(msg => bot.destroy())
      .then(() => console.log("Bot shutdown"))
  }
};

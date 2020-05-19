const Discord = require("discord.js");
module.exports = {
  name: "leave",
  aliases: ["removebot"],
  category: "owner",
  description: "Remove bot from server in case of abuse.",
  usage: "[command | alias]",
  run: async (bot, message, args) => {
    
  if (message.author.id !== "685767907082633244") {
      return message.reply("Only the owner can run this command !")
  }
    
  message.channel.send(`**I am leaving this guild on request of my owner, due to the misuse of me. DM \`${message.author.tag}\` if you would like to appeal.**`);
    
    setTimeout(function () {
      message.guild.leave().catch(err => { if (err) return console.log(`Error with leaving guild ${message.guild.id} due to ${err}`)});
    }, 5000);
    
  }
};

var express = require("express");
var app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);

const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({ disableMentions: "everyone" });
const prefix = process.env.PREFIX;
const token = process.env.TOKEN;

bot.prefix = prefix;
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(bot);
});

bot.on("ready", () => {
  console.log(`${bot.user.tag} is now online.`);
  bot.user.setActivity(">help | v1.2.1", {
    type: "PLAYING"
  });
})

bot.on("message", async message => {
  message.member;
  message.author;
  require("./events/message")(bot, message);
});

bot.on("message", async message => {
  require("./events/wordFilter")(bot, message);
});

bot.login(token);

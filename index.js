var express = require("express");
var app = express();
app.get("/", (request, response) => response.sendStatus(200));
app.listen(process.env.PORT);

const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({ disableMentions: "everyone" });
const prefix = process.env.PREFIX;
const token = process.env.TOKEN;

bot.prefix = prefix;
bot.owner = ["571757070735638556", "683667593772400711"];
bot.logchans = "logs" || "bot-logs";
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.categories = fs.readdirSync("./commands/");
bot.version = process.env.VERSION;

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(bot);
});

bot.on("ready", () => {
  console.log(`${bot.user.tag} is now online.`);
  bot.user.setActivity(`>help | ${bot.version}`, {
    type: "PLAYING"
  });
});

bot.on("message", async message => {
  message.member;
  message.author;
  require("./events/message")(bot, message);
});

bot.on("message", async message => {
  require("./events/filtering/filter")(bot, message);
});

bot.login(token);

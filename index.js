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
bot.owner = ["757625027343417344"];
bot.logchans = "logs";
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.categories = fs.readdirSync("./commands/");
bot.version = process.env.VERSION;

["command"].forEach(handler => {
	require(`./handlers/${handler}`)(bot);
});

bot.on("ready", () => {
	console.log(`${bot.user.tag} is now online.`);
	bot.user.setActivity(`basically rebranded skyarx.js`, {
		type: "PLAYING"
	});
});

bot.on("guildMemberAdd", member => {

	const logs = member.guild.channels.cache.get("733672950099869756");

	let embed = new Discord.MessageEmbed()
		.setColor("RED")
		.setTitle("Joined")
		.setDescription(`New member \`${member.user.tag}\` has joined!`)
		.setThumbnail(member.user.avatarURL())
		.addFields(
			{ name: "Join date", value: `\`${member.joinedAt}\``, inline: true },
			{ name: "ID", value: `\`${member.user.id}\``, inline: true },
			{ name: "Tag", value: `\`${member.user.tag}\``, inline: true },
			{ name: "Created", value: `\`${member.user.createdAt}\``, inline: true }
		);
	logs.send(embed);

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

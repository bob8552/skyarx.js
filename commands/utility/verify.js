const Discord = require("discord.js");
module.exports = {
    name: "verify",
    aliases: ["v"],
    category: "utility",
    description: "Gives the member a verified/member role !",
    usage: "[command | alias]",
    run: async (bot, message, args) => {
        if (message.deletable) message.delete();
        const logchannel = message.guild.channels.cache.find(c => c.name === bot.logchans) || message.channel;
        if (message.channel.name !== "verify") return message.reply("❌ **You can only run this command in a verification channel !**");
        const role = message.channel.guild.roles.cache.find(role => role.name === "Member") || message.channel.guild.roles.cache.find(role => role.name === "Verified");
        if (!role) return message.reply("❌ **Couldn't find a 'Member' or 'Verified' role.**");
        if (message.member.roles.cache.some(r => r.name === role.name)) return message.reply("**You are already verified !**");

        const verificationembed = new Discord.MessageEmbed()
            .setTitle("Verified")
            .setDescription(`New member \`${message.author.tag}\` has verified !`)
            .setColor(`RED`)
            .setThumbnail(message.author.avatarURL())
            .addFields(
                { name: "Join date", value: `\`${message.member.joinedAt}\``, inline: true },
                { name: "ID", value: `\`${message.author.id}\``, inline: true },
                { name: "Created", value: `\`${message.author.createdAt}\``, inline: true },
            );
        message.member.roles.add(role).then(message.reply("✅ **You are now sucessfully verified !**").then(logchannel.send(verificationembed)));

    }
}
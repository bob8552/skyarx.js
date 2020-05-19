const Discord = require("discord.js");
module.exports = {
    name: "say",
    aliases: ["repeat"],
    category: "owner",
    description: "Repeat arguments passed in",
    usage: "[command | alias]",
    run: async (bot, message, args) => {
        if (message.deletable) message.delete();
        const logs1 = message.guild.channels.cache.find(c => c.name === "logs") || message.channel;

        if (message.author.id !== "685767907082633244") {
            return message.reply("Only the owner can run this command !")
        }

        if (args.length < 1)
            return message.channel.send("Input something to say !")

        message.channel.send(args.join(" "))
            .catch(err => {
                const errbed = new Discord.MessageEmbed()
                    .setColor('#ff1100')
                    .setTitle('Error !')
                    .setDescription(`❌ **An error has occured with >say !:** \`${err}\``)
                if (err) return message.channel.send(errbed)
            });
    }
}
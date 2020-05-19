const Discord = require("discord.js");
module.exports = {
    name: "bugreport",
    aliases: ["breport"],
    category: "info",
    description: "report bugs !",
    usage: "[command | alias]",
    run: async (bot, message, args) => {
        const logs1 = bot.channels.cache.get("711376062998773781")

        if (args.length < 1)
            return message.reply("❌ **Input something to report !**")

        const bugreportembed = new Discord.MessageEmbed()
            .setTitle("New bug report !")
            .setFooter(`Reported by ${message.author.tag}`)
            .setDescription(`**${args.join(" ")}**`)
            .addFields(
                {name: "**Guild**", value: `**\`${message.guild.name}\`**`},
                {name: "**ID**", value: `**\`${message.author.id}\`**`},
                {name: "**Tag**", value: `**\`${message.author.tag}\`**`},
            )
            .setColor('RED')
            .setTimestamp()
        
        logs1.send(bugreportembed).then(message.channel.send(`:white_check_mark: \`${message.author.tag}\`, **your bug has been successfully reported !**`))
            .catch(err => {
                const errbed = new Discord.MessageEmbed()
                    .setColor('#ff1100')
                    .setTitle('Error !')
                    .setDescription(`❌ **An error has occured, please try again later** \`${err}\``)
                if (err) return message.channel.send(errbed)
            });
    }
}
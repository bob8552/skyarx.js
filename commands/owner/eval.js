const Discord = require("discord.js");
module.exports = {
    name: "eval",
    aliases: ["evaX"],
    category: "owner",
    description: "Owner only, run code",
    usage: "[command | alias]",
    run: async (bot, message, args) => {
        if (message.deletable) message.delete();

        const logss = message.guild.channels.cache.find(c => c.name === bot.logchans) || message.channel;

        if (!bot.owner.includes(message.author.id)) {
            return message.channel.send("You cannot run this command!");
        }

        if (!args[0]) {
            return message.channel.send("Add code to evaluate")
        }

        try {
            if (args.join(" ").toLowerCase().includes("token")) {

                return;
            }

            const toEval = args.join(" ");
            const evaluated = eval(toEval);

            let embed = new Discord.MessageEmbed()
                .setColor("#ff1100")
                .setTimestamp()
                .setFooter(`${message.author.username}`)
                .setTitle("~~evaX~~ Eval")
                .addField(`Code To Run: \`${(args.join(" "))}\``)
                .addField("Run: ", evaluated)
                .addField("Type of:", typeof(evaluated));

            logss.send(embed);
        } catch (e) {
                const errbed = new Discord.MessageEmbed()
                    .setColor('#ff1100')
                    .setTitle('Error !')
                    .setDescription(`**An error has occured with eval:** \`${e}\``)
                if (e) return logss.send(errbed)

        }
    }
}
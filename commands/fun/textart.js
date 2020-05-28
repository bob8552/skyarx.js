const figlet = require('figlet');

module.exports = {
    name: "textart",
    aliases: ["ascii"],
    category: "info",
    description: "ping and stuff",
    usage: "[command | alias]",
    run: async (bot, message, args) => {
        if(!args[0]) return message.channel.send('Please provide some text to create ascii art.');

        const toAscii = args.join(" ");

        figlet.text(toAscii, function (err, data){

            if (err) {
                message.reply("Something went wrong.")
            }

            if(data.length > 2000) return message.channel.send('Please provide text shorter than 2000 characters.');

            message.channel.send('```' + data + "Requested by " + message.author.username + '```');
        });
    }
}
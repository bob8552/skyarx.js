const Timeout = new Set();
const {MessageEmbed} = require('discord.js')
const prefix = process.env.PREFIX;
const ms = require('ms')

var BLACKLISTED = ["538803922609897482","474370022056263693"]

// Blacklist: 1: Slimine, 2: Sup3r.

module.exports=async(bot,message)=>{
    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith(prefix)) return;

    if(!message.member) message.member = await message.guild.fetchMember(message);
    if(!message.guild) return;
    if(BLACKLISTED.includes(message.author.id)) return message.reply(":x: **You have been blacklisted from using this bot.**");

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;
    
    let command = bot.commands.get(cmd);
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));
    
    if (command) {
        if(command.timeout){
            if(Timeout.has(`${message.author.id}${command.name}`)) {
                return message.reply(`You can only use this command every ${ms(command.timeout)}!`)
            }else{
                
                command.run(bot, message, args);
                Timeout.add(`${message.author.id}${command.name}`)
                setTimeout(() => {
                    Timeout.delete(`${message.author.id}${command.name}`)
                }, command.timeout);
            }
        }else{
            command.run(bot,message,args)
        }

    }
}

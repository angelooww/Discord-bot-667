const Discord = require('discord.js')
 
module.exports = {
    name: "sondage",
 
    async run (client, message, args) {
        const Poll_Emoji_1 = "✅";
        const Poll_Emoji_2 = "❌";
        const Embed = new Discord.MessageEmbed()
 
        let Message = args.slice(0).join(" ")
 
        if (args.length == 0) {
            return message.channel.send("Merci de spécifier une question !")
        }

        let Poll = await message.channel.send(
            new Discord.MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle(`📋 | Sondage`)
            .setDescription(`${Message}`)
            .setFooter(`Sondage créé par ${message.author.username}`)
            .setTimestamp()
        );
 
 
        await Poll.react(`${Poll_Emoji_1}`);
        await Poll.react(`${Poll_Emoji_2}`);
        await message.delete({ timeout: 500 }).catch(console.error);
 
    }
}
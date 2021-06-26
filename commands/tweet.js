const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')
module.exports = {
    name: "tweet",
    description: "tweet something on twitter!",
    run: async(client, message, args) => {
        fetch(`https://nekobot.xyz/api/imagegen?type=tweet&username=${message.author.username}&text=${args.join(' ')}`)
        .then((res) => res.json())
        .then((data) => {
            let embed = new MessageEmbed()
            .setAuthor("Tweet","https://abs.twimg.com/favicons/twitter.ico")
            .setImage(data.message)
            .setTimestamp()
            message.channel.send(embed)
            
        })
        await message.delete({ timeout: 500 }).catch(console.error);
    }
}
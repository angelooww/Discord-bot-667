const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'spotify', 
     
    run: async (client, message, args) => {
        let msglink = args.join("%20") 
        let msg = args.join(' ') 

        const embed1 = new MessageEmbed()
        .setColor('#FF5757')
        .setDescription('⚠️ Donne moi le nom de la chanson à rechercher !')
        if(!args[0]) return message.channel.send(embed1)

        let embed = new MessageEmbed() 
        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        .setColor('#e3f1fc')
        .setDescription(`https://open.spotify.com/search/${msglink}`) 
        .setFooter("Spotify","https://i.ibb.co/BZhG3R6/Spotify-icon-icons-com-66783.png")
        .setTimestamp()

        message.channel.send(embed) 
        await message.delete({ timeout: 500 }).catch(console.error);
    }
}
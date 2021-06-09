const Discord = require("discord.js")

module.exports = {
    name: "help",
    aliases: ["h", "cmd", "command"],
    run: async (client, message, args) => {
        const EmbedHelp = new Discord.MessageEmbed()
        .setColor('#000000')
        .setTitle('Liste des commandes du bot :')
        .setThumbnail('https://www.musiqueurbaine.fr/wp-content/uploads/2019/05/14/667-photo.jpg')
        .addField('⚠️ Information du bot :','```_info, _help```')
		.addField('🎵 Musique :','```_p, _skip, _loop, _stop, _filter, _volume, _repeat, _pause, _queue, _resume```')
		.addField('🎬 Recherche films,series,animes :','```_anime, _searchanime, _film, _serie```')
		.addField('✅ Autre :','```_clear, _avatar, _covid, _667```')
        
        .setTimestamp()
        .setFooter('Crédit : Le fantôme', 'https://media1.tenor.com/images/304dd702d011729b25d70ec8cf2dd546/tenor.gif');
    
      message.channel.send(EmbedHelp);
}
}
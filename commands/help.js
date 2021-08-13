const Discord = require("discord.js")

module.exports = {
    name: "help",
    aliases: ["h", "cmd", "command"],
    run: async (client, message, args) => {
        const EmbedHelp = new Discord.MessageEmbed()
        .setColor('#000000')
        .setTitle('Liste des commandes du bot :')
        .setThumbnail('https://i.ibb.co/RB6HtTh/3dgifmaker00976.gif')
        .addField('⚠️ Information du bot :','```_info, _help```')
		.addField('🎵 Musique :','```_p, _skip, _loop, _stop, _filter, _volume, _repeat, _pause, _queue, _resume```')
		.addField('🎬 Recherche films,series,animes :','```_anime, _animeinfo, _film, _serie```')
		.addField('✅ Autre :','```_clear, _sondage, _avatar, _banner, _emoji, _covid, _667, _youtube, _spotify, _l1rank, _weather, _iq, _tweet, _twitter, _simp```')
        
        .setTimestamp()
        .setFooter('Crédit : Le fantôme', 'https://i.ibb.co/RB6HtTh/3dgifmaker00976.gif');
    
      message.channel.send(EmbedHelp);
      await message.delete({ timeout: 500 }).catch(console.error);
}
}
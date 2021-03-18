const Discord = require("discord.js")

module.exports = {
    name: "help",
    aliases: ["h", "cmd", "command"],
    run: async (client, message, args) => {
        const EmbedHelp = new Discord.MessageEmbed()
        .setColor('#000000')
        .setTitle('Liste des commandes du bot :')
        .setThumbnail('https://www.musiqueurbaine.fr/wp-content/uploads/2019/05/14/667-photo.jpg')
        .addField('⚠️ _help :','Liste des commandes du bot.')
		.addField('🏓 _ping :','Ping du bot.')
		.addField('▶️ _p :','Lance une musique avec le nom ou lien.')
		.addField('⏭️ _skip :','Lance la chanson suivante.')
		.addField('🔁 _loop :','Lance la chanson en boucle.')
		.addField('🛑 _stop :','Disconnect le bot.')
		.addField('🏴‍☠️ _667 :','tkt.')
        .addField('🔊 _volume :','Augmente le volume du bot.')
        .addField('🔁 _repeat :','Répète le son.')
        .addField('▶️ _resume :','Reprend la musique.')
        .addField('⏸️ _pause :','Met sur pause.')
        .addField('📄 _queue :','Fais une queue de plusieurs son.')
        
        .setTimestamp()
        .setFooter('Crédit : Le fantôme', 'https://www.musiqueurbaine.fr/wp-content/uploads/2019/05/14/667-photo.jpg');
    
      message.channel.send(EmbedHelp);
}
}

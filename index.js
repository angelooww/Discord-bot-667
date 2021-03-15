const Discord = require('discord.js');
const bot = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const config = require('./settings.json');
const { loadCommands } = require('./utils/loadCommands');
const DisTube = require('distube')


bot.on("ready", async () =>{
    
    bot.user.setStatus("online");
    bot.user.setActivity("Le 667 🏴‍☠️", {type: 'LISTENING'});
})


bot.distube = new DisTube(bot, { searchSongs: false, emitNewSongOnly: true });
bot.distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `**🎶 Écoute \`${song.name}\` - \`${song.formattedDuration}\` 🎶\n Demandé par : ${song.user}**`
	))
	.on("addSong", (message, queue, song) => message.channel.send(
        `**🎶 Ajouté \`${song.name}\` - \`${song.formattedDuration}\` 🎶\n À la queue par : ${song.user}**`
    ))

require('./utils/loadEvents')(bot);




bot.on("message", async message => {

    if (message.content.startsWith("_667")){
    
    // inside a command, event listener, etc.
    const MonEmbed = new Discord.MessageEmbed()
        .setColor('#000000')
        .setTitle('Bienvenue chez le 667')
        .setURL('https://lmfshop.fr/')
        .setAuthor('EKIP', 'https://www.musiqueurbaine.fr/wp-content/uploads/2019/05/14/667-photo.jpg', 'https://www.musiqueurbaine.fr/wp-content/uploads/2019/05/14/667-photo.jpg')
        .setDescription('MMS')
        .setThumbnail('https://media.senscritique.com/media/000018195873/325/67eme_Degre_Mixtape_Street.jpg')
        .addFields(
            { name: '« Chen Zen, j’ai les techniques de propagandes de Goebbels » Freeze Corleone', value: 'La phrase clé du royaume', inline: false },
            { name: 'Disque d\'or', value: '📀', inline: true },
            { name: 'Soon platine..', value: '💿', inline: true },
        )
        .setImage('https://images.genius.com/3363b0155abaa3b46e956c5e90f88ff2.973x973x1.jpg')
        .setTimestamp()
        .setFooter('Crédit : Le fantôme', 'https://www.musiqueurbaine.fr/wp-content/uploads/2019/05/14/667-photo.jpg');
    
      message.channel.send(MonEmbed);
    
      
    }
	
	 if (message.content.startsWith("_help")){
    
    // inside a command, event listener, etc.
    const EmbedHelp = new Discord.MessageEmbed()
        .setColor('#000000')
        .setTitle('Liste des commandes du bot :')
        .setThumbnail('https://www.musiqueurbaine.fr/wp-content/uploads/2019/05/14/667-photo.jpg')
        .addField('⚠️ _help :','Liste des commandes du bot.')
		.addField('🏓 _ping :','Ping du bot.')
		.addField('▶️ _p :','Lance une musique avec le nom ou lien.')
		.addField('⏭️ _skip :','Lance la chanson suivante.')
		.addField('🛑 _stop :','Disconnect le bot.')
		.addField('🏴‍☠️ _667 :','tkt.')
        .setTimestamp()
        .setFooter('Crédit : Le fantôme', 'https://www.musiqueurbaine.fr/wp-content/uploads/2019/05/14/667-photo.jpg');
    
      message.channel.send(EmbedHelp);
    
      
    }
	
	
	
	 if(message.content === '_ping') {
		
        let time = Date.now();
        await message.channel.send("Pong !").then(async (m) => await m.edit(`**Le bot a : ${Date.now() - time} ms**`))
		
    }
	
	
    
});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

loadCommands(bot);

bot.login(config.token);

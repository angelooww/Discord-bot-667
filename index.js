const DisTube = require("distube")
const Discord = require("discord.js")
const fetch = require("node-fetch");
const client = new Discord.Client()
const fs = require("fs")
const config = require("./config.json")
const os = require('os')
const { DiscordBanners } = require('discord-banners');
const discordBanners = new DiscordBanners(client);

client.config = require("./config.json")
client.distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true, leaveOnFinish: true})
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.emotes = config.emoji

fs.readdir("./commands/", (err, files) => {
    if (err) return console.log("Could not find any commands!")
    const jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return console.log("Could not find any commands!")
    jsFiles.forEach(file => {
        const cmd = require(`./commands/${file}`)
        console.log(`Loaded ${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
})

client.on("ready", () => {
    console.log(`${client.user.tag} Online.`)
    client.user.setActivity({ type: "PLAYING", name: `667 🏴‍☠️ | _help` })
})

client.on("message", async message => {

    if(message.content === '_ping') {
		
       const ping = new Discord.MessageEmbed()
		.setColor("#39ff14")
        .setDescription(`🏓\`${client.ws.ping}\`ms`);
        message.channel.send(ping);
		await message.delete({ timeout: 500 }).catch(console.error);
    }
	
 if(message.content === '_info') {

			let totalSeconds = (client.uptime / 1000);
			let days = Math.floor(totalSeconds / 86400);
			totalSeconds %= 86400;
			let hours = Math.floor(totalSeconds / 3600);
			totalSeconds %= 3600;
			let minutes = Math.floor(totalSeconds / 60);
			let seconds = Math.floor(totalSeconds % 60);
            const core = os.cpus()[0];
			const embed = new Discord.MessageEmbed()
            .setThumbnail("https://i.ibb.co/RB6HtTh/3dgifmaker00976.gif")
            .setAuthor('667 BOT', 'https://i.ibb.co/RB6HtTh/3dgifmaker00976.gif')
            .setColor('#000000')
            .addFields(
                {
                    name: '💻 Servers',
                    value: `Serving ${client.guilds.cache.size} servers.`,
                    inline: true
                },
                {
                    name: '📺 Channels',
                    value: `Serving ${client.channels.cache.size} channels.`,
                    inline: true
                },
                {
                    name: '👤 Server Users',
                    value: `Serving ${client.users.cache.size}`,
                    inline: true
                },
                {
                    name: '🏓 Ping',
                    value: `${Math.round(client.ws.ping)}ms`,
                    inline: true
                },
				{
                    name: '⌛ Uptime',
                    value: `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`,
                    inline: true
                },
                {
                    name: '📅 Join Discord',
                    value: '01/03/2021 19H',
                    inline: true
                },
                {
                    name: '❤️ CPU Cores',
                    value: `${os.cpus().length}`,
                    inline: true
                },
                {
                    name: '🖥 CPU Model',
                    value: `${core.model}`,
                    inline: true
                },
                {
                    name: '💨 CPU Speed',
                    value: `${core.speed}MHz`,
                    inline: true
                }
                
            )
            .setFooter(`Created By: ${message.author.tag}`, message.author.displayAvatarURL())

        await message.channel.send(embed)
        await message.delete({ timeout: 500 }).catch(console.error);
    }

 
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
          await message.delete({ timeout: 500 }).catch(console.error);
        
          
    }

    if(message.content === "_banner") {
        const banner = await discordBanners.getBanner(message.author.id, { size: 2048, format: "png", dynamic: true })
        const user = message.mentions.members.first() || message.member
        const embed = new Discord.MessageEmbed()
        .setDescription(`<@${user.user.id}>'s banner`)
        .setImage(banner)
        .setColor("RANDOM")
        if(banner) return message.channel.send(embed)
        else if(!banner) return message.channel.send("Bannière introuvable !")
    }

    const prefix = config.prefix
    if (!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return
    if (cmd.inVoiceChannel && !message.member.voice.channel) return message.channel.send(`${client.emotes.error} | **Met toi dans un channel !**`)
    try {
        cmd.run(client, message, args)
    } catch (e) {
        console.error(e)
        message.reply(`Error: ${e}`)
    }
})

const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "Toute la queue" : "Ce son" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `${client.emotes.play} | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nDemandé par: ${song.user}\n${status(queue)}\n${song.url}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `${client.emotes.success} | Ajouté ${song.name} - \`${song.formattedDuration}\` à la queue par ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `${client.emotes.play} | Play \`${playlist.title}\` playlist (${playlist.total_items} songs).\nDemandé par: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `${client.emotes.success} | Added \`${playlist.title}\` playlist (${playlist.total_items} songs) à la queue\n${status(queue)}`
    ))
    
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0
        message.channel.send(`**Choisissez une option ci-dessous**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Entrez autre chose ou attendez 60 secondes pour annuler*`)
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", message => message.channel.send(`${client.emotes.error} | Recherche annulée`))
    .on("error", (message, err) => message.channel.send(`${client.emotes.error} | Une erreur s'est produite: ${err}`))

client.login("")
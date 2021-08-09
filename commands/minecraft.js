const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: "minecraft",

    run: async (client, message, args) => {
		var serverConnectMsg;
		var serverURL;
		if (message.content.startsWith("_minecraft")) {
			serverURL = `https://api.mcsrvstat.us/2/90.73.240.179`;
			var mods;
			await fetch(serverURL)
				.then(response => response.json())
				.then(data => {
					if (data.mods) {
						mods = JSON.stringify(data.mods.raw);
					} else {
						mods = "No mods";
					}
					serverConnectMsg = message.channel.send(new Discord.MessageEmbed()
					.setAuthor('MINECRAFT SERVER STATUS','https://assets.stickpng.com/images/580b57fcd9996e24bc43c2f1.png')
					.setThumbnail('https://media.discordapp.net/attachments/853922156803260426/868831268131962900/icon.png')
					.setFooter('Minecraft Server Status','https://assets.stickpng.com/images/580b57fcd9996e24bc43c2f1.png')
					.setTimestamp()
					.addFields(
						{name: 'Hostname', value: `\`90.73.240.179\``},
						{name: 'Online', value: `\`${data.online}\``},
						{name: 'MOTD', value: `\`${data.motd.clean}\``},
						{name: 'Version', value: `\`${data.version}\``},
						{name: 'Players', value: `\`${data.players.online}/${data.players.max}\``},
						{name: 'List Players', value: `\`${data.players.list}\``.replace('undefined','No players')},
						{name: 'Mods', value: `\`${mods}\``},
					))
				})
		}
	}
}
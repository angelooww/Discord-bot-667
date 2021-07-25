const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: "minecraft",

    run: async (client, message, args) => {
        const mcIP = args[0] || '90.73.240.179';
        const serverName = 'Wesh la team Bienvenue';
        const serverLogo = 'https://www.nicepng.com/png/detail/21-217346_xxx-tentacion-walpaper.png';
        const version = '1.16.5';

		let url = `https://api.mcsrvstat.us/2/${mcIP}`;
		
		(async () => {
			try {
				const { online, players } = await fetch(url).then(response => response.json());

				let status = "Offline"
				let color = 16711680
				if (online) {
					status = "Online";
					color = 65280
				}

				const embed = {
					"author": {
					"name": `${serverName}`,
					"icon_url": serverLogo
					},
					"color": color,
					"fields": [
					{
						"name": "Status :",
						"value": status,
						"inline": false
					},
					{
						"name": "Players Online :",
						"value": `**${players.online}** / **${players.max}**`,
						"inline": false
					},
                    {
						"name": "Version :",
						"value": `**${version}**`,
						"inline": false
					}
					],
					"footer": {
					"text": `IP: ${mcIP}`
					}
				};
				message.channel.send({ embed });

			} catch (error) {
				console.log(error);
				return message.channel.send('Erreur de récupération de données du serveur !');
			}
		})();
	}
}
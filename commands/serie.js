const cheerio = require("cheerio");
const axios = require("axios");
const discord = require("discord.js")

module.exports = {
	name: "serie",
	run: async (client, message, args) => {

		if (!args.length) return message.channel.send({
			embed: {
				"title": "❌ Saisi une serie !",
				"color": "RED"
			}
		})

		let searchString = args.join("%20")

		let embed = new discord.MessageEmbed()
			.setAuthor("Recherche en cours....", client.user.displayAvatarURL())


		let msg = await message.channel.send(embed)


		axios({
				url: "https://www.wawacity.bz/?search=" + searchString + "&p=series"
			})
			.then(async function(res) {

				let $ = cheerio.load(res.data)
				let cards = {
					title: [],
					link: []
				}

				$('div.wa-sub-block.wa-post-detail-item div.wa-sub-block-title a').each(function(i, elem) {
					let title = $(this).text()
					let link = $(this).attr('href')

					if (title && link) {
						cards.title.push(title)
						cards.link.push(link)
					}
				})


				if (!cards.title.length) {
					embed
						.setAuthor("Impossible de trouver la serie ! :(", client.user.displayAvatarURL())
						.setColor("RED")

					return msg.edit(embed)
				}

				let description = []


				cards.title.forEach((x, i) => {
					if (i >= 10) return;
					x = `[ ${i+1} ] : [` + x + `](https://www.wawacity.bz${cards.link[i]})`
					description.push(x)
					
				})



				embed
					.setAuthor("Résultats de la recherche :", client.user.displayAvatarURL())
					.setColor("GREEN")
					.setDescription(description.join("\n"));


				msg.edit(embed)


			})
	}
}
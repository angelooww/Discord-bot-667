const axios = require('axios');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "covid",
    run: async (client, message, args) => {
        const baseUrl = "https://corona.lmao.ninja/v2";

        let url, response, covid;

        try {
            url = args[0] ? `${baseUrl}/countries/${args[0]}`:`${baseUrl}/all`
            response = await axios.get(url)
            covid = response.data
        } catch (error) {
            return message.channel.send(`***${args[0]}*** n'existe pas ou pas dans la base !`)
        }

        const embed = new MessageEmbed()
            .setTitle(args[0] ? `${args[0].toUpperCase()} Stats` : 'Total Covid Cases World Wide')
            .setColor('#fb644c')
            .setThumbnail(args[0] ? covid.countryInfo.flag : 'https://i.giphy.com/YPbrUhP9Ryhgi2psz3.gif')
            .addFields(
                {
                    name: 'Total Cases:',
                    value: covid.cases.toLocaleString(),
                    inline: true
                },
                {
                    name: 'Total Deaths:',
                    value: covid.deaths.toLocaleString(),
                    inline: true
                },
                {
                    name: 'Total Recovered:',
                    value: covid.recovered.toLocaleString(),
                    inline: true
                },
                {
                    name: 'Active Cases:',
                    value: covid.active.toLocaleString(),
                    inline: true
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true
                },
                {
                    name: 'Critical Cases:',
                    value: covid.critical.toLocaleString(),
                    inline: true
                },
                {
                    name: 'Today Recoveries:',
                    value: covid.todayRecovered.toLocaleString().replace("-", ""),
                    inline: true
                },
                {
                    name: 'Todays Deaths:',
                    value: covid.todayDeaths.toLocaleString(),
                    inline: true
                })

        await message.channel.send(embed)
    }
};
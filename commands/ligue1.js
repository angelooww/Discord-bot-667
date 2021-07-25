const Discord = require("discord.js")
const client = new Discord.Client()
const { MessageEmbed } = require('discord.js');
const axios = require('axios')
const cheerio = require('cheerio')

module.exports = {
    name: "l1rank",

    run: async (client, message, args) => {

    const url = (`https://fr.besoccer.com/competition/ligue_1`)
    axios(url)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        let teamname = $('.row-body > td.name > a')
        let teampts = $('.row-body > td.green.bold.br-l')

        const times = []
        
        const embed1 = new MessageEmbed()
          .setThumbnail("https://i.ibb.co/5YcLSkL/ligue1.png")
          .setTitle(`Classement Ligue 1 2021-2022`)
          .setColor('#0bef17')
          .setTimestamp()
          .setFooter('Classement Ligue 1 ⚽', 'https://i.ibb.co/5YcLSkL/ligue1.png')
          
        teamname.each( (i) => {
            const individualTeam = teamname[i].children[0]
            const teampoint1= teampts[i].children[0]
            const teampoint = teampoint1.data
            const team = individualTeam.data
            times.push({
                position: i + 1,
                team,
                teampoint
              })
              embed1.addField(`${i + 1}º - ${team} - \`${teampoint} PTS\``, '—————————————————————————', false)
        })
        message.channel.send(embed1)
        
      })
      .catch(console.error);
}
}
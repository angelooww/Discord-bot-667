const Discord = require("discord.js")
const client = new Discord.Client()
const { MessageEmbed } = require('discord.js');
const axios = require('axios')
const cheerio = require('cheerio');
const { replaceWith } = require("cheerio/lib/api/manipulation");
const { get } = require("cheerio/lib/api/traversing");

module.exports = {
    name: "l1match",

    run: async (client, message, args) => {

    const url = (`https://www.lequipe.fr/Football/ligue-1/page-calendrier-resultats`)
    axios(url)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        let teamname = $('div.grid__item > div.TeamScore.TeamScore--before > div.TeamScore__top.TeamScore__top--small > a.Link.TeamScore__team.TeamScore__team--home.TeamScore__team--hasLogo > div.TeamScore__name > span.TeamScore__nameshort > span')
        let teamname2 = $('div.grid__item > div.TeamScore.TeamScore--before > div.TeamScore__top.TeamScore__top--small > a.Link.TeamScore__team.TeamScore__team--away.TeamScore__team--hasLogo > div.TeamScore__name > span.TeamScore__nameshort > span')
        let matchscore = $('div.grid__item > div.TeamScore.TeamScore--before > div.TeamScore__top.TeamScore__top--small > div.TeamScore__data > a.Link.TeamScore__schedule > span > span')

        const times = []

        const embed1 = new MessageEmbed()
          .setThumbnail("https://i.ibb.co/5YcLSkL/ligue1.png")
          .setTitle(`Match Ligue 1`)
          .setColor('#0bef17')
          .setTimestamp()
          .setFooter('Match Ligue 1 ⚽', 'https://i.ibb.co/5YcLSkL/ligue1.png')
          
        teamname.each( (i) => {
            const individualTeam = teamname[i].children[0]
            const scorematch = matchscore[i].children[0]
            const score = scorematch.data
            const team2= teamname2[i].children[0]
            const team3 = team2.data
            const team = individualTeam.data
            times.push({
                position: i + 1,
                team,
                team3,
                score
              })
              embed1.addField(`ㅤㅤㅤㅤㅤㅤ${team}${score}\t${team3}`,'—————————————————', false)
        })
        message.channel.send(embed1)
        
      })
      .catch(console.error);
}
}
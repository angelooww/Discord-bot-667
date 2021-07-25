const { get } = require("request-promise-native");
const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "animeinfo",
  aliases: ["kitsu"],
  description: "Get anime information",
  run: (client, message, args) => {
    
    
    
    if(!args.length) {
      return message.channel.send("Donne un titre d'animé !")
    }
   
    
    let option = {
      url: `https://kitsu.io/api/edge/anime?filter[text]=${args.join(" ")}`,
      method: `GET`,
      headers: {
        'Content-Type': "application/vnd.api+json",
        'Accept': "application/vnd.api+json"
		

      },
      json: true
    }
    
    
    message.channel.send("Recherche en cours...").then(msg => {
      get(option).then(body => {
       try {
        let embed = new MessageEmbed()
        .setTitle(body.data[0].attributes.titles.en)
        .setColor("RED")
        .setThumbnail(body.data[0].attributes.posterImage.original)
        .addField("TOP POPULARITY", body.data[0].attributes.popularityRank)
		    .addField("TYPE", body.data[0].attributes.showType)
        .addField("TOTAL EPISODES", body.data[0].attributes.episodeCount)
		    .addField("EPISODE LENGTH", `${body.data[0].attributes.episodeLength}min`)
		    .addField("CREATION DATE", body.data[0].attributes.startDate)
		    .addField("STATUS", body.data[0].attributes.status)
		    .addField("TRAILER",`https://www.youtube.com/watch?v=${body.data[0].attributes.youtubeVideoId}`)
        .setImage(body.data[0].attributes.coverImage.large)
        
        message.channel.send(embed)
        msg.delete();
        
       } catch (err) {
        msg.delete();
         return message.channel.send("Impossible de trouver l'animé !");
       }

      }                 

    )})
    
  }

}
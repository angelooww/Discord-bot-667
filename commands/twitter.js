const Discord = require("discord.js")
const request = require("node-superfetch") 
const {stripIndents} = require("common-tags") 
const twitter = require("twitter-api.js") 
module.exports = {
  name: "twitter",
  
  run: async (client, msg, args) => {
    let user = args[0]
    if(!user) return msg.channel.send("Rentre un @ !")
    
    try {
      const body = await twitter.users(user)
      const tweet = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setAuthor(`@${body.screen_name.toLowerCase()}`, body.verified ? "https://emoji.gg/assets/emoji/6817_Discord_Verified.png" : null)
      .setDescription(stripIndents` ${body.description}\n
      💙 Followers: **${(body.followers_count).toLocaleString()}**
      💙 Following: **${(body.friends_count).toLocaleString()}**
      🖊️ Tweets: **${(body.statuses_count).toLocaleString()}**
      🌍 Location: ${body.location}
      📅 Account Created: ${body.created_at}`)
      .setFooter(`Twitter ID: ${body.id}`, "https://abs.twimg.com/favicons/twitter.ico")
      .setThumbnail(body.profile_image_url_https.replace('_normal', ''))
      .setImage(body.profile_banner_url)
      msg.channel.send(tweet)
    } catch (e) {
      if(e.status === 403) return msg.channel.send("L'utilisateur est en privé, ou supprimé")
      else if(e.status === 404) return msg.channel.send("Pas trouvé !")
      else return msg.channel.send(`Utilisateur Inconnu: \`${e.message}\``)
      
    }
    await msg.delete({ timeout: 500 }).catch(console.error);
  }
}
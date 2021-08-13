const Discord = require("discord.js");

module.exports = {
 name: "iq",
 
 run: async (client, message, args) => {
  try {
   const iq = Math.floor(Math.random() * 150);
   let member = message.mentions.users.first() || message.author
   let avatar = member.displayAvatarURL({dynamic: true})
   const embed = new Discord.MessageEmbed()
    .setTitle(":brain: IQ Test:")
    .setDescription(":bulb: " + `**${member.username}**` + " IQ: `" + iq + "`")
    .setColor(`RANDOM`)
    .setThumbnail(avatar)
    .setTimestamp()
    .setFooter(
     "Requested by " + `${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
   message.channel.send(embed);
   await message.delete({ timeout: 500 }).catch(console.error);
  } catch (err) {
   message.channel.send({
    embed: {
     color: 16734039,
     description: "Something went wrong... :cry:",
    },
   });
  }
 },
};
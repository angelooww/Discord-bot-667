const Discord = require('discord.js');

module.exports = {
    name: 'simp',  
        run: async (client, message, args) => {

            const user = message.mentions.members.first() || message.member

            const rating = Math.floor(Math.random() * 100) + 1;
    
            const embed = new Discord.MessageEmbed()
            .setAuthor("SIMP",user.user.displayAvatarURL())
            .setColor('#e3f1fc')
            .setDescription(`<@${user.user.id}> you are **${rating}%** a Simp`)
    
            message.channel.send(embed);
            message.delete({ timeout: 500 }).catch(console.error);
            
        }
        
}
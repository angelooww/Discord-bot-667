const weather = require('weather-js');

const Discord = require('discord.js');

module.exports = {
    name: "weather",

    async run (bot, message, args) {
        weather.find({search: args.join(" "), degreeType: `C`}, function (error, result) {
            if(error) return message.channel.send(error);
            if(!args[0]) return message.channel.send('Spécifie une ville !')

            if(result === undefined || result.length === 0) return message.channel.send('**ville** invalide')

            var current = result[0].current;
            var location = result[0].location;

            const embed = new Discord.MessageEmbed()
            .setColor(0x111111)
            .setAuthor(`Weather current for ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setDescription(`**${current.skytext}**`)
            .addField('TimeZone', `UTC ${location.timezone}`, true)
            .addField('Degree Type', 'Celcius', true)
            .addField('Temperature', `${current.temperature}°`, true) 
            .addField('Wind', `${current.winddisplay}`, true)
            .addField('Feels Like', `${current.feelslike}°`, true)
            .addField('Humidity', `${current.humidity}%`, true)
            .addField('Observation Time', `${current.observationtime}`, true)

            message.channel.send(embed)
            
        })
        await message.delete({ timeout: 500 }).catch(console.error);
    }
}
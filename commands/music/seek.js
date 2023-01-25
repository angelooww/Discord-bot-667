const ms = require('ms');
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'seek',
    description: 'avancé le temps de la musique',
    voiceChannel: true,
    options: [
    {
        name: 'time',
        description: 'le temps à laquelle vous souhaitez passer',
        type: ApplicationCommandOptionType.String,
        required: true,
    }
    ],
    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique en cours de lecture ${inter.reply}... ❌`, ephemeral: true });

        const timeToMS = ms(inter.options.getString('time'));

        if (timeToMS >= queue.current.durationMS) return inter.reply({ content:`Le temps indiqué est supérieur au temps total de la musique en cours ${inter.member}... ❌\n*Essayez par exemple un temps valide comme **5s, 10s, 20 seconds, 1m**...*`, ephemeral: true });

        await queue.seek(timeToMS);

        inter.reply({ content: `Temps réglé sur la chanson en cours **${ms(timeToMS, { long: true })}** ✅`});
    },
};
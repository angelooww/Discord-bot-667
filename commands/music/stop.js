module.exports = {
    name: 'stop',
    description: 'arrêter la musique',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content:`Aucune musique en cours de lecture ${inter.member}... ❌`, ephemeral: true });

        queue.destroy();

        inter.reply({ content: `La musique s'est arrêtée, ciao ✅`});
    },
};
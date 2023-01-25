module.exports = {
    name: 'shuffle',
    description: 'mélanger la piste',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique en cours de lecture ${inter.member}... ❌`, ephemeral: true });

        if (!queue.tracks[0]) return inter.reply({ content: `Pas de musique dans la file d'attente après celle en cours ${inter.member}... ❌`, ephemeral: true });

        await queue.shuffle();

        return inter.reply({ content:`File d'attente mélangée **${queue.tracks.length}** sons ! ✅`});
    },
};
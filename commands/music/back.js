module.exports = {
    name: 'back',
    description: "Reviens à la chanson d'avant",
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique en cours de lecture ${inter.member}... ❌`, ephemeral: true });

        if (!queue.previousTracks[1]) return inter.reply({ content: `Il n'y a pas de musique à jouer avant ${inter.member}... ❌`, ephemeral: true });

        await queue.back();

        inter.reply({ content:`Joue la musique précédente ✅`});
    },
};
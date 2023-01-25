module.exports = {
    name: 'skip',
    description: 'joue la musique suivante',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

         if (!queue || !queue.playing) return inter.reply({ content:`Aucune musique en cours de lecture ${inter.member}... ❌`, ephemeral: true });

        const success = queue.skip();

        return inter.reply({ content: success ? `Musique actuelle **${queue.current.title}** skipped ✅` : `Quelque chose s'est mal passé ${inter.member}... ❌`});
    },
};
module.exports = {
    name: 'pause',
    description: 'met le son en pause',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `Aucune musique en cours de lecture ${inter.member}... ❌`, ephemeral: true });
        
        if(queue.connection.paused) return inter.reply({content: 'La musique est actuellement en pause !', ephemeral: true})

        if(queue.connection.paused) return inter.reply({content: `La musique est actuellement en pause, ${inter.member}... ❌`, ephemeral: true})

        const success = queue.setPaused(true);
        
        return inter.reply({ content: success ? `Musique actuelle ${queue.current.title} en pause ✅` : `Quelque chose s'est mal passé ${inter.member}... ❌` });
    },
};

module.exports = {
    name: 'resume',
    description: 'joue la musique',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `Aucune musique en cours de lecture ${inter.member}... ❌`, ephemeral: true });
        
        if(queue.connection.paused) return inter.reply({content: 'La musique est déjà en cours !', ephemeral: true})

        if(!queue.connection.paused) return inter.reply({content: `La musique est déjà en cours, ${inter.member}... ❌`, ephemeral: true})

        const success = queue.setPaused(false);
        
        return inter.reply({ content:success ? `Musique actuelle ${queue.current.title} a repris ✅` : `Quelque chose s'est mal passé ${inter.member}... ❌`});
    },
};

module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique en cours de lecture... ❌`, ephemeral: true });
    
    const success = queue.skip();

    return inter.reply({ content: success ? `Current musique **${queue.current.title}** skipped ✅` : `Quelque chose s'est mal passé ${inter.member}... ❌`, ephemeral: true});
}
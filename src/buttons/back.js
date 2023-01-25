module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique en cours de lecture... ❌`, ephemeral: true });

    if (!queue.previousTracks[1]) return inter.reply({ content: `Il n'y avait pas de musique jouée avant ${inter.member}... ❌`, ephemeral: true });

    await queue.back();

    inter.reply({ content:`Lecture de la musique **précédente** ✅`, ephemeral: true});
}

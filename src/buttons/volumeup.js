const maxVol = client.config.opt.maxVol;
module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique en cours de lecture... ❌`, ephemeral: true });

    const vol = Math.floor(queue.volume + 5)

    if (vol > maxVol ) return inter.reply({ content: `Je ne peux plus monter le volume ${inter.member}... ❌`, ephemeral: true })

    if (queue.volume === vol) return inter.reply({ content: `Le volume que vous souhaitez modifier est déjà celui en cours ${inter.member}... ❌`, ephemeral: true });

    const success = queue.setVolume(vol);

    return inter.reply({ content:success ? `Le volume a été modifié pour **${vol}**/**${maxVol}**% 🔊` : `Quelque chose s'est mal passé ${inter.member}... ❌`, ephemeral: true});
}
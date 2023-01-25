const { EmbedBuilder } = require('discord.js')

module.exports = async ({ inter, queue }) => {
    if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique en cours de lecture... ❌`, ephemeral: true });

    inter.member.send({
        embeds: [
            new EmbedBuilder()
                .setColor('Red')
                .setTitle(`:arrow_forward: ${queue.current.title}`)
                .setURL(queue.current.url)
                .addFields(
                    { name: ':hourglass: Durée:', value: `\`${queue.current.duration}\``, inline: true },
                    { name: 'Son par:', value: `\`${queue.current.author}\``, inline: true },
                    { name: 'Vues :eyes:', value: `\`${Number(queue.current.views).toLocaleString()}\``, inline: true },
                    { name: 'URL:', value: `\`${queue.current.url}\`` }
                )
                .setThumbnail(queue.current.thumbnail)
                .setFooter({ text: `du serveur ${inter.member.guild.name}`, iconURL: inter.member.guild.iconURL({ dynamic: false }) })
        ]
    }).then(() => {
        return inter.reply({ content: `Je vous ai envoyé le titre de la musique par messages privés ✅`, ephemeral: true });
    }).catch(error => {
        return inter.reply({ content: `Impossible de vous envoyer un message privé... ❌`, ephemeral: true });
    });


}

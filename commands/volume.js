module.exports = {
    name: "volume",
    aliases: ["v", "set", "set-volume"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | Il n'y a rien dans la file d'attente pour le moment!`)
        const volume = parseInt(args[0])
        if (isNaN(volume)) return message.channel.send(`${client.emotes.error} | Entre un nombre valide !`)
        client.distube.setVolume(message, volume)
        message.channel.send(`${client.emotes.success} | 🔊 Volume réglé sur \`${volume}\``)
    }
}

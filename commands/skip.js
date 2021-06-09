module.exports = {
    name: "skip",
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | Il n'y a rien dans la file d'attente pour le moment !`)
        try {
            client.distube.skip(message)
            message.channel.send(`${client.emotes.success} | Skipped! Lecture en cours:\n${queue.songs[0].name}`)
        } catch (e) {
            message.channel.send(`${client.emotes.error} | ${e}`)
        }
    }
}

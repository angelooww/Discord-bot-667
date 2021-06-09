module.exports = {
    name: "pause",
    aliases: ["pause", "hold"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | Il n'y a rien dans la file d'attente pour le moment !`)
        if (queue.pause) {
            client.distube.resume(message)
            return message.channel.send("**▶️ Reprise de la chanson**")
        }
        client.distube.pause(message)
        message.channel.send("**⏸ La chanson est en pause**")
    }
}

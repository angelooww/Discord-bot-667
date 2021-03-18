module.exports = {
    name: "resume",
    aliases: ["resume", "unpause"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | Il n'y a rien dans la file d'attente pour le moment !`)
        client.distube.resume(message)
        message.channel.send("▶️ Reprise de la chanson !")
    }
}

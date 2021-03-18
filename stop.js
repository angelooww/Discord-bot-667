module.exports = {
    name: "stop",
    aliases: ["disconnect", "leave"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | Il n'y a rien dans la file d'attente pour le moment !`)
        client.distube.stop(message)
        message.channel.send(`👋 A bientôt chez le 667`)
    }
}

module.exports = {
    name: "queue",
    aliases: ["q"],
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | Il n'y a rien à jouer !`)
        const q = queue.songs.map((song, i) => `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join("\n")
        message.channel.send(`${client.emotes.queue} | **File d'attente du serveur**\n${q}`)
    }
}
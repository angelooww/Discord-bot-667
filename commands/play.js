module.exports = {
    name: "play",
    aliases: ["p"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const string = args.join(" ")
        if (!string) return message.channel.send(`${client.emotes.error} | Veuillez saisir une URL de chanson ou une requête à rechercher.`)
        try {
            client.distube.play(message, string)
        } catch (e) {
            message.channel.send(`${client.emotes.error} | Erreur: \`${e}\``)
        }
    }
}

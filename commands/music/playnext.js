const { ApplicationCommandOptionType } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'playnext',
    description: "chanson que vous voulez jouer ensuite",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'chanson que vous voulez jouer ensuite',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter }) { 
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique en cours de lecture ${inter.member}... ❌`, ephemeral: true });

        const song = inter.options.getString('song');

        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return inter.reply({ content: `Aucun résultat trouvé ${inter.member}... ❌`, ephemeral: true });

       if (res.playlist) return inter.reply({ content: `Cette commande ne prend pas en charge les playlists ${inter.member}... ❌`, ephemeral: true });

        queue.insert(res.tracks[0], 0)

        await inter.reply({ content:`La musique a été insérée dans la file d'attente... elle sera lue ensuite 🎧`});

    }
}
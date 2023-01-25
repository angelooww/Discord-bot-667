const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'search',
    description: 'rechercher une musique',
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'la chanson que vous voulez rechercher',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ client, inter }) {
        const song = inter.options.getString('song');

        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return inter.reply({ content: `Aucun résultat trouvé ${inter.member}... ❌`, ephemeral: true });

        const queue = await player.createQueue(inter.guild, {
            metadata: inter.channel,
            leaveOnEnd: client.config.opt.leaveOnEnd,
        });
        const maxTracks = res.tracks.slice(0, 15);

        const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setAuthor({ name: `Résultats pour ${song}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
        .setDescription(`${maxTracks.map((track, i) => `\`${i + 1}\`. **${track.title}**`).join('\n')}\n\nSélectionnez votre choix entre **1** et **${maxTracks.length}** ou **annuler** ⬇️`)
        .setTimestamp()

        inter.reply({ embeds: [embed] });

        const collector = inter.channel.createMessageCollector({
            time: 15000,
            max: 1,
            errors: ['time'],
            filter: m => m.author.id === inter.member.id
        });

        collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel') return inter.followUp({ content: `Recherche annulée ✅`, ephemeral: true }), collector.stop();

            const value = parseInt(query);
            if (!value || value <= 0 || value > maxTracks.length) return inter.followUp({ content: `Réponse invalide, essayez une valeur entre **1** et **${maxTracks.length}** ou **annuler**... ❌`, ephemeral: true });

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(inter.member.voice.channel);
            } catch {
                await player.deleteQueue(inter.guildId);
                return inter.followUp({ content: `Je ne peux pas rejoindre le canal vocal ${inter.member}... ❌`, ephemeral: true });
            }

            await inter.followUp(`Chargement de votre recherche... 🎧`);

            queue.addTrack(res.tracks[query.content - 1]);

            if (!queue.playing) await queue.play();
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return inter.followUp({ content:`La recherche a expiré ${inter.member}... ❌`, ephemeral: true })
        });
    },
};
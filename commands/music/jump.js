const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'jump',
    description: "Saute à une piste particulière dans la file d'attente",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'le nom/url de la piste à laquelle vous voulez accéder',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'number',
            description: 'la place dans la file d attente où se trouve la chanson',
            type: ApplicationCommandOptionType.Number,
            required: false,
        }
    ],

    async execute({ inter }) { 
        const track = inter.options.getString('song');
        const number =  inter.options.getNumber('number')

        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique en cours de lecture ${inter.member}... ❌`, ephemeral: true });
        if (!track && !number) inter.reply({ content: `Vous devez utiliser l'une des options pour passer à une chanson ${inter.member}... ❌`, ephemeral: true });

            if (track) {
        for (let song of queue.tracks) {
            if (song.title === track || song.url === track ) {
                queue.skipTo(song)
                return inter.reply({ content: `skiped à ${track} ✅` });
            }
        }
        return inter.reply({ content: `n'a pas pu trouver ${track} ${inter.member}... essayez d'utiliser l'url ou le nom complet de la chanson ? ? ❌`, ephemeral: true });    
    }
    if (number) {
        const index = number - 1
        const trackname = queue.tracks[index].title
        if (!trackname) return inter.reply({ content: `Cette piste ne semble pas exister ${inter.member}... ❌`, ephemeral: true });   
        queue.skipTo(index);
        return inter.reply({ content: `Jumped à ${trackname}  ✅` });
    }
         
    }
}
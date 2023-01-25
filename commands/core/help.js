const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: "Toutes les commandes de ce bot !",
    showHelp: false,

    execute({ client, inter }) {
        const commands = client.commands.filter(x => x.showHelp !== false);

        const embed = new EmbedBuilder()
        .setTitle('Commandes du BOT')
        .setColor('#ff0000')
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
        .addFields([ { name: `${commands.size} Commandes Enabled`, value: commands.map(x => `\`${x.name}\``).join(' | ') } ])
        .setTimestamp()
        .setFooter({ text: 'La chanson tu la connais bien mon petit ❤️', iconURL: inter.member.avatarURL({ dynamic: true })});

        inter.reply({ embeds: [embed] });
    },
};
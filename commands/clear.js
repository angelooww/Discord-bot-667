module.exports = {
    name: "clear",
    description: "Clears messages",

    async run (client, message, args) {
		
		let member = message.mentions.users.first() || message.author
		
        const amount = args.join(" ");

        if(!amount) return message.reply('Donne le nombre de messages à supprimer')

        if(amount > 100) return message.reply(`Tu ne peux supprimer plus de 100 messages`)

        if(amount < 1) return message.reply(`Tu me prend pour un con !`)
        message.channel.send("**⚠️ DELETED**");

        await message.delete({ timeout: 500 }).catch(console.error);
        await message.channel.messages.fetch({limit: amount}).then(messages => {
            message.channel.bulkDelete(messages
    )});
    }
}
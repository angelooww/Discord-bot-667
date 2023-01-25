const ms = require('ms');

module.exports = {
    name: 'ping',
    description: "Obtenez le ping du bot !",
    async execute({ client, inter }) {

        const m = await inter.reply("Ping?")
        inter.editReply(`Pong! La latence API est ${Math.round(client.ws.ping)}ms 🛰️, Dernier ping calculé il y a ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })}`)

    },
};
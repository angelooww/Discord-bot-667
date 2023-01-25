const { Player } = require('discord-player');
const { Client, EmbedBuilder ,GatewayIntentBits } = require('discord.js');
const axios = require('axios');

global.client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ]
});

client.config = require('./config');

global.player = new Player(client, client.config.opt.discordPlayer);

require('./src/loader');
require('./src/events');


let streamStatus = {};
let streamerList = ['sowdred','voltextlive','everybodyhatesantho','iyxor','jerraghy_','simplementjoedo']; // List of streams to be monitored
const channelId = '393904220786393088'; // ID of the Discord channel to send the message to
const clientid = 'nxqdnxpuv9toqje6a7u0in8rccmn24'
const secret = 'htum7zgc7kkdg6ty3jw2jj3wq0hk85'
let twitchToken;
let twitchTokenResponse;

client.on('ready', () => {

  function getTwitchToken() {
    axios
      .post(
        `https://id.twitch.tv/oauth2/token?client_id=${clientid}&client_secret=${secret}&grant_type=client_credentials`
      )
      .then(function (response) {
        twitchTokenResponse = response.data;
        twitchToken = "Bearer " + twitchTokenResponse.access_token;
        return twitchToken;
      })
      .catch(function (error) {
        console.error(`Error obtaining Twitch access token: ${error}`);
      });
  }
  getTwitchToken();
  // Set an interval to check for streams every 3 minutes
  setInterval(checkStreams, 2 * 60 * 1000);

  async function checkStreams() {
    // Check the status of each streamer
    for (const streamer of streamerList) {
      try {
        // Get user information
        const userResponse = await axios.get(`https://api.twitch.tv/helix/users?login=${streamer}`, {
          headers: {
            'Authorization': twitchToken,
            'Client-Id': clientid
          }
        });
        const profilePictureUrl = userResponse.data.data[0].profile_image_url;
        // Check if stream is live
        const streamResponse = await axios.get(`https://api.twitch.tv/helix/streams?user_login=${streamer}`, {
          headers: {
            'Authorization': twitchToken,
            'Client-Id': clientid
          }
        });

        let gameId;
        if (streamResponse.data.data.length > 0) {
          gameId = streamResponse.data.data[0].game_id;
        }

      let gameName;
      if (gameId) {
        // Récupère le nom du jeu à partir de l'ID du jeu
          const gameResponse = await axios.get(`https://api.twitch.tv/helix/games?id=${gameId}`, {
        headers: {
          'Authorization': twitchToken,
          'Client-Id': clientid
        }
      });
      gameName = gameResponse.data.data[0].name;
}
        if (streamResponse.data.data.length > 0 && !streamStatus[streamer]) {
          // Streamer is live and message has not been sent yet, send the message
          streamStatus[streamer] = true;
          const streamUrl = `https://www.twitch.tv/${streamer}`;
          const streamEmbed = new EmbedBuilder()
            .setColor('#6441a5')
            .setURL(streamUrl)
            .setTitle(`${streamer} est en live sur Twitch !`)
            .addFields([
            {
              name: `Jeu`,
              value: `Joue à ${gameName}`,
              inline : true

            }
          ])
            .setThumbnail(profilePictureUrl)
            .setImage(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${streamer}-1366x768.jpg`)
            .setTimestamp(Date.now());
          client.channels.cache.get(channelId).send(`**${streamer} est en live **🔴 @everyone`);
          client.channels.cache.get(channelId).send({ embeds: [streamEmbed] });
          console.debug(`**${streamer} en live !**`)
        } else if (streamResponse.data.data.length === 0 && streamStatus[streamer]) {
          // Streamer is not live and message has been sent, reset the status
          streamStatus[streamer] = false;
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
});


client.login(client.config.app.token);
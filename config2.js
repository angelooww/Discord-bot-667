module.exports = {
    app: {
        token: '',
        playing: '🎵 667 🏴‍☠️|  /help',
        global: true,
        guild: 'XXX'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: '',
            commands: []
        },
        maxVol: 100,
        leaveOnEnd: false,
        loopMessage: false,
        spotifyBridge: true,
        defaultvolume: 50,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};

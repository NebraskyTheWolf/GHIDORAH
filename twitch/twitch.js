const tmi = require('tmi.js');

const options = {
    identity: {
        username: 'GHIDORAH',
        password: process.env.TWITCH_OAUTH_SECRET
    },
    channels: [
        'mitsuihoshiko'
    ]
}

const twitchClient = new tmi.client(options);

module.exports = client => {
    client.logger.log('startProgress', `Loading module TWITCH...`);
    client.logger.log('startProgress', `Loading handlers...`);
    ["events", "commands"].forEach(result => require(`./handlers/${result}.js`)(twitchClient)(client));
    client.logger.log('stopProgress');

    client.connect();

}

module.exports = {
    moduleName: 'twitchbot',
    moduleVersion: '0.0.1',
    moduleCategory: 'addons',
    moduleDescription: 'A simple test for twitch API.',
    initOptions: {
        side: 'client',
        initPriority: 'postInit',
        verifyModule: false,
        enabled: true
    }
}
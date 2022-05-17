const { MessageEmbed } = require("discord.js");



module.exports = {
    task: {
        name: 'checkNetwork',
        cronTime: 20000
    },
    async execute() {
        await client.lxdNetwotk.info(callback => {
            if (callback.status) {
                if (callback.data.storage === '')
                    client.logger.log('WARN', 'Unable to get LXD Storage server.');
                client.lxdNetwotk.listNetworks((network) => {
                    client.redis.set('room@ghidorah.net/network', {
                        type: 'NETWORK_CARD',
                        proc: network
                    });
                });
            }
        });
    }
}

// networks
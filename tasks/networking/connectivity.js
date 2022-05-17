const fetch = require('node-fetch');

module.exports = {
    task: {
        name: 'connectivity',
        cronTime: 20000
    },
    execute() {
            client.movieReservedVLAN.forEach(async (key, val) => {
            await fetch(`http://${val}:2577/payload`)
                .then(() => {
                    client.redis.publish(`room@ghidorah.net/${key}/payload`, {
                        type: 'NETWORK_ACK',
                        status: 'ONLINE'
                    });
                    client.redis.set(`room@ghidorah.net/${key}/payload`, {
                        status: 'ONLINE',
                        data: val,
                        keepAliveAt: Date.now()
                    });
                })
                .catch((err) => {
                    client.redis.publish(`room@ghidorah.net/${key}/payload`, {
                        type: 'NETWORK_ACK_FAILED',
                        status: 'UNREACHABLE',
                        data: {
                            error: err
                        }
                    });
                });
        });
    }
}

// networks
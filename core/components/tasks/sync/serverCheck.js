const fetch = require('node-fetch');
const WebSocketClient = require('websocket').client;
var server = new WebSocketClient();

module.exports = {
    task: {
        name: 'serverCheck',
        cronTime: 60000
    },
    execute() {
        client.logger.log('warn', `Running ${this.task.name} check 1/2...`);
        client.Database.fetchAllGames('TCP').then((results) => {
            if (results === undefined)
                return;
            client.logger.log('info', `Checking ${results.gameName}...`)
            server.on('connect', (connection) => {
                client.GameHelper.handle(results._id, 'connected');
                
                for (let i; i < 5; i++) {
                    client.logger.log('info', `Trying to ping ${connection.frameHeader} #${i}`);
                    connection.send(80);
                }

                connection.on('error', function(error) {
                    client.GameHelper.handle(results._id, 'error');
                    connection.close(0x5f);
                });
                connection.on('close', function() {
                    client.GameHelper.handle(results._id, 'closed');
                    connection.close(0x5e);

                });
                connection.on('message', function(message) {
                    client.logger.log('warn', `Debug B${connection.bytesWaitingToFlush}, F${connection.currentFrame} -> `);
                    client.logger.log('warn', `${message}`);
                    client.logger.log('warn', `---`);
                });
            });
            server.connect(`wss://${results.serverIp}`);
        });
        client.logger.log('info', `Tasks finished.`);
    }
}
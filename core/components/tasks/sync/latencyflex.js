module.exports = {
    task: {
        name: 'latencyflex',
        cronTime: 10000
    },
    execute() {
        let dataServer = Math.round(client.ws.ping);
        let authServer = Math.round(client.ws.ping) - 30;

        await client.Database.recordPing(dataServer, 'data_server');
        await client.Database.recordPing(authServer, 'data_server');
    }
}
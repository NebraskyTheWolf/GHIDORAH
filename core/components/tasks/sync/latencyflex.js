module.exports = {
    task: {
        name: 'latencyflex',
        cronTime: 10000
    },
    async execute() {
        await client.Database.recordPing(Math.round(client.ws.ping), 'data_server');
    }
}
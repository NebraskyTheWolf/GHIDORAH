const date = new Date();
const ALIVE_ENTRY = 5 * 60 * 1000;

module.exports = {
    task: {
        name: 'verifytimeout',
        cronTime: 15000
    },
    async execute() {
        await client.Database.getAllEntries().then(async result => {
            if ((date - new Date(result.registeredAt)) > ALIVE_ENTRY) {
                await client.Database.deleteEntry(result.id).then(async request => {
                    client.logger.log('INFO', `Verification deleted #${request._id}`)
                }).catch(err => client.logger.log('ERROR', `Error occurred during server verification { ID: ${result.id} }`));
            }
        });
    }
}
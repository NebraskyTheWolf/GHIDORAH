const date = new Date();
const ALIVE_ENTRY = 60 * 60 * 1000;

module.exports = {
    task: {
        name: 'verifytimeout',
        cronTime: 300000
    },
    execute() {
        client.Database.getAllEntries().forEach(result => {
            if ((date - new Date(result.registeredAt) > ALIVE_ENTRY)) {
                client.Database.deleteEntry(result.id).then(request => {
                    if (result.id === 'DEFAULT') return;
                    
                    if (request)
                        client.users.fetch(result.id).send({
                            content: 'Verification timed out, please try again.'
                        }).catch(err => client.logger.log('WARN', `Direct messages disabled for ${result.id}`));
                    else
                        client.logger.log('WARN', 'Request ')
                }).catch(err => client.logger.log('ERROR', `Error occurred during server verification { ID: ${result.id} }`));
            }
        });
    }
}
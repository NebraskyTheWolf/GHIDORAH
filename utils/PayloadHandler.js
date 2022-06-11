let cycle = 0;

module.exports.handle = async function (client, application = {}, data = {}, callback) {
    client.logger.log('DEBUG', `HANDLER #${cycle++}`);
    if (data.key) {
        const payload = client.payload.get(data.key);
        const permission = client.Database.payloadPermissions(data.key, 
            application.auth.accessToken, 
            application.auth.refreshToken);
        client.logger.log('DEBUG', `HANDLER #${cycle++}`);
        if (permission.scope === 'ALLOWED') {
            client.logger.log('DEBUG', `HANDLER #${cycle++}`);
            if (payload) {
                client.logger.log('DEBUG', `HANDLER #${cycle++}`);
                if (data.data) {
                    client.logger.log('DEBUG', `HANDLER #${cycle++}`);
                    const finalPayload = await payload.execute(client, application, data);
                    callback(finalPayload);
                    client.logger.log('DEBUG', `HANDLER #${cycle++}`);
                } else {
                    client.logger.log('DEBUG', `HANDLER #${cycle++}`);
                    callback({
                        statusCode: 'REJECTED',
                        keychains: {},
                        fingerprints: {},
                        
                        data: {
                            message: 'Payload "data" json segment missing.'
                        }
                    });
                    client.logger.log('DEBUG', `HANDLER #${cycle++}`);
                }
            } else {
                client.logger.log('DEBUG', `HANDLER #${cycle++}`);
                callback({
                    statusCode: 'REJECTED',
                    keychains: {},
                    fingerprints: {},
                    
                    data: {
                        message: 'Payload key invalid.'
                    }
                });
                client.logger.log('DEBUG', `HANDLER #${cycle++}`);
            }
        } else {
            client.logger.log('DEBUG', `HANDLER #${cycle++}`);
            callback({
                statusCode: 'REJECTED',
                keychains: {},
                fingerprints: {},
            
                data: {
                    message: 'Missing permissions.'
                }
            });
            client.logger.log('DEBUG', `HANDLER #${cycle++}`);
        }
    } else {
        client.logger.log('DEBUG', `HANDLER #${cycle++}`);
        callback({
            statusCode: 'REJECTED',
            keychains: {},
            fingerprints: {},
    
            data: {
                message: 'Payload "key" json segment missing.'
            }
        });
        client.logger.log('DEBUG', `HANDLER #${cycle++}`);
    }

    callback({
        statusCode: 'REJECTED',
        keychains: {},
        fingerprints: {},

        data: {
            message: 'Payload body segment invalid.'
        }
    });
}
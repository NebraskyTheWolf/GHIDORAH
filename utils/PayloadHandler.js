module.exports.handle = async function(client, application = {}, data = {}, callback) {
    if (data.key) {
        const payload = client.payload.get(data.key);
        client.Database.payloadPermissions(data.key, 
            application.auth.accessToken, 
            application.auth.refreshToken).then(async result => {
                if (payload) {
                    if (data.data) {
                        const finalPayload = await payload.execute(client, application, data);
                        callback({
                            data: finalPayload, 
                            allowedPermissions: result
                        });
                    } else {
                        callback({
                            statusCode: 'REJECTED',
                            keychains: {},
                            fingerprints: {},
                        
                            data: {
                                message: 'Payload "data" json segment missing.'
                            }
                        });
                    }
                } else {
                    callback({
                        statusCode: 'REJECTED',
                        keychains: {},
                        fingerprints: {},
                    
                        data: {
                            message: 'Payload key invalid.'
                        }
                    });
                }
            }).catch(err => {
                callback({
                    statusCode: 'REJECTED',
                    keychains: {},
                    fingerprints: {},
            
                    data: {
                        message: 'Missing permissions.'
                    }
                });
            });
    } else {
        callback({
            statusCode: 'REJECTED',
            keychains: {},
            fingerprints: {},
    
            data: {
                message: 'Payload "key" json segment missing.'
            }
        });
    }

    callback({
        statusCode: 'REJECTED',
        keychains: {},
        fingerprints: {},

        data: {}
    });
}
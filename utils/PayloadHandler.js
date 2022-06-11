module.exports.handle = async function(client, application = {}, data = {}, callback) {
    if (data.data) {
        if (data.key) {
            const payload = client.payload.get(data.key);
            if (payload) {
                client.Database.payloadPermissions(data.key, 
                    application.auth.accessToken, 
                    application.auth.refreshToken).then(result => {
                        console.log(result)
                        const finalPayload = payload.execute(client, application, data);
                        callback({
                            data: finalPayload, 
                            allowedPermissions: [result]
                        });
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
                        message: 'Invalid payload'
                    }
                });
            }
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
}
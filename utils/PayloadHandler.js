module.exports.handle = async function(client, application, data, callback) {
    if (data.data) {
        if (data.key) {
            const payload = client.payload.get(data.key);
            if (payload) {
                if (payload.payload.protected) {
                    client.Database.payloadPermissions(data.key, 
                        application.auth.accessToken, 
                        application.auth.refreshToken).then(result => {
                        if (result) {
                            const finalPayload = payload.execute(client, application, data);
                            callback({
                                data: finalPayload, 
                                allowedPermissions: [result]
                            });
                        } else {
                            callback({
                                statusCode: 'REJECTED',
                                keychains: {},
                                fingerprints: {},
                            
                                data: {
                                    message: 'SERVER_ERROR'
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
                    const finalPayload = payload.execute(client, application, data);
                    if (finalPayload) {
                        callback({
                            data: finalPayload
                        });
                    } else {
                        callback({
                            statusCode: 'FAILED',
                            keychains: {},
                            fingerprints: {},
                        
                            data: {
                                message: 'Payload initialisation.'
                            }
                        });
                    }
                }
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
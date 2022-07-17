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
                                integrity: {
                                    keychains: {},
                                    fingerprints: client.fingerprint,
                                },
                                data: finalPayload, 
                            });
                        } else {
                            callback({
                                statusCode: 'REJECTED',
                                data: {
                                    message: 'SERVER_ERROR'
                                }
                            });
                        }
                    }).catch(err => {
                        callback({
                            statusCode: 'REJECTED',                    
                            data: {
                                message: 'Missing permissions.'
                            }
                        });
                    });
                } else {
                    const finalPayload = payload.execute(client, application, data);
                    if (finalPayload) {
                        callback({
                            integrity: {
                                keychains: {},
                                fingerprints: prints,
                            },
                            data: finalPayload
                        });
                    } else {
                        callback({
                            statusCode: 'FAILED',                            
                            data: {
                                message: 'Payload initialisation.'
                            }
                        });
                    }
                }
            } else {
                callback({
                    statusCode: 'REJECTED',                    
                    data: {
                        message: 'Invalid payload'
                    }
                });
            }
        } else {
            callback({
                statusCode: 'REJECTED',                
                data: {
                    message: 'Payload "key" json segment missing.'
                }
            });
        }
    } else {
        callback({
            statusCode: 'REJECTED',            
            data: {
                message: 'Payload "data" json segment missing.'
            }
        });
    }
}
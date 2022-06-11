module.exports = {
    payload: function (req, res) {
        const data = req.body;
        const token = req.get('GH-Authorisation-Token');

        console.log(token)

        if (token) {
            client.Database.fetchApplication(token).then(result => {
                if (result.appEnabled) {
                    client.PayloadHandler.handle(result, data, callback => {
                        res.status(200).json({
                            status: true,
                            payloadStatus: {
                                message: 'VALIDATED_AUTHENTICATION',
                                code: callback.statusCode,
                                keychain: callback.keychains,
                                fingerprints: callback.fingerprints
                            },
                            data: {
                                informations: {
                                    appName: result.appName,
                                    appDescriptions: result.appDescriptions
                                },
                                auth: {
                                    accessToken: result.auth.accessToken,
                                    refreshToken: result.auth.refreshToken,
                                    authenticated: true
                                },
                                callback: callback
                            }
                        });
                    });
                } else {
                    res.status(401).json({
                        status: false,
                        code: 421035,
                        error: 'APPLICATION_DISABLED'
                    });
                }
            }).catch(err => {
                console.log(err)
                res.status(403).json({
                    status: false,
                    code: 403254,
                    error: 'INVALID_PROVIDED_TOKEN',
                    message: 'Invalid token provided.'
                });
            });
        } else {
            res.status(403).json({
                status: false,
                code: 403250,
                error: 'UNAUTHORISED_TOKEN'
            });
        }
    },
    callback: function (req, res) {  }
}
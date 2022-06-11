const { client } = require("tmi.js");

let cycle = 0;
module.exports = {
    payload: function (req, res) {
        const data = req.body;
        const token = req.get('GH-Authorisation-Token');

        client.logger.log('DEBUG', `SEG #${cycle++}`);

        if (token) {
            client.logger.log('DEBUG', `SEG #${cycle++}`);
            client.Database.fetchApplication(token).then(result => {
                client.logger.log('DEBUG', `SEG #${cycle++}`);
                if (result.appEnabled) {
                    client.logger.log('DEBUG', `SEG #${cycle++}`);
                    client.PayloadHandler.handle(result, data, callback => {
                        client.logger.log('DEBUG', `SEG #${cycle++}`);
                        console.log(callback)
                        res.status(200).json({
                            status: true,
                            message: 'VALIDATED_AUTHENTICATION',

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
                    client.logger.log('DEBUG', `SEG #${cycle++}`);
                    res.status(401).json({
                        status: false,
                        code: 421035,
                        error: 'APPLICATION_DISABLED',

                        data: {
                            auth: {
                                authenticated: false
                            }
                        }
                    });
                }
            }).catch(err => {
                client.logger.log('DEBUG', `SEG #${cycle++}`);
                console.log(err)
                res.status(403).json({
                    status: false,
                    code: 403254,
                    error: 'INVALID_PROVIDED_TOKEN',
                    message: 'Invalid token provided.',

                    data: {
                        auth: {
                            authenticated: false
                        }
                    }
                });
            });
        } else {
            client.logger.log('DEBUG', `SEG #${cycle++}`);
            res.status(403).json({
                status: false,
                code: 403102,
                error: 'UNAUTHORISED_TOKEN',

                data: {
                    auth: {
                        authenticated: false
                    }
                }
            });
        }
    },
    callback: function (req, res) {  }
}
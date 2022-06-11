module.exports = {
    payload: function (req, res) {
        const data = req.body;
        const token = req.get('GH-Authorisation-Token');

        console.log(token)

        if (token) {
            client.Database.fetchApplication(token).then(result => {
                if (application.appEnabled) {
                    res.status(200).json({
                        status: true,
                        message: 'VALIDATED_AUTHENTICATION',
                        data: {
                            auth: {
                                accessToken: result.auth.accessToken,
                                refreshToken: result.auth.refreshToken
                            }
                        }
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
                    message: err
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
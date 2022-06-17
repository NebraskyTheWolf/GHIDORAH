module.exports = function (req, res, next) {
    const token = req.get('Authorisation');
    const server = req.get('Server');
    if (token) {
        client.Database.fetchApplication(token).then(result => {
            if (result.appEnabled) {
                if (server !== 'cloudflare') {
                    res.status(402).json({
                        status: false,
                        code: 428235,
                        error: 'APPLICATION_EXTERNAL_REQUEST'
                    }).end();
                } else {
                    next().json({
                        scope: 'VALIDATED'
                    });
                }
            } else {
                res.status(401).json({
                    status: false,
                    code: 421035,
                    error: 'APPLICATION_DISABLED'
                }).end();
            }
        }).catch(err => {
            client.logger.log('ERROR', `Error handled: ${err}`);
            res.status(403).json({
                status: false,
                code: 403254,
                error: 'INVALID_PROVIDED_TOKEN',
                message: 'Invalid token provided.'
            }).end();
        });
    } else {
        res.status(403).json({
            status: false,
            code: 403102,
            error: 'UNAUTHORISED_TOKEN'
        }).end();
    }
};
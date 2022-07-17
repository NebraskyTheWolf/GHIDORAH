module.exports = function (req, res, next) {
    const token = req.get('Authorisation');
    if (token) {
        client.Database.fetchApplication(token).then(result => {
            if (result.appEnabled) {
                next();
            } else {
                res.status(401).json({
                    status: false,
                    code: 421035,
                    error: 'APPLICATION_DISABLED'
                }).end();
            }
        }).catch(err => {
            res.status(403).json({
                status: false,
                code: 403254,
                error: 'INVALID_PROVIDED_TOKEN'
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
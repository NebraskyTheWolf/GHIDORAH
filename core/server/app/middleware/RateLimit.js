module.exports = function (req, res, next) {
    client.Database.fetchApplication(req.get('Authorisation')).then(result => {
        if (result.appEnabled) {
            const permission = client.Database.isAllowed(result.token);
            if (permission.permissionKey === req.baseUrl)
                next();
            else if (permission.permissionKey === '*')
                next();
            else 
                res.status(403).json({
                    status: false,
                    code: 445122,
                    error: 'PERMISSION_DENIED'
                });
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
};
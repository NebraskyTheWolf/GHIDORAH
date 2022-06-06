module.exports = {
    payload: function (req, res) {
        const data = req.body;
        const token = req.headers['GH-Authorisation-Token'];
        const application = client.Modlog.checkApplication(token);

        switch (application.status) {
            case "APPLICATION_AUTHORIZED": {

            }
            break;
            case "APPLICATION_DISABLED": {
                res.status(401).json({
                    status: false,
                    code: 421035,
                    error: 'APPLICATION DISABLED'
                });
            }
            break;
            case "UNAUTHORIZED_APPLICATION": {
                res.status(403).json({
                    status: false,
                    code: 403254,
                    error: 'INVALID PROVIDED TOKEN'
                });
            }
            break;
        }
    },
    callback: function (req, res) {
        
    }
}
module.exports = {
    payload: function (req, res) {
        const data = req.body;
        const token = req.get('GH-Authorisation-Token');
        const application = client.Modlog.checkApplication(token);

        client.logger.log('ERROR', `--- PAYLOAD ---`);
        client.logger.log('ERROR', `Token: ${token}`);
        client.logger.log('ERROR', `Data: ${data}`);
        client.logger.log('ERROR', `Application status: ${application.status}`);
        client.logger.log('ERROR', `--- PAYLOAD ---`);

        switch (application.status) {
            case "APPLICATION_AUTHORIZED": {
                res.status(200).json({
                    status: true,
                    message: 'processing_payload',
                    data: {}
                });
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

        res.status(500).json({
            status: false,
            code: 503854,
            error: 'ERROR OCCURED DURING REQUEST PROCESSING.'
        });
    },
    callback: function (req, res) {

    }
}
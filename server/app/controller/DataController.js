module.exports = {
    payload: function (req, res) {
        const data = req.body;
        const token = req.get('GH-Authorisation-Token');
        const application = client.Database.fetchApplication(token);

        client.logger.log('ERROR', `--- PAYLOAD ---`);
        if (token)
             client.logger.log('ERROR', `[+] Token: ${token}`);
        else client.logger.log('ERROR', `[-] Token not set.`);
        if (data) 
             client.logger.log('ERROR', `[+] Data key: ${data.key}`);
        else client.logger.log('ERROR', `[-] Data not set.`);
        if (application)
             client.logger.log('ERROR', `[+] Application name: ${application.appName}`);
        else client.logger.log('ERROR', `[-] Invalid token.`);
        client.logger.log('ERROR', `--- PAYLOAD ---`);

        if (application) {
            if (application.appEnabled) {
                res.status(200).json({
                    status: true,
                    message: 'processing_payload',
                    data: {}
                });
            } else {
                res.status(401).json({
                    status: false,
                    code: 421035,
                    error: 'APPLICATION DISABLED'
                });
            }
        } else {
            res.status(403).json({
                status: false,
                code: 403254,
                error: 'INVALID PROVIDED TOKEN'
            });
        }
    },
    callback: function (req, res) {

    }
}
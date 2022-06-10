module.exports = {
    payload: function (req, res) {
        const data = req.body;
        const token = req.get('GH-Authorisation-Token');
        const application = client.Database.fetchApplication(token);

        client.logger.log('DEBUG', `--- PAYLOAD ---`);
        if (token)
             client.logger.log('DEBUG', `[+] Token: ${token}`);
        else client.logger.log('DEBUG', `[-] Token not set.`);
        if (data.key) 
             client.logger.log('DEBUG', `[+] Data key: ${data.key}`);
        else client.logger.log('DEBUG', `[-] Data not set.`);
        if (application)
             client.logger.log('DEBUG', `[+] Application name: ${application.appName}`);
        else client.logger.log('DEBUG', `[-] Invalid token.`);
        client.logger.log('DEBUG', `--- PAYLOAD ---`);

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
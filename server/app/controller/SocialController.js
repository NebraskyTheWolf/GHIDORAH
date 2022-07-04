module.exports = new class {
    async twitchCallback (req, res) {
        client.logger.log('DEBUG', 'TwitchCallback >');
        client.logger.log('DEBUG', req.body);
        client.logger.log('DEBUG', '< CALL ENDED');

        res.status(200).end();
    }
    async youtubeCallback (req, res) {
        client.logger.log('DEBUG', 'YoutubeCallback >');
        client.logger.log('DEBUG', req.body);
        client.logger.log('DEBUG', '< CALL ENDED');

        res.status(200).end();
    }
    async twitterCallback (req, res) {
        client.logger.log('DEBUG', 'TwitterCallback >');
        client.logger.log('DEBUG', req.body);
        client.logger.log('DEBUG', '< CALL ENDED');

        res.status(200).end();
    }
}
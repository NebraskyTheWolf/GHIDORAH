module.exports = {
    twitchCallback: function (req, res) {
        client.logger.log('DEBUG', 'TwitchCallback >');
        client.logger.log('DEBUG', req.body);
        client.logger.log('DEBUG', '< CALL ENDED');

        res.status(200).end();
    },
    youtubeCallback: function (req, res) {
        client.logger.log('DEBUG', 'YoutubeCallback >');
        client.logger.log('DEBUG', req.body);
        client.logger.log('DEBUG', '< CALL ENDED');

        res.status(200).end();
    },
    twitterCallback: function (req, res) {
        client.logger.log('DEBUG', 'TwitterCallback >');
        client.logger.log('DEBUG', req.body);
        client.logger.log('DEBUG', '< CALL ENDED');

        res.status(200).end();
    }
}
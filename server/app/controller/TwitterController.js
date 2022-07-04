var Twitter = require("node-twitter-api");
var twitter = new Twitter({
  consumerKey: 'TDorcUrSv7cepNtmDEkkCAuO6',
  consumerSecret: 'n9s5bipKppFpVOWDjU83icWJi4J5ZJMXebuy7Zvr3KGAIafiOb',
  callback: 'https://api.skf-studios.com/socials/twitter/response'
});
var TwitterClient = require('twitter')
var twitterClient = new TwitterClient({
  consumer_key: 'TDorcUrSv7cepNtmDEkkCAuO6',
  consumer_secret: 'n9s5bipKppFpVOWDjU83icWJi4J5ZJMXebuy7Zvr3KGAIafiOb',
  access_token_key: '1466843972102459392-03dhyp5V8sklRahX63YoFiJvN3N2kZ',
  access_token_secret: 'Yq6ZkI7Bz0FrCyCOUPy2rVSSNhtcOd2S1HXQnMmfXQhPz'
});
var crypto = require('crypto');
var request = require('request');


module.exports = new class {
  async requestAuthorization (req, res) {
        if (!req.query || !req.query.userId || req.query.userId.length <= 0 || !req.query.callback || req.query.callback.length <= 0 || !req.query.notification || req.query.notification.length <= 0 || !req.query.authKey || req.query.authKey.length <= 0)
            return res.status(400).json({status: false, error: 'Invalid request.'})

        client.Database.createSocialLink({
          
        }, {}).then(result => {

        }).catch(err => {

        });
    }
};
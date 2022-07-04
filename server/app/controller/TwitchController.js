const passport = require('passport');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var request        = require('request');

const TWITCH_CLIENT_ID = 'f5hq6u1aqb4agwq4ivatz5dw40e8wv';
const TWITCH_SECRET    = 'hmqs3shu4bn3yf26rb5wsvwtn57zto';
const CALLBACK_URL     = 'https://skf-studios.com/twitch/callback';

const SESSION_SECRET   = '';

OAuth2Strategy.prototype.userProfile = function(accessToken, done) {
    var options = {
        url: 'https://api.twitch.tv/helix/users',
        method: 'GET',
        headers: {
          'Client-ID': TWITCH_CLIENT_ID,
          'Accept': 'application/vnd.twitchtv.v5+json',
          'Authorization': 'Bearer ' + accessToken
        }
    };

    request(options, function (error, response, body) {
        if (response && response.statusCode == 200) {
          done(null, JSON.parse(body));
        } else {
          done(JSON.parse(body));
        }
    });
}

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use('twitch', new OAuth2Strategy({
    authorizationURL: 'https://id.twitch.tv/oauth2/authorize',
    tokenURL: 'https://id.twitch.tv/oauth2/token',
    clientID: TWITCH_CLIENT_ID,
    clientSecret: TWITCH_SECRET,
    callbackURL: CALLBACK_URL,
    state: true
  },
  function(accessToken, refreshToken, profile, done) {
    profile.accessToken = accessToken;
    profile.refreshToken = refreshToken;

    client.Database.createSocial(profile.discord_id, {
        platform: 'twitch',
        refreshToken: refreshToken,
        accessToken: accessToken
    }, result => {
        done(err, result);
    });

    done(null, profile);
  }
));

module.exports = new class {
  async login (req, res) {
        passport.authenticate('twitch', { scope: 'user_read', discord_id: req.params.userId});
    }
}
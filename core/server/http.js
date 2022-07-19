const express = require("express");
const session = require("express-session");
const server = express();
const bodyParser = require("body-parser");
const passport = require('passport');

const fs = require("fs");
const https = require('https');

var privateKey  = fs.readFileSync('core/server/sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('core/server/sslcert/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var httpsServer = https.createServer(credentials, server);

// MIDDLEWAR
const rateLimiter = require('./app/middleware/RateLimit');

module.exports = client => {
	server.use(express.static('public'))
	server.get("/", (_, res) => res.status(200).json({
		apiVersion: client.version,
		apiAuthor: 'Vakea <contact@skf-studios.com>',
		apiName: 'GHIDORAH DATA SERVER',
		apiSig: client.prints,
		apiOptions: {
			websocket: {
				host: 'wss://api.skf-studios.com/v8',
				status: 'ONLINE'
			},
			lxdserver: {
				local: client.LXDUtils.local(),
				info: client.LXDUtils.info(),
				resources: client.LXDUtils.resources(),
				remotes: client.LXDUtils.remotes(),
				network: client.LXDUtils.listNetworks(),
				containers: client.LXDUtils.getContainers(),
				aliases: client.LXDUtils.getAllAliases()
			},
			maintenance: client.isDebug
		}
	}));

	server.use(session({secret: `${client.fingerprint}`, resave: false, saveUninitialized: false}));
	server.use(bodyParser.json());
	server.use(passport.initialize());
	server.use(passport.session());

	server.use(function (req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,POST');
		res.header('Access-Control-Allow-Headers', 'Content-Type');

		next();
	});
	
	// configured
	var routes = require('./app/config/routes')
	for (var route in routes) {
	  // get method
	  if (route.split(' ').length > 1) {
		var method = route.split(' ')[0]
		var url = route.split(' ')[1]
	  } else {
		var method = 'get'
		var url = route
	  }
	  // get controller & method
	  if (typeof routes[route] === 'string') { // not protected
		var controller = routes[route].split('.')[0]
		var action = routes[route].split('.')[1]
	  } else { // protected
		var controller = routes[route].function.split('.')[0]
		var action = routes[route].function.split('.')[1]
	
		if (routes[route].protected) {
		  // init protected route
		  server[method](url, rateLimiter, require('./app/controller/' + controller)[action])
		  continue
		}
	  }
	  // init route
	  server[method](url, require('./app/controller/' + controller)[action])
	}
	
	server.use(function (req, res, next) {
		res.status(404)
		// respond with json
		res.json({status: false, error: 'Method not found.'})
	});
	
	server.use(function (err, req, res, next) {
		console.error(err)
		res.status(500).json({status: false, error: 'An error has occured.'})
	});

	httpsServer.listen(443);
};
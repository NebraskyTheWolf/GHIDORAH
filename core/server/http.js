const express = require("express");
const session = require("express-session");
const server = express();
const bodyParser = require("body-parser");
const passport = require('passport');

const fs = require("fs");
const https = require('https');

const privateKey  = fs.readFileSync('core/server/sslcert/server.key', 'utf8');
const certificate = fs.readFileSync('core/server/sslcert/server.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

const httpsServer = https.createServer(credentials, server);

// MIDDLEWAR
const rateLimiter = require('./app/middleware/RateLimit');

module.exports = async (client) => {
	server.use(express.static('public'))
	server.get("/", async (req, res) => {
		res.status(200).json({
			data: {
				apiVersion: client.version,
				apiRevision: client.revision,
				apiAuthor: 'Vakea <contact@ghidorah.uk>',
				apiName: 'GHIDORAH DATA SERVER',
				apiSig: client.prints,
				maintenance: client.IsDebug
			}
		});
	});

	server.use(session({secret: `${client.fingerprint}`, resave: false, saveUninitialized: false}));
	server.use(bodyParser.json());
	server.use(passport.initialize());
	server.use(passport.session());

	server.use(async function (req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,POST');
		res.header('Access-Control-Allow-Headers', 'Content-Type');

		next();
	});
	
	var routes = require('./app/config/routes')
	for (var route in routes) {
	  if (route.split(' ').length > 1) {
		var method = route.split(' ')[0]
		var url = route.split(' ')[1]
	  } else {
		var method = 'get'
		var url = route
	  }
	  if (typeof routes[route] === 'string') {
		var controller = routes[route].split('.')[0]
		var action = routes[route].split('.')[1]
	  } else {
		var controller = routes[route].function.split('.')[0]
		var action = routes[route].function.split('.')[1]
	
		if (routes[route].protected) {
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
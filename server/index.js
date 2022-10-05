const express = require("express");
const session = require("express-session");
const server = express();
const bodyParser = require("body-parser");
const passport = require('passport');

const fs = require("fs");
const https = require('https');

const privateKey  = fs.readFileSync('../server/app/config/ssl/server.key', 'utf8');
const certificate = fs.readFileSync('../server/app/config/ssl/server.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

const httpsServer = https.createServer(credentials, server);

const authentication = require('./app/middlewares/Authentication');
const engine = require('express-engine-jsx');

module.exports = async function start(client) {
    server.use(express.static('public'));
	server.set('view engine', 'jsx');
	server.engine('jsx', engine);

	server.get("/", async (req, res) => {
		res.status(200).json({
			data: {
				apiVersion: client.version,
				apiRevision: client.revision,
				apiAuthor: 'NebraskyTheWolf <farfy.dev@gmail.com>',
				apiName: 'GHIDORAH',
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
		res.header('Server', 'GHIDORAH');

		next();
	});
 
    client.logger.log('INFO', `Starting WEBAPP..`);

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
            server[method](url, authentication, require('./app/controller/' + controller)[action])
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

	return server;
}

httpsServer.listen(443);
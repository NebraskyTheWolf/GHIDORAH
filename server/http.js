const express = require("express");
const server = express();
const bodyParser = require("body-parser");

const fs = require("fs");

const http = require('http');
const https = require('https');

var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(server);
var httpsServer = https.createServer(credentials, server);

module.exports = client => {
	server.use(express.static('public'))
	server.get("/", (_, res) => res.send("GHIDORAH is alive!"));
	
	server.use((req, res, next) => {
		res.append('Access-Control-Allow-Origin', ['*']);
		res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.append('Access-Control-Allow-Headers', 'Content-Type');
		next();
	});

	server.use(bodyParser.json());

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
		  server[method](url, auth, require('./app/controller/' + controller)[action])
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

	httpServer.listen(3000);
	httpsServer.listen(8443);
};
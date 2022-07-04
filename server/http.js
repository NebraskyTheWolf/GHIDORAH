/**
 * @description BETA CLOUDFLARE WORKER FOR GHIDORAH.
 */
import Router from '@tsndr/cloudflare-worker-router'
const server = new Router();
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require('passport');

// MIDDLEWAR
const rateLimiter = require('./app/middleware/RateLimit');

module.exports = client => {
	server.use(express.static('public'))
	server.get("/", (_, res) => res.status(200).json({
		apiVersion: "5.3.2",
		apiAuthor: 'Mitsui Hoshiko',
		apiName: 'GHIDORAH DATA SERVER',
		apiSig: 'a7:b1:3e:3d:84:24:a2:5a:91:5f:6f:e9:cf:dd:2b:6a',
		apiOptions: {
			storage: {},
			websocket: {},
			lxdserver: {},
			maintenance: true
		}
	}));

	server.use(session({secret: `${client.fingerprint}`, resave: false, saveUninitialized: false}));
	server.use(bodyParser.json());
	server.use(passport.initialize());
	server.use(passport.session());

	server.use(function (req, res, next) {
		res.headers.set('Access-Control-Allow-Origin', '*');
		res.headers.set('Access-Control-Allow-Methods', 'GET,POST');
		res.headers.set('Access-Control-Allow-Headers', 'Content-Type');

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
};

export default {
    async fetch(request, env, ctx) {
        return router.handle(env, request)
    }
}
const fs = require("fs");

module.exports = client => {
	fs.readdir("./security/api/", (err, files) => {
		if (err) console.log(err);
		files.forEach(file => {
			const middleware = require(`../security/api/${file}`);
			client.logger.log('INFO', ` > Loaded Middleware: ${file}: ${middleware.middleware.key}@${middleware.middleware.version}`);
			client.payload.set(middleware.middleware.key, middleware);
		});
	});
};
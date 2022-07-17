const fs = require("fs");

module.exports = client => {
	fs.readdir("./security/api/", (err, files) => {
		if (err) console.log(err);
		files.forEach(file => {
			const middleware = require(`../security/api/${file}`);
			client.payload.set(middleware.middleware.key, middleware);
		});
	});
};
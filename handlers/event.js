const fs = require("fs");

module.exports = client => {
	fs.readdir("./events/client/", (err, files) => {
		if (err) console.log(err);
		files.forEach(file => {
			const event = require(`../events/client/${file}`);
			client.logger.log('INFO', ` > Loaded Event: ${file}`);
			const eventName = file.split(".")[0];
			client.on(eventName, event.bind(null, client));
			
			client.events.on(eventName, event.bind(null, client));
		});
	});
};
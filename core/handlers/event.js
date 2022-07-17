const fs = require("fs");
module.exports = client => {
	fs.readdirSync("core/events/client/", (err, files) => {
		if (err);
		
		files.forEach(file => {
			const event = require(`../events/client/${file}`);
			const eventName = file.split(".")[0];
			client.on(eventName, event.bind(null, client));
			client.events.on(eventName, event.bind(null, client));
		});
	});
};
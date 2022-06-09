const fs = require("fs");

module.exports = twitchClient, client => {
	fs.readdir('./events/', (err, files) => {
		if (err) client.logger.log('ERROR', err);
		files.forEach(file => {
			const event = require(`../events/${file}`);
			client.logger.log('INFO', `${twitchClient.moduleName} > Loaded Event: ${file}`);
			const eventName = file.split(".")[0];
			twitchClient.on(eventName, event.bind(null, client, twitchClient));
		});
	});
};
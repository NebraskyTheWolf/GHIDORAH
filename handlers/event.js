const fs = require("fs");
const ora = require('ora');

module.exports = client => {
	const load = ora('Loading events...').start();

	fs.readdir("./events/client/", (err, files) => {
		if (err) load.fail(`Failed to load ${files}`);
		
		files.forEach(file => {
			const event = require(`../events/client/${file}`);
			const eventName = file.split(".")[0];
			client.on(eventName, event.bind(null, client));
			client.events.on(eventName, event.bind(null, client));

			load.text = `Loading ${eventName}...`;
		});

		load.succeed('All events loaded.');
	});

	client.logger.log('INFO', `PostInit ->`)
};
const fs = require("fs");
module.exports = client => {
	const folders = fs.readdirSync("core/events/client");
    for (const files of folders) {
        const folder = fs
			.readdirSync(`./events/${files}/`)
			.filter(file => file.endsWith(".js")); 
            for (const commands of folder) {

				const event = require(`../events/${files}/${commands}`);
				const eventName = file.split(".")[0];
				client.on(eventName, event.bind(null, client));
				client.events.on(eventName, event.bind(null, client));

				client.logger.log('INFO', `Loading ${eventName}...`);
            }
    }
};
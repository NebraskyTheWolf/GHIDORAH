const fs = require("fs");
module.exports = client => {
	const folders = fs.readdirSync("core/events");
    for (const files of folders) {
        const folder = fs
			.readdirSync(`core/events/client/${files}/`)
			.filter(file => file.endsWith(".js")); 
            for (const commands of folder) {

				const event = require(`../events/${files}/${commands}`);
				const eventName = commands.split(".")[0];
				client.on(eventName, event.bind(null, client));
				client.events.on(eventName, event.bind(null, client));

				client.logger.log('INFO', `Loading ${eventName}...`);
            }
    }
};
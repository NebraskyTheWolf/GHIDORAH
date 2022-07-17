const fs = require("fs");

module.exports = client => {
	fs.readdir("./events/music/", (err, files) => {
		if (err) console.log(err);
		files.forEach(file => {
			const event = require(`../events/music/${file}`);
			const eventName = file.split(".")[0];
			client.player.on(eventName, event.bind(null, client));
		});
	});
};
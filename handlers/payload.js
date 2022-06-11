const fs = require("fs");

module.exports = client => {
	fs.readdir("./payloads/client/", (err, files) => {
		if (err) console.log(err);
		files.forEach(file => {
			const payload = require(`../payloads/client/${file}`);
			client.logger.log('INFO', ` > Loaded Payloads: ${file}: ${payload.payload.key}@${payload.payload.side}`);
			client.payload.set(payload.key, payload);
		});
	});
};
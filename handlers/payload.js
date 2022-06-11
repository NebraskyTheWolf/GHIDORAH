const fs = require("fs");

module.exports = client => {
	fs.readdir("./payloads/client/", (err, files) => {
		if (err) console.log(err);
		files.forEach(file => {
			const payload = require(`../payloads/client/${file}`);
			client.logger.log('INFO', ` > Loaded Payloads: ${file}: ${payload.key}`);
			client.payloads.set(payload.key, payload);
		});
	});
};
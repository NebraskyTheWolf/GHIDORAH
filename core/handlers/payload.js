const fs = require("fs");

module.exports = client => {
	fs.readdir("../components/payloads/client/", (err, files) => {
		if (err) console.log(err);
		files.forEach(file => {
			const payload = require(`./payloads/client/${file}`);
			client.payload.set(payload.payload.key, payload);
		});
	});
};
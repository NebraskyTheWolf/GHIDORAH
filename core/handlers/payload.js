const fs = require("fs");

module.exports = client => {
	fs.readdir("./payloads/client/", (err, files) => {
		if (err) console.log(err);
		files.forEach(file => {
			const payload = require(`../components/payloads/client/${file}`);
			client.payload.set(payload.payload.key, payload);
		});
	});
};
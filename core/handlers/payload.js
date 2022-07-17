const fs = require("fs");

module.exports = client => {
	const folders = fs.readdirSync("core/components/payloads");
    for (const files of folders) {
        const folder = fs
			.readdirSync(`core/components/payloads/${files}/`)
			.filter(file => file.endsWith(".js")); 
            for (const commands of folder) {
				const payload = require(`../components/payloads/${files}/${commands}`);
				client.payload.set(payload.payload.key, payload);
				client.logger.log('INFO', `Loading ${payload.payload.key}...`);
            }
    }
};
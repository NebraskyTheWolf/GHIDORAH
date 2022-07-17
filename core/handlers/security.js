const fs = require("fs");

module.exports = client => {
	const folders = fs.readdirSync("core/components/security");
    for (const files of folders) {
        const folder = fs
			.readdirSync(`core/components/security/${files}/`)
			.filter(file => file.endsWith(".js")); 
            for (const commands of folder) {
				const middleware = require(`../components/security/${files}/${commands}`);
				client.payload.set(middleware.middleware.key, middleware);
				client.logger.log('INFO', `Loading ${middleware.middleware.key}...`);
            }
    }
};
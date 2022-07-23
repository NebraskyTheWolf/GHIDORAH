const fs = require("fs");

module.exports = client => {
	const modalsFolders = fs.readdirSync("core/components/modals");
    for (const files of modalsFolders) {
        const folder = fs
			.readdirSync(`core/components/modals/${files}/`)
			.filter(file => file.endsWith(".js"));
            for (const commands of folder) {
                const command = require(`../components/modals/${files}/${commands}`);
				client.modals.set(command.data.name, command);
            }
    }
};
const fs = require("fs");

module.exports = client => {
    const buttonFolders = fs.readdirSync("core/components/buttons");
    for (const files of buttonFolders) {
        const folder = fs
			.readdirSync(`core/components/buttons/${files}/`)
			.filter(file => file.endsWith(".js"));
            for (const commands of folder) {
                const command = require(`../components/buttons/${files}/${commands}`);
				client.buttons.set(command.data.name, command);
            }
    }
};
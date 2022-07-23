const fs = require("fs");

module.exports = client => {
    const tasksFolder = fs.readdirSync("core/components/tasks");
    for (const files of tasksFolder) {
        const folder = fs
			.readdirSync(`core/components/tasks/${files}/`)
			.filter(file => file.endsWith(".js"));
            for (const commands of folder) {
                const command = require(`../components/tasks/${files}/${commands}`);
				client.tasks.set(command.task.name, command);
				
				setInterval(() => command.execute(), command.task.cronTime);
            }
    }
};
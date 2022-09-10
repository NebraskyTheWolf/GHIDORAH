const fs = require("fs");
module.exports = async client => {
	const activities = [
		`Lurking cuties fluffies`,
		"By Vakea#0666",
	];

	client.user.setStatus('dnd');
	client.user.setActivity(`Starting system...`, { type: "LISTENING" });

    const folders = fs.readdirSync("core/components/commands");
    for (const files of folders) {
        const folder = fs
			.readdirSync(`core/components/commands/${files}/`)
			.filter(file => file.endsWith(".js")); 
            for (const commands of folder) {
                const command = require(`../../components/commands/${files}/${commands}`);
                client.api.applications(client.user.id).commands.post({
                    data: {
                        name: command.name,
                        description: command.description,
                        options: command.commandOptions,
                    },
                });
                client.commands.set(command.name, command);
				client.logger.log('INFO', `Loading ${command.name}...`);
            }
    }
	
	await client.api.applications(client.user.id).commands.get();

	const buttonFolders = fs.readdirSync("core/components/buttons");
    for (const files of buttonFolders) {
        const folder = fs
			.readdirSync(`core/components/buttons/${files}/`)
			.filter(file => file.endsWith(".js"));
            for (const commands of folder) {
                const command = require(`../../components/buttons/${files}/${commands}`);
				client.buttons.set(command.data.name, command);
            }
    }

	const modalsFolders = fs.readdirSync("core/components/modals");
    for (const files of modalsFolders) {
        const folder = fs
			.readdirSync(`core/components/modals/${files}/`)
			.filter(file => file.endsWith(".js"));
            for (const commands of folder) {
                const command = require(`../../components/modals/${files}/${commands}`);
				client.modals.set(command.data.name, command);
            }
    }

	const tasksFolder = fs.readdirSync("core/components/tasks");
    for (const files of tasksFolder) {
        const folder = fs
			.readdirSync(`core/components/tasks/${files}/`)
			.filter(file => file.endsWith(".js"));
            for (const commands of folder) {
                const command = require(`../../components/tasks/${files}/${commands}`);
				client.tasks.set(command.task.name, command);
				
				setInterval(() => command.execute(), command.task.cronTime);
            }
    }

	client.user.setStatus('online');

	let i = 0;
	setInterval(
		() =>
			client.user.setActivity(
				`/help | ${activities[i++ % activities.length]}`,
				{ type: "WATCHING" }
			),
		15000
	);
	client.IsLoaded = true;
};
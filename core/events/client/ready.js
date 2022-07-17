const fs = require("fs");
module.exports = async client => {
	const activities = [
		`Lurking cuties fluffies`,
		`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Users`,
		"By Leona",
	];

	client.user.setStatus('dnd');
	client.user.setActivity(`Starting system...`, { type: "LISTENING" });

    const folders = fs.readdirSync("./core/components/commands");
    for (const files of folders) {
        const folder = fs
			.readdirSync(`./commands/${files}/`)
			.filter(file => file.endsWith(".js")); 
            for (const commands of folder) {
                const command = require(`../../commands/${files}/${commands}`);
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

	const buttonFolders = fs.readdirSync("./core/components/buttons");
    for (const files of buttonFolders) {
        const folder = fs
			.readdirSync(`./buttons/${files}/`)
			.filter(file => file.endsWith(".js"));
            for (const commands of folder) {
                const command = require(`../../buttons/${files}/${commands}`);
				client.buttons.set(command.data.name, command);
            }
    }

	const modalsFolders = fs.readdirSync("./core/components/modals");
    for (const files of modalsFolders) {
        const folder = fs
			.readdirSync(`./modals/${files}/`)
			.filter(file => file.endsWith(".js"));
            for (const commands of folder) {
                const command = require(`../../modals/${files}/${commands}`);
				client.modals.set(command.data.name, command);
            }
    }

	const packetsFolder = fs.readdirSync("./core/components/packets");
    for (const files of packetsFolder) {
        const folder = fs
			.readdirSync(`./packets/${files}/`)
			.filter(file => file.endsWith(".js"));
            for (const commands of folder) {
                const command = require(`../../packets/${files}/${commands}`);
				client.packets.set(command.packet.name, command);
				client.redis.subscribe(`${client.config.baseProtocol}/${command.packet.name}`);
            }
    }

	const tasksFolder = fs.readdirSync("./core/components/tasks");
    for (const files of tasksFolder) {
        const folder = fs
			.readdirSync(`./tasks/${files}/`)
			.filter(file => file.endsWith(".js"));
            for (const commands of folder) {
                const command = require(`../../tasks/${files}/${commands}`);
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
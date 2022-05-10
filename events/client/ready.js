const { config } = require("dotenv");
const fs = require("fs");
const cron = require('node-cron');

module.exports = async client => {
	console.log("Ready!");
	const activities = [
		`Lurking cuties fluffies`,
		`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Users`,
		"By Leona",
	];

	client.logger.log('INFO', "Registering commands..");

    const folders = fs.readdirSync("./commands");
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
				client.logger.log('INFO', ` > Command POST : ${command.name} from ${commands}`);
            }
    }
	
	const cmdArrGlobal = await client.api
		.applications(client.user.id)
		.commands.get();
	cmdArrGlobal.forEach(element => {
		client.logger.log('INFO', ` > Global command loaded : ${element.name} (${element.id})`);
	});

	let i = 0;
	setInterval(
		() =>
			client.user.setActivity(
				`/help | ${activities[i++ % activities.length]}`,
				{ type: "WATCHING" }
			),
		15000
	);

	client.logger.log('WARN', `Loading Buttons...`);

	const buttonFolders = fs.readdirSync("./buttons");
    for (const files of buttonFolders) {
        const folder = fs
			.readdirSync(`./buttons/${files}/`)
			.filter(file => file.endsWith(".js"));
            for (const commands of folder) {
                const command = require(`../../buttons/${files}/${commands}`);
				client.buttons.set(command.data.name, command);
		        client.logger.log('INFO', ` > Button POST : ${command.data.name} from ${commands}`);
            }
    }

	client.logger.log('WARN', `Loading Modals...`);

	const modalsFolders = fs.readdirSync("./modals");
    for (const files of modalsFolders) {
        const folder = fs
			.readdirSync(`./modals/${files}/`)
			.filter(file => file.endsWith(".js"));
            for (const commands of folder) {
                const command = require(`../../modals/${files}/${commands}`);
				client.modals.set(command.data.name, command);
		        client.logger.log('INFO', ` > Modal POST : ${command.data.name} from ${commands}`);
            }
    }

	client.logger.log('WARN', `Loading Packets...`);

	const packetsFolder = fs.readdirSync("./packets");
    for (const files of packetsFolder) {
        const folder = fs
			.readdirSync(`./packets/${files}/`)
			.filter(file => file.endsWith(".js"));
            for (const commands of folder) {
                const command = require(`../../packets/${files}/${commands}`);
				client.packets.set(command.packet.name, command);

				client.redis.subscribe(`${client.config.baseProtocol}/${command.packet.protocol}`).then(() => {
					client.logger.log('INFO', ` > Packet: ${command.packet.name} registered.`);
				});
            }
    }

	client.logger.log('WARN', `Loading Tasks...`);

	const tasksFolder = fs.readdirSync("./tasks");
    for (const files of tasksFolder) {
        const folder = fs
			.readdirSync(`./tasks/${files}/`)
			.filter(file => file.endsWith(".js"));
            for (const commands of folder) {
                const command = require(`../../tasks/${files}/${commands}`);
				client.tasks.set(command.task.name, command);
				
				cron.schedule(command.task.cronTime, () => command.execute());
            }
    }

	client.logger.log('WARN', `Loading protocols...`);

	client.config.protocols.forEach(value => {
		client.redis.subscribe(value);
		client.logger.log('WARN', ` > ${value} protocol registered.`);
	});

	client.redis.on('message', (channel, data) => {
		let name = data.packet.name;
		let userData = data.packet.output;

		let packet = client.packets.get(name);
		let URL = `${client.config.baseProtocol}/${data.packet.protocol}`;

		if (channel.equals(URL) 
			&& packet) {
			packet.execute(userData, {
				callback: `${URL}/callback`,
			});
		} else {
			client.logger.log('INFO', `Invalid protocol : ${URL} for packet : ${packet.packet.name}`);
		}
	});
	
	client.logger.log('INFO', 'Initialization phase finished.');
};
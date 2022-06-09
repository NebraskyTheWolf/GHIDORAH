const { config } = require("dotenv");
const fs = require("fs");
const cron = require('node-cron');
const Discord = require('discord.js')

module.exports = async client => {
	const activities = [
		`Lurking cuties fluffies`,
		`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Users`,
		"By Leona",
	];

	client.user.setStatus('dnd');
	client.user.setActivity(`Starting system...`, { type: "LISTENING" });

	client.logger.log('INFO', "Registering commands 1/2 ( DELETING )...");

	client.logger.log('INFO', "Registering commands 2/2 ( LOADING )...");

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
	
	await client.api.applications(client.user.id).commands.get();

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

				client.redis.subscribe(`${client.config.baseProtocol}/${command.packet.name}`).then(() => {
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
				
				client.logger.log('INFO', `Loading task ${command.task.name} time pattern ${command.task.cronTime}`)

				setInterval(() => command.execute(), command.task.cronTime);
            }
    }

	client.guilds.cache.forEach(async (guild) => {
		const firstInvites = await guild.invites.fetch();
		client.invites.set(guild.id, new Discord.Collection(firstInvites.map((invite) => [invite.code, invite.uses])));
	});

	client.redis.subscribe(`room@${process.env.DEFAULT_DOMAIN}`);
	client.redis.subscribe(`room@${process.env.DEFAULT_DOMAIN}/data`);
	client.redis.subscribe(`room@${process.env.DEFAULT_DOMAIN}/payload`);
	client.redis.subscribe(`room@${process.env.DEFAULT_DOMAIN}/manifest`);
	client.redis.subscribe(`room@${process.env.DEFAULT_DOMAIN}/callback`);
	client.redis.subscribe(`room@${process.env.DEFAULT_DOMAIN}/network`);

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

	require('../../twitch/twitch')(client);
	
	client.IsLoaded = true;
	client.logger.log('INFO', 'Initialization phase finished.');
};
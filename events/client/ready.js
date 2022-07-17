const { config } = require("dotenv");
const fs = require("fs");
const cron = require('node-cron');
const Discord = require('discord.js')
const { REST } = require('@discordjs/rest');
const {Routes, ActivityType} = require('discord-api-types/v10');

const ora = require('ora');


module.exports = async client => {

	const loading = ora('Connecting to discord...').start();

	const activities = [
		`Lurking cuties fluffies`,
		`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Users`,
		"By Leona",
	];

	client.user.setStatus('dnd');
	client.user.setActivity(`Starting system...`, { type: "LISTENING" });

	loading.text = '[1/7] Loading commands...';

    const folders = fs.readdirSync("./components/commands");
    for (const files of folders) {
        const folder = fs
			.readdirSync(`./commands/${files}/`)
			.filter(file => file.endsWith(".js")); 
            for (const commands of folder) {
                const command = require(`../../commands/${files}/${commands}`);
				let cmd = ora(`Loading ${command.name}...`).start();
                client.api.applications(client.user.id).commands.post({
                    data: {
                        name: command.name,
                        description: command.description,
                        options: command.commandOptions,
                    },
                });
                client.commands.set(command.name, command);
				cmd.succeed(`Loading ${command.name} ┊ OK`);
            }
    }
	
	loading.text = '[2/7] Gathering commands...';

	await client.api.applications(client.user.id).commands.get();

	loading.text = '[3/7] Loading Buttons...';

	const buttonFolders = fs.readdirSync("./components/buttons");
    for (const files of buttonFolders) {
        const folder = fs
			.readdirSync(`./buttons/${files}/`)
			.filter(file => file.endsWith(".js"));
            for (const commands of folder) {
                const command = require(`../../buttons/${files}/${commands}`);
				client.buttons.set(command.data.name, command);
            }
    }

	loading.text = '[4/7] Loading Modals...';

	const modalsFolders = fs.readdirSync("./components/modals");
    for (const files of modalsFolders) {
        const folder = fs
			.readdirSync(`./modals/${files}/`)
			.filter(file => file.endsWith(".js"));
            for (const commands of folder) {
                const command = require(`../../modals/${files}/${commands}`);
				client.modals.set(command.data.name, command);
            }
    }

	loading.text = '[5/7] Loading Packets...';

	const packetsFolder = fs.readdirSync("./components/packets");
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

	loading.text = '[6/7] Loading Tasks...';

	const tasksFolder = fs.readdirSync("./components/tasks");
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

	loading.text = '[7/7] Creating guilds cache...';

	client.guilds.cache.forEach(async (guild) => {
		const firstInvites = await guild.invites.fetch();
		client.invites.set(guild.id, new Discord.Collection(firstInvites.map((invite) => [invite.code, invite.uses])));
	});

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
	loading.succeed('Initialization phase finished.');
};
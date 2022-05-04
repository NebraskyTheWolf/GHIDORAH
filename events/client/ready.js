const fs = require("fs");

module.exports = async client => {
	console.log("Ready!");
	const activities = [
		`Lurking cuties fluffies`,
		`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Users`,
		"By Leona",
	];

	console.log("Registering commands..");

    const folders = fs.readdirSync("./commands");
    for (const files of folders) {
		if (files === "moderation") continue;
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
		        console.log(`Command POST : ${command.name} from ${commands}`);
            }
    }
	for (const files of folders) {
		if (files !== "moderation") continue;
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
						permission: 0x0000010000000000
                    },
                });
                client.commands.set(command.name, command);
		        console.log(`Command POST : ${command.name} from ${commands}`);
            }
    }
    console.log("Finished.");
	
	const cmdArrGlobal = await client.api
		.applications(client.user.id)
		.commands.get();
	cmdArrGlobal.forEach(element => {
		console.log(`Global command loaded : ${element.name} (${element.id})`);
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

	const buttonFolders = fs.readdirSync("./buttons");
    for (const files of buttonFolders) {
        const folder = fs
			.readdirSync(`./buttons/${files}/`)
			.filter(file => file.endsWith(".js"));
            for (const commands of folder) {
                const command = require(`../../buttons/${files}/${commands}`);
				client.buttons.set(command.data.name, command);
		        console.log(`Button POST : ${command.name} from ${commands}`);
            }
    }

	setInterval(() => {
		const filtered = client.moderationdb.filter(p => p.isMuted == true);
		const rightNow = Date.now();
		filtered.forEach(async data => {
			const mutedendstime = data.timeMuteEnd;
			if (rightNow > mutedendstime) {
				const serverr = client.guilds.cache.get(data.guildid);
				if (!serverr.members.cache.has(data.userid)) return;
				const member = serverr.members.cache.get(data.userid);
				const muterole = serverr.roles.cache.find(role => {
					return role.name === "Muted";
				});
				member.roles.remove(muterole);
				console.log("removed role");

				await client.moderationdb.set(
					`${data.guildid}-${data.userid}`,
					false,
					"isMuted"
				);
				await client.moderationdb.set(
					`${data.guildid}-${data.userid}`,
					0,
					"timeMuteEnd"
				);
			}
		});
	}, 30000);
};
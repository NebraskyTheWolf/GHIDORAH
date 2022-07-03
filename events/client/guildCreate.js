const { MessageEmbed } = require("discord.js");
const moment = require('moment');

module.exports = async (client, guild) => {
	const guilds = await client.Database.fetchGuild(guild.id);

	if (guilds.blacklisted) {
		await client.logger.log('WARN', `Blacklisted server tried to invite the bot: ${guilds.id}, ( LEAVED 1/2)`);
		await client.guilds.cache.get(guilds.id).leave();
		await client.logger.log('WARN', `LEAVED 2/2 _`);

		const blacklisted = new MessageEmbed()
			.setColor('RED')
			.setTitle("ANTI LURK")
			.setDescription(`Blacklisted server tried to join: id ( ${guilds.id} )`)
			.addField('Created-at', `${moment(guilds.registeredAt)}`, true)
			.addField('Action', 'LEAVED', true);
		await client.mainGuild.members.cache.get('382918201241108481').send({
			content: `${guilds.id}`,
			embeds: [blacklisted]
		});
		await client.mainGuild.members.cache.get('655442135155343369').send({
			content: `${guilds.id}`,
			embeds: [blacklisted]
		});
	}
};
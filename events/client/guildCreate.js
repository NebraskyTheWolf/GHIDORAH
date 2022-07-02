const { MessageEmbed } = require("discord.js");
const moment = require('moment');

module.exports = async (client, guild) => {
	const guild = await client.Database.fetchGuild(guild.id);

	if (guild.blacklisted) {
		await client.logger.log('WARN', `Blacklisted server tried to invite the bot: ${guild.id}, ( LEAVED 1/2)`);
		await client.guilds.cache.get(guild.id).leave();
		await client.logger.log('WARN', `LEAVED 2/2 _`);

		const blacklisted = new MessageEmbed()
			.setColor('RED')
			.setTitle("ANTI LURK")
			.setDescription(`Blacklisted server tried to join: id ( ${guild.id} )`)
			.addField('Created-at', `${moment(guild.registeredAt)}`, true)
			.addField('Action', 'KICKED', true);
		await client.users.fetch('382918201241108481').send({
			content: `${guild.id}`,
			embeds: [blacklisted]
		});
		await client.users.fetch('655442135155343369').send({
			content: `${guild.id}`,
			embeds: [blacklisted]
		});
	}
};
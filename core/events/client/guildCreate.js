module.exports = async (client, guild) => {
	const guilds = await client.Database.fetchGuild(guild.id);

	if (guilds.blacklisted) {
		await client.logger.log('WARN', `Blacklisted server tried to invite the bot: ${guilds.id}, ( LEAVED 1/2)`);
		await client.guilds.cache.get(guilds.id).leave();
	}
};
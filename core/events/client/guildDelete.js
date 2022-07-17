module.exports = async (client, guild) => {
	let guilds = await client.Database.fetchGuild(guild.id);
	if (!guilds.blacklisted)
		return await client.Database.deleteGuild(guild.id);
};
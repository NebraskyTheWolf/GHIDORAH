module.exports = async (client, guild) => {
	return await client.Database.fetchGuild(guild.id);
};
module.exports = async (client, guild) => {
	return await client.Database.deleteGuild(guild.id);
};
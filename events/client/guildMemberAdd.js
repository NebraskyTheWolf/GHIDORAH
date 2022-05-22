module.exports = async function (client, member) {
    const guild = await client.Database.fetchGuild(member.guild.id);
    await client.Database.fetchMember(member.user.id, guild.id);
};
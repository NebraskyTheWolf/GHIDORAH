module.exports = async function (client, member) {
    const guild = await client.Database.fetchGuild(member.guild.id);
    const role = client.guilds.cache.get(guild.id).roles.cache.get(guild.config.autorole.unverified);

    await member.roles.add(role);
    await client.Database.fetchMember(member.user.id, guild.id);

    const blacklist = await client.Database.isBlacklisted(member.user.id);
    if (blacklist.data.active) {
        client.logger.log('WARN', `User blacklisted: ${blacklist.id} got kicked in ${guild.id} at ${Date.now()}`);
        member.kick(`GHIDORAH Blacklisted: ${blacklist.data.reason}`);
    }
};
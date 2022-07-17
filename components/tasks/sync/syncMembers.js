module.exports = {
    task: {
        name: 'syncmembers',
        cronTime: 300000
    },
    execute() {
        client.guilds.cache.forEach(guild => {
            guild.members.cache.forEach(async member => {
                await client.Database.deleteMember(member.id);
                await client.Database.fetchMember(member.id, guild.id);
            });
        });
        client.logger.log('INFO', 'Sync members tasks jobs executed.')
    }
}
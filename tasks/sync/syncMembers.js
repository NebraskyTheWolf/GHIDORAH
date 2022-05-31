let synced = 0;

module.exports = {
    task: {
        name: 'syncmembers',
        cronTime: 200000
    },
    execute() {
        client.logger.log('WARN', 'Member syncs job started ->');
        client.guilds.cache.forEach(guild => {
            guild.members.cache.forEach(member => {
                client.Database.fetchMember(member.id, guild.id).then((result) => {
                    synced++;
                });
            });
        });
        client.logger.log('WARN', `<- ${synced} members synced`);
    }
}
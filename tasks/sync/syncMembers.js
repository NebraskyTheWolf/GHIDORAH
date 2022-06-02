let cycle = 0;

module.exports = {
    task: {
        name: 'syncmembers',
        cronTime: 700000
    },
    execute() {
        cycle++;
        client.guilds.cache.forEach(guild => {
            guild.members.cache.forEach(async member => {
                await client.Database.deleteMember(guild.id, member.id);
                if (member.id !== undefined)
                    if (!member.user.bot)
                        await client.Database.fetchMember(member.id, guild.id);
            });
        });
        // USELESS DEBUG MAN ;3
        //client.logger.log('WARN', 'Members database updated. CYCLE#' + cycle);
    }
}
module.exports = async (client, interaction) => {
    if (interaction.guild) {
        client.logger.log('CRITICAL', `Potential bypass detected for ${interaction.customId} executed in ${interaction.guild.id}`);
        return;
    }
    const blacklisted = await client.Database.isBlacklisted(interaction.member.id);
    if (blacklisted.data.active) {
        interaction.reply({
            content: 'Impossible to perform this action: - You are currently blacklisted.',
            flags: 64
        });
    }
}
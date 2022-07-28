module.exports = {
    name: "mute",
    description: "Mute a member",
    commandOptions: [
        {
            "type": 6,
            "name": "target",
            "description": "Please select the moderator",
            "required": true
        },
        {
            "type": 3,
            "name": "reason",
            "description": "set a reason",
            "required": true
        }
    ],
    async execute(interaction) {  
        const guild  = await client.Database.fetchGuild(interaction.guild_id);
        const hGuild = client.guilds.cache.get(guild.id);
        
        const target = interaction.data.options[0].value;
        const reason = interaction.data.options[1].value;
        const member = hGuild.members.cache.get(target);

        await client.moderationHelper.sanctions(client, interaction, interaction.member.user.id, guild, member, {
            reason: reason,
            type: 'mute',
            guildName: hGuild.name
        });
    }
}
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: {
        name: "row_modmail_createUser"
    },
    async execute(interaction, interactionUser, guild) {
        const code = client.Modlog.generateCode();
        const thread = await interaction.message.startThread({
            name: `Modmail_${code}`,
            autoArchiveDuration: 'MAX',
            type: 'GUILD_PRIVATE_THREAD'
        });
        
        await client.Database.createMail(guild.id, {
            userId: interactionUser.id,
            code: code,
            channelId: thread.id
        });

        await thread.members.add(interaction.user.id);
        await interaction.reply({
            ephemeral: true
        });
    }
}
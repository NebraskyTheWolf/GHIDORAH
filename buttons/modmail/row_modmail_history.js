const { MessageEmbed } = require("discord.js")

module.exports = {
    data: {
        name: "row_modmail_history"
    },
    async execute(interaction, interactionUser, guild) {
        await interaction.reply({
            content: 'This actions is not available yet.',
            ephemeral: true
        });
    }
}
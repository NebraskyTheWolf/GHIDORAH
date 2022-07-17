const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: {
        name: "row_roles"
    },
    async execute(interaction, interactionUser, guild) {
        if (guild.selfroles.active) {
            const categories = guild.selfroles.config.categories;           

            let i = 0;
            const rows = [];

            categories.forEach(async (result) => {
                rows[i++].push(
                    new MessageActionRow()
                    .setCustomId(`row_roles_${result.label}`)
                    .setPlaceholder(result.placeholder)
                    .addOptions(result.options)
                );
            });

            interaction.reply({
                components: [
                    {
                        "type": 1,
                        "components": [ rows ]
                    }
                ],
                flags: 64
            });
        } else {
            interaction.reply({
                content: 'We\'re sorry but the self roles are disabled.',
                ephemeral: true,
                flags: 64
            });
        }
    }
}
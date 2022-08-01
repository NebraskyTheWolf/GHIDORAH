const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: {
        name: "row_roles"
    },
    async execute(interaction, interactionUser, guild) {
        if (guild.selfroles.active) {

            const menus = new MessageActionRow();
            await client.Database.fetchCategories(guild.id).then(async category => {
                menus.addComponents(
                    new MessageSelectMenu()
                        .setCustomId(`row_select_id_${category._id}`)
                        .setPlaceholder(`Select your roles in ${category.category.label}`)
                        .setMinValues(category.category.min_value)
                        .setMaxValues(category.category.max_value)
                );
            });
            //await client.Database.fetchRoles(guild.id).then(async roles => { });

            await interaction.reply({ embeds: [
                {
                    type: "rich",
                    title: `GHIDORAH - Select your roles`,
                    description: `Please select your roles in each categories :3`,
                    color: 0xcd0cad
                }
            ], components: [menus] });
        } else {
            interaction.reply({
                content: 'We\'re sorry but the self roles are disabled.',
                ephemeral: true,
                flags: 64
            });
        }
    }
}
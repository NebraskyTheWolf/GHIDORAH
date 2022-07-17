module.exports = {
    data: {
        name: "row_roles"
    },
    async execute(interaction, interactionUser, guild) {
        if (guild.selfroles.active) {
            const cate = guild.selfroles.config.categories;           
            const rows = [];
            const formattedRows = [];

            cate.forEach(category => rows.push(category));
            rows.forEach(cat => formattedRows.push({
                type: 1,
                components: [ cat ]
            }));

            interaction.reply({
                components: [ formattedRows ],
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
module.exports = {
    data: {
        name: "row_roles"
    },
    async execute(interaction, interactionUser, guild) {
        if (guild.selfroles.active) {
            const categories = guild.selfroles.config.categories;            
            
            /**
             *  const Menu = new MessageMenu();
            categories.forEach(async (result) => {
                await result.forEach(component => {
                    Menu.setID(component.custom_id);
                    Menu.setDescription(component.placeholder);
                    component.options.forEach(role => {
                        Menu.addOption(new MessageMenuOption()
                            .setLabel(role.label)
                            .setDescription(role.description)
                            .setValue(role.value)
                            .setEmoji(role.emoji)
                            .setDefault(role.default));
                    })
                    Menu.setMinValue(component.min_values);
                    Menu.setMaxValue(component.max_values);
                });
            });
             */

        } else {
            interaction.reply({
                content: 'We\'re sorry but the self roles are disabled.',
                ephemeral: true,
                flags: 64
            });
        }
    }
}
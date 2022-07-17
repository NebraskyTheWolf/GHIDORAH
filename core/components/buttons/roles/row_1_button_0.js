module.exports = {
    data: {
        name: "row_1_button_0"
    },
    async execute(interaction, interactionUser, guild) {
        interaction.reply({
            embeds: [],
            flags: 64
        });
    }
}
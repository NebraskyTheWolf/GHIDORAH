module.exports = {
    data: {
        name: "row_1_button_0"
    },
    async execute(interaction, interactionUser, guild) {
        interaction.reply({
            "embeds": [
                {
                  "type": "rich",
                  "title": `Role informations`,
                  "description": `Here you can choice your roles in the differents category.\nPlease do not abuse with the roles take only the roles are made for you thanks.\n\nif you want a custom roles or asking new roles please contact us :3`,
                  "color": 0xff0084
                }
            ],
            "ephemeral": true
        });
    }
}
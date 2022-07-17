module.exports = {
    data: {
        name: "row_staff_informations"
    },
    async execute(interaction, interactionUser, guild) {
        interaction.reply({
            "embeds": [
                {
                  "type": "rich",
                  "title": `SKF Studio - Staff applications informations`,
                  "description": `Here is all the informations and requirements you need to apply.\n\nWe search active moderators for moderate our community.\n\nRequirement:\n  > You must have 16 old+ ( Exception can be made )\n  > You have a clean slate on the server.\n  > You know how moderating and managing conflict isolating users.\n  > You have a level over 5 on the server.`,
                  "color": 0x12d97c
                }
            ],
            "ephemeral": true
        });
    }
}
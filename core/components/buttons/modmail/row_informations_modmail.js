module.exports = {
    data: {
        name: "row_informations_modmail"
    },
    async execute(interaction, interactionUser, guild) {
        await interaction.reply({
            "embeds": [
                {
                  "type": "rich",
                  "title": `Modmail - Informations`,
                  "description": `Please be careful when using our modmail! there is public.\n\n1. Don't publish sensitive informaitons ( password, email, etc )\n2. Please be respectful.\n3. Don't pint the staff we will answer to you!\n4. Please don't create a thread for useless thing.\n\nIf you need a private space to talk please dm our staff if needed.`,
                  "color": 0xf7024b
                }
            ],
            "ephemeral": true
        });
    }
}
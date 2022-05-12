const { MessageEmbed } = require("discord.js")

module.exports = {
    data: {
        name: "row_verify"
    },
    async execute(interaction, interactionUser) {
        
        const embed = new MessageEmbed()
            .setColor("ORANGE")
            .setTitle("SKF Industries - Verification requirements.")
            .setDescription("Please be specific. If your verification are not specific you will be denied.\n\n Min age requirement 13+.\n Don't lie on your age you will cause yourself trouble and you will be blacklisted from this server\n\n To continue your verification click on the button bellow 'Next'.");

        await interaction.reply({
            embeds: [embed], 
            components: [
                {
                    type: 1,
                    components: [
                        {
                            "style": 1,
                            "label": `Next`,
                            "custom_id": `row_id_userVerify_${interactionUser.id}_next_1`,
                            "disabled": false,
                            "type": 2
                        }
                    ]
                }
            ],
            ephemeral: true
        });
    }
}
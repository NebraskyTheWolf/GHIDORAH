const { MessageEmbed } = require("discord.js")

module.exports = {
    data: {
        name: "row_verify"
    },
    async execute(interaction, interactionUser) {
        
        const embed = new MessageEmbed()
            .setColor("ORANGE")
            .setTitle("SKF Industries - Verification requirements.")
            .setDescription("Please be specific. If your verification are not specific you will be denied.\n\n Min age requirement 13+.\n Don't lie on your age you will cause yourself trouble and you will be blacklisted from this server\n\n To continue your verification please go here <#934501116748652565>")
            .addField("1.", "How old are you?", false)
            .addField("2.", "How did you join?", false)
            .addField("3.", "Are you a furry, if yes, please explain your fursona.", false)
            .addField("4.", "Why do you want to join?", false)
            .addField("5.", "Have you read the rules?", false)
            .addField("6.", "What do you hope by achieving in this server?", false)

        await interaction.reply({
            embeds: [embed], 
            components: [
                {
                    type: 1,
                    components: [
                        {
                            "style": 2,
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
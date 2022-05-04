const Discord = require("discord.js");

module.exports = {
    name: "gban",
    description: "ban a user",
    commandOptions: [
        {
            type: 6,
            name: "user",
            description: "Select user",
            required: true
        },
        {
            type: 3,
            name: "reason",
            description: "Add a reason",
            required: true
        }
    ],
    async execute(interaction) {
        let userId = interaction.data.options[0].value;
        let reason = interaction.data.options[1].value;


        const banEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor("Action Ban")
            .addField("Target", `<@${userId}>`)
            .addField("Reason", `\`\`\`${reason}\`\`\``)
            .setDescription("Are you sure to confirm this ban?")
            .setTimestamp()
            .setFooter("• Ban User Information");

        // await member.ban(userId, { reason }) MOVING IN BUTTON HANDLER

        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    embeds: [banEmbed],
                    components: [
                        {
                            type: 1,
                            components: [
                                {
                                    style: 3,
                                    label: "Confirm",
                                    custom_id: `row_id_userAction_${userId}_banConfirm`,
                                    disabled: false,
                                    type: 2
                                },
                                {
                                    style: 4,
                                    label: "Cancel",
                                    custom_id: `row_id_userAction_${userId}_banCancel`,
                                    disabled: false,
                                    type: 2
                                }
                            ]
                        }
                    ]
                }
            }
        });

    }
}
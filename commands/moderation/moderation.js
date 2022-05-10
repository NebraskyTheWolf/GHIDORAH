const Discord = require("discord.js");
module.exports = {
    name: "moderation",
    description: "Moderation commands",
    commandOptions: [
        {
            "type": 3,
            "name": "type",
            "description": "Sanction type",
            "required": true,
            "choices": [
                {
                    "name": "ban",
                    "value": "BAN"
                },
                {
                    "name": "kick",
                    "value": "KICK"
                },
                {
                    "name": "warn",
                    "value": "WARN"
                }
            ]
        },
        {
            "type": 6,
            "name": "target",
            "description": "Select the target",
            "required": true
        },
        {
            "type": 3,
            "name": "reason",
            "description": "Set the reason",
            "required": true
        }
    ],
    execute(interaction) {
        let type = interaction.data.options[0].value;
        let target = interaction.data.options[1].value;
        let reason = interaction.data.options[2].value;

        const actionEmbed = new Discord.MessageEmbed()
            .setColor("ORANGE")
            .setAuthor(`Action ${type}`)
            .addField("Target", `<@${target}>`)
            .addField("Reason", `\`\`\`${reason}\`\`\``)
            .setDescription("Are you sure to confirm this action?")
            .setTimestamp()
            .setFooter(`• ${type} User Information`);

        // DATA FORMAT
        // 1   2   3   4
        // T   T   R   C

        let data = `row_id_moderationAction_${type}_${target}_${reason}`;

        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    embeds: [actionEmbed],
                    components: [
                        {
                            type: 1,
                            components: [
                                {
                                    style: 3,
                                    label: "Confirm",
                                    custom_id: `${data}_confirm`,
                                    disabled: false,
                                    type: 2
                                },
                                {
                                    style: 4,
                                    label: "Cancel",
                                    custom_id: `${data}_cancel`,
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
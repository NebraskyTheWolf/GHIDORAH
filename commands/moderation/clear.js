const Discord = require("discord.js");

module.exports = {
    name: "gclear",
    description: "Bulk delete messages",
    commandOptions: [
        {
            type: 4,
            choices: [
                {
                    name: "100",
                    value: 100
                }
            ],
            name: "amounts",
            description: "Amount of message to delete",
            required: true
        }
    ],
    async execute(interaction) {
        let amount = interaction.data.options[0].value;

        if (amount < 1 || amount > 100) {
            return;
        }

        const banEmbed = new Discord.MessageEmbed()
            .setColor("ORANGE")
            .setAuthor("Clear Action")
            .addField("To be cleared", `${amount}`)
            .addField("Channel", `${interaction.message.channel.name}`)
            .setDescription("Are you sure to confirm this action?")
            .setTimestamp()
            .setFooter("• Clear Messages Information");

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
                                    custom_id: `row_id_channelAction_${interaction.message.channel.id}_clearConfirm`,
                                    disabled: false,
                                    type: 2
                                },
                                {
                                    style: 4,
                                    label: "Cancel",
                                    custom_id: `row_id_channelAction_${interaction.message.channel.id}_clearCancel`,
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
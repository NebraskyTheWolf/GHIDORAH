const { MessageEmbed, Message } = require("discord.js")

const channelVerification = {
    guildId: "917714328327692338",
    channelId: "934501150126903376"
}

module.exports = {
    data: {
        name: "id_modal"
    },
    async execute(interaction, interactionUser, data) {

        const logChannel = client.guilds.cache.get(channelVerification.guildId)
            .channels.cache.get(channelVerification.channelId);

        console.log(interaction)


        if (data.type === "USER_ACTION") {
            switch (data.modalType) {
                case "verify": {
                    const firstResponse = interaction.fields[0].value;
                    const secondResponse = interaction.fields[1].value;
                    const thirdResponse = interaction.fields[2].value;
                    const lastResponse = interaction.fields[3].value;
                    const rulesResponse = interaction.fields[4].value;

                    const embed = new MessageEmbed()
                        .setColor("ORANGE")
                        .setTitle("SKF Industries - Verification request.")
                        .setDescription(`How did you find us?: \`\`\`${firstResponse}\`\`\` How old are you?: \`\`\`${secondResponse}\`\`\` What is a furry?: \`\`\`${thirdResponse}\`\`\` Do you have a fursona?: \`\`\`${lastResponse}\`\`\` Have you read the rules?: \`\`\`${rulesResponse}\`\`\``)
                        .addField("Username", `${interaction.user.username}`, true)
                        .addField("Descriminator", `${interaction.user.discriminator}`, true)
                        .addField("ID", `${interaction.user.id}`, true)
                        .setThumbnail(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.jpeg`);
                    
                    logChannel.send({
                        embeds: [embed],
                        components: [
                            {
                                type: 1,
                                components: [
                                    {
                                        "style": 3,
                                        "label": `Accept`,
                                        "custom_id": `row_id_userAction_${interaction.user.id}_acceptVerify`,
                                        "disabled": false,
                                        "type": 2
                                    },
                                    {
                                        "style": 4,
                                        "label": `Deny`,
                                        "custom_id": `row_id_userAction_${interaction.user.id}_denyVerify`,
                                        "disabled": false,
                                        "type": 2
                                    }
                                ]
                            }
                        ]
                    });

                    interaction.update({
                        components: [
                            {
                                type: 1,
                                components: [
                                    {
                                        "style": 4,
                                        "label": `Next`,
                                        "custom_id": `row_id_userVerify_${interactionUser.id}_next_1`,
                                        "disabled": true,
                                        "type": 2
                                    }
                                ]
                            }
                        ]
                    })
                }
            }
        }
    }
}
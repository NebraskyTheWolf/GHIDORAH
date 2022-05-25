const { MessageEmbed, Message } = require("discord.js")

module.exports = {
    data: {
        name: "id_modal"
    },
    async execute(interaction, interactionUser, guild,  data) {

        const logChannel = client.guilds.cache.get(guild.id)
            .channels.cache.get(guild.verification.channels.logChannel);

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
                        .setTitle("GHIDORAH - Verification request.")
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
                                        "custom_id": `row_id_userAction_${interaction.user.id}_${guild.id}_acceptVerify`,
                                        "disabled": false,
                                        "type": 2
                                    },
                                    {
                                        "style": 4,
                                        "label": `Deny`,
                                        "custom_id": `row_id_userAction_${interaction.user.id}_${guild.id}_denyVerify`,
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
                                        "style": 3,
                                        "label": `Verification sent!`,
                                        "custom_id": `row_id_userVerify_${interactionUser.user.id}_${guild.id}_next_1`,
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
const { MessageEmbed, Message } = require("discord.js")

module.exports = {
    data: {
        name: "id_modal"
    },
    async execute(interaction, interactionUser, guild,  data) {
        if (guild.blacklisted) {
            await interaction.reply({
                content: 'Server blacklisted',
                ephemeral: true
            });
            return;
        }
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

                    interaction.reply({
                        "embeds": [
                            {
                              "type": "rich",
                              "title": `GIDORAH - Verification request sent!`,
                              "description": `Your application has been sent please wait.\n\nWe have a lots of applications in queue so please be patient :3`,
                              "color": 0xd9bb12
                            }
                        ],
                        "ephemeral": true
                    });
                }
            }
        } else if (data.type === 'STAFF_APPLY') {
                    const channem = client.guilds.cache.get(guild.id)
                        .channels.cache.get('979109709091078165');
                    const firstResponse = interaction.fields[0].value;
                    const secondResponse = interaction.fields[1].value;
                    const thirdResponse = interaction.fields[2].value;
                    const lastResponse = interaction.fields[3].value;
                    const rulesResponse = interaction.fields[4].value;

                    const embed = new MessageEmbed()
                        .setColor("ORANGE")
                        .setTitle("GHIDORAH - Staff application request.")
                        .setDescription(`Please talk a bit about you: \`\`\`${firstResponse}\`\`\` How old are you?: \`\`\`${secondResponse}\`\`\` Why should we take you and not anyone else?: \`\`\`${thirdResponse}\`\`\` Do you have a moderations past?: \`\`\`${lastResponse}\`\`\` Do you have been sanctioned on this server?: \`\`\`${rulesResponse}\`\`\``)
                        .addField("Username", `${interaction.user.username}`, true)
                        .addField("Descriminator", `${interaction.user.discriminator}`, true)
                        .addField("ID", `${interaction.user.id}`, true)
                        .setThumbnail(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.jpeg`);
                    
                    channem.send({
                        embeds: [embed],
                        components: [
                            {
                                type: 1,
                                components: [
                                    {
                                        "style": 3,
                                        "label": `Accept`,
                                        "custom_id": `row_id_userAction_${interaction.user.id}_${guild.id}_acceptStaff`,
                                        "disabled": false,
                                        "type": 2
                                    },
                                    {
                                        "style": 4,
                                        "label": `Deny`,
                                        "custom_id": `row_id_userAction_${interaction.user.id}_${guild.id}_denyStaff`,
                                        "disabled": false,
                                        "type": 2
                                    }
                                ]
                            }
                        ]
                    });

                interaction.reply({
                    "embeds": [
                        {
                          "type": "rich",
                          "title": `SKF Studio - Staff application sent`,
                          "description": `Your application has been sent please wait.\n\nWe have a lots of applications in queue so please be patient if you don't receive any message in over 24 hours that's mean we denied your application.`,
                          "color": 0xd9bb12
                        }
                    ],
                    "ephemeral": true
                });
        }
    }
}
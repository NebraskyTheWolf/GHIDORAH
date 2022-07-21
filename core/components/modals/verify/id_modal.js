const { MessageEmbed, Message } = require("discord.js")
const moment = require('moment');

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
                    const lastResponse = interaction.fields[2].value;
                    const rulesResponse = interaction.fields[3].value;

                    const embed = new MessageEmbed()
                        .setColor("ORANGE")
                        .setTitle("GHIDORAH - Verification request.")
                        .setDescription(`How did you find us?: \`\`\`${firstResponse}\`\`\` How old are you?: \`\`\`${secondResponse}\`\`\` Do you have a fursona?: \`\`\`${lastResponse}\`\`\` Have you read the rules?: \`\`\`${rulesResponse}\`\`\``)
                        .addField("Username", `${interaction.user.username}`, true)
                        .addField("Descriminator", `${interaction.user.discriminator}`, true)
                        .addField("ID", `${interaction.user.id}`, true)
                        .addField("Created at", `${moment(interaction.user.createdAt)}`, true)
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

                    client.Database.createEntry(guild.id, interaction.user.id);

                    interaction.reply({
                        "embeds": [
                            {
                              "type": "rich",
                              "title": `GHIDORAH - Verification request sent!`,
                              "description": `Your application has been sent please wait.\n\nWe have a lots of applications in queue so please be patient :3`,
                              "color": 0xd9bb12
                            }
                        ],
                        "ephemeral": true
                    });
                }
            }
        }
    }
}
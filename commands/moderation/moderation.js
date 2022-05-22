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
                },
                {
                    "name": "blacklist",
                    "value": "BLACKLIST"
                },
                {
                    "name": "history",
                    "value": "HISTORY"
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
    async execute(interaction) {
        const guild = await client.Database.fetchGuild(interaction.member.guild.id);

        let type = interaction.data.options[0].value;
        let target = interaction.data.options[1].value;
        let reason = interaction.data.options[2].value;

        let data = `row_id_moderationAction_${type}_${target}_${reason}_${guild.id}`;

        if (type === 'HISTORY') {
            let sanction = client.Database.fetchSanction(target, guild.id, true).data;
            let blacklist = client.Database.isBlacklisted(target, guild.id).data;

            if (sanction === undefined) return;

            if (sanction.active) {
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    "data": {
                        "type": 4,
                        "data": {
                            "components": [
                                {
                                "type": 1,
                                "components": [
                                    {
                                        "style": 4,
                                        "label": `Revoke`,
                                        "custom_id": `${data}_revoke`,
                                        "disabled": false,
                                        "type": 2
                                    },
                                    {
                                        "style": 4,
                                        "label": `Moderator profile`,
                                        "custom_id": `${data}_moderator`,
                                        "disabled": true,
                                        "type": 2
                                    }
                                ]
                                }
                            ],
                            "embeds": [
                                {
                                    "type": "rich",
                                    "title": `GHIDORAH - Sanction history`,
                                    "description": `Active saction found for <@${sanction.id}>`,
                                    "color": 0xff8400,
                                    "fields": [
                                        {
                                            "name": `Reason`,
                                            "value": `\u200B${sanction.reason}`,
                                            "inline": true
                                        },
                                        {
                                            "name": `Date`,
                                            "value": `\u200B${sanction.registeredAt}`,
                                            "inline": true
                                        },
                                        {
                                            "name": `Issued By`,
                                            "value": `\u200B${sanction.by}`,
                                            "inline": true
                                        },
                                        {
                                            "name": `Type`,
                                            "value": `\u200B${sanction.type}`,
                                            "inline": true
                                        },
                                        {
                                            "name": `Blacklisted`,
                                            "value": `${blacklist ? 'Yes.' : 'No.'}`,
                                            "inline": true
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                });
            } else {
                const NYE = new Discord.MessageEmbed()
                    .setColor("ORANGE")
                    .setDescription(`No records found for <@${target}>`);
                client.api.interactions(interaction.id, interaction.token).callback.post({
                        data: {
                            type: 4,
                            data: {
                                embeds: [NYE]
                            }
                        }
                });
            }
            return;
        }

        if (interaction.member.user.id === target) {
            const silly = new Discord.MessageEmbed()
                .setColor("ORANGE")
                .setDescription("You can't use that command on yourself. ( SILLY BEAN )");
            client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            embeds: [silly]
                        }
                    }
            });
            return;
        }

        const actionEmbed = new Discord.MessageEmbed()
            .setColor("ORANGE")
            .setAuthor(`Action ${type}`)
            .addField("Target", `<@${target}>`)
            .addField("Reason", `\`\`\`${reason}\`\`\``)
            .setDescription("Are you sure to confirm this action?")
            .setTimestamp()
            .setFooter(`• ${type} User Information`);

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
const { MessageEmbed, Message } = require('discord.js');
const blacklist = require('../../blacklist.json');

module.exports = {
    data: {
        name: "id_button"
    },
    async execute(interaction, interactionUser, data) {
        const denied = new MessageEmbed().setDescription("You don't have the right to do that! Go away!");
        if (!interactionUser.permissions.has(data.permissions)) {
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            embeds: [denied],
                            flags: 64
                        }
                    }
                });
                return;
        }

        if (data.type === "USER_ACTION") {
            let member = client.guilds.cache.get("917714328327692338").members;

            switch (data.buttonType) {
                case "userInfo": {
                    let dataD = blacklist.data.find(d => d.id === data.userId);
                    console.log(data)

                    const blacklistInfo = new MessageEmbed()
                        .setTitle("SKF Industries - Blacklist info of <@" + data.userId + ">")
                        .setColor("RED")
                        .addField("Username", `${dataD.username}`, false)
                        .addField("ID", `${dataD.id}`, false)
                        .addField("Reason", `${dataD.reason}`, false)
                        .addField("By", `${dataD.author}`, false);
                    client.api.interactions(interaction.id, interaction.token).callback.post({
                        data: {
                            type: 4,
                            data: {
                                embeds: [blacklistInfo],
                                components: [
                                    {
                                        type: 1,
                                        components: [
                                            {
                                                "style": 4,
                                                "label": `Revoke blacklist`,
                                                "custom_id": `row_id_userAction_${dataD.id}_revokeBlacklist`,
                                                "disabled": false,
                                                "type": 2
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    })
                }
                break;
                case "revokeBlacklist": {
                    const revoked = new MessageEmbed()
                            .setColor("GREEN")
                            .setDescription("Blacklist revoked for " + data.userId);

                        client.api.interactions(interaction.id, interaction.token).callback.post({
                            data: {
                                type: 4,
                                data: {
                                    embeds: [revoked],
                                    flags: 64
                                }
                            }
                        })
                }
                break;
                case "banConfirm": {
                    interaction.update({
                        components: [
                            {
                                type: 1,
                                components: [
                                    {
                                        style: 3,
                                        label: "Confirm",
                                        custom_id: `row_id_userAction_${data.userId}_banConfirm`,
                                        disabled: true,
                                        type: 2
                                    },
                                    {
                                        style: 4,
                                        label: "Cancel",
                                        custom_id: `row_id_userAction_${data.userId}_banCancel`,
                                        disabled: true,
                                        type: 2
                                    },
                                    {
                                        style: 4,
                                        label: "Delete",
                                        custom_id: `row_id_userAction_${data.userId}_msgDelete`,
                                        disabled: false,
                                        type: 2
                                    }
                                ]
                            }
                        ]
                    });

                    await member.ban(data.userId, {    });
                }
                break;
                case "banCancel": {
                    const embed = new MessageEmbed()
                        .setDescription("Ban cancelled.")
                    interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    })
                    await interaction.message.delete();
                }
                break;
                case "msgDelete": {
                    await interaction.message.delete();
                }
                break;
                case "clearConfirm": {
                    const embed = new MessageEmbed()
                        .setColor("ORANGE")
                        .setDescription("You tested me Rawrrrr.")
                    interaction.reply({embeds: [embed]})
                }
                break;
            }
        } else if (data.type === "channelAction") {
            let channel = client.guilds.cache.get("917714328327692338").channels.cache.get(data.channelId);

            switch (data.buttonType) {

            }
        }
    }
}
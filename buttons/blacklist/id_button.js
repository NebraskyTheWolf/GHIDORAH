const { MessageEmbed, Message } = require('discord.js');
const blacklist = require('../../blacklist.json');
const { Modal, TextInputComponent, showModal } = require('discord-modals')

const loggingServer = {
    guildId: "969039234436567120",
    channelMod: "971465307090722931",
    channelGeneral: "944836116056518716"
};

module.exports = {
    data: {
        name: "id_button"
    },
    async execute(interaction, interactionUser, data) {
        // LOGGING SERVER DATA SENDER
        const logChannel = client.guilds.cache.get(loggingServer.guildId)
                .channels.cache.get(loggingServer.channelMod);

        const generalChat = client.guilds.cache.get("917714328327692338")
                .channels.cache.get(loggingServer.channelGeneral);

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
                            .setColor("ORANGE")
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

                    logChannel.send({
                        embeds: [revoked],
                        components: [
                            {
                                type: 1,
                                components: [
                                    {
                                        style: 3,
                                        label: "Action informations",
                                        custom_id: `row_id_userAction_${interaction.user.id}_checkAction`,
                                        disabled: false,
                                        type: 2
                                    },
                                    {
                                        style: 4,
                                        label: "Revert action",
                                        custom_id: `row_id_userAction_${data.userId}_revertBlacklist`,
                                        disabled: false,
                                        type: 2
                                    }
                                ]
                            }
                        ]
                    });
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
                case "revokeBan": {
                    await member.unban(data.userId);
                    const embed = new MessageEmbed()
                        .setColor("ORANGE")
                        .setDescription("You unbanned " + data.userId);
                    interaction.update({
                        components: [
                            {
                                type: 1,
                                components: [
                                    {
                                        style: 3,
                                        label: "Action informations",
                                        custom_id: `row_id_userAction_${interaction.user.id}_checkAction`,
                                        disabled: false,
                                        type: 2
                                    },
                                    {
                                        style: 4,
                                        label: "Revoke ban",
                                        custom_id: `row_id_userAction_${data.userId}_revokeBan`,
                                        disabled: true,
                                        type: 2
                                    }
                                ]
                            }
                        ]
                    });
                    interaction.followUp({embeds: [embed], ephemeral: true});
                }
                break;
                case "kickUser": {
                    interaction.update({
                        components: [
                            {
                                type: 1,
                                components: [
                                    {
                                        "style": 4,
                                        "label": `Kick`,
                                        "custom_id": `row_id_userAction_${member.id}_kickUser`,
                                        "disabled": true,
                                        "type": 2
                                    }
                                ]
                            }
                        ]
                    });
                    
                    await member.kick(data.userId, {    });
                }
                break;
                case "acceptVerify": {
                    let memberU = client.guilds.cache.get("917714328327692338").members.cache.get(data.userId);

                    let role = client.guilds.cache.get("917714328327692338").roles.cache.get("934501016991305798");
                    let Rrole = client.guilds.cache.get("917714328327692338").roles.cache.get("934501017800806510");

                    await memberU.roles.add(role); // VERIFIED ROLES
                    await memberU.roles.remove(Rrole); // REMOVE UNVERIFIED ACCESS

                    const embedWelcome = new MessageEmbed()
                        .setTitle(`SKF Industries - Welcome`)
                        .setDescription(`Welcome to SKF Industries <@${data.userId}> please don't forget to get your roles in <#970425930948444240>\n Have fun on SKF Industries! :3 *Yap yap yap*`)
                        .setColor("ORANGE");
                    
                    interaction.update({
                        components: [
                            {
                                type: 1,
                                components: [
                                    {
                                        "style": 3,
                                        "label": `Accept`,
                                        "custom_id": `row_id_userAction_${data.userId}_acceptVerify`,
                                        "disabled": true,
                                        "type": 2
                                    },
                                    {
                                        "style": 4,
                                        "label": `Deny`,
                                        "custom_id": `row_id_userAction_${data.userId}_denyVerify`,
                                        "disabled": true,
                                        "type": 2
                                    }
                                ]
                            }
                        ]
                    });

                    generalChat.send({
                        embeds: [embedWelcome]
                    });
                }
                break;
                case "denyVerify": {
                    await member.kick(data.userId); // VERIFIED ROLES
                    const embed = new MessageEmbed()
                        .setColor("ORANGE")
                        .setTitle("SKF Industries - Verification denied.")
                        .setDescription(`${data.userId} has been denied.`);
                    interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    });
                }
                break;
            }
        } else if (data.type === "channelAction") {
            let channel = client.guilds.cache.get("917714328327692338").channels.cache.get(data.channelId);

            switch (data.buttonType) {

            }
        } else if (data.type === "VERIFY_ACTION") {
            console.log("VERIFY_ACTION type detected!")
            switch (data.buttonType) {
                case "next": {
                    console.log("NEXT action type detected!")
                    switch (data.stepId) {
                        case "1": {
                            console.log("STEP 1 type detected!")
                            const modal = new Modal()
                                .setCustomId(`row_modal_id_userVerify_${interaction.user.id}_verify`)
                                .setTitle("Verification")
                                .addComponents(
                                    new TextInputComponent()
                                        .setCustomId(`row_id_userVerify_${interaction.user.id}_textActionData_1`)
                                        .setStyle("LONG")
                                        .setLabel("Please describe yourself")
                                        .setMinLength(60)
                                        .setMaxLength(4000)
                                        .setPlaceholder("")
                                        .setRequired(true)
                                )
                                showModal(modal, {
                                    client: client,
                                    interaction: interaction
                                });
                        }
                        break;
                    }
                }
                break;
            }
        }
    }
}
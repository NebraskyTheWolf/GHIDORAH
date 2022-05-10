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
            switch (data.buttonType) {}
        } else if (data.type === "VERIFY_ACTION") {
            switch (data.buttonType) {
                case "next": {
                    switch (data.stepId) {
                        case "1": {
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
        } else if (data.type === "MODERATION") {
            let member = client.guilds.cache.get("917714328327692338").members;
            let target = member.cache.get(data.target);
            
            let datay = `row_id_moderationAction_${data.types}_${data.target}_${data.reason}`;

            switch (data.actionId) {
                case "confirm": {
                    interaction.update({
                        components: [
                            {
                                type: 1,
                                components: [
                                    {
                                        style: 3,
                                        label: "Confirm",
                                        custom_id: `${datay}_confirm`,
                                        disabled: true,
                                        type: 2
                                    },
                                    {
                                        style: 4,
                                        label: "Cancel",
                                        custom_id: `${datay}_cancel`,
                                        disabled: true,
                                        type: 2
                                    },
                                    {
                                        style: 4,
                                        label: "Delete",
                                        custom_id: `${datay}_remove`,
                                        disabled: false,
                                        type: 2
                                    }
                                ]
                            }
                        ]
                    });

                    switch(data.types) {
                        case "KICK": {
                            client.Modlog.addLog(client, target, {
                                reason: data.reason,
                                expiration: -1,
                                type: data.types,
                                active: true
                            }, async (fdata) => {
                                if (fdata.status) {
                                    let R = fdata.data.reason;
                                    await member.kick(data.target, { R });
                                }
                            });
                        }
                        break;
                        case "BAN": {
                            client.Modlog.addLog(client, target, {
                                reason: data.reason,
                                expiration: -1,
                                type: data.types,
                                active: true
                            }, async (fdata) => {
                                if (fdata.status) {
                                    let R = fdata.data.reason;
                                    await member.ban(data.target, { R });
                                }
                            });
                        }
                        break;
                        case "WARN": {
                            client.Modlog.addLog(client, target, {
                                reason: data.reason,
                                expiration: -1,
                                type: data.types,
                                active: true
                            }, async (fdata) => {
                                if (fdata.status) {
                                    target.send(`You got warned on SKF Industries for ${fdata.data.reason}.`);
                                }
                            });
                        }
                        break;
                    }
                }
                break;
                case "remove":
                case "cancel": {
                    await interaction.message.delete();
                }
                break;
                case "BLACKLIST": {
                    client.ModLog.addBlacklist(client, target, {
                        authorId: interaction.user.id,
                        reason: data.reason,
                        action: data.types,
                    }, async (fdata) => {
                        if (fdata.status) {
                            let R = fdata.data.reason;
                            await member.ban(target, { R });

                            const embed = new MessageEmbed()
                                .setColor("ORANGE")
                                .setTitle("SKF Industries - Blacklist.")
                                .setDescription(`<@${target}> has been blacklisted.`);
                            interaction.reply({
                                embeds: [embed],
                                ephemeral: true
                            });
                        }
                    });
                }
                break;
            }
        }
    }
}


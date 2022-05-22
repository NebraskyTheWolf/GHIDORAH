const { MessageEmbed } = require('discord.js');
const { Modal, TextInputComponent, showModal } = require('discord-modals')

module.exports = {
    data: {
        name: "id_button"
    },
    async execute(interaction, interactionUser, guild, data) {
        if (!guild.config.logging.loggingEnabled) {
            await interaction.reply({
                content: 'Server not configurated',
                ephemeral: true
            });
            return;
        }
        
        const generalChat = client.guilds.cache.get(guild.id)
                .channels.cache.get(guild.verification.channels.welcomeChannel);

        const server = client.guilds.cache.get(guild.id);
        const members = server.members;

        if (data.type === "USER_ACTION") {
            switch (data.buttonType) {
                case "acceptVerify": {
                    const memberU = members.cache.get(data.userId);

                    const role = server.roles.cache.get(guild.config.autorole.verified);
                    const Rrole = server.roles.cache.get(guild.config.autorole.unverified);

                    await memberU.roles.add(role); // VERIFIED ROLES
                    await memberU.roles.remove(Rrole); // REMOVE UNVERIFIED ACCESS

                    const embedWelcome = new MessageEmbed()
                        .setTitle(`GHIDORAH - Welcome`)
                        .setColor("ORANGE");
                    if (guild.config.selfroles.enabled)
                        embedWelcome.setDescription(`Welcome to ${server.name} <@${data.userId}> please don't forget to get your roles in <#${guild.config.selfroles.channelId}>\n Have fun on ${server.name}! :3 *Yap yap yap*`);
                    else
                        embedWelcome.setDescription(`Welcome to ${server.name} <@${data.userId}> \n Have fun on ${server.name}! :3 *Yap yap yap*`);

                    interaction.update({
                        components: [
                            {
                                type: 1,
                                components: [
                                    {
                                        "style": 3,
                                        "label": `Accept`,
                                        "custom_id": `row_id_userAction_${data.userId}_${guild.id}_acceptVerify`,
                                        "disabled": true,
                                        "type": 2
                                    },
                                    {
                                        "style": 4,
                                        "label": `Deny`,
                                        "custom_id": `row_id_userAction_${data.userId}_${guild.id}_denyVerify`,
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
                    interaction.update({
                        components: [
                            {
                                type: 1,
                                components: [
                                    {
                                        "style": 4,
                                        "label": `Accept`,
                                        "custom_id": `row_id_userAction_${data.userId}_${guild.id}_acceptVerify`,
                                        "disabled": true,
                                        "type": 2
                                    },
                                    {
                                        "style": 4,
                                        "label": `Cancelled.`,
                                        "custom_id": `row_id_userAction_${data.userId}_${guild.id}_denyVerify`,
                                        "disabled": true,
                                        "type": 2
                                    }
                                ]
                            }
                        ]
                    });
                }
                break;
            }
        } else if (data.type === "channelAction") {
            let channel = client.guilds.cache.get(guild.id).channels.cache.get(data.channelId);
            switch (data.buttonType) {}
        } else if (data.type === "VERIFY_ACTION") {
            switch (data.buttonType) {
                case "next": {
                    switch (data.stepId) {
                        case "1": {
                            const modal = new Modal()
                                .setCustomId(`row_modal_id_userVerify_${interaction.user.id}_${guild.id}_verify`)
                                .setTitle(`Verification for ${server.name}`)
                                .addComponents(
                                    new TextInputComponent()
                                        .setCustomId(`row_id_userVerify_${interaction.user.id}_${guild.id}_textActionData_1`)
                                        .setStyle("LONG")
                                        .setLabel("HOW DID YOU FIND US?")
                                        .setMinLength(0)
                                        .setMaxLength(4000)
                                        .setPlaceholder("Please be specific, answers like 'google' or 'website' will be declined")
                                        .setRequired(true),
                                    new TextInputComponent()
                                        .setCustomId(`row_id_userVerify_${interaction.user.id}_${guild.id}_textActionData_2`)
                                        .setStyle("LONG")
                                        .setLabel("HOW OLD ARE YOU")
                                        .setMinLength(0)
                                        .setMaxLength(4000)
                                        .setPlaceholder("Do not round up, and do not give us your \"sona's\" age.")
                                        .setRequired(true),
                                    new TextInputComponent()
                                        .setCustomId(`row_id_userVerify_${interaction.user.id}_${guild.id}_textActionData_3`)
                                        .setStyle("LONG")
                                        .setLabel("WHAT IS A FURRY FOR YOU?")
                                        .setMinLength(0)
                                        .setMaxLength(4000)
                                        .setPlaceholder("In your own words, please.")
                                        .setRequired(true),
                                    new TextInputComponent()
                                        .setCustomId(`row_id_userVerify_${interaction.user.id}_${guild.id}_textActionData_4`)
                                        .setStyle("LONG")
                                        .setLabel("DO YOU HAVE A FURSONA?")
                                        .setMinLength(0)
                                        .setMaxLength(4000)
                                        .setPlaceholder("If so, could you describe them?")
                                        .setRequired(true),
                                    new TextInputComponent()
                                        .setCustomId(`row_id_userVerify_${interaction.user.id}_${guild.id}_textActionData_5`)
                                        .setStyle("LONG")
                                        .setLabel("HAVE YOU READ THE RULES?")
                                        .setMinLength(0)
                                        .setMaxLength(4000)
                                        .setPlaceholder("We will know")
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
            let target = members.cache.get(data.target);

            if (target === undefined) {
                interaction.reply({
                    content: 'Invalid user',
                    ephemeral: true
                });
                return;
            }
            
            let datay = `row_id_moderationAction_${data.types}_${data.target}_${data.reason}_${guild.id}`;

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
                                    await target.kick(fdata.data.reason);
                                }
                            }, interaction);
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
                                    await members.ban(data.target, { R });
                                }
                            }, interaction);
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
                                    target.send(`You got warned on ${server.name} for ${fdata.data.reason}.`);
                                }
                            }, interaction);
                        }
                        break;
                        case "BLACKLIST": {
                            client.Modlog.addBlacklist(client, data.userId, {
                                guildId: guild.id,
                                authorId: interaction.user.id,
                                reason: data.reason,
                                action: 'none'
                            }, data => {});
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
            }
        }
    }
}


const { Permissions } = require('discord.js');


module.exports = async (client, interaction) => {
    if (interaction.customId === undefined) return; // AVOID BOT CRASHING
    if (!interaction.guild) return; // AVOID USING INTERACTION IN DMS

    const interactionUser = await interaction.guild.members.fetch(interaction.user.id)

    if (interaction.customId.startsWith('row_id_')) {
        let type = interaction.customId.split('row_id_')[1];
        let finalType = type.split('_')[0];

        const button = client.buttons.get("id_button");

        switch (finalType) {
            case "userAction": {
                let userId = type.split('_')[1];
                let buttonType = type.split('_')[2];

                button.execute(interaction, interactionUser, {
                    type: "USER_ACTION",
                    userId: userId,
                    buttonType: buttonType,
                    permissions: [
                        Permissions.FLAGS.KICK_MEMBERS
                    ]
                });
            }
            break;
            case "channelAction": {
                let channelId = type.split('_')[1];
                let buttonType = type.split('_')[2];

                button.execute(interaction, interactionUser, {
                    type: "CHANNEL_ACTION",
                    channelId: channelId,
                    buttonType: buttonType,
                    permissions: [
                        Permissions.FLAGS.KICK_MEMBERS
                    ]
                });
            }
            break;
            case "userVerify": {
                let userId = type.split('_')[1];
                let buttonType = type.split('_')[2];
                let step = type.split('_')[3];

                button.execute(interaction, interactionUser, {
                    type: "VERIFY_ACTION",
                    userId: userId,
                    buttonType: buttonType,
                    permissions: [
                        Permissions.FLAGS.KICK_MEMBERS
                    ],
                    stepId: step
                });
            }
            break;
            case "moderationAction": {
                let types = type.split('_')[1];
                let target = type.split('_')[2];
                let reason = type.split('_')[3];
                let action = type.split('_')[4];

                button.execute(interaction, interactionUser, {
                    type: "MODERATION",
                    types: types,
                    target: target,
                    reason: reason,
                    actionId: action
                });
            }
            break;
            default:
               client.logger.log('ERROR', `Unresolved action ID: ${types} for interaction ID: ${interaction.customId} executed by ${interaction.user.id}`)
            break;
        }
    } else if(interaction.isButton() 
        || interaction.isSelectMenu()) {
        const button = client.buttons.get(interaction.customId);
        if(!button) {
            client.logger.log('ERROR', `No handler for button ${interaction.customId} : ${interaction.customId}.js not found.`);
            return;
        }

        try {
            await button.execute(interaction, interactionUser);
        } catch (error) {
            client.logger.log('ERROR', error);
            await interaction.reply({ content: 'There was an error while executing the button script !', ephemeral: true});
        }
    } else {
        return;
    }
}
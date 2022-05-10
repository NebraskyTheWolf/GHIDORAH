const { Permissions } = require('discord.js');


module.exports = async (client, interaction) => {
    if (interaction.customId === undefined) return; // AVOID BOT CRASHING
    if (!interaction.guild) return; // AVOID USING INTERACTION IN DMS

    const interactionUser = await interaction.guild.members.fetch(interaction.user.id)

    console.log(`Interaction called: ${interaction.customId}`)

    if (interaction.customId.startsWith('row_id_')) {
        console.log(interaction.customId)

        let type = interaction.customId.split('row_id_')[1];
        let finalType = type.split('_')[0];

        const button = client.buttons.get("id_button");

        console.log(type)
        console.log(finalType)

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
            default:
                console.log(`Unresolved action ID: ${type} for interaction ID: ${interaction.customId} executed by ${interaction.user.id}`)
            break;
        }
    } else if(interaction.isButton() 
        || interaction.isSelectMenu()) {
        const button = client.buttons.get(interaction.customId);
        if(!button) {
            console.error(`No handler for button ${interaction.customId} : ${interaction.customId}.js not found.`);
            return;
        }

        try {
            await button.execute(interaction, interactionUser);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing the button script !', ephemeral: true});
        }
    } else {
        return;
    }
}
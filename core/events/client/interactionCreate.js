const { Permissions } = require('discord.js');

module.exports = async (client, interaction) => {
    if (interaction.customId === undefined) return; // AVOID BOT CRASHING
    if (!interaction.guild) return; // AVOID USING INTERACTION IN DMS
    if (!client.IsLoaded) {
        await interaction.reply({ content: 'My code is loading... Please wait.', ephemeral: true});
        return;
    }

    const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
    const guild = await client.Database.fetchGuild(interaction.guild.id);

    if (guild.config.interaction.enabled) {
        if (interaction.customId.startsWith('row_id_')) {
            const type = interaction.customId.split('row_id_')[1];
            const finalType = type.split('_')[0];
            const button = client.buttons.get("id_button");
    
            switch (finalType) {
                case "userAction": {
                    button.execute(interaction, interactionUser, guild, {
                        type: "USER_ACTION",
                        userId: type.split('_')[1],
                        buttonType: type.split('_')[3],
                        permissions: [
                            Permissions.FLAGS.KICK_MEMBERS
                        ]
                    });
                }
                break;
                case "userVerify": {    
                    button.execute(interaction, interactionUser, guild, {
                        type: "VERIFY_ACTION",
                        userId: type.split('_')[1],
                        buttonType: type.split('_')[3],
                        stepId: type.split('_')[4],
                        permissions: [
                            Permissions.FLAGS.KICK_MEMBERS
                        ]
                    });
                }
                break;
                case "modmail": {
                    button.execute(interaction, interactionUser, guild, {
                        type: "MODMAIL",
                        buttonType: type.split('_')[1],
                        permissions: []
                    });
                }
                break;
                case "marriage": {
                    button.execute(interaction, interactionUser, guild, {
                        type: "MARRIAGE",
                        buttonType: type.split('_')[1],
                        marryId: type.split('_')[2],
                        permissions: []
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
                await button.execute(interaction, interactionUser, guild);
            } catch (error) {
                client.logger.log('ERROR', error);
                await interaction.reply({ content: 'There was an error while executing the button script !', ephemeral: true});
            }
        }
    } else {
        await interaction.reply({ content: 'Interactions disabled on this server.', ephemeral: true});
    }
}
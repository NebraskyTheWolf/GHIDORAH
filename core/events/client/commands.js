module.exports = async (client, interaction) => {
    if (!interaction.data.name) {
        await client.logger.log('CRITICAL', `Error occurred during interaction execution: 'interaction.data.name' can't be null.`);
        return;
    }

    let guild = await client.Database.fetchGuild(interaction.guild_id);
    if (guild.blacklisted) {
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "Sorry but this server are blacklisted.",
                    flags: 64
                }
            }
        });
        return;
    }

    if (!client.commands.has(interaction.data.name)) return;
    if (!client.IsLoaded) {
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "Sorry but my code is not loaded. Please wait a few seconds.",
                    flags: 64
                }
            }
        });
        return;
    }

    try {
        if (guild.config.interaction.enabled) {
            await client.commands.get(interaction.data.name).execute(interaction);
        } else {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "Sorry but the commands are disabled in this guild.",
                        flags: 64
                    },
                },
            });
        }
    } catch (error) {
        client.logger.log('ERROR', `Error from command ${interaction.data.name} : ${error.message}`);
        client.logger.log('ERROR', `${error.stack}\n`);
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "Sorry, error occured when running this command!",
                    flags: 64
                },
            },
        });
    }
}
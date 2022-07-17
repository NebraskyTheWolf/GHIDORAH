module.exports = {
    name: "clear",
    description: "Delete a amount of message.",
    commandOptions: [
        {
            "type": 4,
            "name": "amounts",
            "description": "maximum amounts 100",
            "required": true
        }
    ],
    async execute(interaction) {  
        const value = interaction.data.options[0].value;
        const channel = client.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.channel_id);
        const member = client.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.id);

        if (value < 5 || value > 100) {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                "data": {
                    "type": 4,
                    "data": {
                        "content": 'Please set a value higher to 5 and max 100.',
                        "flags": 64
                    }
                }
            });
        } else {
            if (member.hasPermission('MANAGE_MESSAGES')) {
                await channel.bulkDelete(value, true).then((_message) => {
                    client.api.interactions(interaction.id, interaction.token).callback.post({
                        "data": {
                            "type": 4,
                            "data": {
                                "embeds": `${_message.size} messages deleted.`,
                                "flags": 64
                            }
                        }
                    });
                });
            } else {
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    "data": {
                        "type": 4,
                        "data": {
                            "content": 'You\'re not allowed to execute this command.',
                            "flags": 64
                        }
                    }
                });
            }
        }
    }
}
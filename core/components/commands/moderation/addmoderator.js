module.exports = {
    name: "addmoderator",
    description: "Add a moderator to manage your server.",
    commandOptions: [
        {
            "type": 6,
            "name": "target",
            "description": "Please select the moderator",
            "required": true
        },
        {
            "type": 10,
            "name": "permission",
            "description": "Please select a permission.",
            "required": true,
            "choices": [
              {
                "name": "STAFF",
                "value": 1
              },
              {
                "name": "Moderator",
                "value": 2
              },
              {
                "name": "Admin",
                "value": 3
              },
              {
                "name": "Owner",
                "value": 4
              }
            ]
        }
    ],
    async execute(interaction) {
        const interactionUser = await interaction.member;
        const guild = await client.Database.fetchGuild(interaction.guild_id);
        const server = client.guilds.cache.get(interaction.guild_id);


        const target = interaction.data.options[0].value;
        const permission = interaction.data.options[1].value;

        const moderator = await client.Database.fetchModerator(target, guild.id);

        if (server.ownerId !== interactionUser.user.id) {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                "data": {
                    "type": 4,
                    "data": {
                        "embeds": [
                            {
                            "type": "rich",
                            "title": `GHIDORAH - Error`,
                            "description": `Only the owner of this server can use this command.`,
                            "color": 0xff8c00
                            }
                        ],
                        "flags": 64
                    }
                }
            });
        } else {
            if ((moderator != null)) {
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    "data": {
                        "type": 4,
                        "data": {
                            "embeds": [
                                {
                                "type": "rich",
                                "title": `GHIDORAH - Error`,
                                "description": `Moderator already registered.`,
                                "color": 0xff8c00
                                }
                            ],
                            "flags": 64
                        }
                    }
                });
            } else {
                await client.Database.createModerator(target, guild.id, permission).then(async data => {
                    client.api.interactions(interaction.id, interaction.token).callback.post({
                        "data": {
                            "type": 4,
                            "data": {
                                "embeds": [
                                    {
                                    "type": "rich",
                                    "title": `GHIDORAH - Moderator added.`,
                                    "description": `${data.userId} has been registered as moderator with accessLevel ${data.accessLevel}`,
                                    "color": 0xff8c00
                                    }
                                ],
                                "flags": 64
                            }
                        }
                    });
                    switch (permission) {
                        case 1:
                            await client.Database.createActivity(
                                interactionUser.user.username,
                                guild.id,
                                'STAFF_ADDED',
                                `${target} added as staff.`
                            );
                        break;
                        case 2:
                            await client.Database.createActivity(
                                interactionUser.user.username,
                                guild.id,
                                'MODERATOR_ADDED',
                                `${target} added as moderator.`
                            );
                        break;
                        case 3:
                            await client.Database.createActivity(
                                interactionUser.user.username,
                                guild.id,
                                'ADMINISTRATOR_ADDED',
                                `${target} added as administrator.`
                            );
                        break;
                        case 4:
                            await client.Database.createActivity(
                                interactionUser.user.username,
                                guild.id,
                                'COOWNER_ADDED',
                                `${target} added as CO-OWNER.`
                            );
                        break;
                    }
                }).catch(err => {
                    client.api.interactions(interaction.id, interaction.token).callback.post({
                        "data": {
                            "type": 4,
                            "data": {
                                "embeds": [
                                    {
                                    "type": "rich",
                                    "title": `GHIDORAH - Error`,
                                    "description": `Unable to register ${target} as moderator.`,
                                    "color": 0xff8c00
                                    }
                                ],
                                "flags": 64
                            }
                        }
                    });
                });
            }
        }
    }
}
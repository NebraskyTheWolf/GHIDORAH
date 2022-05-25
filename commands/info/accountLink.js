const Discord = require("discord.js");
require("discord-banner")(process.env.TOKEN, {
    cacheTime: 60*60*1000
});
const { getUserBanner } = require("discord-banner");

module.exports = {
    name: "accountlink",
    description: "Getting your personal code to access to the website login.",
    commandOptions: null,
    async execute(interaction) {
        const interactionUser = await interaction.member;
        const guild = await client.Database.fetchGuild(interaction.guild_id);

        if (!guild.config.options.coreGuild) {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                "data": {
                    "type": 4,
                    "data": {
                        "embeds": [
                            {
                            "type": "rich",
                            "title": `GHIDORAH - Command reserved to the main guild.`,
                            "description": `This server don't have the permission to use this command`,
                            "color": 0xff8c00
                            }
                        ],
                        "ephemeral": "true",
                        "flags": 64
                    }
                }
            });
        } else {
            client.users.fetch(interaction.member.user.id).then((user) => {
                getUserBanner(user.id).then(banner => {
                    console.log(banner);
                    client.Database.createOauth(user.id, {
                        username: client.StringUtils.remove_non_ascii(user.username),
                        roles: interactionUser.roles,
                        avatar: user.avatarURL(),
                        banner: banner,
                        discriminator: user.discriminator,
                        permissions: interactionUser.permissions,
                        system: user.system,
                        bot: user.bot
                    }).then(result => {
                        console.log(result);
                        if (result.activated) {
                            client.api.interactions(interaction.id, interaction.token).callback.post({
                                "data": {
                                    "type": 4,
                                    "data": {
                                        "components": [
                                            {
                                            "type": 1,
                                            "components": [
                                                {
                                                "style": 5,
                                                "label": `Login`,
                                                "url": `${process.env.DEFAULT_DOMAIN}/login`,
                                                "disabled": false,
                                                "emoji": {
                                                    "id": null,
                                                    "name": `💛`
                                                },
                                                "type": 2
                                                }
                                            ]
                                            }
                                        ],
                                        "embeds": [
                                            {
                                            "type": "rich",
                                            "title": `SKF Industries - Account already linked`,
                                            "description": `EEP It's look like your account are already linked to the website!`,
                                            "color": 0xff8c00
                                            }
                                        ],
                                        "ephemeral": "true",
                                        "flags": 64
                                    }
                                }
                            });
                        } else {
                            client.api.interactions(interaction.id, interaction.token).callback.post({
                                "data": {
                                    "type": 4,
                                    "data": {
                                        "components": [
                                            {
                                            "type": 1,
                                            "components": [
                                                {
                                                "style": 5,
                                                "label": `Register now`,
                                                "url": `${process.env.DEFAULT_DOMAIN}/register/${result.key}`,
                                                "disabled": false,
                                                "emoji": {
                                                    "id": null,
                                                    "name": `💛`
                                                },
                                                "type": 2
                                                }
                                            ]
                                            }
                                        ],
                                        "embeds": [
                                            {
                                            "type": "rich",
                                            "title": `SKF Industries - Account linked`,
                                            "description": `You can now create an account on the website with this key "${result.key}" or clicking on the button bellow.`,
                                            "color": 0xff8c00
                                            }
                                        ],
                                        "ephemeral": "true",
                                        "flags": 64
                                    }
                                }
                            });
                        }
                    });
                });
           });
        }
    }
}
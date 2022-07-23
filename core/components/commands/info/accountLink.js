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
        const server = client.guilds.cache.get(interaction.guild_id);

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
            client.users.fetch(interaction.member.user.id).then((user) => {
                getUserBanner(user.id).then(banner => {
                    client.Database.createOauth(user.id, {
                        username: client.StringUtils.remove_non_ascii(user.username),
                        serverId: guild.id,
                        roles: interactionUser.roles,
                        avatar: user.avatarURL(),
                        banner: banner,
                        discriminator: user.discriminator,
                        permissions: interactionUser.permissions,
                        system: user.system,
                        bot: user.bot
                    }).then(result => {
                        client.api.interactions(interaction.id, interaction.token).callback.post({
                            "data": {
                                "type": 4,
                                "data": {
                                    "embeds": [
                                        {
                                        "type": "rich",
                                        "title": `GHIDORAH - Account linked`,
                                        "description": `You can now login on the dashboard by using this code "${result.key}"`,
                                        "color": 0xff8c00
                                        }
                                    ],
                                    "flags": 64
                                }
                            }
                        });
                    });
                });
           });
        }
    }
}
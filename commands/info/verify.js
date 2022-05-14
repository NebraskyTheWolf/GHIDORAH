const Discord = require("discord.js");
require("discord-banner")(process.env.TOKEN, {
    cacheTime: 60*60*1000
});
const { getUserBanner } = require("discord-banner");

module.exports = {
    name: "verify",
    description: "Getting your personal code to access to the website login.",
    commandOptions: null,
    async execute(interaction) {
        const interactionUser = await interaction.member;
        client.users.fetch(interaction.member.user.id).then((user) => {
            getUserBanner(user.id).then(banner => {
                console.log(banner);
                client.Database.createVerification(user.id, {
                    username: client.StringUtils.remove_non_ascii(user.username),
                    discriminator: user.discriminator,
                    system: user.system,
                    bot: user.bot
                }).then(result => {
                    console.log(result);
                    if (result.verified) {
                        client.api.interactions(interaction.id, interaction.token).callback.post({
                            "data": {
                                "type": 4,
                                "data": {
                                    "embeds": [
                                        {
                                        "type": "rich",
                                        "title": `SKF Industries - Account already verified`,
                                        "description": `EEP It's look like your account are already verified!`,
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
                                            "label": `Verify now`,
                                            "url": `https://ghidorah.net/verify?code=${result.code}`,
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
                                        "title": `SKF Industries - Verification process`,
                                        "description": `You can now start your verfification with the code "${result.code}" or clicking on the button bellow.`,
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
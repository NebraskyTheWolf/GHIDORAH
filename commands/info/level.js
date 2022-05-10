const Discord = require("discord.js");
const canvacord = require('canvacord');

module.exports = {
    name: "level",
    description: "See your profile level",
    commandOptions: null,
    async execute(interaction) {
        const user = await client.levels.fetch(interaction.member.user.id, interaction.guild_id, true);

        const rank = new canvacord.Rank()
            .setAvatar(`https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}.png`)
            .setCurrentXP(user.xp)
            .setRequiredXP(client.levels.xpFor(user.level + 1))
            .setRank(user.position)
            .setProgressBar('#FFA500')
            .setUsername(interaction.member.user.username)
            .setDiscriminator(interaction.member.user.discriminator);

        rank.build()
            .then(data => {
                const attachment = new Discord.MessageAttachment(data, "RankCard.png");
                const embed = new Discord.MessageEmbed()
                    .setColor('ORANGE')
                    .setTitle('SKF Industries - User level card')
                    .setImage('attachment://RankCard.png');
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
                                      "label": `Leaderboard`,
                                      "url": `https://ghidorah.net/leaderboard`,
                                      "disabled": false,
                                      "type": 2
                                    }
                                  ]
                                }
                              ],
                              "embeds": [embed],
                              "attachment": [attachment]
                        }
                    }
                });
            });
    }
}
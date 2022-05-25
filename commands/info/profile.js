const Discord = require("discord.js");

module.exports = {
    name: "profile",
    description: "See your game profile.",
    commandOptions: null,
    execute(interaction) {
        client.Database.fetchUser(interaction.member.user.id).then((user) => {
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
                                  "label": `Stats`,
                                  "url": `${process.env.DEFAULT_DOMAIN}/stats/${user.id}`,
                                  "disabled": false,
                                  "type": 2
                                }
                              ]
                            }
                          ],
                          "embeds": [
                            {
                              "type": "rich",
                              "title": `SKF Industries - Profile`,
                              "description": `There is your game profile.`,
                              "color": 0xff00cc,
                              "fields": [
                                {
                                  "name": `Level`,
                                  "value": `${user.stats.stats.level}`,
                                  "inline": true
                                },
                                {
                                  "name": `Money`,
                                  "value": `${user.stats.stats.money}`,
                                  "inline": true
                                },
                                {
                                  "name": `Kills`,
                                  "value": `${user.stats.stats.kills}`,
                                  "inline": true
                                },
                                {
                                  "name": `Deaths`,
                                  "value": `${user.stats.stats.deaths}`,
                                  "inline": true
                                },
                                {
                                  "name": `Wins`,
                                  "value": `${user.stats.stats.wins}`,
                                  "inline": true
                                },
                                {
                                  "name": `Fights`,
                                  "value": `${user.stats.stats.fights}`,
                                  "inline": true
                                }
                              ]
                            }
                        ]
                    }
                }
            })
        });
    }
}
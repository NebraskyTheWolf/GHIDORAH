const {Collection} = require("discord.js");

module.exports = {
    name: "profile",
    description: "See your game profile.",
    commandOptions: null,
    async execute(interaction) {
        client.Database.fetchUser(interaction.member.user.id).then(async (uwu) => {
          const user = await client.levels.fetch(interaction.member.user.id, interaction.guild_id, true);
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
                                "url": `${process.env.DEFAULT_DOMAIN}/server/${interaction.guild_id}/${uwu.id}/profile`,
                                "disabled": false,
                                "type": 2
                              }
                            ]
                          }
                        ],
                        "embeds": [
                          {
                            "type": "rich",
                            "title": `GHIDORAH - Profile`,
                            "description": `There is your game profile.`,
                            "color": 0xff00cc,
                            "fields": [
                              {
                                "name": `Level`,
                                "value": `${user.level}`,
                                "inline": true
                              },
                              {
                                "name": `XP`,
                                "value": `${user.xp}`,
                                "inline": true
                              },
                              {
                                "name": `Money`,
                                "value": `${uwu.stats.stats.money}`,
                                "inline": true
                              },
                              {
                                "name": `Rank`,
                                "value": `${client.Modlog.fetchRankData(user.xp).name} #${user.position}`,
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
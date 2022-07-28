module.exports = (client, moderator, guild, member, data) => {
    if (!guild.config.logging.loggingEnabled) return;

    const moderatorMember = client.guilds.cache.get(guild.id).members.cache.get(moderator);
    const channel = client.guilds.cache.get(guild.id).channels.cache.get(guild.config.logging.moderation);
    if (channel) {
        channel.send({
            "components": [
                {
                  "type": 1,
                  "components": [
                    {
                      "style": 3,
                      "label": `Sanction saved in the database.`,
                      "custom_id": `row_0_button_0`,
                      "disabled": true,
                      "type": 2
                    }
                  ]
                }
              ],
              "embeds": [
                {
                  "type": "rich",
                  "title": `GHIDORAH - MODERATION`,
                  "description": "",
                  "color": 0x00FFFF,
                  "fields": [
                    {
                      "name": `Tag`,
                      "value": `${member.user.tag}`,
                      "inline": true
                    },
                    {
                      "name": `Moderator`,
                      "value": `${moderatorMember.user.tag}`,
                      "inline": true
                    },
                    {
                      "name": `Sanction`,
                      "value": `${data.type}`
                    },
                    {
                      "name": `Reason`,
                      "value": `${data.reason} `
                    }
                  ]
                }
            ]
        });
    }
}
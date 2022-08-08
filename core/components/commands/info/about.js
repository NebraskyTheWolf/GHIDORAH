module.exports = {
    name: "about",
    description: "Get information about the bot!",
    commandOptions: [],
    async execute(interaction) {
        await client.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.channel_id).send({
            "components": [
                {
                  "type": 1,
                  "components": [
                    {
                      "style": 5,
                      "label": `Website`,
                      "url": `https://ghidorah.uk`,
                      "disabled": false,
                      "type": 2
                    },
                    {
                      "style": 5,
                      "label": `Commands`,
                      "url": `https://ghidorah.uk/help`,
                      "disabled": false,
                      "type": 2
                    },
                    {
                      "style": 5,
                      "label": `Support`,
                      "url": `https://ghidorah.uk/support`,
                      "disabled": false,
                      "type": 2
                    }
                  ]
                }
              ],
              "embeds": [
                {
                  "type": "rich",
                  "title": `About GHIDORAH.`,
                  "description": `There is all the information about GHIDORAH.`,
                  "color": 0xae00ff,
                  "fields": [
                    {
                      "name": `Version`,
                      "value": `${client.version}`,
                      "inline": true
                    },
                    {
                      "name": `Revision`,
                      "value": `${client.revision}`,
                      "inline": true
                    },
                    {
                      "name": `DiscordJS Version`,
                      "value": `${require("discord.js").version}`,
                      "inline": true
                    },
                    {
                      "name": `Author`,
                      "value": `Vakea#0666`
                    }
                  ]
                }
              ]
        });
    }
}
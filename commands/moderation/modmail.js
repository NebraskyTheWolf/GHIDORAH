const Discord = require("discord.js");
module.exports = {
    name: "modmail",
    description: "Modmail commands",
    commandOptions: [
        {
            "type": 3,
            "name": "title",
            "description": "Set a title",
            "required": true
        },
        {
            "type": 7,
            "name": "channel",
            "description": "Target channel",
            "required": true
        }
    ],
    async execute(interaction) {
        const guild = await client.Database.fetchGuild(interaction.guild_id);
        const title = interaction.data.options[0].value;
        const channel = await client.guilds.cache.get(guild.id).channels.cache.get(interaction.data.options[1].value);

        channel.send({
            "components": [
                {
                  "type": 1,
                  "components": [
                    {
                      "style": 1,
                      "label": `Create`,
                      "custom_id": `row_modmail_createUser`,
                      "disabled": false,
                      "emoji": {
                        "id": `776919792594583572`,
                        "name": `modmail`,
                        "animated": false
                      },
                      "type": 2
                    },
                    {
                      "style": 2,
                      "label": `History`,
                      "custom_id": `row_modmail_history`,
                      "disabled": false,
                      "emoji": {
                        "id": `931924603239030804`,
                        "name": `WuskyLurk`,
                        "animated": false
                      },
                      "type": 2
                    }
                  ]
                },
                {
                  "type": 1,
                  "components": [
                    {
                      "style": 2,
                      "label": `Informations`,
                      "custom_id": `row_informations_modmail`,
                      "disabled": false,
                      "emoji": {
                        "id": `828699971738009627`,
                        "name": `ExciteOverload`,
                        "animated": false
                      },
                      "type": 2
                    }
                  ]
                }
              ],
              "embeds": [
                {
                  "type": "rich",
                  "title": `Modmail - ${title}`,
                  "description": `If you need assistance or talking about something to the staff click on the 'Create' button bellow.`,
                  "color": 0xf7024b
                }
              ]
        });
    }
}
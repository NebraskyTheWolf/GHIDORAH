module.exports = async (client, message) => {
    if (message.content.startsWith('+roles')) {
        message.channel.send({
          "components": [
            {
              "type": 1,
              "components": [
                {
                  "style": 1,
                  "label": `Roles selections`,
                  "custom_id": `row_roles`,
                  "disabled": false,
                  "emoji": {
                    "id": `868256274637266994`,
                    "name": `ArrowL`,
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
                  "custom_id": `row_1_button_0`,
                  "disabled": false,
                  "emoji": {
                    "id": `868256274637266994`,
                    "name": `ArrowL`,
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
              "title": `Choice your roles`,
              "description": `Please select your roles bellow by clicking on \`Roles selections\``,
              "color": 0xf30387
            }
          ]
        });
    } else if (message.content.startsWith('+staff')) {
        message.channel.send({
          "components": [
            {
              "type": 1,
              "components": [
                {
                  "style": 3,
                  "label": `Apply`,
                  "custom_id": `row_staff_apply`,
                  "disabled": false,
                  "emoji": {
                    "id": `868256274637266994`,
                    "name": `ArrowL`,
                    "animated": false
                  },
                  "type": 2
                },
                {
                  "style": 2,
                  "label": `Informations`,
                  "custom_id": `row_staff_informations`,
                  "disabled": false,
                  "emoji": {
                    "id": `868256274637266994`,
                    "name": `ArrowL`,
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
              "title": `SKF Studio - Staff applications`,
              "description": `Hello everyone, we're happy to announce we openened the Staff Applications.\n\nIf you are interested to be in our staff please click on the button \`Apply\` bellow.`,
              "color": 0x12d97c
            }
          ]
        });
    } else if (message.content.startsWith('+verify')) {
        message.channel.send({
            "components": [
              {
                "type": 1,
                "components": [
                  {
                    "style": 5,
                    "label": `Verify here`,
                    "url": `https://skf-studios.com/verify`,
                    "disabled": false,
                    "emoji": {
                      "id": `783810410997481512`,
                      "name": `CatLurkHi`,
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
                "title": `Chill Zone - Verification`,
                "description": `Please do \`/verify\` with GHIDORAH. The bot will give you a code and click on the button bellow to have access to the werbsite.`,
                "color": 0xc515bf
              }
            ]
        });
    } else if (message.content.startsWith('+announce')) {
        client.guilds.cache.forEach((guild) => {
           if (guild.systemChannel !== null) {
            guild.systemChannel.send({
              "embeds": [
                {
                  "type": "rich",
                  "title": `Server status - MIGRATIONS PLANNED`,
                  "description": `Hello, We're happy to say today we have now powerful servers to host our bot and website! \n\nThis action will force us to make the bot offline for a couples of minutes. \nWe're sorry about the inconvenience but we will be back soon :3\n\n- The GHIDORAH TEAM.`,
                  "color": 0x8fd50e
                }
              ]
            });
          }
        });
    }
};


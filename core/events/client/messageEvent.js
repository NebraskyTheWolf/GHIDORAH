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
                "title": `Staff applications`,
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
                    "style": 2,
                    "label": `Verify here`,
                    "custom_id": `row_verify`,
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
                "title": `Kingdom for All - Verification`,
                "description": `Please click on the button bellow to starts your verification.`,
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
    } else if (message.content.startsWith('+control')) {
       message.channel.send({
        "components": [
          {
            "type": 1,
            "components": [
              {
                "style": 1,
                "label": `RELOAD`,
                "custom_id": `row_reload`,
                "disabled": false,
                "type": 2
              },
              {
                "style": 1,
                "label": `COLD RESTART`,
                "custom_id": `row_cold_restart`,
                "disabled": false,
                "type": 2
              },
              {
                "style": 1,
                "label": `API STATUS`,
                "custom_id": `row_api_status`,
                "disabled": false,
                "type": 2
              },
              {
                "style": 5,
                "label": `DASHBOARD`,
                "url": `https://skf-studios.com/dashboard/917714328327692338`,
                "disabled": false,
                "type": 2
              }
            ]
          }
        ],
        "embeds": [
          {
            "type": "rich",
            "title": `GHIDORAH DEV CONTROL`,
            "description": `Here is all the ADMIN action can be executed.`,
            "color": 0xff003c
          }
        ]
       });
    } else if (message.content.startsWith('+coaching')) {
      message.channel.send({
        "components": [
          {
            "type": 1,
            "components": [
              {
                "custom_id": `row_neyaz_price_info`,
                "placeholder": `Clique ici afin de sélectionner une formule.`,
                "options": [
                  {
                    "label": `Formule Solo`,
                    "value": `row_neyaz_solo`,
                    "description": `Clique ici pour validé`,
                    "emoji": {
                      "id": `796381356270813214`,
                      "name": `bongo`,
                      "animated": false
                    },
                    "default": false
                  },
                  {
                    "label": `Formule Complémentaire`,
                    "value": `row_neyaz_comp`,
                    "description": `Clique ici pour validé`,
                    "emoji": {
                      "id": `796381356270813214`,
                      "name": `bongo`,
                      "animated": false
                    },
                    "default": false
                  },
                  {
                    "label": `Formule 3 heures Ranked`,
                    "value": `row_neyaz_ranked`,
                    "description": `Clique ici pour validé`,
                    "emoji": {
                      "id": `796381356270813214`,
                      "name": `bongo`,
                      "animated": false
                    },
                    "default": false
                  }
                ],
                "min_values": 1,
                "max_values": 1,
                "type": 3
              }
            ]
          }
        ],
        "embeds": [
          {
            "type": "rich",
            "title": `NeyazR1 - COACHING INFO`,
            "description": `Merci de sélectionner la formule ci-dessous afin de pouvoir voir les informations.`,
            "color": 0xe1902d
          }
        ]
      });
  } else if (message.content.startsWith('+rules')) {
      message.channel.send({
        "components": [
          {
            "type": 1,
            "components": [
              {
                "style": 3,
                "label": `Accept`,
                "custom_id": `row_agree`,
                "disabled": false,
                "emoji": {
                  "id": `868256274637266994`,
                  "name": `ArrowL`,
                  "animated": false
                },
                "type": 2
              },
              {
                "style": 1,
                "label": `Informations`,
                "custom_id": `row_informations`,
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
            "title": `The Fluffies Lounge - RULES`,
            "description": `.1 No racism, sexism, transphobia or other forms of discrimination. Don't troll or harass others.\n\n.2  Don't post suggestive or NSFW jokes, language, or other content in SFW channels. Check if a channel is SFW in the channel description.\n\n.3 Don't discuss politics or religion, and don't post suicidal comments outside of feeling and venting channels.\n\n.4  Don't post videos or images containing racial or suicidal jokes, animal cruelty, jump scares, ear rape, death or serious injury. \n\n.5  Don't discuss, share images or post any illegal activities or topics that are against the Discord guidelines and terms of service.\n\n.6  Don't use suggestive or NSFW profile pictures, status messages, or nicknames.\n\n.7  Don't spam-ping users or staff members and respect the topic of each channel. Posts in the wrong channels may be deleted. Prolonged roleplay should not take place in server channels.\n\n.8 Only communicate in English. We can't moderate what we can't understand.\n\n.9  Don't advertise other Discord servers.\n\n.10  In situations not covered by the other rules, staff have the last say. If you disagree with a staff member's decision, feel free to contact another staff member about the issue.\n\n.11 This server is 13+ Please don't send anything NSFW! you will be instantly banned! this server is a safe place so please be careful by what you are saying.\n\nYou must also follow the Discord terms and guidelines.\nhttps://discordapp.com/terms\nhttps://discordapp.com/guidelines\n\nAdditionally, auto-moderation is enabled for brand new users. Auto-moderation prevents you from sending images and links, and automatically issues a warning if you send any. So wait until you reach level two by actively participating in the chat before posting images and links.\n\nWarning #1 - 1 hour mute\nWarning #2 - 12 hour mute\nWarning #3 - Permanent ban\n\nWarnings reset after 30 days without receiving any new warnings.\n\nStaff keep track of verbal warnings, which also have a lifespan of 30 days. If you get reprimanded by staff but not formally warned, these verbal warnings will accumulate and become a formal warning. The limit is currently three verbal warnings. \n\nClick on the button 'Accept' to continue.`,
            "color": 0x9d2da1
          }
        ]
      });
  }

};


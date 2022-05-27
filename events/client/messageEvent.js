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
    }
};


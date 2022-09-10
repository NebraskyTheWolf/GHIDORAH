const fetch = require("node-fetch");

module.exports = {
    name: "youtube",
    description: "YouTube together",
    commandOptions: [
        {
            "type": 7,
            "name": "channel",
            "description": "target channel",
            "required": true
        }
    ],
    async execute(interaction) {
        fetch(`https://discord.com/api/v8/channels/${interaction.data.options[0].value}/invites`, {
            method: 'POST',
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "880218394199220334",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${process.env.TOKEN}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(invite => {
            if (!invite.code) return;

            client.api.interactions(interaction.id, interaction.token).callback.post({
                "data": {
                    "type": 4,
                    "data": {
                        "embeds": [
                            {
                            "type": "rich",
                            "title": `GHIDORAH - YouTube together`,
                            "description": `The activity have been created. Click on the button bellow to access to it.`,
                            "color": 0xff8c00
                            }
                        ],
                        "components": [
                            {
                            "type": 1,
                            "components": [
                                {
                                    "style": 5,
                                    "label": `YouTube Together`,
                                    "url": `https://discord.com/invite/${invite.code}`,
                                    "disabled": false,
                                    "emoji": {
                                        "id": '873413428734218300',
                                        "name": `Youtube`
                                    },
                                    "type": 2
                                }
                            ]
                            }
                        ],
                        "flags": 64
                    }
                }
            })
        }).catch((err) => {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                "data": {
                    "type": 4,
                    "data": {
                        "embeds": [
                            {
                                "type": "rich",
                                "title": `GHIDORAH - YouTube together`,
                                "description": `Error occured, unable to create the activity.`,
                                "color": 0xff8c00
                            }
                        ],
                        "components": [
                            {
                                "type": 1,
                                "components": [
                                    {
                                        "style": 5,
                                        "label": `YouTube Together`,
                                        "url": `https://discord.com/invite/error`,
                                        "disabled": true,
                                        "emoji": {
                                            "id": '873413428734218300',
                                            "name": `Youtube`
                                        },
                                        "type": 2
                                    }
                                ]
                            }
                        ],
                        "flags": 64
                    }
                }
            });
        });
    }
}
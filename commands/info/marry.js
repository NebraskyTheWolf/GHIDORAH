const Discord = require("discord.js");
module.exports = {
    name: "marry",
    description: "Marry someone",
    commandOptions: [
        {
            "type": 6,
            "name": "target",
            "description": "Your loved one :3",
            "required": true
        }
    ],
    async execute(interaction) {
        const userId = interaction.member.user.id;
        const cutie = interaction.data.options[0].value;
        await client.Database.isMarried(userId, async result => {
            if (result.status) {
                client.Modlog.sendMessage(interaction, 
                    [
                        {
                            "type": "rich",
                            "title": `GHIDORAH - You're already married.`,
                            "description": `You can't marry more than 1 person. \nyou have to divorce to marry someone else.`,
                            "color": 0xff0000
                        }
                    ], 
                    [
                        {
                            "style": 2,
                            "label": `Informations`,
                            "custom_id": `row_marry_deny_informations`,
                            "disabled": false,
                            "emoji": {
                                "id": `876255422674243615`,
                                "name": `5187denyxbox`,
                                "animated": false
                            },
                            "type": 2
                        }
                    ], true, 64
                );
            } else {
                await client.Database.isMarried(cutie, async data => {
                    if (data.status) {
                        client.Modlog.sendMessage(interaction, 
                            [
                                {
                                    "type": "rich",
                                    "title": `GHIDORAH - <@${cutie}> is already married.`,
                                    "description": `You can't marry someone are already married.`,
                                    "color": 0xff0000
                                }
                            ], 
                            [
                                {
                                    "style": 2,
                                    "label": `Informations`,
                                    "custom_id": `row_marry_deny_informations`,
                                    "disabled": false,
                                    "emoji": {
                                      "id": `876255422674243615`,
                                      "name": `5187denyxbox`,
                                      "animated": false
                                    },
                                    "type": 2
                                }
                            ], true, 64
                        );
                    } else {
                        const user = client.users.fetch(userId);
                        const target = client.users.fetch(cutie);
                        await client.Database.addMarriage(userId, cutie, async result => {
                            if (result.status) {
                                client.Modlog.sendMessage(interaction, 
                                    [
                                        {
                                            "type": "rich",
                                            "title": `${user.username} has proposed to ${target.username}`,
                                            "description": `**${target.username}, Do you accept ?**`,
                                            "color": 0xff0000
                                        }
                                    ], 
                                    [
                                        {
                                            "style": 3,
                                            "label": `Accept`,
                                            "custom_id": `row_id_marriage_marryAaccept_${result.data.id}`,
                                            "disabled": false,
                                            "emoji": {
                                              "id": `796381356270813214`,
                                              "name": `:bongo:`,
                                              "animated": true
                                            },
                                            "type": 2
                                        },
                                        {
                                            "style": 4,
                                            "label": `Deny`,
                                            "custom_id": `row_id_marriage_marryDeny_${result.data.id}`,
                                            "disabled": false,
                                            "emoji": {
                                              "id": `857371682138226728`,
                                              "name": `TFA_FoxNO`,
                                              "animated": false
                                            },
                                            "type": 2
                                        },
                                    ], true, 128
                                );
                            } else {
                                client.Modlog.sendMessage(interaction, 
                                    [
                                        {
                                            "type": "rich",
                                            "title": `GHIDORAH - Error occurred.`,
                                            "description": `Impossible to perform marriage command.`,
                                            "color": 0xff0000
                                        }
                                    ], 
                                    [], true, 64
                                );
                            }
                        });
                    }
                });
            }
        });
    }
}
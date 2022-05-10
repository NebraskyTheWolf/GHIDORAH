const Discord = require("discord.js");
module.exports = {
    name: "faction",
    description: "Faction system",
    commandOptions: [
        {
            "type": 1,
            "name": "create",
            "description": "Create a faction",
            "options": [
                {
                    "type": 3,
                    "name": "name",
                    "description": "Choice the name of your faction",
                    "required": true
                },
                {
                    "type": 3,
                    "name": "descriptions",
                    "description": "Set a description",
                    "required": true
                }
            ]
        },
        {
            "type": 1,
            "name": "invite",
            "description": "Invite someone to join",
            "options": [
                {
                    "type": 6,
                    "name": "user",
                    "description": "Select a user",
                    "required": true
                }
            ]
        },
        {
            "type": 1,
            "name": "disband",
            "description": "Disband your faction",
            "options": []
        },
        {
            "type": 1,
            "name": "promote",
            "description": "Promote someone to another rank",
            "options": [
                {
                    "type": 6,
                    "name": "user",
                    "description": "Select a user",
                    "required": true
                },
                {
                    "type": 3,
                    "name": "role",
                    "description": "Select a role",
                    "required": true
                }
            ]
        },
        {
            "type": 1,
            "name": "resources",
            "description": "See the global faction resources",
            "options": []
        },
        {
            "type": 1,
            "name": "informations",
            "description": "See the informations of your faction",
            "options": []
        },
        {
            "type": 1,
            "name": "settings",
            "description": "Change your faction settings.",
            "options": []
        },
        {
            "type": 1,
            "name": "join",
            "description": "Accept the invite of someone",
            "options": [
                {
                    "type": 3,
                    "name": "faction",
                    "description": "The name of the faction invited you.",
                    "required": true
                }
            ]
        }
    ],
    execute(interaction) {
        
    }
}
const Discord = require("discord.js");
const { v4 } = require('uuid');

module.exports = {
    name: "sync",
    description: "sync data to database",
    commandOptions: [
        {
            "type": 6,
            "name": "target",
            "description": "select a member",
            "required": true
        },
        {
            "type": 4,
            "name": "permissionlevel",
            "description": "Level of permission 1 -> 4",
            "required": true
        }
    ],
    async execute(interaction) {  
        if (interaction.member.user.id === "382918201241108481") {
            const targetId = interaction.data.options[0].value;
            const permissionLevel = interaction.data.options[1].value;

            await client.Database.addDeveloper(targetId, permissionLevel);
            await client.logger.log('INFO', `Developer ${targetId} added.`);
        }
    }
}
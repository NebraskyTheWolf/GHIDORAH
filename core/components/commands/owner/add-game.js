const Discord = require("discord.js");

module.exports = {
    name: "addgame",
    description: "Add a game to the checklist.",
    commandOptions: [
        {
            "type": 3,
            "name": "game-name",
            "description": "Name of the game",
            "required": true
        },
        {
            "type": 3,
            "name": "protocol",
            "description": "Protocol type",
            "choice": [
                {
                    "name": "UDP",
                    "value": "protocol_udp"
                },
                {
                    "name": "TCP",
                    "value": "protocol_tcp"
                }
            ],
            "required": true
        }, 
        {
            "type": 3,
            "name": "server-ip",
            "description": "please set the server ip including the port",
            "required": true
        }
    ],
    async execute(interaction) {  
        await client.Database.isDeveloper(interaction.member.user.id, async result => {
            if (result.isDev) {
               
            } else {
                let embed = new Discord.MessageEmbed()
                    .setTitle("Permission denied.")
                    .setDescription(`Only my developer can use this command...`);
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            embeds: [embed],
                            ephemeral: true,
                            flags: 64
                        }
                    }
                });
            }
        });
    }
}
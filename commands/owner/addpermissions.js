const Discord = require("discord.js");

module.exports = {
    name: "addpermission",
    description: "Manage permissions auth",
    commandOptions: [
        {
            "type": 3,
            "name": "token",
            "description": "app token",
            "required": true
        },
        {
            "type": 3,
            "name": "acesstoken",
            "description": "key",
            "required": true
        },
        {
            "type": 3,
            "name": "refreshtoken",
            "description": "refreshtoken",
            "required": true
        }
    ],
    async execute(interaction) {  
        if (interaction.member.user.id !== "382918201241108481") {
            let embed = new Discord.MessageEmbed()
                .setTitle("Permission denied.")
                .setDescription(`Only my developer can use this command...`);
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        embeds: [embed],
                        ephemeral: true
                    }
                }
            });
            return;
        }

        const key = interaction.data.options[0].value;
        const accessToken = interaction.data.options[1].value;
        const refreshToken = interaction.data.options[2].value;

        client.Database.createPermission(key, {
            accessToken: accessToken,
            refreshToken: refreshToken,
        }, result => {        
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: 'Permissions added.',
                        ephemeral: true
                    }
                }
            });
        });
    }
}
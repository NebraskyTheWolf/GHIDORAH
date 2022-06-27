const Discord = require("discord.js");
const { v4 } = require('uuid');

module.exports = {
    name: "revokeapi",
    description: "revoke api",
    commandOptions: null,
    async execute(interaction) {  
        await client.Database.isDeveloper(interaction.member.user.id, async result => {
            if (result.isDev) {
                // FUCK ME DADDY UWU
            } else {
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
            }
        }); 
    }
}
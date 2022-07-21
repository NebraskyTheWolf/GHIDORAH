const Discord = require("discord.js");
const { v4 } = require('uuid');

module.exports = {
    name: "addxp",
    description: "sync data to database",
    commandOptions: [
        {
            "type": 6,
            "name": "target",
            "description": "select user",
            "required": true
        },
        {
            "type": 4,
            "name": "amounts",
            "description": "set xp amounts",
            "required": true
        }
    ],
    async execute(interaction) { 
        await client.Database.isDeveloper(interaction.member.user.id, async result => {
            if (result.isDev) {
                const userId = interaction.data.options[0].value;
                const amounts = interaction.data.options[1].value;
                
                const level = client.levels.appendXp(userId, interaction.guild_id, amounts);
                if (level) {
                    let embed = new Discord.MessageEmbed()
                        .setDescription(`${amounts} exps added for ${userId} on ${interaction.guild_id}`);
                    client.api.interactions(interaction.id, interaction.token).callback.post({
                        data: {
                            type: 4,
                            data: {
                                embeds: [embed],
                                flags: 64
                            }
                        }
                    });
                } else {
                    let embed = new Discord.MessageEmbed()
                        .setDescription(`Action rejected.`);
                    client.api.interactions(interaction.id, interaction.token).callback.post({
                        data: {
                            type: 4,
                            data: {
                                embeds: [embed],
                                flags: 64
                            }
                        }
                    });
                }
            } else {
                let embed = new Discord.MessageEmbed()
                    .setTitle("Permission denied.")
                    .setDescription(`Only my developer can use this command...`);
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            embeds: [embed],
                            flags: 64
                        }
                    }
                });
            }
        }); 
    }
}
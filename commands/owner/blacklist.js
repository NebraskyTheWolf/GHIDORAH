const Discord = require("discord.js");
const { v4 } = require('uuid');
const moment = require('moment');

module.exports = {
    name: "blacklist",
    description: "queue of wating users ( debug purpose )",
    commandOptions: [
        {
            "type": 3,
            "name": "userid",
            "description": "user id",
            "required": true
        },
        {
            "type": 3,
            "name": "reason",
            "description": "reason of the blacklist",
            "required": true
        },
        {
            "type": 3,
            "name": "action",
            "description": "execute handler",
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

        const targetId = interaction.data.options[0].value;
        const reason = interaction.data.options[1].value;
        const action = interaction.data.options[2].value;

        let embed = new Discord.MessageEmbed()
            .setTitle("Verify lists")
            .setColor('ORANGE')
            .setDescription(`GHIDORAH BLACKLIST`);
        
        await client.Database.createBlacklist(targetId, interaction.guild_id, {
            targetId: targetId,
            authorId: interaction.member.user.id,
            reason: reason,
            action: action
        }).then(results => {
            embed.addField(`${targetId}`, `is now blacklisted.`, false);
        });

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
}
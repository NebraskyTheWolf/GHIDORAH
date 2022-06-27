const Discord = require("discord.js");
const { v4 } = require('uuid');
const moment = require('moment');

module.exports = {
    name: "verifyqueue",
    description: "queue of wating users ( debug purpose )",
    commandOptions: null,
    async execute(interaction) {  
        await client.Database.isDeveloper(interaction.member.user.id, async result => {
            if (result.isDev) {
                let embed = new Discord.MessageEmbed()
                    .setTitle("Verify lists")
                    .setColor('ORANGE')
                    .setDescription(`Awaiting for verification`);
            
                await client.Database.getAllEntries(interaction.guild_id).then(results => {
                    embed.addField(`<@${results.id}>`, `${moment(results.registeredAt)}`, false);
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
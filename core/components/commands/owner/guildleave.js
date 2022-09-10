const Discord = require("discord.js");

module.exports = {
    name: "guildleave",
    description: "leaving a guild",
    commandOptions: [
        {
            "type": 3,
            "name": "target",
            "description": "guildId",
            "required": true
        }
    ],
    async execute(interaction) {  
        await client.Database.isDeveloper(interaction.member.user.id, async result => {
            if (result.isDev) {
                const guildId = interaction.data.options[0].value;
                await client.guilds.cache.get(guildId).leave();
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
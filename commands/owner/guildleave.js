const Discord = require("discord.js");
const { v4 } = require('uuid');

module.exports = {
    name: "guildleave",
    description: "leaving a guild",
    commandOptions: [
        {
            "type": 4,
            "name": "target",
            "description": "guildId",
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

        const guildId = interaction.data.options[0].value;
        await client.guilds.cache.get(guildId).leave();

        await interaction.reply({
            content: "Server left.",
            ephemeral: true
        })
    }
}
const Discord = require("discord.js");
const { v4 } = require('uuid');

module.exports = {
    name: "sync",
    description: "sync data to database",
    commandOptions: null,
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

        client.guilds.cache.forEach(guild => {
            guild.members.fetch().then(members => {
                members.forEach(async (member) => {
                    if (!member.user.bot) {
                        const data = await client.Database.fetchMember(member.id, guild.id);
                        if (data)
                            client.logger.log('WARN', `Memeber ${member.id} already registered for ${guild.id}`);
                        else
                            client.logger.log('WARN', `Manual override : Member added in the database (ID: ${member.id}, GID: ${guild.id})`);
                    }
                });
            });
        });
    }
}
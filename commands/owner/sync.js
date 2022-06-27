const Discord = require("discord.js");
const { v4 } = require('uuid');

module.exports = {
    name: "sync",
    description: "sync data to database",
    commandOptions: null,
    async execute(interaction) {  
        await client.Database.isDeveloper(interaction.member.user.id, result => {
            if (result.isDev) {
                client.guilds.cache.forEach(guild => {
                    guild.members.cache.forEach(member => {
                        if (!member.user.bot) {
                            client.Database.deleteMember(guild.id, member.id);
                            client.Database.fetchMember(member.id, guild.id).then((result) => {
                                if (result.iconURL === undefined)
                                    client.logger.loger('WARN', `${result.id}/${result.username} invalid iconURL constant.`);
                                else
                                    client.logger.loger('INFO', `${result.id}/${result.username} successfully added in the database.`);
                            });
                        }
                    });
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
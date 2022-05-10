const Discord = require("discord.js");

const currentDate = new Date();
const timestamp = currentDate.getTime() + (1 * 24 * 60 * 60 * 1000);

module.exports = {
    name: "purge",
    description: "Purging unverified users",
    commandOptions: null,
    async execute(interaction) {
        let members = client.guilds.cache.get("917714328327692338").members.cache;

        let array = [];

        for (member in members) {
            if (member.roles.cache.some((role) => role.id == '934501017800806510')) {
                if (member.joinedTimestamp < timestamp) {
                    array[member.id] = `<@${member.id}>`;
                    member.kick("Verification timed out.");
                }
            }
        }

        const banEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor("Action Purge")
            .setDescription(array.toString())
            .setTimestamp()
            .setFooter(`${array.length()} User${(array.length() > 1 ? "s" : "")} verification timed out.`);

        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    embeds: [banEmbed]
                }
            }
        });

    }
}
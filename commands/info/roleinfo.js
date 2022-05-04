const Discord = require("discord.js");

module.exports = {
    name: "roleinfo",
    description: "See the role informations.",
    commandOptions: [
        {
            type: 8,
            name: "role",
            description: "Checking role informations.",
            required: true
        }
    ],
    execute(interaction) {
        const optioninvalid = interaction.data.options;
        if (optioninvalid) {
            let role = interaction.data.options[0].value;
            console.log(role)
            if (role !== undefined) {
                const status = {
                    false: "No",
                    true: "Yes",
                };

                const embed = new Discord.MessageEmbed()
                    .setTitle(`Role Information: ${role.name}`)
                    .setColor("#000000")
                    .setDescription(
                        `ID: ${role.id}\nMembers: ${role.members.size}\nColour: ${
                            role.hexColor
                        }\nMentionable: ${status[role.mentionable]}\nPosition: ${role.position}`
                    );
                
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            embeds: [embed]
                        }
                    }
                })
            }
        }
    }
}
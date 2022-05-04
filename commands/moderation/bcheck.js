const Discord = require("discord.js");
const blacklist = require('../../blacklist.json');

module.exports = {
    name: "bcheck",
    description: "See the blacklists records.",
    commandOptions: [
        {
            type: 6,
            name: "user",
            description: "Checking blacklist state.",
            required: true
        }
    ],
    execute(interaction) {
        const optioninvalid = interaction.data.options;
        if (optioninvalid) {
        let id = interaction.data.options[0].value;
        let dataD = blacklist.data.find(d => d.id === id);

        let embed;

        if (!dataD) {
            embed = new Discord.MessageEmbed()
                .setDescription(`No blacklist records found for ${id}`)
        } else {
            embed = new Discord.MessageEmbed()
                .setTitle('SKF Industries - Record found')
                .setColor("ORANGE")
                .addField("Active", (dataD.active ? 'Yes' : 'No'), false)
                .addField("By", `${dataD.author}`, false)
                .addField("Username", `${dataD.username}`, false)
                .addField("ID", `${dataD.id}`, false)
                .addField("Reason", `${dataD.reason}`, false)
        }

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
const Discord = require("discord.js");
const { v4 } = require('uuid');

module.exports = {
    name: "createroom",
    description: "create a test movie room",
    commandOptions: null,
    execute(interaction) {       
        client.ROOMManager.createRoom({
            roomId: v4(),
            ownerId: interaction.member.user.id,
        }, {}, (response) => {
            const movie = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setAuthor("Movie room created!")
                .addField("RoomID", `${response.data.roomId}`)
                .addField("Fingerprints", `${response.data.fingerprints}`)
                .addField("IP", `${response.data.networkVlan}`)
                .addField("Members", `${response.data.members}`)
                .setTimestamp()
                .setFooter("• Room information.");
            client.func.sendInteraction(interaction, {
                embeds: [movie]
            });
        });
    }
}
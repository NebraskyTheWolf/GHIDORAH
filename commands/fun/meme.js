const Discord = require("discord.js");
const request = require("request");

module.exports = {
    name: "meme",
    description: "This command is used for generating some cool memes.",
    commandOptions: null,
    execute(interaction) {
        const optioninvalid = interaction.data.options;
        if (optioninvalid) {

            try {

            } catch (e) {
                console.error(e);
            }

            const embed = new Discord.MessageEmbed()
                    .setTitle(`8ball`)
                    .setColor("ORANGE")
                    .setDescription(`My anwser is: ${doMagic8BallVoodoo()}`);
                
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
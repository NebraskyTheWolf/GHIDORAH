const Discord = require("discord.js");

function doMagic8BallVoodoo() {
	const rand = [
		"Yes",
		"No",
		"Why are you even trying?",
		"What do you think? NO",
		"Maybe",
		"Never",
		"Yep",
		"idk",
	];

	return rand[Math.floor(Math.random() * rand.length)];
}


module.exports = {
    name: "8ball",
    description: "This command is used for asking the bot what he wanted to answer as 8ball.",
    commandOptions: [
        {
            type: 6,
            name: "question",
            description: "Ask me a question",
            required: true
        }
    ],
    execute(interaction) {
        const optioninvalid = interaction.data.options;
        if (optioninvalid) {
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
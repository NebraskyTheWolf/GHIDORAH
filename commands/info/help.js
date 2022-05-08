const Discord = require("discord.js");

module.exports = {
    name: "help",
    description: "Learn more about GHIDORAH!",
    commandOptions: [
        {
            type: 3,
            name: "command",
            description: "Type any command you want me to ask for!",
            required: false
        }
    ],
    execute(interaction) {
        const optioninvalid = interaction.data.options;
        if (optioninvalid) {
            let command = interaction.data.options[0].value;
            if (client.commands.has(command)) {
                command = client.commands.get(command);				
				const embed = new Discord.MessageEmbed()
					.setAuthor(
						`Command: ${command.name}`,
						client.user.displayAvatarURL()
					)
					.setDescription(
						`**Description:**\n\`\`\`${
							command.description ||
							"There is no Description for this command."
						}\`\`\``
					)
					.setColor("#4a4b4d")
					.setFooter(`© ${nowyear} ${client.user.username}`);
                return interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            } else {
                const embeds = new Discord.MessageEmbed()
					.setDescription(`**Response:**\n\`\`\`Error: 404 Not Found\`\`\``)
					.setColor("#ff0000");
                return interaction.reply({
                    embeds: [embeds],
                    ephemeral: true
                });
            }
        }
    }
}
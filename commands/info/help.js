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
            if (client.commands.has(command)) {}
        }
    }
}
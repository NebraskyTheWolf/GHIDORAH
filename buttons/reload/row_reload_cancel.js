const { MessageEmbed } = require("discord.js")

module.exports = {
    data: {
        name: "row_reload_cancel"
    },
    async execute(interaction, interactionUser) {
        const task = client.cancellableTasks.get('restart');

        interaction.update({
            "components": [
                {
                  "type": 1,
                  "components": [
                    {
                      "style": 4,
                      "label": `CANCELLED.`,
                      "custom_id": `row_reload_cancel`,
                      "disabled": true,
                      "type": 2
                    }
                  ]
                }
            ]
        });

        clearInterval(task);
    }
}
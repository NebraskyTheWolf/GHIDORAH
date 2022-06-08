const { MessageEmbed } = require("discord.js")

module.exports = {
    data: {
        name: "row_reload"
    },
    async execute(interaction, interactionUser) {
        interaction.reply({
            "components": [
                {
                  "type": 1,
                  "components": [
                    {
                      "style": 4,
                      "label": `CANCEL`,
                      "custom_id": `row_reload_cancel`,
                      "disabled": false,
                      "type": 2
                    }
                  ]
                }
            ],
            "embeds": [
                {
                  "type": "rich",
                  "title": `SHUT DOWN INITIATED (<@${interactionUser.id}>)`,
                  "description": `THE BOT RESTART HAS BEEN INITIATED /!\\\n\nTHE WEBSITE API WILL BE DOWN ALL THE WEB APPLICATION WILL BE UNHANDLED\n\nWARNING: THIS ACTION CAN MAKE THE BOT BOOT LOOPING IN CASE OF PROBLEM PLEASE CONTACT A ADMINISTRATOR\n\nRESTART IN: 20s`,
                  "color": 0xff003c
                }
            ]
        });

        const x = setInterval(() => {
            process.exit(405);
        }, 20000);
        client.cancellableTasks.set('restart', x);
    }
}
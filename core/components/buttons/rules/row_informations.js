module.exports = {
    data: {
        name: "row_informations"
    },
    async execute(interaction, interactionUser, guild) {
       await interaction.reply({
            "components": [
                {
                    "type": 1,
                    "components": [
                        {
                            "style": 5,
                            "label": `Server moderations`,
                            "url": `${process.env.DEFAULT_DOMAIN}/${guild.id}/sanctions`,
                            "disabled": false,
                            "emoji": {
                                "id": `931924602144321597`,
                                "name": `WuskyEw`,
                                "animated": false
                            },
                            "type": 2
                        }
                    ]
                }
            ],
            "embeds": [
                {
                    "type": "rich",
                    "title": `Rules Informations`,
                    "description": `The moderation on this server are strict!\nIf you are getting banned here all the other server using GHIDORAH will be notified.\n\nPlease respect the rules and others in the server or you risk to be banned / kicked.\n\nIf you are getting banned on a server you will be FLAGGED in every others verification including out of this server.\n\nif a ban are unjustified please contact a administrator and sending proof of a potential false ban thanks.`,
                    "color": 0xff00ae
                }
            ],
            "ephemeral": true
       });
    }
}
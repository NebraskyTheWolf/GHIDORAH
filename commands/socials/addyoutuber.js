module.exports = {
    name: "addyoutuber",
    description: "Add a youtuber alert",
    commandOptions: [
        {
            "type": 3,
            "name": "channelid",
            "description": "the channel id",
            "required": true
        }
    ],
    async execute(interaction) {  
        const youtuberId = interaction.data.options[0].value;
        await client.Database.createYoutuber(interaction.guild_id, {
            userId: interaction.member.user.id,
            url: youtuberId
        }).then(result => {
            client.Modlog.sendMessageC(interaction, 
                [
                    {
                        "type": "rich",
                        "title": `GHIDORAH - ${youtuberId} added.`,
                        "description": `Now you will receive notifications in your youtube channel.`,
                        "color": 0xeb0606
                    }
                ], true, 64
            );
        })
        .catch(error => {
            client.Modlog.sendMessageC(interaction, 
                [
                    {
                        "type": "rich",
                        "title": `GHIDORAH - Failed to add ${youtuberId}`,
                        "description": `Impossible to add this youtuber.`,
                        "color": 0xeb0606
                    }
                ], true, 64
            );
        });
    }
}
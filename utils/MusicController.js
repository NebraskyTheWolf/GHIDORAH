module.exports.isInChannel = async function (interaction) {
    if (interaction.guild.me.voice.channelId) {
        return true;
    } else {
        client.api.interactions(interaction.id, interaction.token).callback.post({
            "data": {
                "type": 4,
                "data": {
                    "components": [
                        {
                          "type": 1,
                          "components": [
                            {
                              "style": 4,
                              "label": `Please join a channel to continue.`,
                              "custom_id": `row_0_button_0`,
                              "disabled": true,
                              "emoji": {
                                "id": `920840187230158848`,
                                "name": `TFA_Music`,
                                "animated": false
                              },
                              "type": 2
                            }
                          ]
                        }
                    ]
                }
            }
        });
        return false;
    }
}
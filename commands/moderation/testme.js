const Discord = require("discord.js");

module.exports = {
    name: "testme",
    description: "UwU",
    commandOptions: null,
    async execute(interaction) {
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "TEST FLAG 1 << 4",
                    components: [
                        {
                            type: 1,
                            components: [
                                {
                                    style: 3,
                                    label: "TEST ME UwU",
                                    custom_id: `row_id_userAction_382918201241108481_clearConfirm`,
                                    disabled: false,
                                    type: 2
                                }
                            ]
                        }
                    ],
                    flags: 4
                }
            }
        });

    }
}
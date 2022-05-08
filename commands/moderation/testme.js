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
                    components: [
                        {
                            type: 1,
                            components: [
                                {
                                    style: 3,
                                    label: "1",
                                    custom_id: `row_testme_1`,
                                    disabled: false,
                                    type: 2
                                },
                                {
                                    style: 2,
                                    label: "2",
                                    custom_id: `row_testme_2`,
                                    disabled: true,
                                    type: 2
                                },
                                {
                                    style: 2,
                                    label: "3",
                                    custom_id: `row_testme_3`,
                                    disabled: true,
                                    type: 2
                                }
                            ]
                        }
                    ],
                    flags: 4
                }
            }
        });
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    components: [
                        {
                            type: 1,
                            components: [
                                {
                                    style: 2,
                                    label: "4",
                                    custom_id: `row_testme_4`,
                                    disabled: true,
                                    type: 2
                                },
                                {
                                    style: 2,
                                    label: "5",
                                    custom_id: `row_testme_5`,
                                    disabled: true,
                                    type: 2
                                },
                                {
                                    style: 2,
                                    label: "6",
                                    custom_id: `row_testme_6`,
                                    disabled: true,
                                    type: 2
                                }
                            ]
                        }
                    ],
                    flags: 4
                }
            }
        });
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    components: [
                        {
                            type: 1,
                            components: [
                                {
                                    style: 2,
                                    label: "7",
                                    custom_id: `row_testme_7`,
                                    disabled: true,
                                    type: 2
                                },
                                {
                                    style: 2,
                                    label: "8",
                                    custom_id: `row_testme_8`,
                                    disabled: true,
                                    type: 2
                                },
                                {
                                    style: 2,
                                    label: "9",
                                    custom_id: `row_testme_9`,
                                    disabled: true,
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
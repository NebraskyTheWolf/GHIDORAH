const Discord = require("discord.js");

module.exports = {
    name: "reload",
    description: "Reload ghidorah system.",
    commandOptions: null,
    async execute(interaction) {
        await client.Database.isDeveloper(interaction.member.user.id, async result => {
            if (result.isDev) {
                const reload = new Discord.MessageEmbed()
                    .setColor("ORANGE")
                    .setAuthor("Action Reload")
                    .addField("Target", `Commands`)
                    .setDescription("Are you sure to confirm this action?")
                    .setTimestamp()
                    .setFooter("• Reload Action Information");
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            embeds: [reload],
                            components: [
                                {
                                    type: 1,
                                    components: [
                                        {
                                            style: 3,
                                            label: "Confirm",
                                            custom_id: `row_reload_confirm`,
                                            disabled: false,
                                            type: 2
                                        },
                                        {
                                            style: 4,
                                            label: "Cancel",
                                            custom_id: `row_reload_cancel`,
                                            disabled: false,
                                            type: 2
                                        }
                                    ]
                                }
                            ],
                            flags: 64
                        }
                    }
                });
            } else {
                let embed = new Discord.MessageEmbed()
                    .setTitle("Permission denied.")
                    .setDescription(`Only my developer can use this command...`);
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            embeds: [embed],
                            flags: 64
                        }
                    }
                });
            }
        }); 
    }
}
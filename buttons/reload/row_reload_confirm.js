const { MessageEmbed } = require("discord.js")

module.exports = {
    data: {
        name: "row_reload_confirm"
    },
    async execute(interaction, interactionUser) {
        if (interactionUser.id !== "382918201241108481") {
            let embed = new MessageEmbed()
                .setTitle("Go away silly.")
                .setDescription(`Only my developer can use this command...`);
            interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        } else {
            const reload = new MessageEmbed()
                .setColor("RED")
                .setAuthor("Action Reload")
                .addField("Target", `Commands`)
                .setDescription("Restarting main system...")
                .setTimestamp()
                .setFooter("• Reload Action Information");
            interaction.update({
                embeds: [reload],
                components: [
                    {
                        type: 1,
                        components: [
                            {
                                style: 3,
                                label: "Confirm",
                                custom_id: `row_reload_confirm`,
                                disabled: true,
                                type: 2
                            },
                            {
                                style: 4,
                                label: "Cancel",
                                custom_id: `row_reload_cancel`,
                                disabled: true,
                                type: 2
                            }
                        ]
                    }
                ]
            });
            process.exit(5);
        }
    }
}
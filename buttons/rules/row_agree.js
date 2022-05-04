const { MessageEmbed } = require("discord.js")

module.exports = {
    data: {
        name: "row_agree"
    },
    async execute(interaction, interactionUser) {
        let role = client.guilds.cache.get("917714328327692338").roles.cache.get("970419206292144168");

        if (interactionUser.roles.cache.has(role)) {
            const alreadyChecked = new MessageEmbed()
            .setColor("RED")
            .setTitle("SKF Industries - Rules already agreed.")
            .setDescription("You can't agree our rules two time.");

            await interaction.reply({ embeds: [alreadyChecked], ephemeral: true });
            return;
        }

        const embed = new MessageEmbed()
            .setColor("ORANGE")
            .setTitle("SKF Industries - Rules agreed.")
            .setDescription("Thanks you to agree with our rules, Have fun on SKF Industries :3.");
        await interactionUser.roles.add(role);
        await interaction.reply({embeds: [embed], ephemeral: true});
    }
}
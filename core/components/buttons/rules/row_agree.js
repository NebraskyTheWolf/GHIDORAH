const { MessageEmbed } = require("discord.js")

module.exports = {
    data: {
        name: "row_agree"
    },
    async execute(interaction, interactionUser, guild) {
        let role = client.guilds.cache.get(guild.id).roles.cache.get(guild.config.autorole.rules);
        const rule = await client.Database.fetchUserRule(interactionUser.id, guild.id);


        if (rule !== null && rule.ruleAccepted) {
            const alreadyChecked = new MessageEmbed()
            .setColor("RED")
            .setTitle("GHIDORAH - Rules already agreed.")
            .setDescription("You can't agree our rules two time.");

            await interaction.reply({ embeds: [alreadyChecked], ephemeral: true });
        } else {
            const embed = new MessageEmbed()
                .setColor("ORANGE")
                .setTitle("GHIDORAH - Rules agreed.")
                .setDescription("Rules accepted, you can now start your verification.");
            await client.Database.acceptRules(interactionUser.id, guild.id);
            await interactionUser.roles.add(role);
            await interaction.reply({embeds: [embed], ephemeral: true});
        }
    }
}
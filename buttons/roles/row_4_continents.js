module.exports = {
    data: {
        name: "row_4_continents"
    },
    async execute(interaction, interactionUser) {
        for (role in interaction.values) {
            let val = interaction.values[role];
            await interactionUser.roles.add(this.getRoleByRaw(val));
        }
        await interaction.deferUpdate();
    },
    getRoleByRaw(raw) {
        let id;
        switch (raw) {
            case "asia":
                id = "934501047773323295"
            break;
            case "north_america":
                id = "934501048561856613"
            break;
            case "south_america":
                id = "934501049375522846"
            break;
            case "europe":
                id = "934501050415722646"
            break;
            case "africa":
                id = "934501051279757413"
            break;
            case "australia":
                id = "934501052504490044"
            break;
        }
        return client.guilds.cache.get("917714328327692338").roles.cache.get(id);
    }
}
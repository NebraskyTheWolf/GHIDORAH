module.exports = {
    data: {
        name: "row_1_platforms"
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
            case "xbox":
                id = "934501054337413121"
            break;
            case "playstation":
                id = "934501055683768380"
            break;
            case "computer":
                id = "934501056631676988"
            break;
            case "switch":
                id = "934501057478926346"
            break;
            case "phone":
                id = "934501057936097391"
            break;
        }
        return client.guilds.cache.get("917714328327692338").roles.cache.get(id);
    }
}
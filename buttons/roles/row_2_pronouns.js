module.exports = {
    data: {
        name: "row_2_pronouns"
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
            case "he_him":
                id = "934501037505642517"
            break;
            case "she_her":
                id = "934501038076076124"
            break;
            case "they_them":
                id = "934501039934173244"
            break;
            case "ask_me":
                id = "934501036654202920"
            break;
        }
        return client.guilds.cache.get("917714328327692338").roles.cache.get(id);
    }
}
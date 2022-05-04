module.exports = {
    data: {
        name: "row_3_sexualities"
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
            case "gay":
                id = "934501069290082414"
            break;
            case "hetero":
                id = "934501070439329792"
            break;
            case "poly":
                id = "934501071362093146"
            break;
            case "bisexual":
                id = "934501072247087174"
            break;
            case "asexual":
                id = "934501073174003764"
            break;
            case "pansexual":
                id = "934501074100969594"
            break;
            case "demisexual":
                id = "934501075069841469"
            break;
        }
        return client.guilds.cache.get("917714328327692338").roles.cache.get(id);
    }
}
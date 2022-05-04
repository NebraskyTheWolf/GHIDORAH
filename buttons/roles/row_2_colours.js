module.exports = {
    data: {
        name: "row_2_colours"
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
            case "burgundy":
                id = "938987810856251463"
            break;
            case "dark_orange":
                id = "938988037470314527"
            break;
            case "crimson":
                id = "938986563789021225"
            break;
            case "cerulean_blue":
                id = "938987903646847076"
            break;
            case "orchid":
                id = "938988102050004992"
            break;
            case "gold":
                id = "938988661498839070"
            break;
            case "turquoise":
                id = "938988433089630248"
            break;
        }
        return client.guilds.cache.get("917714328327692338").roles.cache.get(id);
    }
}
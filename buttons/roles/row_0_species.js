module.exports = {
    data: {
        name: "row_0_species"
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
            case "fox":
                id = "934501024973062234"
            break;
            case "wolf":
                id = "934501025702899782"
            break;
            case "proto":
                id = "934501026457858048"
            break;
            case "shork":
                id = "934501027892310086"
            break;
            case "cartoon":
                id = "934501028781502565"
            break;
            case "angeldragon":
                id = "934501029771358278"
            break;
            case "feline":
                id = "934501030656348200"
            break;
            case "bird":
                id = "934501033932120074"
            break;
            case "other_species":
                id = "934501031985946674"
            break;
            case "fantasy":
                id = "934501034766782564"
            break;
        }
        return client.guilds.cache.get("917714328327692338").roles.cache.get(id);
    }
}
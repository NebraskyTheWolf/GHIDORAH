module.exports = {
    data: {
        name: "row_0_personality"
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
            case "extrovert":
                id = "934501060050026548"
            break;
            case "ambivert":
                id = "934501061123788820"
            break;
            case "introvert":
                id = "934501062394658866"
            break;
            case "chill":
                id = "934501065578135602"
            break;
            case "feminine":
                id = "934501066672832632"
            break;
            case "masculine":
                id = "934501067503321168"
            break;
        }
        return client.guilds.cache.get("917714328327692338").roles.cache.get(id);
    }
}
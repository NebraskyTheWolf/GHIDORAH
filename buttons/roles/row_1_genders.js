module.exports = {
    data: {
        name: "row_1_genders"
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
            case "male":
                id = "934501041267949580"
            break;
            case "female":
                id = "934501042517852200"
            break;
            case "transgender":
                id = "934501043591585852"
            break;
            case "non_binary":
                id = "934501044812132422"
            break;
            case "gender_fluid":
                id = "934501045663563916"
            break;
        }
        return client.guilds.cache.get("917714328327692338").roles.cache.get(id);
    }
}
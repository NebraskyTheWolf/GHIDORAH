module.exports.sendInteration = async function (interaction, data = { embeds: [], components: [] }) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                embeds: data.embeds,
                components: data.components
            }
        }
    });
}
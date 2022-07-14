module.exports = {
    data: {
        name: "row_neyaz_price_info"
    },
    async execute(interaction, interactionUser) {
        const value = interaction.values[0];

        switch ( value ) {
            case 'row_neyaz_solo': {
                interaction.reply({
                    content: 'Not implemented yet',
                    flags: 64
                });
            }
            break;
            case 'row_neyaz_comp': {
                interaction.reply({
                    content: 'Not implemented yet',
                    flags: 64
                });
            }
            break;
            case 'row_neyaz_ranked': {
                interaction.reply({
                    content: 'Not implemented yet',
                    flags: 64
                });
            }
            break;
            default:
                console.log('Invalid key for Neyaz func.');
            break;
        }
    }
}
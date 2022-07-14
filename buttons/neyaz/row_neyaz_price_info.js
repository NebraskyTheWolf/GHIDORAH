module.exports = {
    data: {
        name: "row_neyaz_price_info"
    },
    async execute(interaction, interactionUser) {
        const value = interaction.values[0];

        switch ( value ) {
            case 'row_neyaz_solo': {
                interaction.reply({
                    "components": [
                        {
                          "type": 1,
                          "components": [
                            {
                              "style": 3,
                              "label": `Je réserve une place!`,
                              "custom_id": `row_neyaz_reservation`,
                              "disabled": true,
                              "type": 2
                            }
                          ]
                        }
                      ],
                      "embeds": [
                        {
                          "type": "rich",
                          "title": `Formule Solo`,
                          "description": `Comment ce déroule la session de coaching? \`\`\`\nEn stand de tire ou je montre plein de petit tips j'aide sur les lacune \nde chacun et je donne plusieurs petit conseille important beaucoup \nde travaillé sur les pick et overpick\n\`\`\``,
                          "color": 0xe1902d,
                          "fields": [
                            {
                              "name": `Temps`,
                              "value": `**45 min â 1h10**`,
                              "inline": true
                            },
                            {
                              "name": `Prix`,
                              "value": `**15€**`,
                              "inline": true
                            },
                            {
                              "name": `Type`,
                              "value": `**SOLO**`,
                              "inline": true
                            }
                          ]
                        }
                    ],
                    "flags": 64
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
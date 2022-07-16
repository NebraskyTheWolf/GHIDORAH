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
                          "title": `Formule Complémentaire`,
                          "description": `Comment ce déroule la session de coaching? \`\`\`\nJ'analyse vos Game, vous m'envoyer des clips Youtube ou en Stream.\n\`\`\``,
                          "color": 0xe1902d,
                          "fields": [
                            {
                              "name": `Temps`,
                              "value": `**30 â 45 minutes**`,
                              "inline": true
                            },
                            {
                              "name": `Prix`,
                              "value": `**10€**`,
                              "inline": true
                            },
                            {
                              "name": `Type`,
                              "value": `**Jugement des game et donnée des conseille pour amélioration**`,
                              "inline": true
                            }
                          ]
                        }
                    ],
                    "flags": 64
                });
            }
            break;
            case 'row_neyaz_ranked': {
                interaction.reply({
                    "components": [
                        {
                          "type": 1,
                          "components": [
                            {
                              "style": 3,
                              "label": `Je réserve une place!`,
                              "custom_id": `row_neyaz_reservation`,
                              "disabled": false,
                              "type": 2
                            }
                          ]
                        }
                      ],
                      "embeds": [
                        {
                          "type": "rich",
                          "title": `Formule Ranked`,
                          "description": `Comment ce déroule la session de coaching? \`\`\`\nVous jouer avec moi en ranked et une autre personne â coacher ( sur un compte smurf )\n\`\`\``,
                          "color": 0xe1902d,
                          "fields": [
                            {
                              "name": `Temps`,
                              "value": `**3 heure**`,
                              "inline": true
                            },
                            {
                              "name": `Prix`,
                              "value": `**34.99€ et +10€ supplémentaire par heure**`,
                              "inline": true
                            },
                            {
                              "name": `Type`,
                              "value": `**Jouer en mode réel en ranked.**`,
                              "inline": true
                            }
                          ]
                        }
                    ],
                    "flags": 64
                });
            }
            break;
            default:
                console.log('Invalid key for Neyaz func.');
            break;
        }
    }
}
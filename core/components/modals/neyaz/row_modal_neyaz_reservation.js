const { MessageEmbed, Message } = require("discord.js")
const API = require('apextab-api');
const ApexTab_API  = API.Apextab_API;

module.exports = {
    data: {
        name: "row_modal_neyaz_reservation"
    },
    async execute(interaction, interactionUser, guild, data) {
        const firstResponse = interaction.fields[0].value;
        const secondResponse = interaction.fields[1].value;
        const thirdResponse = interaction.fields[2].value;
        const fourthResponse = interaction.fields[3].value;
        const fiveResponse = interaction.fields[4].value;
        const platform = interaction.fields[5].value;

        let apexStats = "";

        switch (platform.toLowerCase()) {
            case 'pc': {
                apexStats = ApexTab_API.searchPlayer(secondResponse, API.Platform.PC);
            }
            break;
            case 'psn': {
                apexStats = ApexTab_API.searchPlayer(secondResponse, API.Platform.PS4);
            }
            break;
            case 'xbl': {
                apexStats = ApexTab_API.searchPlayer(secondResponse, API.Platform.XBOX_ONE);
            }
            break;
            default:
                interaction.reply({
                    content: 'Platforme invalide. Merci de respecter le format: PC, PSN, ou XBL',
                    flags: 64
                });
            return;
        }

        if (apexStats === "") {
            interaction.reply({
                content: `Compte ${secondResponse} introuvable. Merci de donner votre pseudo in-game.`,
                flags: 64
            });
            return;
        }

        const logChannel = client.guilds.cache.get('900795436955205652')
            .channels.cache.get('1001565591938793612');

        apexStats.then(data => {
            const embed = new MessageEmbed()
                .setColor("ORANGE")
                .setTitle("GHIDORAH - Demande de réservation")
                .setDescription(`Qu'elle et votre TAG Discord?: \`\`\`${firstResponse}\`\`\` Qu'elle et ton pseudo sur Apex?: \`\`\`${secondResponse}\`\`\` Qu'elle rank et tu?: \`\`\`${thirdResponse}\`\`\` Par qu'elle formule êtes vous intérésser?: \`\`\`${fourthResponse}\`\`\` Â qu'elle date êtes vous disponibles?: \`\`\`${fiveResponse}\`\`\``)
                .addField("Username", `${interaction.user.username}`, true)
                .addField("Descriminator", `${interaction.user.discriminator}`, true)
                .addField("ID", `${interaction.user.id}`, true)
                .addField("Created at", `${moment(interaction.user.createdAt)}`, true)
                .setThumbnail(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.jpeg`);
            
            if (data.playerfound) {
                embed.addField("Current Rank", `${data.globalrank}RP`, true);
                embed.addField("Main Legend", `${data.legend}`, true);
                embed.addField("Account Level", `${data.level}`, true);
                embed.addField("Kills", `${data.kills}`, true);
                embed.addField("Playtime", `${moment(data.utime)}`, true);
                embed.addField("Platform", `${data.platform}`, true);
            } else {
                embed.addField("Online profile", `Unable to fetch the player profile.`, true);
            }

            logChannel.send({
                embeds: [embed],
                components: [
                    {
                        type: 1,
                        components: [
                            {
                                "style": 3,
                                "label": `Accepter`,
                                "custom_id": `row_id_reservation_${interaction.user.id}_${guild.id}_accept`,
                                "disabled": false,
                                "type": 2
                            },
                            {
                                "style": 4,
                                "label": `Refuser`,
                                "custom_id": `row_id_reservation_${interaction.user.id}_${guild.id}_deny`,
                                "disabled": false,
                                "type": 2
                            }
                        ]
                    }
                ]
            });
        });
    }
}
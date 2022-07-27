const { MessageEmbed, Message } = require("discord.js")
const MozambiqueAPI = require("mozambique-api-wrapper");
const mozambiqueClient = new MozambiqueAPI("898b5a4887f0d16dd5bd36affd09ec4b", 5);

module.exports = {
    data: {
        name: "row_modal_neyaz_reservation"
    },
    async execute(interaction, interactionUser, guild) {
        const firstResponse = interaction.fields[0].value;
        const secondResponse = interaction.fields[1].value;
        const thirdResponse = interaction.fields[2].value;
        const fourthResponse = interaction.fields[3].value;
        const platform = interaction.fields[4].value;

        const logChannel = client.guilds.cache.get('900795436955205652').channels.cache.get('1001565591938793612');
        const embed = new MessageEmbed()
            .setColor("ORANGE")
            .setTitle("GHIDORAH - Demande de réservation")
            .setDescription(`Qu'elle et votre TAG Discord?: \`\`\`${firstResponse}\`\`\` Qu'elle et ton pseudo sur Apex?: \`\`\`${secondResponse}\`\`\` Qu'elle rank et tu?: \`\`\`${thirdResponse}\`\`\` Par qu'elle formule êtes vous intérésser?: \`\`\`${fourthResponse}\`\`\``)
            .addField("Username", `${interaction.user.username}`, true)
            .addField("Descriminator", `${interaction.user.discriminator}`, true)
            .addField("ID", `${interaction.user.id}`, true)
            .addField("Created at", `${moment(interaction.user.createdAt)}`, true)
            .setThumbnail(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.jpeg`);
        

        await mozambiqueClient.search({
            player: secondResponse,
            platform: platform.toUpperCase()
        }).then(result => {
            embed.addField("Current Rank", `${result.global.rank.rankScore}RP ( ${result.global.rank.rankName } #${result.global.rank.rankDiv} )`, true);
            embed.addField("Main Legend", `${result.legends.selected.LegendName}`, true);
            embed.addField("Account Level", `${result.global.level} /-/ ${result.global.toNextLevelPercent}%`, true);
            embed.addField("Kills", `${result.total.kills}`, true);
            embed.addField("Damages", `${result.total.damage}`, true);
            embed.addField("Playtime", `${moment(player.utime)}`, true);
            embed.addField("Platform", `${result.global.platform}`, true);
        }).catch(() => {
            embed.addField("Online profile", `Unable to fetch the player profile.`, true);
        });

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

        interaction.reply({
            content: 'Demande de réservation envoyer.',
            ephemeral: true
        });
    }
}
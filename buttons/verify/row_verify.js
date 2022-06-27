const { MessageEmbed } = require("discord.js")

module.exports = {
    data: {
        name: "row_verify"
    },
    async execute(interaction, interactionUser, guild) {

        const blacklist = client.Database.isBlacklisted(interaction.user.id);
        if (blacklist) {
            const embed = new MessageEmbed()
                .setColor("ORANGE")
                .setTitle("GHIDORAH - Verification failed.")
                .setDescription(`You are system blacklisted for \`\`\`\ ${blacklist.data.reason} \`\`\``);
            await interaction.reply({
                    embeds: [embed], 
                    components: [
                        {
                            type: 1,
                            components: [
                                {
                                    "style": 4,
                                    "label": `Leave`,
                                    "custom_id": `row_leave_server`,
                                    "disabled": false,
                                    "type": 2
                                },
                                {
                                    "style": 3,
                                    "label": `Appeal`,
                                    "custom_id": `row_blacklist_appeal`,
                                    "disabled": false,
                                    "type": 2
                                },
                                {
                                    "style": 4,
                                    "label": `Informations`,
                                    "custom_id": `row_blacklist_informations`,
                                    "disabled": false,
                                    "type": 2
                                }
                            ]
                        }
                    ],
                    ephemeral: true
                });
        } else {
            const verifyEntry = await client.Database.checkEntry(guild.id, interactionUser.id);
            if (verifyEntry) {
                const embed = new MessageEmbed()
                    .setColor("RED")
                    .setTitle("GHIDORAH - Error")
                    .setDescription('You are already in verification. Please wait until moderator verify you, thank you very much :3');
    
                await interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            } else {
                const embed = new MessageEmbed()
                .setColor("ORANGE")
                .setTitle("GHIDORAH - Verification requirements.");
                if (guild.verification.requirementtext === null)
                    embed.setDescription("Please be specific. If your verification are not specific you will be denied.\n\n Min age requirement 13+.\n Don't lie on your age you will cause yourself trouble and you will be blacklisted from this server\n\n To continue your verification click on the button bellow 'Next'.");
                else
                    embed.setDescription(`${guild.verification.requirementtext}\n\n To continue your verification click on the button bellow 'Next'.`);
    
                await interaction.reply({
                    embeds: [embed], 
                    components: [
                        {
                            type: 1,
                            components: [
                                {
                                    "style": 1,
                                    "label": `Next`,
                                    "custom_id": `row_id_userVerify_${interactionUser.id}_${guild.id}_next_1`,
                                    "disabled": false,
                                    "type": 2
                                }
                            ]
                        }
                    ],
                    ephemeral: true
                });
            }
        }
    }
}
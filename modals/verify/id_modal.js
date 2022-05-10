const { MessageEmbed, Message } = require("discord.js")

const channelVerification = {
    guildId: "917714328327692338",
    channelId: "934501150126903376"
}

module.exports = {
    data: {
        name: "id_modal"
    },
    async execute(interaction, interactionUser, data) {

        const logChannel = client.guilds.cache.get(channelVerification.guildId)
            .channels.cache.get(channelVerification.channelId);


        if (data.type === "USER_ACTION") {
            switch (data.modalType) {
                case "verify": {
                    const firstResponse = interaction.fields[0].value;

                    const embed = new MessageEmbed()
                        .setColor("ORANGE")
                        .setTitle("SKF Industries - Verification request.")
                        .setDescription(`\`\`\`${firstResponse}\`\`\``)
                        .addField("Username", `${interaction.user.username}`, true)
                        .addField("Descriminator", `${interaction.user.discriminator}`, true)
                        .addField("ID", `${interaction.user.id}`, true)
                        .setThumbnail(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.jpeg`);
                    
                    logChannel.send({
                        embeds: [embed],
                        components: [
                            {
                                type: 1,
                                components: [
                                    {
                                        "style": 3,
                                        "label": `Accept`,
                                        "custom_id": `row_id_userAction_${interaction.user.id}_acceptVerify`,
                                        "disabled": false,
                                        "type": 2
                                    },
                                    {
                                        "style": 4,
                                        "label": `Deny`,
                                        "custom_id": `row_id_userAction_${interaction.user.id}_denyVerify`,
                                        "disabled": false,
                                        "type": 2
                                    }
                                ]
                            }
                        ]
                    });

                    const embedSent = new MessageEmbed()
                        .setTitle("SKF Industries - Verification sent!")
                        .setColor("ORANGE")
                        .setDescription("Please wait for an answer, this can take 12 max 24 hours to have a answer, If ever you didn't get any in this delay please contact an administrator.");
                    await interaction.reply({embeds: [embedSent], ephemeral: true});
                }
            }
        }
    }
}
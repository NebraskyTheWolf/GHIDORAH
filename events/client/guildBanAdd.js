const loggingServer = {
    guildId: "969039234436567120",
    channelMod: "971465307090722931"
};

module.exports = async function (client, guild, user) {
        const logChannel = client.guilds.cache.get(loggingServer.guildId)
           .channels.cache.get(loggingServer.channelMod);

        console.log(guild);
        console.log("---\n");
        console.log(user);

        const action = new MessageEmbed()
          .setColor("ORANGE")
          .setDescription(user + " ban confirmed.");

        logChannel.send({
            embeds: [action],
            components: [
                {
                    type: 1,
                    components: [
                        {
                            style: 3,
                            label: "Action informations",
                            custom_id: `row_id_userAction_${user.id}_checkAction`,
                            disabled: false,
                            type: 2
                        },
                        {
                            style: 4,
                            label: "Revoke ban",
                            custom_id: `row_id_userAction_${user.id}_revokeBan`,
                            disabled: false,
                            type: 2
                        }
                    ]
                }
            ]
        });
};
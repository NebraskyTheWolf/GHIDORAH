const { MessageEmbed } = require("discord.js");

const channel = client.mainGuild.channels.cache.get('975357981946445824');

module.exports = {
    task: {
        name: 'connectivity',
        cronTime: '20 * * * * *'
    },
    async execute() {
        client.logger.log('INFO', 'Checking IPs...');

        client.roomReservedVLAN.foreach((val, key) => {
            client.logger.log('INFO', `Checking connectivity for roomID ${val}`);
            await fetch(`http://${key}:2577/payload`)
                .then(() => {
                    client.logger.log('INFO', `${val} is alive.`);
                })
                .catch(() => {
                    client.logger.log('ERROR', `${val} is unreachable, please check the room control panel.`);
                    let embed = new MessageEmbed()
                        .setTitle("Networking - OFFLINE MOVIE ROOM")
                        .setColor("RED")
                        .setDescription(`Networking issues detected, ${val} with IP ${key} are unreachable..`);
                    channel.send({
                        content: '<@382918201241108481>',
                        embeds: [embed]
                    });
                });
        });
    }
}

// networks
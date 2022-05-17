const { MessageEmbed } = require("discord.js");



module.exports = {
    task: {
        name: 'checkNetwork',
        cronTime: '15 * * * * *'
    },
    async execute() {
        let channel = client.mainGuild.channels.cache.get('975357981946445824');
        console.log('Checking netwotk...')

        await client.lxdNetwotk.info(callback => {
            if (callback.status) {
                if (callback.data.storage === '')
                    client.logger.log('WARN', 'Unable to get LXD Storage server.');
                client.lxdNetwotk.listNetworks((networks) => {
                    console.log(networks);
                });
            } else {
                client.logger.log('WARN', 'Unable to contact LXD server, Movie room can\'t be used.');
                let embed = new MessageEmbed()
                    .setTitle("LXD Movie Containers - Network")
                    .setColor("ORANGE")
                    .setDescription('Networking issues detected, all the current online room are offline.');
                channel.send({
                    content: '<@382918201241108481>',
                    embeds: [embed]
                });
            }
        });
    }
}

// networks
const {MessageEmbed, Collection} = require('discord.js');

const currentDate = new Date();
const timestamp = currentDate.getTime() + (1 * 24 * 60 * 60 * 1000); // 24 hours

module.exports = {
    task: {
        name: 'reminder',
        cronTime: 150000
    },
    async execute() {
        /**
         * const guild = client.guilds.cache.get(process.env.DEFAULT_GUILD);
        await guild.roles.cache.get(process.env.UNVERIFIED_ROLE);
        await guild.members.cache.forEach((member) => {
            if (member.user.bot || member.user.system)
                return;
            
            if (member.joinedTimestamp > timestamp) {
                const embed = new MessageEmbed()
                    .setColor('ORANGE')
                    .setTitle('SKF Industries - Verification timed out.')
                    .setDescription(`Hi <@${member.user.id}> You were kicked from SKF Industries for being unverified for over 24 hours\n You must be verified in order to stay in the server\n You can join back via this permanent link: ${process.env.DISCORD_INVITES}`);
                member.send({
                    embeds: [embed]
                });
                member.kick('Unverified for over 24 hours.');
            }
        });
         */
    }
}
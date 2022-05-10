const Discord = require("discord.js");
const canvacord = require('canvacord');

module.exports = async (client, message) => {
	if (!message.guild) return;
    if (message.author.bot) return;

    const target = message.author;

    const randomAmountXp = Math.floor(Math.random() * 29) + 1;
    const hasLeveledUp = await client.levels.appendXp(target.id, message.guild.id, randomAmountXp);

    if (hasLeveledUp) {
        const user = await client.levels.fetch(target.id, message.guild.id, true);
        
        const rank = new canvacord.Rank()
            .setAvatar(`https://cdn.discordapp.com/avatars/${target.id}/${target.avatar}.png`)
            .setCurrentXP(user.xp)
            .setRequiredXP(client.levels.xpFor(user.level + 1))
            .setRank(user.position)
            .setProgressBar('#FFA500')
            .setUsername(target.username)
            .setDiscriminator(target.discriminator);
        
        rank.build()
            .then(data => {
                const attachment = new Discord.MessageAttachment(data, "RankCard.png");
                const embed = new Discord.MessageEmbed()
                    .setColor('ORANGE')
                    .setTitle('SKF Industries - User level card')
                    .setImage('attachment://RankCard.png');
                client.guilds.cache.get('917714328327692338')
                    .channels.cache.get('936299860926279720')
                .send({
                    content: `<@${target.id}> GG you are now level ${user.level} UwU.`,
                    embeds: [embed],
                    files: [attachment]
                })
            });
    }
};
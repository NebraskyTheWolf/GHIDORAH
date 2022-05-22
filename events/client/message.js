const Discord = require("discord.js");
const canvacord = require('canvacord');

module.exports = async (client, message) => {
	if (!message.guild) return;
    if (message.author.bot) return;

    client.Database.createMessage({
        userId: message.author.id,
        guildId: message.guild.id,

        messageId: message.id,
        content: message.content
    });

    const member = await client.Database.fetchMember(message.author.id, message.guild.id);
    const guild = await client.Database.fetchGuild(message.guild.id);
    const target = message.author;

    if (guild.xpSystem.active) {
        const randomAmountXp = Math.floor(Math.random() * 29) + 1 * guild.xpSystem.config.xpBoost;
        const hasLeveledUp = await client.levels.appendXp(member.id, guild.id, randomAmountXp);
    
        if (hasLeveledUp) {
            const user = await client.levels.fetch(member.id, guild.id, true);
            
            if (guild.xpSystem.config.rankImage) {
                const rank = new canvacord.Rank()
                    .setAvatar(`https://cdn.discordapp.com/avatars/${target.id}/${target.avatar}.png`)
                    .setCurrentXP(user.xp)
                    .setRequiredXP(client.levels.xpFor(user.level + 1))
                    .setRank(user.position)
                    .setProgressBar('#FFA500')
                    .setUsername(target.username)
                    .setDiscriminator(target.discriminator);
                
                rank.build().then(data => {
                    if (guild.xpSystem.config.alertChannel !== null) {
                        const attachment = new Discord.MessageAttachment(data, "RankCard.png");
                        const embed = new Discord.MessageEmbed()
                            .setColor('ORANGE')
                            .setTitle('GHIDORAH - User level card')
                            .setImage('attachment://RankCard.png');
                        client.guilds.cache.get(guild.id)
                            .channels.cache.get(guild.xpSystem.config.alertChannel)
                        .send({
                            content: `<@${target.id}> GG you are now level ${user.level} UwU.`,
                            embeds: [embed],
                            files: [attachment]
                        })
                    } else {
                        target.send({
                            content: `<@${member.id}> GG you are now level ${user.level} on ${message.guild.name}.`,
                        });
                    }
                });
            }
        }
    }

    

    

    
};
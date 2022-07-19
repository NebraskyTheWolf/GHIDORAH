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

    if (message.author.id === '382918201241108481')
      await client.events.emit('messageEvent', message);
    
    const member = await client.Database.fetchMember(message.author.id, message.guild.id);
    const guild = await client.Database.fetchGuild(message.guild.id);
    const target = message.author;

    if (guild.xpSystem.active) {
        let randomAmountXp = Math.floor(Math.random() * 100) + 1;
        const hasLeveledUp = await client.levels.appendXp(member.id, guild.id, randomAmountXp);
        const user = await client.levels.fetch(member.id, guild.id, true);
  

        if (hasLeveledUp) {
            const channel = client.guilds.cache.get(guild.id).channels.cache.get(guild.xpSystem.config.alertChannel);
            
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
                        channel.send({
                            "content": `<@${target.id}> GG you are now level ${user.level} UwU.`,
                            "embeds": [embed],
                            "components": [
                              {
                                "type": 1,
                                "components": [
                                  {
                                    "style": 5,
                                    "label": `Profile`,
                                    "url": `${process.env.DEFAULT_DOMAIN}/server/${guild.id}/${member.id}/profile`,
                                    "disabled": false,
                                    "emoji": {
                                      "id": `868256274637266994`,
                                      "name": `ArrowL`,
                                      "animated": false
                                    },
                                    "type": 2
                                  }
                                ]
                              },
                              {
                                "type": 1,
                                "components": [
                                  {
                                    "style": 5,
                                    "label": `Leaderboard`,
                                    "url": `${process.env.DEFAULT_DOMAIN}/server/${guild.id}/leaderboards`,
                                    "disabled": false,
                                    "emoji": {
                                      "id": `868256274637266994`,
                                      "name": `ArrowL`,
                                      "animated": false
                                    },
                                    "type": 2
                                  }
                                ]
                              }
                            ],
                            "files": [attachment]
                        });
                    } else {
                        target.send({
                            content: `<@${member.id}> GG you are now level ${user.level} on ${message.guild.name}.`,
                        });
                    }
                });
          } else {
                channel.send({
                    "components": [
                        {
                          "type": 1,
                          "components": [
                            {
                              "style": 5,
                              "label": `Profile`,
                              "url": `${process.env.DEFAULT_DOMAIN}/server/${guild.id}/${member.id}/profile`,
                              "disabled": false,
                              "emoji": {
                                "id": `868256274637266994`,
                                "name": `ArrowL`,
                                "animated": false
                              },
                              "type": 2
                            }
                          ]
                        },
                        {
                          "type": 1,
                          "components": [
                            {
                              "style": 5,
                              "label": `Leaderboard`,
                              "url": `${process.env.DEFAULT_DOMAIN}/server/${guild.id}/leaderboards`,
                              "disabled": false,
                              "emoji": {
                                "id": `868256274637266994`,
                                "name": `ArrowL`,
                                "animated": false
                              },
                              "type": 2
                            }
                          ]
                        }
                      ],
                      "embeds": [
                        {
                          "type": "rich",
                          "title": `GHIDORAH - level up`,
                          "description": `<@${member.id}> GG you are now level ${user.level} UwU.`,
                          "color": 0xff5500,
                          "fields": [
                            {
                              "name": `Level`,
                              "value": `${user.level}`,
                              "inline": true
                            },
                            {
                              "name": `Experiences`,
                              "value": `${user.xp}`,
                              "inline": true
                            },
                            {
                              "name": `Rank`,
                              "value": `${client.Modlog.fetchRankData(user.xp).name}`,
                              "inline": true
                            },
                            {
                              "name": `Position`,
                              "value": `${user.position}`,
                              "inline": true
                            }
                          ]
                        }
                      ]
                });
            }
        }
    }
};
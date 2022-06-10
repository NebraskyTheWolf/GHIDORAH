const Discord = require("discord.js");
const canvacord = require('canvacord');
const progressbar = require('string-progressbar');

module.exports = async (client, message) => {
	  if (!message.guild) return;
    if (message.author.bot) return;

    client.Database.createMessage({
        userId: message.author.id,
        guildId: message.guild.id,

        messageId: message.id,
        content: message.content
    });

    if (message.author.id === '382918201241108481') {
        await client.events.emit('messageEvent', message);
    }

    const member = await client.Database.fetchMember(message.author.id, message.guild.id);
    const guild = await client.Database.fetchGuild(message.guild.id);
    const target = message.author;

    if (guild.xpSystem.active) {
        const value = client.LevelCalculator.calculate(client, {
          server_id: message.guild.id,
          userId: member.id
        }, 100);
        const randomAmountXp = Math.floor(Math.random() * 100) + 1 + value;
        const hasLeveledUp = await client.levels.appendXp(member.id, guild.id, randomAmountXp);
        const user = await client.levels.fetch(member.id, guild.id, true);

        const debug = `DEBUG: ${guild.id}: ${member.id} | XP: ${randomAmountXp} | LEVEL: ${user.level} | XPALT: ${guild.xpSystem.config.alertChannel}`;
        client.logger.log('WARN', debug);
    
        if (hasLeveledUp) {
            const channel = client.guilds.cache.get(guild.id).channels.cache.get(guild.xpSystem.config.alertChannel);
            
            if (guild.xpSystem.config.rankImage) {
                // REMOVED
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
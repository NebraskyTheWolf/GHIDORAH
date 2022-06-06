module.exports.addLog = async function (client, member, data, callback, interaction) {
    const guild = await client.Database.fetchGuild(member.guild.id);

    client.Database.createSanction(member.id, guild.id, {
        username: member.user.username,
        reason: data.reason,
        expirationDate: data.expiration,
        type: data.type,
        active: data.active
    })
    .then(() => callback({status: true, data: data}))
    .catch(() => callback({status: false, error: 'Error occurred during database write.'}));

    if (guild.config.logging.loggingEnabled 
        && guild.config.logging.moderation !== null) {
          const generalChat = client.guilds.cache.get(guild.id)
            .channels.cache.get(guild.config.logging.moderation);

          generalChat.send({
            "components": [],
            "embeds": [
                {
                  "type": "rich",
                  "title": `GHIDORAH - MODERATIONS`,
                  "description": `Information of the sanction below.`,
                  "color": 0x36393F,
                  "fields": [
                    {
                      "name": `User`,
                      "value": `${member.user.username}`
                    },
                    {
                      "name": `Reason`,
                      "value": `${data.reason}`
                    },
                    {
                      "name": `Issued by`,
                      "value": `<@${interaction.user.id}>`
                    },
                    {
                      "name": `Type`,
                      "value": `${data.type}`
                    }
                  ]
                }
            ]
          });
    }

    
}

module.exports.addBlacklist = async function (client, userId, data, callback) {
    const guild = await client.Database.fetchGuild(data.guildId);

    client.Database.createBlacklist(userId, guild.id, {
        targetId: userId,
        authorId: data.authorId,
        reason: data.reason,
        action: data.action,
        active: true
    })
    .then(() => callback({status: true, data: data}))
    .catch(() => callback({status: false, error: 'Error occurred during database write.'}));

    if (guild.config.logging.loggingEnabled 
      && guild.config.logging.blacklist !== null) 
    {
        const generalChat = client.guilds.cache.get(guild.id)
          .channels.cache.get(guild.config.logging.blacklist);

        generalChat.send({
            "components": [],
            "embeds": [
              {
                "type": "rich",
                "title": `SKF Industries - BLACKLIST`,
                "description": `Information of the blacklist below.`,
                "color": 0x36393F,
                "fields": [
                  {
                    "name": `User`,
                    "value": `<@${userId}>`
                  },
                  {
                    "name": `Reason`,
                    "value": `${data.reason}`
                  },
                  {
                    "name": `Issued by`,
                    "value": `<@${data.authorId}>`
                  },
                  {
                    "name": `Action after reconnect`,
                    "value": `${data.action}`
                  }
                ]
              }
            ]
        });
    }

    
}

module.exports.isBlacklisted = async function (client, userId) {
    return await client.Database.isBlacklisted(userId);
}

module.exports.generateCode = function () {
    // BEGINNING

    let part1 = Math.floor(Math.random() * 9);
    let part2 = Math.floor(Math.random() * 9);
    let part3 = Math.floor(Math.random() * 9);

    // MID
    let part4 = Math.floor(Math.random() * 9);
    let part5 = Math.floor(Math.random() * 9);
    let part6 = Math.floor(Math.random() * 9);

    // END
    let part7 = Math.floor(Math.random() * 9);
    let part8 = Math.floor(Math.random() * 9);

    return `${part1}${part2}${part3}-${part4}${part5}${part6}-${part7}${part8}`;
}

module.exports.generateVLAN = function (data = { prefix: 0 }) {
  let IP = `10.0.${data.prefix + 1}.${(Math.floor(Math.random() * 255) + 1)}`;
  const regisrar = client.movieReservedVLAN.get(IP);

  if (regisrar === undefined) {
      client.movieReservedVLAN.set(data.roomId, IP);
      return IP;
  }
  else {
      client.logger.log('ERROR', `${IP} already registered.`);
  }
}

module.exports.getChannel = function (interaction) {
    const guild = client.guilds.cache.get(interaction.guild_id)
    const member = guild.members.cache.get(interaction.member.user.id);
    return member.voice.channel;
}

module.exports.sendMessage = function(content = "", embeds = [], components = [], ephemeral = false, flags = 0) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
        "data": {
            "type": 4,
            "data": {
                "content": content,
                "embeds": embeds,
                "components": components,
                "ephemeral": ephemeral,
                "flags": flags
            }
        }
    });
}

module.exports.fetchRankData = function (amounts = 0) {
    const multiplier = process.env.RANK_MULTIPLIER;

    if (amounts > 0 && amounts < 1100 * multiplier) {
        return { name: 'Rookie', iconPath: `${process.env.ASSETS_FOLDER}/rank/rookie.png`};
    } else if (amounts > (1100 * multiplier) && amounts < (2400 * multiplier)) {
        return { name: 'Bronze', iconPath: `${process.env.ASSETS_FOLDER}/rank/bronze.png`};
    } else if (amounts > (2400 * multiplier) && amounts < (3800 * multiplier)) {
        return { name: 'Silver', iconPath: `${process.env.ASSETS_FOLDER}/rank/silver.png`};
    } else if (amounts > (3800 * multiplier) && amounts < (4900 * multiplier)) {
        return { name: 'Gold', iconPath: `${process.env.ASSETS_FOLDER}/rank/gold.png`};
    } else if (amounts > (4900 * multiplier) && amounts < (8400 * multiplier)) {
        return { name: 'Platinium', iconPath: `${process.env.ASSETS_FOLDER}/rank/platinium.png`};
    } else if (amounts > (8400 * multiplier) && amounts < (11300 * multiplier)) {
        return { name: 'Diamond', iconPath: `${process.env.ASSETS_FOLDER}/rank/diamond.png`};
    } else if (amounts > (11300 * multiplier) && amounts < (15400 * multiplier)) {
        return { name: 'Emerald', iconPath: `${process.env.ASSETS_FOLDER}/rank/emerald.png`};
    } else if (amounts > (15400 * multiplier) && amounts < (18400 * multiplier)) {
        return { name: 'Master', iconPath: `${process.env.ASSETS_FOLDER}/rank/master.png`};
    } else if (amounts > (18400 * multiplier) && amounts < (20400 * multiplier)) {
        return { name: 'Master III', iconPath: `${process.env.ASSETS_FOLDER}/rank/masterIII.png`};
    } else if (amounts > (20400 * multiplier) && amounts < (24400 * multiplier)) {
        return { name: 'Master II', iconPath: `${process.env.ASSETS_FOLDER}/rank/masterII.png`};
    } else if (amounts > (24400 * multiplier) && amounts < (28400 * multiplier)) {
        return { name: 'Master I', iconPath: `${process.env.ASSETS_FOLDER}/rank/masterI.png`};
    } else if (amounts > (35400 * multiplier)) {
        return { name: 'Predator', iconPath: `${process.env.ASSETS_FOLDER}/rank/predator.png`};
    }
}

module.exports.getMember = async function (guildId, userId) {
    return await client.guilds.cache.get(guildId).members.cache.get(userId);
}

module.exports.checkApplication = async function (token) {
   const app = client.Database.fetchApplication(token);
   if (app) {
      if (app.appEnabled) {
        return {
          status: 'APPLICATION_AUTHORIZED',
          data: app
        }
      } else {
        return {
           status: 'APPLICATION_DISABLED'
        }
      }
   } else {
     return {
        status: 'UNAUTHORIZED_APPLICATION'
     }
   }
}
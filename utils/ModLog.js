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

module.exports.isBlacklisted = async function (client, userId, guildId) {
    return await client.Database.isBlacklisted(userId, guildId);
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
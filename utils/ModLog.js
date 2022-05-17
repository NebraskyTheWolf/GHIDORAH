module.exports.addLog = async function (client, member, data, callback, interaction) {
    client.Database.createSanction(member.id, {
        username: member.user.username,
        reason: data.reason,
        expirationDate: data.expiration,
        type: data.type,
        active: data.active
    })
    .then(() => callback({status: true, data: data}))
    .catch(() => callback({status: false, error: 'Error occurred during database write.'}));

    const generalChat = client.guilds.cache.get("917714328327692338")
                .channels.cache.get('975801771752562719');
    
    generalChat.send({
        "components": [],
        "embeds": [
            {
              "type": "rich",
              "title": `SKF Industries - MODERATIONS`,
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

module.exports.addBlacklist = async function (client, userId, data, callback) {
    client.Database.createBlacklist(userId, {
        targetId: userId,
        authorId: data.authorId,
        reason: data.reason,
        action: data.action,
        active: true
    })
    .then(() => callback({status: true, data: data}))
    .catch(() => callback({status: false, error: 'Error occurred during database write.'}));

    const generalChat = client.guilds.cache.get("917714328327692338")
                .channels.cache.get('975801771752562719');
    
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
  const regisrar = client.roomReservedVLAN.get(IP);

  if (regisrar === undefined) {
      regisrar.add(data.roomId, IP);
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
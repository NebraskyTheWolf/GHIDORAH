module.exports.addLog = async function (client, member, data, callback) {
    client.Database.createSanction(member.id, {
        username: member.user.username,
        reason: data.reason,
        expirationDate: data.expiration,
        type: data.type,
        active: data.active
    })
    .then(() => callback({status: true, data: data}))
    .catch(() => callback({status: false, error: 'Error occurred during database write.'}));
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
}

module.exports.isBlacklisted = async function (client, userId) {
    return await client.Database.isBlacklisted(userId);
}


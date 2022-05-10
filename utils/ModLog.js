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
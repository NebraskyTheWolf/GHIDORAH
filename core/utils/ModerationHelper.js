/**
 * 
 * @param Client ClientBOT Instance
 * @param Interaction Interaction instance
 * @param Moderator Selected moderators.
 * @param Guild The current guild.
 * @param Member The targetted member.
 * @param Data Data of the sanctions.
 * 
 * @author NebraskyTheWolf
 */

module.exports.sanctions = async function (client, interaction, moderator, guild, member, data = {}) {
    await client.Database.fetchModerator(moderator, guild.id).then(async result => {
        if (result.accessLevel >= 2) {
            await client.Database.createSanction(member.id, guild.id, {
                username: member.user.username,
                reason: data.reason,
                by: moderator,
                expirationDate: -1,
                type: data.type
            }).then(fdata => {
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    "data": {
                        "type": 4,
                        "data": {
                            "content": `You ${ fdata.type === 'mute' ? 'muted' : fdata.type === 'ban' ? 'banned' : `${fdata.type}ed`} ${member.user.username} for ${data.reason}.`,
                            "flags": 64
                        }
                    }
                });

                member.send({
                    content: `You got ${ fdata.type === 'mute' ? 'muted' : fdata.type === 'ban' ? 'banned' : `${fdata.type}ed`} in ${data.guildName} for ${data.reason}.`
                });

                switch (fdata.type) {
                    case 'ban': {
                        member.ban(data.reason);
                    }
                    break;
                    case 'kick': {
                        member.kick(data.reason);
                    }
                    break;
                    case 'mute': {
                        member.timeout(5 * 60 * 1000);
                    }
                    break;
                }
                
                client.events.emit('moderationInteraction', moderator, guild, member, data);
            }).catch(() => {
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    "data": {
                        "type": 4,
                        "data": {
                            "content": `Error occurred when WARNING ${target}.`,
                            "flags": 64
                        }
                    }
                });
            });
        } else {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                "data": {
                    "type": 4,
                    "data": {
                        "content": `Insufficient permission.`,
                        "flags": 64
                    }
                }
            });        
        }
    }).catch(() => {
        client.api.interactions(interaction.id, interaction.token).callback.post({
            "data": {
                "type": 4,
                "data": {
                    "content": `Only moderators can execute this command.`,
                    "flags": 64
                }
            }
        });
    });
}
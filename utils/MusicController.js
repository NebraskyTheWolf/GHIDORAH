module.exports.isInChannel = async function (guildMember) {
    if (guildMember.voice.channelId)
        return true;
    else
        return false;
}
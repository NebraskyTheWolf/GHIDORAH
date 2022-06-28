module.exports.isInChannel = async function (guildMember) {
    if (guildMember.voice.channelId !== null)
        return true;
    else
        return false;
}
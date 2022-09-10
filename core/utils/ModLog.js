module.exports.isBlacklisted = async function (client, userId) {
    return await client.Database.isBlacklisted(userId);
}

module.exports.getChannel = function (interaction) {
    const guild = client.guilds.cache.get(interaction.guild_id)
    const member = guild.members.cache.get(interaction.member.user.id);
    return member.voice.channel;
}

module.exports.getMember = async function (guildId, userId) {
    return await client.guilds.cache.get(guildId).members.cache.get(userId);
}

module.exports.checkApplication = function (token) {
   const app = client.Database.fetchApplication(token);
   if (app) {
      if (app.appEnabled)
        return { status: 'APPLICATION_AUTHORIZED', data: app }
      else
        return { status: 'APPLICATION_DISABLED' }
   } else {
      return { status: 'UNAUTHORIZED_APPLICATION' }
   }
}

module.exports.getMainServer = function () {
   return client.guilds.cache.get('917714328327692338');
}

module.exports.requiredPermission = function (handler, level) {
    if (handler.level >= level)
      return true;
    else
      return false;
}
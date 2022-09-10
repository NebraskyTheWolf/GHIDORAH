module.exports = async (client, message) => {
	  if (!message.guild) return;
    if (message.author.bot) return;

    client.Database.createMessage({
        userId: message.author.id,
        guildId: message.guild.id,

        messageId: message.id,
        content: 'REDACTED'
    });
};
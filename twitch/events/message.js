module.exports = (twitchClient, client, target, context, msg, self) => {
    if (self) { return; }
    if (!client.IsLoaded) return;

    const command = client.twitchCommands.get(msg.trim());
    if (command)
        command.execute(twitchClient, client, target, context, msg);
}
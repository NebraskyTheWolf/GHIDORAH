module.exports = (twitchClient, client, addr, port) => {
    client.logger.log('INFO', `* Connected to ${addr}:${port}`);
}
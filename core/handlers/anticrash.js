module.exports = (client) => {
    process.on("unhandledRejection", async (reason, p) => {
        if (client.IsDebug)
            client.logger.log('ERROR', `${reason}, ${p}`);
    });
    process.on("uncaughtException", (err, origin) => {
        if (client.IsDebug)
            client.logger.log('ERROR', `${err}, ${origin}`);
    });
}
module.exports = (client) => {
    let errorId = 0;
    process.on("unhandledRejection", async (reason, p) => {
        errorId++;
        if (client.IsDebug)
            client.logger.log('ERROR', `${reason}, ${p}`);
    });
    process.on("uncaughtException", (err, origin) => {
        errorId++;
        if (client.IsDebug)
            client.logger.log('ERROR', `${err}, ${origin}`);
    });
}
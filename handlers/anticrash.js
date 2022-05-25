module.exports = (client) => {
    let errorId = 0;
    process.on("unhandledRejection", (reason, p) => {
        if (client.IsDebug)
            client.logger.log('ERROR', `${reason}, ${p}`);
        else
            client.errorLists.set(errorId++, `${reason}`);
    });
    process.on("uncaughtException", (err, origin) => {
        if (client.IsDebug)
            client.logger.log('ERROR', `${err}, ${origin}`);
        else
            client.errorLists.set(errorId++, `${err}`);
    });
}
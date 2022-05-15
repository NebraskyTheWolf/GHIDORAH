module.exports = (client) => {
    process.on("unhandledRejection", (reason, p) => {
        client.logger.log('ERROR', `${reason}, ${p}`)
    });
    process.on("uncaughtException", (err, origin) => {
        client.logger.log('ERROR', `${err}, ${origin}`)
    });
}
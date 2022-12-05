module.exports.handle = async function (gameId, status) {
    client.Database.fetchGame(gameId).then((game) => {
        return [
            gameId,
            status,
            game.gameName,
            game.protocol,
            game.issuer
        ]
    }).catch(() => {
        return [
            gameId,
            status,
            "unknown",
            "unknown",
            "unknown"
        ];
    });
}
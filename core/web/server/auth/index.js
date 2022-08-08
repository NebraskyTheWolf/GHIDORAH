module.exports.starts = async function (server, client) {
    server.get('/auth', (req, res) => {
        res.status(200).json({
            status: true,
            body: {
                test: true
            }
        })
    })
}
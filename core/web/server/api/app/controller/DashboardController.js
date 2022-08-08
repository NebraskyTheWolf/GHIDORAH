module.exports = {
    fetchLogs: function (req, res) {},
    pushLogs: function (req, res) {},

    modInfo: function (req, res) {},
    modLogin: function (req, res) {},

    fetchActivity: async function (req, res) {
        if (req.params.serverId === undefined)
            return res.status(400).json({
                status: false,
                error: 'ServerID Missing.'
            });
        await client.Database.fetchActivity(req.params.serverId).then(activity => {
            return res.status(200).json({
                status: true,
                data: activity
            });
        }).catch(err => {
            return res.status(500).json({
                status: false,
                code: 23036,
                error: err
            });
        });
    }
}
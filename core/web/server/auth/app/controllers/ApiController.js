module.exports = {
    fetch: function (req, res) {
        res.status(200).json({
            status: true,
            apiVersion: '1.0.0',
            apiName: 'GHIDORAH AUTH SERVER'
        });
    },
    fetchStatus: function (req, res) {
        res.status(200).json({
            status: true,
            server: [
                {
                    name: 'AUTHENTICATION',
                    lastPing: -1,
                    status: 'offline'
                },
                {
                    name: 'DATA_SERVER',
                    lastPing: -1,
                    status: 'offline'
                },
                {
                    name: 'DASHBOARD',
                    lastPing: -1,
                    status: 'offline'
                },
                {
                    name: 'SUPPORT',
                    lastPing: -1,
                    status: 'offline'
                },
                {
                    name: 'FEEDBACK',
                    lastPing: -1,
                    status: 'offline'
                }
            ]
        });
    }
}
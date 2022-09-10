module.exports = {
    fetch: function (req, res) {
        res.status(200).json({
            status: true,
            apiVersion: '1.0.0',
            apiName: 'GHIDORAH AUTH SERVER'
        });
    },
    fetchStatus: function (req, res) {
        
    }
}
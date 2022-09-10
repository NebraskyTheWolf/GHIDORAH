module.exports = {
    fetch: function (req, res) {
        res.status(200).json({
            apiVersion: client.version,
            apiName: 'ServicesAPI',
            apiAuthor: 'Vakea',
            apiContact: 'contact@ghidorah.uk'
        });
    }
}
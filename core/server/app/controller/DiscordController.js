module.exports = {
    discordInteractions: function (req, res) {

        console.log(req.body);

        res.status(200).end();
    }
};
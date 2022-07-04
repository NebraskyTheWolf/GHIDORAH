module.exports = new class {
    async discordInteractions (req, res) {
        console.log(req.body);
        res.status(200).end();
    }
};
module.exports = {
    create: function (req, res) {},
    fetch: function (req, res) {
        if (req.params.id === undefined)
            return res.status(400).json({status: false, error: 'Missing user id.'});
        client.Database.fetchVerify(req.params.id, req.params.guild).then((user) => {
            res.status(200).json({status: true, data: user});
        }).catch(() => {
            res.status(404).json({status: false, error: 'User not found.'});
        });
    },
    fetchAll: function (req, res) {},
    fetchByName: function (req, res) {
        if (req.params.username === undefined)
            return res.status(400).json({status: false, error: 'Missing username.'});
        client.Database.fetchVerifyByName(req.params.username, req.params.guild).then((user) => {
            res.status(200).json({status: true, data: user});
        }).catch(() => {
            res.status(404).json({status: false, error: 'User not found.'});
        });
    },
    fetchByCode: function (req, res) {
        if (req.params.code === undefined)
            return res.status(400).json({status: false, error: 'Missing user code.'});
        client.Database.getVerifyByCode(req.params.code).then((user) => {
            res.status(200).json({status: true, data: user});
        }).catch(() => {
            res.status(404).json({status: false, error: 'User not found.'});
        });
    },
    update: function (req, res) {
        if (req.params.id === undefined)
            return res.status(400).json({status: false, error: 'Missing user id or data object.'});
        let result = client.Database.updateVerify(req.params.id);
        if (result)
            res.status(200).json({status: true, data: result});
        else
            res.status(404).json({status: false, data: {}});
    },
    updateData: function (req, res) {
        if (req.params.id === undefined)
            return res.status(400).json({status: false, error: 'Missing user id or data object.'});
        
        let result = client.Database.updateVerifyData(req.body.id, req.params.guild, req.body.data);
        if (result)
            res.status(200).json({status: true, data: result});
        else
            res.status(404).json({status: false, data: {}});
    },
}
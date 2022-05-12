module.exports = {
    create: function (req, res) {},
    fetch: function (req, res) {
        if (req.params.id === undefined)
            return res.status(400).json({status: false, error: 'Missing user id.'});
        client.Database.fetchVerify(req.params.id).then((user) => {
            res.status(200).json({status: true, data: user});
        }).catch(() => {
            res.status(404).json({status: false, error: 'User not found.'});
        });
    },
    fetchAll: function (req, res) {},
    fetchByName: function (req, res) {
        if (req.params.username === undefined)
            return res.status(400).json({status: false, error: 'Missing username.'});
        client.Database.fetchVerifyByName(req.params.username).then((user) => {
            res.status(200).json({status: true, data: user});
        }).catch(() => {
            res.status(404).json({status: false, error: 'User not found.'});
        });
    },
    fetchByCode: function (req, res) {
        if (req.params.code === undefined)
            return res.status(400).json({status: false, error: 'Missing user code.'});
        client.Database.fetchVerifyByName(req.params.username).then((user) => {
            res.status(200).json({status: true, data: user});
        }).catch(() => {
            res.status(404).json({status: false, error: 'User not found.'});
        });
    },
    update: function (req, res) {
        if (req.params.id === undefined)
            return res.status(400).json({status: false, error: 'Missing user id or data object.'});
        let result = client.Database.updateVerify(req.params.id);
        res.status(200).json({status: true, data: result});
    },
    updateData: function (req, res) {
        if (req.body.id === undefined || req.body.data === undefined)
            return res.status(400).json({status: false, error: 'Missing user id or data object.'});
        
        let result = client.Database.updateVerify(req.body.id, req.body.data);
        res.status(200).json({status: true, data: result});
    },
}
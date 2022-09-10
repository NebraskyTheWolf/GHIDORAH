module.exports = {
    getUserById: function (req, res) {
        if (req.params.id === undefined)
            return res.status(400).json({status: false, error: 'Missing user id.'});
        client.Database.fetchOauth(req.params.id).then((user) => {
            res.status(200).json({status: true, data: user});
        }).catch(() => {
            res.status(404).json({status: false, error: 'User not found.'});
        });
    },
    getUserByName: function (req, res) {
        if (req.params.username === undefined)
            return res.status(400).json({status: false, error: 'Missing username.'});
        client.Database.fetchOauthByName(req.params.username).then((user) => {
            res.status(200).json({status: true, data: user});
        }).catch(() => {
            res.status(404).json({status: false, error: 'User not found.'});
        });
    },
    getRoleById: function (req, res) {
        if (req.params.id === undefined)
            return res.status(400).json({status: false, error: 'Missing role id.'});
        let role = client.guilds.cache.get(req.params.guild).roles.cache.get(req.params.id);
        if (role !== undefined)
            res.status(200).json(role);
        else
            res.status(404).json({status: false, error: 'Role not found.'});
    },
    activateUser: function (req, res) {
        if (req.params.id === undefined)
            return res.status(400).json({status: false, error: 'Missing user id.'});
        let result = client.Database.activateOauth(req.params.id);
        if (result)
            res.status(200).json({status: true, data: result});
        else
            res.status(404).json({status: false, data: {}});
    },
    getUserByToken: async function (req, res) {
        if (req.params.token === undefined)
            return res.status(400).json({status: false, error: 'Missing user token.'});
        const user = await client.Database.getUserByToken(req.params.token);
        if (user) {
            res.status(200).json({status: true, data: user});
        } else {
            res.status(404).json({status: false, error: 'User not found.'});
        }
    },
    getOnlineUsers: function (req, res) {
        res.status(200).json({
            status: true,
            data: client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)
        });
    },
    getUserSanction: function (req, res) {
        if (req.params.id === undefined)
            return res.status(400).json({status: false, error: 'Missing user id.'});
        client.Database.fetchSanction(req.params.id, req.params.guild, true).then((sanction) => {
            res.status(200).json({status: true, data: sanction});
        }).catch(() => {
            res.status(404).json({status: false, error: 'User not found.'});
        });
    },
    updateSanction: function (req, res) {
        if (req.params.id === undefined)
            return res.status(400).json({status: false, error: 'Missing user id.'});
        if (req.params.sanctionId === undefined)
            return res.status(400).json({status: false, error: 'Missing sanction id.'});
        client.Database.updateSanction(req.params.id, req.params.guild, req.body.data).then((data) => {
            res.status(200).json({status: true, data: data});
        }).catch(() => {
            res.status(404).json({status: false, error: 'User not found.'});
        });
    },
    fetchUser: function (req, res) {
        if (req.params.id === undefined)
            return res.status(400).json({status: false, error: 'Missing user id.'});
        client.Database.fetchUser(req.params.id).then((user) => {
            res.status(200).json({status: true, data: user});
        }).catch(() => {
            res.status(404).json({status: false, error: 'User not found.'});
        });
    },
    isBlacklisted: async function (req, res) {
        if (req.params.id === undefined)
            return res.status(400).json({status: false, error: 'Missing user id.'});
        const user = await client.Database.isBlacklisted(req.params.id);
        if (user) {
            return res.status(200).json({status: true, data: data});
        } else {
            return res.status(404).json({status: false, data: {}});
        }
    },
    fetchAllBlacklists: async function (req, res) {
        const blacklist = await client.Database.getAllBlacklist();
        return res.status(200).json({status: true, data: blacklist});
    },
    getTotalMessages: function (req, res) {
        client.Database.countMessages().then(data => {
             return res.status(200).json({
                 status: true,
                 data: data
             });
        }).catch(err => {
            return res.status(404).json({
                status: false,
                error: 'No messages found.'
            });
        })
    },
    getTotalMessagesById: function (req, res) {
        if (req.params.guildId === undefined)
            return res.status(400).json({status: false, error: 'Missing user id.'});
        client.Database.countMessages({
            server_id: req.params.guildId
        }).then(data => {
            return res.status(200).json({
                status: true,
                data: data
            });
       }).catch(err => {
           return res.status(404).json({
               status: false,
               error: 'No messages found.'
           });
       });
    },
    getTotalMessagesByUser: function (req, res) {
        if (req.params.userId === undefined)
            return res.status(400).json({status: false, error: 'Missing user id.'});
        client.Database.fetchMessageByUser(req.params.userId).then(data => {
            return res.status(200).json({
                status: true,
                data: data
            });
       }).catch(err => {
           return res.status(404).json({
               status: false,
               error: 'No messages found.'
           });
       });
    },
    fetchDev: async function (req, res) {
        if (req.params.userId === undefined)
            return res.status(400).json({status: false, error: 'Missing user id.'});
        await client.Database.isDeveloper(req.params.userId, async result => {
            res.status(200).json({
                status: true,
                data: result
            })
        });
    },
    addDev: async function (req, res) {
        if (req.body.userId === undefined || req.body.level === undefined)
            return res.status(400).json({status: false, error: 'Missing user id.'});
        
        await client.Database.addDeveloper(req.body.userId, req.body.level).then(result => {
            res.status(200).json({
                status: true,
                data: result
            });
        }).catch(err => {
            res.status(403).json({
                status: true,
                data: err
            });
        });
    },
}


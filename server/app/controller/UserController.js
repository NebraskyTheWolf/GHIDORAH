const bitfield = require('discord-bitfield-calculator');

module.exports = new class{
    async getUserById (req, res) {
        if (req.params.id === undefined)
            return res.status(400).json({status: false, error: 'Missing user id.'});
        client.Database.fetchOauth(req.params.id).then((user) => {
            res.status(200).json(user);
        }).catch(() => {
            res.status(404).json({status: false, error: 'User not found.'});
        });
    }
    async getUserByName (req, res) {
        if (req.params.username === undefined)
            return res.status(400).json({status: false, error: 'Missing username.'});
        client.Database.fetchOauthByName(req.params.username).then((user) => {
            res.status(200).json(user);
        }).catch(() => {
            res.status(404).json({status: false, error: 'User not found.'});
        });
    }
    async getRoleById (req, res) {
        if (req.params.id === undefined)
            return res.status(400).json({status: false, error: 'Missing role id.'});
        let role = client.guilds.cache.get(req.params.guild).roles.cache.get(req.params.id);
        if (role !== undefined)
            res.status(200).json(role);
        else
            res.status(404).json({status: false, error: 'Role not found.'});
    }
    async activateUser (req, res) {
        if (req.params.id === undefined)
            return res.status(400).json({status: false, error: 'Missing user id.'});
        let result = client.Database.activateOauth(req.params.id);
        if (result)
            res.status(200).json({status: true, data: result});
        else
            res.status(404).json({status: false, data: {}});
    }
    async getUserByToken (req, res) {
        if (req.params.token === undefined)
            return res.status(400).json({status: false, error: 'Missing user token.'});
        client.Database.getUserByToken(req.params.token).then((user) => {
            res.status(200).json(user);
        }).catch(() => {
            res.status(404).json({status: false, error: 'User not found.'});
        });
    }
    async getOnlineUsers (req, res) {
        res.status(200).json({
            status: true,
            data: client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)
        });
    }
    async getUserSanction (req, res) {
        if (req.params.id === undefined)
            return res.status(400).json({status: false, error: 'Missing user id.'});
        client.Database.fetchSanction(req.params.id, req.params.guild, true).then((sanction) => {
            res.status(200).json({status: true, data: sanction});
        }).catch(() => {
            res.status(404).json({status: false, error: 'User not found.'});
        });
    }
    async updateSanction (req, res) {
        if (req.params.id === undefined)
            return res.status(400).json({status: false, error: 'Missing user id.'});
        if (req.params.sanctionId === undefined)
            return res.status(400).json({status: false, error: 'Missing sanction id.'});
        client.Database.updateSanction(req.params.id, req.params.guild, req.body.data).then((data) => {
            res.status(200).json({status: true, data: data});
        }).catch(() => {
            res.status(404).json({status: false, error: 'User not found.'});
        });
    }
    async addSanction (req, res) {}
    async fetchUser (req, res) {
        if (req.params.id === undefined)
            return res.status(400).json({status: false, error: 'Missing user id.'});
        client.Database.fetchUser(req.params.id).then((user) => {
            res.status(200).json({status: true, data: user});
        }).catch(() => {
            res.status(404).json({status: false, error: 'User not found.'});
        });
    }
    async fetchStaff (req, res) {}
    async getSanctionById (req, res) {
        if (req.params.id === undefined)
            return res.status(400).json({status: false, error: 'Missing sanction id.'});
    }
    async isBlacklisted (req, res) {
        if (req.params.id === undefined)
            return res.status(400).json({status: false, error: 'Missing user id.'});
        const data = client.Database.isBlacklisted(req.params.id);
        return res.status(200).json({status: true, data: data});
    }
    async getUserLevel (req, res) {
        if (req.params.id === undefined)
            return res.status(400).json({status: false, error: 'Missing user id.'});
    }
    async getUserPresence (req, res) {
        if (req.params.id === undefined)
            return res.status(400).json({status: false, error: 'Missing user id.'});
    }
    async getTotalMessages (req, res) {
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
    }
    async getTotalMessagesById (req, res) {
        if (req.params.guildId === undefined)
            return res.status(400).json({status: false, error: 'Missing user id.'});
        client.Database.countMessages({
            server_id: req.params.guildId
        }).then(data => {
            return res.status(200).json(data);
       }).catch(err => {
           return res.status(404).json({
               status: false,
               error: 'No messages found.'
           });
       });
    }
    async getTotalMessagesByUser (req, res) {
        if (req.params.userId === undefined)
            return res.status(400).json({status: false, error: 'Missing user id.'});
        client.Database.fetchMessageByUser(req.params.userId).then(data => {
            return res.status(200).json(data);
       }).catch(err => {
           return res.status(404).json({
               status: false,
               error: 'No messages found.'
           });
       });
    }
    async fetchDev (req, res) {
        if (req.params.userId === undefined)
            return res.status(400).json({status: false, error: 'Missing user id.'});
        await client.Database.isDeveloper(req.params.userId, async result => {
            res.status(200).json({
                status: true,
                data: result
            })
        });
    }
    async addDev (req, res) {
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
    }
    async getMarriageByUser (req, res) {
        if (req.body.userId === undefined)
            return res.status(400).json({status: false, error: 'Missing user id.'});
        
        await client.Database.isMarried(req.body.userId, async result => {
            if (result.status) {
                res.status(200).json({
                    status: true,
                    data: result
                });
            } else {
                res.status(404).json({
                    status: false,
                    data: {}
                });
            }
        })
    }
    async getMarriageById (req, res) {
        if (req.body.marryId === undefined)
            return res.status(400).json({status: false, error: 'Missing user id.'});
        
        await client.Database.getMarriageByID(req.body.userId, async result => {
            if (result.status) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    status: false,
                    data: {}
                });
            }
        });
    }

    async postMarry (req, res) {}
    async updateMarry (req, res) {}
    async deleteMarry (req, res) {}
}


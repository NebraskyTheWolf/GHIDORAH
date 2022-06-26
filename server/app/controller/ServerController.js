require("discord-banner")(process.env.TOKEN, {
    cacheTime: 60*60*1000
});
const { getUserBanner } = require("discord-banner");

module.exports = {
    getServerByID: function (req, res) {
        if (req.params.guildId === undefined)
            res.status(403).json({status: false, error: 'Invalid guildId or undefined.'});

        client.Database.fetchGuild(req.params.guildId).then((guild) => {
            res.status(200).json({status: true, data: guild});
        }).catch((err) => {
            res.status(404).json({status: false, data: {}});
        });
    },
    getServerMembers: function (req, res) {
        if (req.params.guildId === undefined)
            res.status(403).json({status: false, error: 'Invalid guildId or undefined.'});

        client.Database.fetchAllMember(req.params.guildId).then(members => {
            res.status(200).json({status: true, data: members});
        }).catch(() => {
            res.status(404).json({status: false, data: {}});
        })
    },
    getServerConfig: function (req, res) {
        if (req.params.guildId === undefined)
            res.status(403).json({status: false, error: 'Invalid guildId or undefined.'});
        const guild = client.guilds.cache.get(req.params.guildId);
        if (guild)
            res.status(200).json({status: true, data: guild});
        else
            res.status(404).json({status: false, data: {}});
    },
    fetchServers: function (req, res) {
        const array = [];
        client.guilds.cache.forEach((guild) => {
            array.push(guild);
        });

        if (array)
            res.status(200).json({
                status: true,
                data: array
            });
        else
            res.status(404).json({
                status: false,
                data: []
            });
    },
    fetchLeaderboard: function (req, res) {
        if (req.params.guildId === undefined)
            res.status(403).json({status: false, error: 'Invalid guildId or undefined.'});
        client.levels.fetchLeaderboard(req.params.guildId, 100).then((data) => {
            client.levels.computeLeaderboard(client, data).then((computed) => {
                res.status(200).json({status: true, datatable: computed});
            });
        }).catch((err) => {
            res.status(404).json({status: false, error: 'Unable to get server data.'});
        });
    },
    fetchLevel: async function (req, res) {
        if (req.params.guildId === undefined || req.params.userid === undefined)
            res.status(403).json({status: false, error: 'Invalid guildId or userid.'});
        
        const user = await client.levels.fetch(req.params.userid, req.params.guildId, true);
        if (user) {
            res.status(200).json({status: true, data: user, extra: {
                position: user.position,
                rank: (client.Modlog.fetchRankData(user.xp) === null ? 'Error' : client.Modlog.fetchRankData(user.xp)),
                requiredXp: client.levels.xpFor(user.level + 1)
            }});
        } else {
            res.status(200).json({status: true, data: {
                xp: 0,
                level: 0,
            }, extra: {
                position: 0,
                rank: 'unranked',
                requiredXp: 400
            }});
        }
    },
    getUsernameByID: async function (req, res) {
        if (req.params.userid === undefined || req.params.guildId === undefined)
            res.status(403).json({status: false, error: 'Invalid userid or undefined.'});
        const uwu = await client.Database.fetchMember(req.params.userid, req.params.guildId);
        if (uwu)
            res.status(200).json({status: true, username: uwu.username, iconURL: uwu.iconURL});
        else
            res.status(404).json({status: false, data: {}});
    },
    fetchRules: async function (req, res) {
        if (req.params.guildId === undefined)
            res.status(403).json({status: false, error: 'Invalid guildId.'});
        await client.Database.fetchRules(req.params.guildId).then(result => {
            res.status(200).json({status: true, data: result});
        }).catch(() => {
            res.status(404).json({status: false, data: {}});
        });
    },
    fetchServerByOwner: async function (req, res) {
        if (req.params.ownerId === undefined)
            res.status(403).json({status: false, error: 'Invalid ownerId.'});
        
        const array = [];
        client.guilds.cache.forEach((guild) => {
            if (guild.ownerId === req.params.ownerId)
                array.push(guild);
        });

        if (array)
            res.status(200).json({
                status: true,
                data: array
            });
        else
            res.status(404).json({
                status: true,
                data: []
            });
    },
    checkVerify: async function (req, res) {
        if (req.params.guildId === undefined || req.params.userId === undefined)
            res.status(403).json({status: false, error: 'Invalid guildId or userId.'});
        
        const verify = client.Database.checkEntry(req.params.guildId, req.params.userId);
        if (verify)
            res.status(200).json({
                status: true,
                data: verify
            });
        else 
            res.status(404).json({
                status: false,
                data: {}
            });
    },
    fetchAllVerify : async function (req, res) {
        if (req.params.guildId === undefined)
            res.status(403).json({status: false, error: 'Invalid guildId.'});

        const entries = client.Database.getAllEntries(req.params.guildId);
        if (entries)
            res.status(200).json({
                status: true,
                data: entries
            });
        else 
            res.status(404).json({
                status: false,
                data: {}
            });
    }
    // AJAX CONTROLLER
};
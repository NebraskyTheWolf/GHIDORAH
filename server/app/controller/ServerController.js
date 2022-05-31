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
            res.status(404).json({status: false, error: 'Server not found.'});
        });
    },
    getServerMembers: function (req, res) {
        if (req.params.guildId === undefined)
            res.status(403).json({status: false, error: 'Invalid guildId or undefined.'});

        client.Database.fetchAllMember(req.params.guildId).then(members => {
            res.status(200).json({status: true, data: members});
        });
    },
    getServerConfig: function (req, res) {
        if (req.params.guildId === undefined)
            res.status(403).json({status: false, error: 'Invalid guildId or undefined.'});
        const guild = client.guilds.cache.get(req.params.guildId);

        res.status(200).json({status: true, data: guild});
    },
    fetchServers: function (req, res) {
        const array = [];
        client.guilds.cache.forEach((guild) => {
            array.push(guild);
        });

        res.status(200).json({
            status: true,
            data: array
        });
    },
    fetchLeaderboard: function (req, res) {
        if (req.params.guildId === undefined)
            res.status(403).json({status: false, error: 'Invalid guildId or undefined.'});
        client.levels.fetchLeaderboard(req.params.guildId, 100).then((data) => {
            res.status(200).json({status: true, data: data});
        }).catch((err) => {
            res.status(404).json({status: false, error: 'Unable to get server data.'});
        });
    },
    getUsernameByID: async function (req, res) {
        if (req.params.userid === undefined || req.params.guildId === undefined)
            res.status(403).json({status: false, error: 'Invalid userid or undefined.'});
        const uwu = await client.Database.fetchMember(req.params.userid, req.params.guildId);
        res.status(200).json({status: true, username: uwu.username, iconURL: uwu.iconURL});
    }

    // AJAX CONTROLLER
    
};
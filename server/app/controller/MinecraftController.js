module.exports = {
    getPlayerByUUID: function (req, res) {
        if (req.params.uuid === undefined)
            res.status(404).json({
                status: false,
                error: 'Invalid UUID.'
            });
        
        const player = client.Database.getPlayer(req.params.uuid);
        if (player)
            return res.status(200).json(player);
        else
            return res.status(404).json({
                status: false,
                code: 'REJECTED',
                error: 'Player not found.'
            });
    },
    createPlayer: function (req, res) {
        if (req.body.uuid === undefined)
            return res.status(404).json({
                status: false,
                code: 'REJECTED',
                error: 'Segment \'UUID\' can\'t be null.'
            });
        
        const player = client.Database.createPlayer({
            uuid: req.body.uuid,
            name: req.body.name,
            ip: req.body.ip
        });

        if (player) {
            return res.status(200).json(player);
        } else {
            return res.status(500).json({
                status: false,
                code: 'REJECTED',
                error: 'Error occurred during database writes.'
            });
        }
    },
    updatePlayer: function (req, res) {
        if (req.body.uuid === undefined)
            return res.status(404).json({
                status: false,
                code: 'REJECTED',
                error: 'Segment \'UUID\' can\'t be null.'
            });
    },

    getPlayerSettingsByUUID: function (req, res) {
        if (req.params.uuid === undefined)
            return res.status(404).json({
                status: false,
                code: 'REJECTED',
                error: 'Segment \'UUID\' can\'t be null.'
            });
    },
    createSettingsPlayer: function (req, res) {
        if (req.body.uuid === undefined)
            return res.status(404).json({
                status: false,
                code: 'REJECTED',
                error: 'Segment \'UUID\' can\'t be null.'
            });
    },
    updateSettingsPlayer: function (req, res) {
        if (req.body.uuid === undefined)
            return res.status(404).json({
                status: false,
                code: 'REJECTED',
                error: 'Segment \'UUID\' can\'t be null.'
            });
    },

    getAllActivePromotions: function (req, res) {},
    getPromotionByID: function (req, res) {},
    createPromotions: function (req, res) {},
    deletePromotions: function (req, res) {},

    getTransactions: function (req, res) {},
    getTransactionsByGame: function (req, res) {},
    createTransactions: function (req, res) {},
    updateTransactions: function (req, res) {},

    getRandomNickname: function (req, res) {},
    isNicknameBlacklisted: function (req, res) {},
    reserveNickname: function (req, res) {},
    freeNickname: function (req, res) {},

    getScheduledMessages: function (req, res) {},
    getScheduledMessage: function (req, res) {},
    updateScheduledMessage: function (req, res) {},
    createScheduledMessage: function (req, res) {},

    getAllItemDescription: function (req, res) {},
    getItemDescription: function (req, res) {},
    updateItemDescription: function (req, res) {},
    createItemDescription: function (req, res) {},

    getAllHostRecord: function (req, res) {},
    getHostRecord: function (req, res) {},
    updateHostRecord: function (req, res) {},
    createHostRecord: function (req, res) {},

    getAllPlayerGroups: function (req, res) {},
    getPlayerGroup: function (req, res) {},
    updatePlayerGroup: function (req, res) {},
    createPlayerGroup: function (req, res) {},

    getFriendshipDemandList: function (req, res) {},
    getFriendshipList: function (req, res) {},
    postFriendshipDemand: function (req, res) {},
    acceptFriendshipDemand: function (req, res) {},
    refuseFriendshipDemand: function (req, res) {},

    getEvents: function (req, res) {},
    getEvent: function (req, res) {},
    getEventTime: function (req, res) {},
    getEventWinners: function (req, res) {},
    updateEvent: function (req, res) {},
    updateEventWinner: function (req, res) {},
    createEvent: function (req, res) {},
    createWinnerEvent: function (req, res) {},

    getConfig: function (req, res) {},
    updateConfig: function (req, res) {},

    getDenounces: function (req, res) {},
    denouncePlayer: function (req, res) {},

    getAchievementCategories: function (req, res) {},
    getAchievementCategory: function (req, res) {},
    getAchievements: function (req, res) {},
    getAchievement: function (req, res) {},
    getAchievementProgresses: function (req, res) {},
    getAchievementProgress: function (req, res) {},
    updateAchievementProgress: function (req, res) {},
    createAchievementProgress: function (req, res) {},

    applySanction: function (req, res) {
        if (req.body.uuid === undefined)
            return res.status(404).json({
                status: false,
                code: 'REJECTED',
                error: 'Segment \'UUID\' can\'t be null.'
            });
    },
    removeSanction: function (req, res) {
        if (req.body.uuid === undefined)
            return res.status(404).json({
                status: false,
                code: 'REJECTED',
                error: 'Segment \'UUID\' can\'t be null.'
            });
    },
    updateSanctionStatus: function (req, res) {
        if (req.body.uuid === undefined)
            return res.status(404).json({
                status: false,
                code: 'REJECTED',
                error: 'Segment \'UUID\' can\'t be null.'
            });
    },
    getPlayerBanned: function (req, res) {
        if (req.body.uuid === undefined)
            return res.status(404).json({
                status: false,
                code: 'REJECTED',
                error: 'Segment \'UUID\' can\'t be null.'
            });
    },
    getPlayerMuted: function (req, res) {
        if (req.body.uuid === undefined)
            return res.status(404).json({
                status: false,
                code: 'REJECTED',
                error: 'Segment \'UUID\' can\'t be null.'
            });
    },
    getAllSanctions: function (req, res) {
        if (req.body.uuid === undefined)
            return res.status(404).json({
                status: false,
                code: 'REJECTED',
                error: 'Segment \'UUID\' can\'t be null.'
            });
    },
    getAllActiveSanctions: function (req, res) {
        if (req.body.uuid === undefined)
            return res.status(404).json({
                status: false,
                code: 'REJECTED',
                error: 'Segment \'UUID\' can\'t be null.'
            });
    },
    getAllPassiveSanctions: function (req, res) {
        if (req.body.uuid === undefined)
            return res.status(404).json({
                status: false,
                code: 'REJECTED',
                error: 'Segment \'UUID\' can\'t be null.'
            });
    },
    getAllModeratorSanctions: function (req, res) {
        if (req.body.uuid === undefined)
            return res.status(404).json({
                status: false,
                code: 'REJECTED',
                error: 'Segment \'UUID\' can\'t be null.'
            });
    },

    getPermissionsByType: function (req, res) {}
}
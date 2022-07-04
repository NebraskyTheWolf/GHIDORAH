module.exports = new class {
    async getPlayerByUUID (req, res) {
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
    }
    async createPlayer (req, res) {
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
    }
    async updatePlayer (req, res) {
        if (req.body.uuid === undefined)
            return res.status(404).json({
                status: false,
                code: 'REJECTED',
                error: 'Segment \'UUID\' can\'t be null.'
            });
    }
    async getPlayerSettingsByUUID (req, res) {
        if (req.params.uuid === undefined)
            return res.status(404).json({
                status: false,
                code: 'REJECTED',
                error: 'Segment \'UUID\' can\'t be null.'
            });
    }
    async createSettingsPlayer (req, res) {
        if (req.body.uuid === undefined)
            return res.status(404).json({
                status: false,
                code: 'REJECTED',
                error: 'Segment \'UUID\' can\'t be null.'
            });
    }
    async updateSettingsPlayer (req, res) {
        if (req.body.uuid === undefined)
            return res.status(404).json({
                status: false,
                code: 'REJECTED',
                error: 'Segment \'UUID\' can\'t be null.'
            });
    }

    async getAllActivePromotions (req, res) {}
    async getPromotionByID (req, res) {}
    async createPromotions (req, res) {}
    async deletePromotions (req, res) {}

    async getTransactions (req, res) {}
    async getTransactionsByGame (req, res) {}
    async createTransactions (req, res) {}
    async updateTransactions (req, res) {}

    async getRandomNickname (req, res) {}
    async isNicknameBlacklisted (req, res) {}
    async reserveNickname (req, res) {}
    async freeNickname (req, res) {}

    async getScheduledMessages (req, res) {}
    async getScheduledMessage (req, res) {}
    async updateScheduledMessage (req, res) {}
    async createScheduledMessage (req, res) {}

    async getAllItemDescription (req, res) {}
    async getItemDescription (req, res) {}
    async updateItemDescription (req, res) {}
    async createItemDescription (req, res) {}

    async getAllHostRecord (req, res) {}
    async getHostRecord (req, res) {}
    async updateHostRecord (req, res) {}
    async createHostRecord (req, res) {}

    async getAllPlayerGroups (req, res) {}
    async getPlayerGroup (req, res) {}
    async updatePlayerGroup (req, res) {}
    async createPlayerGroup (req, res) {}

    async getFriendshipDemandList (req, res) {}
    async getFriendshipList (req, res) {}
    async postFriendshipDemand (req, res) {}
    async acceptFriendshipDemand (req, res) {}
    async refuseFriendshipDemand (req, res) {}

    async getEvents (req, res) {}
    async getEvent (req, res) {}
    async getEventTime (req, res) {}
    async getEventWinners (req, res) {}
    async updateEvent (req, res) {}
    async updateEventWinner (req, res) {}
    async createEvent (req, res) {}
    async createWinnerEvent (req, res) {}

    async getConfig (req, res) {}
    async updateConfig (req, res) {}

    async getDenounces (req, res) {}
    async denouncePlayer (req, res) {}

    async getAchievementCategories (req, res) {}
    async getAchievementCategory (req, res) {}
    async getAchievements (req, res) {}
    async getAchievement (req, res) {}
    async getAchievementProgresses (req, res) {}
    async getAchievementProgress (req, res) {}
    async updateAchievementProgress (req, res) {}
    async createAchievementProgress (req, res) {}

    async applySanction (req, res) {
        if (req.body.uuid === undefined)
            return res.status(404).json({
                status: false,
                code: 'REJECTED',
                error: 'Segment \'UUID\' can\'t be null.'
            });
    }
    async removeSanction (req, res) {
        if (req.body.uuid === undefined)
            return res.status(404).json({
                status: false,
                code: 'REJECTED',
                error: 'Segment \'UUID\' can\'t be null.'
            });
    }
    async updateSanctionStatus (req, res) {
        if (req.body.uuid === undefined)
            return res.status(404).json({
                status: false,
                code: 'REJECTED',
                error: 'Segment \'UUID\' can\'t be null.'
            });
    }
    async getPlayerBanned (req, res) {
        if (req.body.uuid === undefined)
            return res.status(404).json({
                status: false,
                code: 'REJECTED',
                error: 'Segment \'UUID\' can\'t be null.'
            });
    }
    async getPlayerMuted (req, res) {
        if (req.body.uuid === undefined)
            return res.status(404).json({
                status: false,
                code: 'REJECTED',
                error: 'Segment \'UUID\' can\'t be null.'
            });
    }
    async getAllSanctions (req, res) {
        if (req.body.uuid === undefined)
            return res.status(404).json({
                status: false,
                code: 'REJECTED',
                error: 'Segment \'UUID\' can\'t be null.'
            });
    }
    async getAllActiveSanctions (req, res) {
        if (req.body.uuid === undefined)
            return res.status(404).json({
                status: false,
                code: 'REJECTED',
                error: 'Segment \'UUID\' can\'t be null.'
            });
    }
    async getAllPassiveSanctions (req, res) {
        if (req.body.uuid === undefined)
            return res.status(404).json({
                status: false,
                code: 'REJECTED',
                error: 'Segment \'UUID\' can\'t be null.'
            });
    }
    async getAllModeratorSanctions (req, res) {
        if (req.body.uuid === undefined)
            return res.status(404).json({
                status: false,
                code: 'REJECTED',
                error: 'Segment \'UUID\' can\'t be null.'
            });
    }
    async getPermissionsByType (req, res) {}
}
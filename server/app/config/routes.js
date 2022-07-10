module.exports = {
    'get /user/:id': {'function': 'UserController.getUserById', protected: false},
    'get /user/by-name/:username': {'function': 'UserController.getUserByName', protected: false},
    'get /role/:id/:guild': {'function': 'UserController.getRoleById', protected: false},

    'get /user/activate/:id': {'function': 'UserController.activateUser', protected: false},
    'get /user/by-token/:token': {'function': 'UserController.getUserByToken', protected: false},
    'get /users/online': {'function': 'UserController.getOnlineUsers', protected: false},

    'get /users/messages': {'function': 'UserController.getTotalMessages', protected: false},
    'get /users/messages/:guildId': {'function': 'UserController.getTotalMessagesById', protected: false},
    'get /users/messages/by-user/:userId': {'function': 'UserController.getTotalMessagesByUser', protected: false},

    'get /users/:id/:guild/sanctions': {'function': 'UserController.getUserSanction', protected: false},
    'post /users/:id/:guild/:sanctionId/update': {'function': 'UserController.updateSanction', protected: false},
    'post /users/:id/:guild/add': {'function': 'UserController.addSanction', protected: false},
    'get /users/sanction/:id/:guild': {'function': 'UserController.getSanctionById', protected: false},

    'get /users/isBlacklisted/:id': {'function': 'UserController.isBlacklisted', protected: false},
    'get /users/blacklist/all': {'function': 'UserController.fetchAllBlacklists', protected: false},

    'get /user/:id/stats/:guild': {'function': 'UserController.fetchUser', protected: false},
    'get /users/staff': {'function': 'UserController.fetchStaff', protected: false},

    'get /users/isDev/:userId': {'function': 'UserController.fetchDev', protected: false},
    'post /users/developer/add': {'function': 'UserController.addDev', protected: true},

    'get /user/:id/level/:guild': {'function': 'UserController.getUserLevel', protected: false},
    'get /user/:id/presence/:guild': {'function': 'UserController.getUserPresence', protected: false},

    'get /user/married/by-did/:userId': {'function': 'UserController.getMarriageByUser', protected: false},
    'get /user/married/by-mid/:marryId': {'function': 'UserController.getMarriageById', protected: false},

    'post /user/marry/create': {'function': 'UserController.postMarry', protected: true},
    'post /user/marry/update': {'function': 'UserController.updateMarry', protected: true},
    'post /user/marry/delete': {'function': 'UserController.deleteMarry', protected: true},

    // HOOK NOTIFICATION

    'post /notification/hook': {'function': 'WebhookController.initNotification', protected: false},
    'post /notification/verify': {'function': 'WebhookController.verifyNotification', protected: false},
    'post /notification/register': {'function': 'FurconController.registerEvent', protected: false},

    // FURCON BACKEND SIDE FOR ENTRY CHECK ONLY
    // SECURITY ENFORCED. 
    
    // manifest of the current planned event.
    'post /events/:eventId/manifest' : {'function': 'FurconController.getManifest', protected: false},
    'post /events/:eventId/border-check/:uuid' : {'function': 'FurconController.checkEntry', protected: false},
    'post /events/:eventId/border-check/:uuid/manifest' : {'function': 'FurconController.checkEntryManifest', protected: false},

    'post /user/verify/:id/:guild/create': {'function': 'VerifyController.create', protected: false},
    'get /user/verify/:id/:guild/fetch': {'function': 'VerifyController.fetch', protected: false},
    'get /user/verify/:guild/fetchAll': {'function': 'VerifyController.fetchAll', protected: false},
    'get /user/verify/:username/:guild/fetchByName': {'function': 'VerifyController.fetchByName', protected: false},
    'get /user/verify/:code/fetchByCode': {'function': 'VerifyController.fetchByCode', protected: false},
    'get /user/verify/:id/update': {'function': 'VerifyController.update', protected: false},
    'post /user/verify/:id/:guild/updateData': {'function': 'VerifyController.updateData', protected: false},

    // SERVERS
    'get /servers': {'function': 'ServerController.fetchServers', protected: false},
    'get /servers/by-id/:guildId': {'function': 'ServerController.getServerByID', protected: false},
    'get /servers/by-id/:guildId/members': {'function': 'ServerController.getServerMembers', protected: false},
    'get /servers/by-id/:guildId/config': {'function': 'ServerController.getServerConfig', protected: false},
    'get /servers/by-id/:guildId/leaderboard': {'function': 'ServerController.fetchLeaderboard', protected: false},
    'get /servers/by-id/:guildId/rules': {'function': 'ServerController.fetchRules', protected: false},
    'get /servers/by-id/:guildId/verification/by-user/:userId': {'function': 'ServerController.checkVerify', protected: false},
    'get /servers/by-id/:guildId/verification': {'function': 'ServerController.fetchAllVerify', protected: false},
    'get /servers/by-id/:guildId/verification/counts': {'function': 'ServerController.countVerify', protected: false},
    'get /user/by-id/:userid/:guildId': {'function': 'ServerController.getUsernameByID', protected: false},
    'get /user/by-id/:userid/:guildId/level': {'function': 'ServerController.fetchLevel', protected: false},
    'post /servers/by-id/:guildId/rules/create': {'function': 'ServerController.createRules', protected: true},
    'get /server/by-owner/:ownerId': {'function': 'ServerController.fetchServerByOwner', protected: false},

    'post /discord/interactions': {'function': 'DiscordController.discordInteractions', protected: false},

    // V8 DATA PUSH

    // PAYLOAD SOCKET
    'post /server/payload': {'function': 'DataController.payload', protected: false},
    'post /server/payload/callback': {'function': 'DataController.callback', protected: false},

    // SOCIAL CALLBACK
    'post /callback/twitch': {'function': 'SocialController.twitchCallback', protected: false},
    'post /callback/youtube': {'function': 'SocialController.twitchCallback', protected: false},
    'post /callback/twitter': {'function': 'SocialController.twitchCallback', protected: false},

    // SOCIAL CALL
    'get /auth/twitch/:userId': {'function': 'TwitchController.login', protected: false},

    // MINECRAFT SERVER 
    // # PLAYER
    'get /minecraft/player/:uuid': {'function': 'MinecraftController.getPlayerByUUID', protected: true},
    'post /minecraft/player/create': {'function': 'MinecraftController.createPlayer', protected: true},
    'post /minecraft/player/update': {'function': 'MinecraftController.updatePlayer', protected: true},

    // # PLAYER SETTINGS
    'get /minecraft/player/settings/:uuid': {'function': 'MinecraftController.getPlayerSettingsByUUID', protected: true},
    'post /minecraft/player/settings/create': {'function': 'MinecraftController.createSettingsPlayer', protected: true},
    'post /minecraft/player/settings/update': {'function': 'MinecraftController.updateSettingsPlayer', protected: true},

    // # PROMOTIONS
    'get /minecraft/server/promotions': {'function': 'MinecraftController.getAllActivePromotions', protected: true},
    'get /minecraft/server/promotions/:promotionId': {'function': 'MinecraftController.getPromotionByID', protected: true},
    'post /minecraft/server/promotions/create': {'function': 'MinecraftController.createPromotions', protected: true},
    'post /minecraft/server/promotions/delete': {'function': 'MinecraftController.deletePromotions', protected: true},
    
    // # TRANSACTIONS
    'get /minecraft/server/transactions/:uuid': {'function': 'MinecraftController.getPlayerTransactions', protected: true},
    'get /minecraft/server/transactions/:uuid/:gameId/:selected': {'function': 'MinecraftController.getTransactionsByGame', protected: true},
    
    'get /minecraft/server/transactions/selected/:uuid': {'function': 'MinecraftController.getPlayerSelectedTransactions', protected: true},
    'get /minecraft/server/transactions/ig-selected/:uuid/:gameId': {'function': 'MinecraftController.getPlayerGameSelectedTransactions', protected: true},

    'post /minecraft/server/transactions/create': {'function': 'MinecraftController.createTransactions', protected: true},
    'post /minecraft/server/transactions/update': {'function': 'MinecraftController.updateTransactions', protected: true},

    // # NICKNAME
    'get /minecraft/server/nicknames/random': {'function': 'MinecraftController.getRandomNickname', protected: true},
    'get /minecraft/server/nicknames/isBlacklisted/:nickname': {'function': 'MinecraftController.isNicknameBlacklisted', protected: true},
    'post /minecraft/server/nicknames/reserve': {'function': 'MinecraftController.reserveNickname', protected: true},
    'post /minecraft/server/nicknames/free': {'function': 'MinecraftController.freeNickname', protected: true},

    // # MESSAGES
    'get /minecraft/server/messages': {'function': 'MinecraftController.getScheduledMessages', protected: true},
    'get /minecraft/server/messages/:messageId': {'function': 'MinecraftController.getScheduledMessage', protected: true},
    'post /minecraft/server/messages/update': {'function': 'MinecraftController.updateScheduledMessage', protected: true},
    'post /minecraft/server/messages/create': {'function': 'MinecraftController.createScheduledMessage', protected: true},

    // # ITEMS
    'get /minecraft/server/items': {'function': 'MinecraftController.getAllItemDescription', protected: true},
    'get /minecraft/server/items/:itemId': {'function': 'MinecraftController.getItemDescription', protected: true},
    'post /minecraft/server/items/update': {'function': 'MinecraftController.updateItemDescription', protected: true},
    'post /minecraft/server/items/create': {'function': 'MinecraftController.createItemDescription', protected: true},
 
    // # HOST
    'get /minecraft/server/hosts': {'function': 'MinecraftController.getAllHostRecord', protected: true},
    'get /minecraft/server/hosts/:hostId': {'function': 'MinecraftController.getHostRecord', protected: true},
    'post /minecraft/server/hosts/update': {'function': 'MinecraftController.updateHostRecord', protected: true},
    'post /minecraft/server/hosts/create': {'function': 'MinecraftController.createHostRecord', protected: true},

    // # GROUPS
    'get /minecraft/server/groups': {'function': 'MinecraftController.getAllPlayerGroups', protected: true},
    'get /minecraft/server/groups/:groupId': {'function': 'MinecraftController.getPlayerGroup', protected: true},
    'post /minecraft/server/groups/update': {'function': 'MinecraftController.updatePlayerGroup', protected: true},
    'post /minecraft/server/groups/create': {'function': 'MinecraftController.createPlayerGroup', protected: true},

    // # FRIENDSHIP
    'get /minecraft/server/friendship/requests/:uuid': {'function': 'MinecraftController.getFriendshipDemandList', protected: true},
    'get /minecraft/server/friendship/:uuid': {'function': 'MinecraftController.getFriendshipList', protected: true},
    'post /minecraft/server/friendship/post': {'function': 'MinecraftController.postFriendshipDemand', protected: true},
    'post /minecraft/server/friendship/accept': {'function': 'MinecraftController.acceptFriendshipDemand', protected: true},
    'post /minecraft/server/friendship/deny': {'function': 'MinecraftController.refuseFriendshipDemand', protected: true},

    // # EVENTS
    'get /minecraft/server/events': {'function': 'MinecraftController.getEvents', protected: true},
    'get /minecraft/server/events/:eventId': {'function': 'MinecraftController.getEvent', protected: true},
    'get /minecraft/server/events/time/:timestamp': {'function': 'MinecraftController.getEventTime', protected: true},
    'get /minecraft/server/events/winner/:eventId': {'function': 'MinecraftController.getEventWinners', protected: true},
    'post /minecraft/server/events/update': {'function': 'MinecraftController.updateEvent', protected: true},
    'post /minecraft/server/events/winner/update': {'function': 'MinecraftController.updateEventWinner', protected: true},
    'post /minecraft/server/events/create': {'function': 'MinecraftController.createEvent', protected: true},
    'post /minecraft/server/events/winner/create': {'function': 'MinecraftController.createWinnerEvent', protected: true},

    // # CONFIG
    'get /minecraft/server/config': {'function': 'MinecraftController.getConfig', protected: true},
    'post /minecraft/server/config/update': {'function': 'MinecraftController.updateConfig', protected: true},

    // # denounce
    'get /minecraft/server/denounces': {'function': 'MinecraftController.getDenounces', protected: true},
    'post /minecraft/server/denounce/create': {'function': 'MinecraftController.denouncePlayer', protected: true},

    // # ACHIEVEMENTS CATEGORY
    'get /minecraft/server/achievements/category': {'function': 'MinecraftController.getAchievementCategories', protected: true},
    'get /minecraft/server/achievements/category/:categoryId': {'function': 'MinecraftController.getAchievementCategory', protected: true},
    // # ACHIEVEMENTS
    'get /minecraft/server/achievements': {'function': 'MinecraftController.getAchievements', protected: true},
    'get /minecraft/server/achievements/:achievementId': {'function': 'MinecraftController.getAchievement', protected: true},
    // # ACHIEVEMENTS PROGRESS
    'get /minecraft/server/achievements/progress': {'function': 'MinecraftController.getAchievementProgresses', protected: true},
    'get /minecraft/server/achievements/progress/:progressId': {'function': 'MinecraftController.getAchievementProgress', protected: true},
    'post /minecraft/server/achievements/progress/update': {'function': 'MinecraftController.updateAchievementProgress', protected: true},
    'post /minecraft/server/achievements/progress/create': {'function': 'MinecraftController.createAchievementProgress', protected: true},

    // # SANCTIONS
    'post /minecraft/server/sanctions/create': {'function': 'MinecraftController.applySanction', protected: true},
    'post /minecraft/server/sanctions/remove': {'function': 'MinecraftController.removeSanction', protected: true},
    'post /minecraft/server/sanctions/update': {'function': 'MinecraftController.updateSanctionStatus', protected: true},

    'get /minecraft/server/sanctions/by-uuid/ban/:uuid': {'function': 'MinecraftController.getPlayerBanned', protected: true},
    'get /minecraft/server/sanctions/by-uuid/mute/:uuid': {'function': 'MinecraftController.getPlayerMuted', protected: true},
    'get /minecraft/server/sanctions/by-uuid/all/:uuid/:sanctionType': {'function': 'MinecraftController.getAllSanctions', protected: true},
    'get /minecraft/server/sanctions/by-uuid/all-active/:uuid/:sanctionType': {'function': 'MinecraftController.getAllActiveSanctions', protected: true},
    'get /minecraft/server/sanctions/by-uuid/all-passive/:uuid/:sanctionType': {'function': 'MinecraftController.getAllPassiveSanctions', protected: true},
    'get /minecraft/server/sanctions/moderator/:uuid': {'function': 'MinecraftController.getAllModeratorSanctions', protected: true},

    'post /minecraft/server/permissions': {'function': 'MinecraftController.getPermissionsByType', protected: true},

    'get /case/:id': {'function': 'UserController.getCaseById', protected: false},
    'get /case/:id/certificate/:certId': {'function': 'UserController.getCertificate', protected: false},
}

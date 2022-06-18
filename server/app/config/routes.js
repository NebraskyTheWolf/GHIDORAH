module.exports = {
    'get /user/:id': {'function': 'UserController.getUserById', protected: false},
    'get /user/by-name/:username': {'function': 'UserController.getUserByName', protected: false},
    'get /role/:id/:guild': {'function': 'UserController.getRoleById', protected: false},

    'get /user/activate/:id': {'function': 'UserController.activateUser', protected: false},
    'get /user/by-token/:token': {'function': 'UserController.getUserByToken', protected: false},
    'get /users/online': {'function': 'UserController.getOnlineUsers', protected: false},

    'get /users/messages': {'function': 'UserController.getTotalMessages', protected: false},
    'get /users/messages/:guildId': {'function': 'UserController.getTotalMessagesById', protected: false},

    'get /users/:id/:guild/sanctions': {'function': 'UserController.getUserSanction', protected: false},
    'post /users/:id/:guild/:sanctionId/update': {'function': 'UserController.updateSanction', protected: false},
    'post /users/:id/:guild/add': {'function': 'UserController.addSanction', protected: false},
    'get /users/sanction/:id/:guild': {'function': 'UserController.getSanctionById', protected: false},

    'get /users/isBlacklisted/:id': {'function': 'UserController.isBlacklisted', protected: false},

    'get /user/:id/stats/:guild': {'function': 'UserController.fetchUser', protected: false},
    'get /users/staff': {'function': 'UserController.fetchStaff', protected: false},

    'get /user/:id/level/:guild': {'function': 'UserController.getUserLevel', protected: false},
    'get /user/:id/presence/:guild': {'function': 'UserController.getUserPresence', protected: false},

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

    'get /user/by-id/:userid/:guildId': {'function': 'ServerController.getUsernameByID', protected: false},
    'get /user/by-id/:userid/:guildId/level': {'function': 'ServerController.fetchLevel', protected: false},

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
    'get /miencraft/player/:uuid': {'function': 'MinecraftController.getPlayerByUUID', protected: true},
    'post /miencraft/player/create': {'function': 'MinecraftController.createPlayer', protected: true},
    'post /miencraft/player/update': {'function': 'MinecraftController.updatePlayer', protected: true},

    // # PLAYER SETTINGS
    'get /miencraft/player/settings/:uuid': {'function': 'MinecraftController.getPlayerSettingsByUUID', protected: true},
    'post /miencraft/player/settings/create': {'function': 'MinecraftController.createSettingsPlayer', protected: true},
    'post /miencraft/player/settings/update': {'function': 'MinecraftController.updateSettingsPlayer', protected: true},

    // # PROMOTIONS
    'get /miencraft/server/promotions': {'function': 'MinecraftController.getAllActivePromotions', protected: true},
    'get /miencraft/server/promotions/:promotionId': {'function': 'MinecraftController.getPromotionByID', protected: true},
    'post /miencraft/server/promotions/create': {'function': 'MinecraftController.createPromotions', protected: true},
    'post /miencraft/server/promotions/delete': {'function': 'MinecraftController.deletePromotions', protected: true},
    
    // # TRANSACTIONS
    'get /miencraft/server/transactions/:uuid/:selected': {'function': 'MinecraftController.getTransactions', protected: true},
    'get /miencraft/server/transactions/:uuid/:gameId/:selected': {'function': 'MinecraftController.getTransactionsByGame', protected: true},
    'post /miencraft/server/transactions/create': {'function': 'MinecraftController.createPromotions', protected: true},
    'post /miencraft/server/transactions/update': {'function': 'MinecraftController.updatePromotions', protected: true},

    // # NICKNAME
    'get /miencraft/server/nicknames/random': {'function': 'MinecraftController.getRandomNickname', protected: true},
    'get /miencraft/server/nicknames/isBlacklisted': {'function': 'MinecraftController.isNicknameBlacklisted', protected: true},
    'post /miencraft/server/nicknames/reserve': {'function': 'MinecraftController.reserveNickname', protected: true},
    'post /miencraft/server/nicknames/free': {'function': 'MinecraftController.freeNickname', protected: true},

    // # MESSAGES
    'get /miencraft/server/messages': {'function': 'MinecraftController.getScheduledMessages', protected: true},
    'get /miencraft/server/messages/:messageId': {'function': 'MinecraftController.getScheduledMessage', protected: true},
    'post /miencraft/server/messages/update': {'function': 'MinecraftController.updateScheduledMessage', protected: true},
    'post /miencraft/server/messages/create': {'function': 'MinecraftController.createScheduledMessage', protected: true},

    // # ITEMS
    'get /miencraft/server/items': {'function': 'MinecraftController.getAllItemDescription', protected: true},
    'get /miencraft/server/items/:itemId': {'function': 'MinecraftController.getItemDescription', protected: true},
    'post /miencraft/server/items/update': {'function': 'MinecraftController.updateItemDescription', protected: true},
    'post /miencraft/server/items/create': {'function': 'MinecraftController.createItemDescription', protected: true},
 
    // # HOST
    'get /miencraft/server/hosts': {'function': 'MinecraftController.getAllHostRecord', protected: true},
    'get /miencraft/server/hosts/:hostId': {'function': 'MinecraftController.getHostRecord', protected: true},
    'post /miencraft/server/hosts/update': {'function': 'MinecraftController.updateHostRecord', protected: true},
    'post /miencraft/server/hosts/create': {'function': 'MinecraftController.createHostRecord', protected: true},

    // # GROUPS
    'get /miencraft/server/groups': {'function': 'MinecraftController.getAllPlayerGroups', protected: true},
    'get /miencraft/server/groups/:groupId': {'function': 'MinecraftController.getPlayerGroup', protected: true},
    'post /miencraft/server/groups/update': {'function': 'MinecraftController.updatePlayerGroup', protected: true},
    'post /miencraft/server/groups/create': {'function': 'MinecraftController.createPlayerGroup', protected: true},

    // # FRIENDSHIP
    'get /miencraft/server/friendship/requests/:uuid': {'function': 'MinecraftController.getFriendshipDemandList', protected: true},
    'get /miencraft/server/friendship/:uuid': {'function': 'MinecraftController.getFriendshipList', protected: true},
    'post /miencraft/server/friendship/post': {'function': 'MinecraftController.postFriendshipDemand', protected: true},
    'post /miencraft/server/friendship/accept': {'function': 'MinecraftController.acceptFriendshipDemand', protected: true},
    'post /miencraft/server/friendship/deny': {'function': 'MinecraftController.refuseFriendshipDemand', protected: true},

    // # EVENTS
    'get /miencraft/server/events': {'function': 'MinecraftController.getEvents', protected: true},
    'get /miencraft/server/events/:eventId': {'function': 'MinecraftController.getEvent', protected: true},
    'get /miencraft/server/events/time/:timestamp': {'function': 'MinecraftController.getEventTime', protected: true},
    'get /miencraft/server/events/winner/:eventId': {'function': 'MinecraftController.getEventWinners', protected: true},
    'post /miencraft/server/events/update': {'function': 'MinecraftController.updateEvent', protected: true},
    'post /miencraft/server/events/winner/update': {'function': 'MinecraftController.updateEventWinner', protected: true},
    'post /miencraft/server/events/create': {'function': 'MinecraftController.createEvent', protected: true},
    'post /miencraft/server/events/winner/create': {'function': 'MinecraftController.createWinnerEvent', protected: true},

    // # CONFIG
    'get /miencraft/server/config': {'function': 'MinecraftController.getConfig', protected: true},
    'post /miencraft/server/config/update': {'function': 'MinecraftController.updateConfig', protected: true},

    // # denounce
    'get /miencraft/server/denounces': {'function': 'MinecraftController.getDenounces', protected: true},
    'post /miencraft/server/denounce/create': {'function': 'MinecraftController.denouncePlayer', protected: true},

    // # ACHIEVEMENTS CATEGORY
    'get /miencraft/server/achievements/category': {'function': 'MinecraftController.getAchievementCategories', protected: true},
    'get /miencraft/server/achievements/category/:categoryId': {'function': 'MinecraftController.getAchievementCategory', protected: true},
    // # ACHIEVEMENTS
    'get /miencraft/server/achievements': {'function': 'MinecraftController.getAchievements', protected: true},
    'get /miencraft/server/achievements/:achievementId': {'function': 'MinecraftController.getAchievement', protected: true},
    // # ACHIEVEMENTS PROGRESS
    'get /miencraft/server/achievements/progress': {'function': 'MinecraftController.getAchievementProgresses', protected: true},
    'get /miencraft/server/achievements/progress/:progressId': {'function': 'MinecraftController.getAchievementProgress', protected: true},
    'post /miencraft/server/achievements/progress/update': {'function': 'MinecraftController.updateAchievementProgress', protected: true},
    'post /miencraft/server/achievements/progress/create': {'function': 'MinecraftController.createAchievementProgress', protected: true},
}

module.exports = {
    'get /user/:id': {'function': 'UserController.getUserById', protected: true},
    'get /user/by-name/:username': {'function': 'UserController.getUserByName', protected: true},
    'get /role/:id/:guild': {'function': 'UserController.getRoleById', protected: true},

    'get /user/activate/:id': {'function': 'UserController.activateUser', protected: true},
    'get /user/by-token/:token': {'function': 'UserController.getUserByToken', protected: true},
    'get /users/online': {'function': 'UserController.getOnlineUsers', protected: false},

    'get /users/messages': {'function': 'UserController.getTotalMessages', protected: true},
    'get /users/messages/:guildId': {'function': 'UserController.getTotalMessagesById', protected: true},

    'get /users/:id/:guild/sanctions': {'function': 'UserController.getUserSanction', protected: true},
    'post /users/:id/:guild/:sanctionId/update': {'function': 'UserController.updateSanction', protected: true},
    'post /users/:id/:guild/add': {'function': 'UserController.addSanction', protected: true},
    'get /users/sanction/:id/:guild': {'function': 'UserController.getSanctionById', protected: true},

    'get /users/isBlacklisted/:id': {'function': 'UserController.isBlacklisted', protected: false},

    'get /user/:id/stats/:guild': {'function': 'UserController.fetchUser', protected: true},
    'get /users/staff': {'function': 'UserController.fetchStaff', protected: false},

    'get /user/:id/level/:guild': {'function': 'UserController.getUserLevel', protected: true},
    'get /user/:id/presence/:guild': {'function': 'UserController.getUserPresence', protected: true},

    // HOOK NOTIFICATION

    'post /notification/hook': {'function': 'WebhookController.initNotification', protected: false},
    'post /notification/verify': {'function': 'WebhookController.verifyNotification', protected: true},
    'post /notification/register': {'function': 'FurconController.registerEvent', protected: true},

    // FURCON BACKEND SIDE FOR ENTRY CHECK ONLY
    // SECURITY ENFORCED.
    
    // manifest of the current planned event.
    'post /events/:eventId/manifest' : {'function': 'FurconController.getManifest', protected: true},
    'post /events/:eventId/border-check/:uuid' : {'function': 'FurconController.checkEntry', protected: true},
    'post /events/:eventId/border-check/:uuid/manifest' : {'function': 'FurconController.checkEntryManifest', protected: true},

    'post /user/verify/:id/:guild/create': {'function': 'VerifyController.create', protected: true},
    'get /user/verify/:id/:guild/fetch': {'function': 'VerifyController.fetch', protected: true},
    'get /user/verify/:guild/fetchAll': {'function': 'VerifyController.fetchAll', protected: true},
    'get /user/verify/:username/:guild/fetchByName': {'function': 'VerifyController.fetchByName', protected: true},
    'get /user/verify/:code/fetchByCode': {'function': 'VerifyController.fetchByCode', protected: true},
    'get /user/verify/:id/update': {'function': 'VerifyController.update', protected: true},
    'post /user/verify/:id/:guild/updateData': {'function': 'VerifyController.updateData', protected: true},

    // SERVERS
    'get /servers': {'function': 'ServerController.fetchServers', protected: true},
    'get /servers/by-id/:guildId': {'function': 'ServerController.getServerByID', protected: true},
    'get /servers/by-id/:guildId/members': {'function': 'ServerController.getServerMembers', protected: true},
    'get /servers/by-id/:guildId/config': {'function': 'ServerController.getServerConfig', protected: true},
    'get /servers/by-id/:guildId/leaderboard': {'function': 'ServerController.fetchLeaderboard', protected: true},
    'get /servers/by-id/:guildId/rules': {'function': 'ServerController.fetchRules', protected: true},

    'get /user/by-id/:userid/:guildId': {'function': 'ServerController.getUsernameByID', protected: true},
    'get /user/by-id/:userid/:guildId/level': {'function': 'ServerController.fetchLevel', protected: true},

    'get /server/by-owner/:ownerId': {'function': 'ServerController.fetchServerByOwner', protected: true},

    'post /discord/interactions': {'function': 'DiscordController.discordInteractions', protected: false},

    // V8 DATA PUSH

    // PAYLOAD SOCKET
    'post /server/payload': {'function': 'DataController.payload', protected: false},
    'post /server/payload/callback': {'function': 'DataController.callback', protected: false},

    // SOCIAL CALLBACK
    'post /callback/twitch': {'function': 'SocialController.twitchCallback', protected: true},
    'post /callback/youtube': {'function': 'SocialController.twitchCallback', protected: true},
    'post /callback/twitter': {'function': 'SocialController.twitchCallback', protected: true},

    // SOCIAL CALL
    'get /auth/twitch/:userId': {'function': 'TwitchController.login', protected: true},
}

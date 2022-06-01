module.exports = {
    'get /user/:id': {'function': 'UserController.getUserById', protected: false},
    'get /user/by-name/:username': {'function': 'UserController.getUserByName', protected: false},
    'get /role/:id/:guild': {'function': 'UserController.getRoleById', protected: false},

    'get /user/activate/:id': {'function': 'UserController.activateUser', protected: false},
    'get /user/by-token/:token': {'function': 'UserController.getUserByToken', protected: false},
    'get /users/online': {'function': 'UserController.getOnlineUsers', protected: false},

    'get /users/messages': {'function': 'UserController.getTotalMessages', protected: false},

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

}

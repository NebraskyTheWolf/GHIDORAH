module.exports = {
    'get /api/v1/user/:id': {'function': 'UserController.getUserById', protected: true},
    'get /api/v1/user/by-name/:username': {'function': 'UserController.getUserByName', protected: true},    
    'get /api/v1/users/online': {'function': 'UserController.getOnlineUsers', protected: true},

    'get /api/v1/users/messages': {'function': 'UserController.getTotalMessages', protected: true},
    'get /api/v1/users/messages/:guildId': {'function': 'UserController.getTotalMessagesById', protected: true},
    'get /api/v1/users/messages/by-user/:userId': {'function': 'UserController.getTotalMessagesByUser', protected: true},

    'get /api/v1/users/isBlacklisted/:id': {'function': 'UserController.isBlacklisted', protected: true},
    'get /api/v1/users/blacklist/all': {'function': 'UserController.fetchAllBlacklists', protected: true},
    'get /api/v1/users/isDev/:userId': {'function': 'UserController.fetchDev', protected: true},
    'post /api/v1/users/developer/add': {'function': 'UserController.addDev', protected: true},

    // SERVERS
    'get /api/v1/servers': {'function': 'ServerController.fetchServers', protected: true},
    'get /api/v1/servers/by-id/:guildId': {'function': 'ServerController.getServerByID', protected: true},
    'get /api/v1/servers/by-id/:guildId/members': {'function': 'ServerController.getServerMembers', protected: true},
    'get /api/v1/servers/by-id/:guildId/config': {'function': 'ServerController.getServerConfig', protected: true},
    'get /api/v1/servers/by-id/:guildId/leaderboard': {'function': 'ServerController.fetchLeaderboard', protected: true},
    'get /api/v1/servers/by-id/:guildId/rules': {'function': 'ServerController.fetchRules', protected: true},
    'get /api/v1/servers/by-id/:guildId/verification/by-user/:userId': {'function': 'ServerController.checkVerify', protected: true},
    'get /api/v1/servers/by-id/:guildId/verification': {'function': 'ServerController.fetchAllVerify', protected: true},
    'get /api/v1/servers/by-id/:guildId/verification/counts': {'function': 'ServerController.countVerify', protected: true},
    'get /api/v1/user/by-id/:userid/:guildId': {'function': 'ServerController.getUsernameByID', protected: true},
    'get /api/v1/user/by-id/:userid/:guildId/level': {'function': 'ServerController.fetchLevel', protected: true},
    'post /api/v1/servers/by-id/:guildId/rules/create': {'function': 'ServerController.createRules', protected: true},
    'get /api/v1/server/by-owner/:ownerId': {'function': 'ServerController.fetchServerByOwner', protected: true},

    // SERVICES

    'get /services/fetch/:clientId': {'function': 'ServicesController.fetch', protected: false},
    'get /services/fetch/:clientId/scopes': {'function': 'ServicesController.fetchScopes', protected: false}

};
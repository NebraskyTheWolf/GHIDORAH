module.exports = {
    'get /user/:id': {'function': 'UserController.getUserById', protected: false},
    'get /user/by-name/:username': {'function': 'UserController.getUserByName', protected: false},
    'get /role/:id': {'function': 'UserController.getRoleById', protected: false},
    'get /user/activate/:id': {'function': 'UserController.activateUser', protected: false},
    'get /user/by-token/:token': {'function': 'UserController.getUserByToken', protected: false},
    'get /users/online': {'function': 'UserController.getOnlineUsers', protected: false},

    'get /users/:id/sanctions': {'function': 'UserController.getUserSanction', protected: false},
    'post /users/:id/:sanctionId/update': {'function': 'UserController.updateSanction', protected: false},
    'post /users/:id/add': {'function': 'UserController.addSanction', protected: false},
    'get /users/sanction/:id': {'function': 'UserController.getSanctionById', protected: false},

    'get /users/isBlacklisted/:id': {'function': 'UserController.isBlacklisted', protected: false},

    'get /user/:id/stats': {'function': 'UserController.fetchUser', protected: false},
    'get /users/staff': {'function': 'UserController.fetchStaff', protected: false},

    'get /user/:id/level': {'function': 'UserController.getUserLevel', protected: false},
    'get /user/:id/presence': {'function': 'UserController.getUserPresence', protected: false},

    // HOOK NOTIFICATION

    'post /notification/hook': {'function': 'WebhookController.initNotification', protected: false},

    'post /user/verify/:id/create': {'function': 'VerifyController.create', protected: false},
    'get /user/verify/:id/fetch': {'function': 'VerifyController.fetch', protected: false},
    'get /user/verify/fetchAll': {'function': 'VerifyController.fetchAll', protected: false},
    'get /user/verify/:username/fetchByName': {'function': 'VerifyController.fetchByName', protected: false},
    'get /user/verify/:code/fetchByCode': {'function': 'VerifyController.fetchByCode', protected: false},
    'get /user/verify/:id/update': {'function': 'VerifyController.update', protected: false},
    'post /user/verify/:id/updateData': {'function': 'VerifyController.updateData', protected: false},
}

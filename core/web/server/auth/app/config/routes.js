module.exports = {
    'get /': {'function': 'ApiController.fetch', protected: false},
    'get /status': {'function': 'ApiController.fetchStatus', protected: false},

    'post /user': {'function': 'UserController.fetchUser', protected: true},
    'post /user/search': {'function': 'UserController.search', protected: true},

    'post /user/sessions': {'function': 'UserController.fetchHistory', protected: true},
    'post /user/sessions/revoke': {'function': 'UserController.revokeSession', protected: true},
    'post /user/sessions/create': {'function': 'UserController.createHistory', protected: true},

    'post /user/terminate': {'function': 'UserController.terminateSession', protected: true},
    'post /user/edit': {'function': 'UserController.editUser', protected: true},
    'post /user/delete': {'function': 'UserController.deleteUser', protected: true},

    'post /auth/login': {'function': 'AuthController.authenticate', protected: false},
    'post /auth/register': {'function': 'AuthController.register', protected: false},
    'get /auth/authorizaton/:oauthKey': {'function': 'AuthController.submit', protected: false},
}
module.exports = {
    'get /auth/': {'function': 'ApiController.fetch', protected: false},
    'get /auth/status': {'function': 'ApiController.fetchStatus', protected: false},

    'post /auth/user': {'function': 'UserController.fetchUser', protected: true},
    'post /auth/user/search': {'function': 'UserController.search', protected: true},

    'post /auth/user/sessions': {'function': 'UserController.fetchHistory', protected: true},
    'post /auth/user/sessions/revoke': {'function': 'UserController.revokeSession', protected: true},
    'post /auth/user/sessions/create': {'function': 'UserController.createHistory', protected: true},

    'post /auth/user/terminate': {'function': 'UserController.terminateSession', protected: true},
    'post /auth/user/edit': {'function': 'UserController.editUser', protected: true},
    'post /auth/user/delete': {'function': 'UserController.deleteUser', protected: true},

    'post /auth/login': {'function': 'AuthController.authenticate', protected: false},
    'post /auth/register': {'function': 'AuthController.register', protected: false},
    'get /auth/authorizaton/:response_type:/:client_id/:scope/': {'function': 'AuthController.submit', protected: false},
}
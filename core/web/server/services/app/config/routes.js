module.exports = {
    'get /services/': {'function': 'ApiController.fetch', protected: false},
    'get /services/fetch/:clientId': {'function': 'ServicesController.fetch', protected: false},
    'get /services/fetch/:clientId/scopes': {'function': 'ServicesController.fetchScopes', protected: false}
};
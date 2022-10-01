module.exports = {
    fetch: async function (req, res) {
        if (req.params.clientId === undefined)
            res.status(404).json({
                status: false,
                error: 'Invalid request body.'
            });
        
        const service = await client.Database.fetchService(req.params.clientId);
        if (service)
            res.status(200).json({
                status: true,
                data: service
            });
        else
            res.status(404).json({
                status: false,
                data: {}
            });
    },

    fetchScopes: async function (req, res) {
        if (req.params.clientId === undefined)
            res.status(404).json({
                status: false,
                error: 'Invalid request body.'
            });
        const service = await client.Database.fetchService(req.params.clientId);
        if (service)
            res.status(200).json({
                status: true,
                data: service.scopes
            });
        else
            res.status(404).json({
                status: false,
                data: {}
            });
    }
}
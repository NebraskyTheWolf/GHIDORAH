module.exports = {
    payload: {
        key: 'apllications@list',
        side: 'server',
        protected: true
    },

    async execute(client, app, data) {
        const apps = client.Database.fetchApplications();

        if (apps) {
            return {
                statusCode: "ALLOWED",
                data: {
                    message: 'PASS',
                    applications: apps
                }
            }
        } else {
            return {
                statusCode: "FAILED",
                data: {
                    message: 'NO_APPLICATIONS_FOUND',
                    applications: {}
                }
            }
        }
    }
}
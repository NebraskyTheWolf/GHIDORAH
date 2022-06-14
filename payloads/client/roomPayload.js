module.exports = {
    payload: {
        key: 'room@link',
        side: 'server',
        protected: true
    },

    async execute(client, app, data) {
        return {
            statusCode: "ALLOWED",
            data: {
                message: 'ALLOWED_TEST'
            }
        }
    }
}
module.exports = {
    payload: {
        key: 'handshake',
        side: 'server',
        protected: true
    },

    async execute(client, app, data) {
        if (typeof (data.opcode) === String) {
            
        }
    }
}
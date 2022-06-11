const KeyChain = require('keychain');
const fingerprint = require('key-fingerprint');

module.exports = {
    payload: {
        key: 'room@link',
        side: 'server',
        protected: true
    },

    async execute(client, app, data) {
        return {
            statusCode: "ALLOWED",
            keychains: {},
            fingerprints: fingerprint(process.env.PUBLIC_KEY, { encoding: 'hex', algorithm: 'sha512' }),

            data: {
                message: 'ALLOWED_TEST'
            }
        }
    }
}
const KeyChain = require('keychain');
const { fingerprint } = require('key-fingerprint');

module.exports = {
    payload: {
        key: 'room@link',
        side: 'server',
        protected: true
    },

    async execute(client, app, data) {
        let keys = new KeyChain({
            a: { b: { alg: 'RS256' } },
            c: { d: { alg: 'RS256' } },
            e: { f: { alg: 'RS256', modulusLength: 4096 } }
        });

        keys.rotate();

        return {
            statusCode: "ALLOWED",
            keychains: keys.jwkSet,
            fingerprints: fingerprint(process.env.PUBLIC_KEY, { encoding: 'hex', algorithm: 'sha512' }),

            data: {
                message: 'ALLOWED_TEST'
            }
        }
    }
}
const { fingerprint } = require('key-fingerprint');

module.exports = {
    payload: {
        key: 'discord@ban',
        side: 'server',
        protected: true
    },

    async execute(client, app, data) {
        if (data.guild_id && data.member_id && ata.ban_reason) {
            const user = client.guilds.cache.get(data.guild_id).members.cache.get(data.member_id);
            if (user) {
                user.ban(data.ban_reason);
                return {
                    statusCode: "ALLOWED",
                    keychains: {},
                    fingerprints: fingerprint(process.env.PUBLIC_KEY, { encoding: 'hex', algorithm: 'sha512' }),
        
                    data: {
                        userId: user.id,
                        code: 'BANNED'
                    }
                }
            } else {
                return {
                    statusCode: "FAILED",
                    keychains: {},
                    fingerprints: fingerprint(process.env.PUBLIC_KEY, { encoding: 'hex', algorithm: 'sha512' }),
        
                    data: {
                        userId: user.id,
                        code: 'NOT_FOUND'
                    }
                }
            }
        } else {
            return {
                statusCode: "REJECTED",
                keychains: {},
                fingerprints: fingerprint(process.env.PUBLIC_KEY, { encoding: 'hex', algorithm: 'sha512' }),
    
                data: {
                    userId: user.id,
                    code: 'INVALID_PAYLOAD_BODY'
                }
            }
        }
    }
}
module.exports = {
    payload: {
        key: 'discord@ban',
        side: 'server',
        protected: true
    },

    async execute(client, app, data) {
        if (data.guild_id && data.member_id && data.ban_reason) {
            const user = client.guilds.cache.get(data.guild_id).members.cache.get(data.member_id);
            if (user) {
                user.ban(data.ban_reason);
                return {
                    statusCode: "ALLOWED",        
                    data: {
                        userId: user.id,
                        code: 'BANNED'
                    }
                }
            } else {
                return {
                    statusCode: "FAILED",
                    data: {
                        userId: user.id,
                        code: 'NOT_FOUND'
                    }
                }
            }
        } else {
            return {
                statusCode: "REJECTED",
                data: {
                    userId: user.id,
                    code: 'INVALID_PAYLOAD_BODY'
                }
            }
        }
    }
}
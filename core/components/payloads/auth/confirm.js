module.exports = {
    payload: {
        key: 'request@askConfirm',
        side: 'server',
        protected: true
    },
    async execute(client, app, data) {
        const guild   = await client.guilds.cache.get(data.serverId);
        const request = await client.Database.fetchOauthByOID(data.objectId);
        if (request) {
            guild.fetchOwner().then(data => {
                guild.members.cache.get(data.id).send({
                    embeds: [
                        {
                            title: `Login requested on ${data.serviceName}.`,
                            description: `Action required: please allow this request by clicking on 'Allow' or disallow it if you are not responsible of this.`
                        }
                    ],
                    components: [
                        {
                            type: 1,
                            components: [
                                {
                                    "style": 3,
                                    "label": `Allow`,
                                    "custom_id": `row_id_auth_${request._id}_allow`,
                                    "disabled": false,
                                    "type": 2
                                },
                                {
                                    "style": 4,
                                    "label": `Disallow`,
                                    "custom_id": `row_id_auth_${request._id}_disallow`,
                                    "disabled": false,
                                    "type": 2
                                }
                            ]
                        }
                    ]
                });
            });
        } else {
            client.logger.log('WARN', `Invalid request #${data.objectId} ignored.`);
        }
    }
}
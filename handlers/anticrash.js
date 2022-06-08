module.exports = (client) => {
    const channel = client.guilds.cache.get('917714328327692338').channels.cache.get('984100098487230504');
    let errorId = 0;
    process.on("unhandledRejection", async (reason, p) => {
        errorId++;
        if (client.IsDebug)
            client.logger.log('ERROR', `${reason}, ${p}`);
        
        
        channel.send({
            "components": [
                {
                  "type": 1,
                  "components": [
                    {
                      "style": 4,
                      "label": `RESTART NOW`,
                      "custom_id": `row_reload`,
                      "disabled": false,
                      "type": 2
                    }
                  ]
                }
              ],
              "embeds": [
                {
                  "type": "rich",
                  "title": `unhandledRejection #${errorId}`,
                  "description": `ERROR: \n\n \`\`\` ${reason} \`\`\` \n\nORIGIN:\n\n \`\`\` ${p} \`\`\` \n\nSERVICE:\n\n \`\`\` GHIDORAH \`\`\``,
                  "color": 0xff003c,
                  "fields": [
                    {
                      "name": `VERSION`,
                      "value": `5.2.3`,
                      "inline": true
                    },
                    {
                      "name": `NODEJS`,
                      "value": `v${process.version}`,
                      "inline": true
                    },
                    {
                      "name": `API STATE`,
                      "value": `ALIVE_ACK`,
                      "inline": true
                    }
                  ]
                }
            ]
        });
    });
    process.on("uncaughtException", (err, origin) => {
        errorId++;
        if (client.IsDebug)
            client.logger.log('ERROR', `${err}, ${origin}`);
        
        channel.send({
            "components": [
                {
                  "type": 1,
                  "components": [
                    {
                      "style": 4,
                      "label": `RESTART NOW`,
                      "custom_id": `row_reload`,
                      "disabled": false,
                      "type": 2
                    }
                  ]
                }
              ],
              "embeds": [
                {
                  "type": "rich",
                  "title": `unhandledRejection #${errorId}`,
                  "description": `ERROR: \n\n \`\`\` ${err} \`\`\` \n\nORIGIN:\n\n \`\`\` ${origin} \`\`\` \n\nSERVICE:\n\n \`\`\` GHIDORAH \`\`\``,
                  "color": 0xff003c,
                  "fields": [
                    {
                      "name": `VERSION`,
                      "value": `5.2.3`,
                      "inline": true
                    },
                    {
                      "name": `NODEJS`,
                      "value": `v${process.version}`,
                      "inline": true
                    },
                    {
                      "name": `API STATE`,
                      "value": `ALIVE_ACK`,
                      "inline": true
                    }
                  ]
                }
            ]
        });
    });
}
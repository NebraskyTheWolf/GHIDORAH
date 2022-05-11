module.exports = {
    initNotification: function (req, res) {
        let data = req.body;

        client.events.emit('githubPush', {status: true, data: data});

        const logChannel = client.guilds.cache.get('917714328327692338')
            .channels.cache.get('970398815490293860');

        logChannel.send({
            "embeds": [
                {
                  "type": "rich",
                  "title": `SKF Industries - GHIDORAH NEW UPDATE!`,
                  "description": `Added: \`\`\` ${data.head_commit.added} \`\`\` Removed: \`\`\` ${data.head_commit.removed} \`\`\` Modified: \`\`\` ${data.head_commit.modified} \`\`\` Commit: \`\`\` ${data.commits[0].message} \`\`\` Commit ID: \`\`\` ${data.head_commit.id} \`\`\``,
                  "color": 0xff0066,
                  "fields": [
                    {
                      "name": `Reference`,
                      "value": `${data.ref}`,
                      "inline": true
                    },
                    {
                      "name": `Repository`,
                      "value": `${data.repository.full_name}`,
                      "inline": true
                    },
                    {
                      "name": `Pushed by`,
                      "value": `${data.repository.owner.name}`,
                      "inline": true
                    }
                  ]
                }
            ]
        });

        res.status(200).end();

        
    },
};
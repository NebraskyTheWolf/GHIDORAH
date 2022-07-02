Parser = require("rss-parser"),
parser = new Parser(),

module.exports = {
    task: {
        name: 'youtubecheck',
        cronTime: 30000
    },
    async execute() {
        await client.Database.getAllYoutubers().then(async youtubers => {
            console.log(youtubers[0])
            for (i = 0; i < youtubers.length; i++) {
                await client.Database.fetchGuild(youtubers[i].guildId).then(async guild => {
                    parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${youtubers[i].channelURL}`)
                    .then(async data => {
                        await client.Database.checkYoutubeVideo(youtubers[i].guildId, data.items[0].link)
                        .catch(async () => {
                            await client.Database.createYoutubeVideo(youtubers[i].guildId, data.items[0].link)
                            .then(async finalVideo => {
                                if (guild.socials.youtubeChannel) {
                                    console.log(data);
                                    await client.guilds.cache.get(guild.id).channels.cache.get(guild.socials.youtubeChannel).send({
                                        "components": [
                                            {
                                              "type": 1,
                                              "components": [
                                                {
                                                  "style": 5,
                                                  "label": `Watch now!`,
                                                  "url": data.items[0].link,
                                                  "disabled": false,
                                                  "emoji": {
                                                    "id": `723870438350127115`,
                                                    "name": `kmYoutube`,
                                                    "animated": false
                                                  },
                                                  "type": 2
                                                }
                                              ]
                                            }
                                        ],
                                          "embeds": [
                                            {
                                              "type": "rich",
                                              "title": data.items[0].title,
                                              "description": data.items[0].media.description,
                                              "color": 0xeb0606,
                                              "image": {
                                                  "url": data.items[0].media.thumbnail.url,
                                                  "height": data.items[0].media.thumbnail.height,
                                                  "width": data.items[0].media.thumbnail.width
                                              }
                                            }
                                        ]
                                    });
                                } else {
                                   await client.logger.log('WARN', `Notification channel not set up for ${guild.id}`);
                                }
                            })
                        });
                    });
                });
            }
        });
    }
}
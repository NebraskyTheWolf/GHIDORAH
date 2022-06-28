const { QueryType } = require('discord-player');

const Discord = require("discord.js");
module.exports = {
    name: "play",
    description: "play music",
    commandOptions: [
        {
            name: 'musics',
            description: 'Type the name of the music you want to play.',
            type: 3,
            required: true
        }
    ],
    async execute(interaction) {
        const name = interaction.data.options[0].value;

        const guild = await client.guilds.fetch(guildId);
        const guildMember = await guild.members.fetch(interaction.member.user.id);

        if (client.MusicController.isInChannel(guildMember)) {
            const res = await client.player.search(name, {
                requestedBy: guildMember,
                searchEngine: QueryType.AUTO
            });

            console.log(res);

            if (!res || !res.tracks.length) {
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    "data": {
                        "type": 4,
                        "data": {
                            "components": [
                                {
                                "type": 1,
                                "components": [
                                    {
                                    "style": 4,
                                    "label": `Track not found.`,
                                    "custom_id": `row_0_button_0`,
                                    "disabled": true,
                                    "emoji": {
                                        "id": `920840187230158848`,
                                        "name": `TFA_Music`,
                                        "animated": false
                                    },
                                    "type": 2
                                    }
                                ]
                                }
                            ],
                            "ephemeral": true
                        }
                    }
                });
                return;
            }

            const queue = await client.player.createQueue(guild, {
                    leaveOnEnd: true,
                    autoSelfDeaf: true,
                    metadata: interaction.channel
            });

            console.log(queue);
        
            try {
                console.log(guildMember.voice.channel)
                console.log(guildMember.voice.channelId)
                if (!guildMember.voice.channelId) await queue.connect(guildMember.voice.channel)
            } catch {
                await client.player.deleteQueue(guild.id);
                return;
            }
            
            res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);
            if (!queue.playing) await queue.play()
        }
    }
}
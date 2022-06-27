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

        const res = await client.player.search(name, {
            requestedBy: interaction.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return;

        const queue = await client.player.createQueue(interaction.guild, {
                leaveOnEnd: true,
                autoSelfDeaf: true,
                metadata: interaction.channel
        });
    
        try {
            if (!interaction.guild.me.voice.channelID) await queue.connect(interaction.member.voice.channel)
        } catch {
            await client.player.deleteQueue(interaction.guild.id);
            return;
        }
       
        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);
        if (!queue.playing) await queue.play()
    }
}
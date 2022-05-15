const {MessageEmbed, Collection} = require('discord.js');

const currentDate = new Date();
const timestamp = currentDate.getTime() + (1 * 24 * 60 * 60 * 1000);

module.exports = {
    task: {
        name: 'purge',
        cronTime: '20 * * * * *'
    },
    async execute() {

    }
}
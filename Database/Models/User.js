const mongoose = require("mongoose");

module.exports = mongoose.model("User", new mongoose.Schema({
    id: { type: String },
    registeredAt: { type: Number, default: Date.now() },

    stats: { type: Object, default: {
        online: {
            total_time: null,
            last_connection: null
        },
        stats: {
            level: null,
            experience: null,
            money: null,
            kills: null,
            deaths: null,
            wins: null,
            fights: null,
            blocks: {
                placed: null,
                broken: null
            }
        },
        versions: null,
        skin: null,
        cape: null
    }},

    successList: { type: Object, default: [
        {
            name: 'online.time',
            values: [50, 100, 250, 500, 1000],
            type: ['user']
        },
        {
            name: 'kills',
            values: [10, 50, 100, 500, 1000],
            type: ['user', 'faction']
        },
        {
            name: 'money',
            values: [100, 1000, 10000],
            type: ['user', 'faction']
        }
    ]}
}));
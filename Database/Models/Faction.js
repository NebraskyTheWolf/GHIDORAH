const mongoose = require("mongoose");

module.exports = mongoose.model("Factions", new mongoose.Schema({
    id: { type: String }, 
    registeredAt: { type: Number, default: Date.now() },

    faction: { type: Object, default: {
        name: null,
        prefix: null,
        description: null,
        accentColour: null,
        money: null,
        rankedPoints: null,
        info: {
            fights: null,
            wins: null,
            lose: null,
            kills: null,
            damages: null,
            blockBreak: null,
            blockPlace: null,
            resources: null
        },
        players: null,
        ownerId: null
    }}
}));
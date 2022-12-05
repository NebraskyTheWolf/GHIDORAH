const mongoose = require("mongoose");

module.exports = mongoose.model('Game', new mongoose.Schema({
    gameName: { type: String },
    protocol: { type: String },
    serverIp: { type: String },

    issuer: { type: String },
    registeredAt: { type: Date, default: new Date() }
}));
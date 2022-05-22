const mongoose = require("mongoose");

module.exports = mongoose.model("Sanctions", new mongoose.Schema({
    id: { type: String },
    guildId: { type: String }, 
    data: { type: Object, default: {
        username: null,
        reason: null,
        by: null,
        registeredAt: { type: Number, default: Date.now() },
        expirationDate: null,
        type: null, // KICK = 1, TIMEOUT = 2, BAN = 3, WARN = 4
        active: { type: Boolean, default: true }
    }}
}));
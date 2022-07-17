const mongoose = require("mongoose");

module.exports = mongoose.model("Modmail", new mongoose.Schema({
    id: { type: String }, 
    guildId: { type: String },
    registeredAt: { type: Number, default: Date.now() },

    data: { type: String, default: {
        mainChannel: null,
        moderatorRole: null,
        enabled: false,
    }}
}));
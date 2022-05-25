const mongoose = require("mongoose");

module.exports = mongoose.model("Usermail", new mongoose.Schema({
    id: { type: String }, 
    guildId: { type: String },
    registeredAt: { type: Number, default: Date.now() },

    data: { type: Object, default: {
        code: null,
        channelId: null,
        enabled: false,
    }}
}));
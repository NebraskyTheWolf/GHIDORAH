const mongoose = require("mongoose");

module.exports = mongoose.model("Youtubers", new mongoose.Schema({
    youtuberId: { type: String }, 
    userId: { type: String }, 
    guildId: { type: String },

    channelURL: { type: String },
    registeredAt: { type: Number, default: Date.now() }
}));
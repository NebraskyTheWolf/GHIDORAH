const mongoose = require("mongoose");

module.exports = mongoose.model("Videos", new mongoose.Schema({
    videoId: { type: String }, 
    guildId: { type: String },

    videoURL: { type: String },
    registeredAt: { type: Number, default: Date.now() }
}));
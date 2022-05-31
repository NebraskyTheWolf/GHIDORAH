const mongoose = require("mongoose");

module.exports = mongoose.model("Member", new mongoose.Schema({
    id: { type: String }, 
    guildID: { type: String },
    registeredAt: { type: Number, default: Date.now() },
    iconURL: { type: String, default: null}, 
    username: { type: String, default: null}, 
}));
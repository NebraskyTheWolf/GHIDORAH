const mongoose = require("mongoose");

module.exports = mongoose.model("Roles", new mongoose.Schema({
    serverId: { type: String }, 
    role: { type: Object },
    registeredAt: { type: Number, default: Date.now() }
}));
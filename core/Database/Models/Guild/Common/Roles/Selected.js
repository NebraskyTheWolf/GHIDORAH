const mongoose = require("mongoose");

module.exports = mongoose.model("Selected", new mongoose.Schema({
    serverId: { type: String }, 
    userId: { type: String }, 
    roleId: { type: String }, 
    registeredAt: { type: Number, default: Date.now() }
}));
const mongoose = require("mongoose");

module.exports = mongoose.model("AuditLog", new mongoose.Schema({
    userId: { type: String }, 
    serverId: { type: String },

    username: { type: String },
    type: { type: String }, // CON_HISTORY // MOD_LOG // SYSTEM // BLACKLIST // 
    action: { type: String },

    registeredAt: { type: Number, default: Date.now() }
}));
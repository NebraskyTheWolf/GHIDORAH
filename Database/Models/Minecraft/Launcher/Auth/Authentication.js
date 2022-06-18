const mongoose = require("mongoose");

module.exports = mongoose.model("Authentication", new mongoose.Schema({
    userId: { type: String },
    
    data: { type: Object, default: {} },

    lastIp: { type: String, default: '' },
    lastConnection: { type: String, default: Date.now() },

    accountTerminated: { type: Boolean, default: false },
    connected: { type: Boolean, default: true }
}));
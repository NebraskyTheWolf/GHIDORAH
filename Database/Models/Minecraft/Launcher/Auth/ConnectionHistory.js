const mongoose = require("mongoose");

module.exports = mongoose.model("ConnectionHistory", new mongoose.Schema({
    userId: { type: String },
    
    data: { type: Object, default: {} },

    lastIp: { type: String, default: '' },
    lastConnection: { type: String, default: Date.now() }
}));
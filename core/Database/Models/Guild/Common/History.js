const mongoose = require("mongoose");

module.exports = mongoose.model("History", new mongoose.Schema({
    requestId: { type: String },

    remoteIp: { type: String },
    route: { type: String },
    method: { type: String },
    headers: { type: Object, default: [] },
    body: { type: Object, default: {} },
    session: { type: Object, default: {} }, 

    registeredAt: { type: Number, default: Date.now() }
}));
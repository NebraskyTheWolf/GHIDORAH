const mongoose = require("mongoose");

module.exports = mongoose.model("Marriages", new mongoose.Schema({
    id: { type: String },

    userId: { type: String },
    targetId: { type: String },

    status: { type: String, default: 'disabled' },
    registeredAt: { type: Number, default: Date.now() }
}));
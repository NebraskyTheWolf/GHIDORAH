const mongoose = require("mongoose");

module.exports = mongoose.model("Social", new mongoose.Schema({
    id: { type: String },
    registeredAt: { type: Number, default: Date.now() },

    platform: { type: String },
    linked: { type: Boolean, default: false },

    refreshToken: { type: String },
    accessToken: { type: String }
}));
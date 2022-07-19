const mongoose = require("mongoose");

module.exports = mongoose.model("Authentication", new mongoose.Schema({
    userId: { type: String }, 
    status: { type: String }, // ALLOWED, REJECTED, WAITING, TIMEDOUT, ERROR
    requestHash: { type: String },

    auth: { type: Object, default: {
        accessToken: null,
        refreshToken: null
    }},

    registeredAt: { type: Number, default: Date.now() }
}));
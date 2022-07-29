const mongoose = require("mongoose");

module.exports = mongoose.model("APIPing", new mongoose.Schema({
    ms: { type: Number },
    service: { type: String },
    registeredAt:  { type: Number, default: Date.now() },
}));
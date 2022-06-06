const mongoose = require("mongoose");

module.exports = mongoose.model("Application", new mongoose.Schema({
    appName: { type: String }, 
    appDescription: { type: String }, 
    appEnabled: { type: Boolean },
    token: { type: String },
    registeredAt: { type: Number, default: Date.now() }
}));
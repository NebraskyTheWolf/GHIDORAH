const mongoose = require("mongoose");

module.exports = mongoose.model("Category", new mongoose.Schema({
    serverId: { type: String }, 
    category: { type: Object },
    registeredAt: { type: Number, default: Date.now() }
}));
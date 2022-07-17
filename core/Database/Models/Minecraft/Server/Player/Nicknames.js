const mongoose = require("mongoose");

module.exports = mongoose.model("Nicnknames", new mongoose.Schema({
    nickname: { type: String },
    blacklisted: { type: Boolean },
    used: { type: Boolean },
}));
const mongoose = require("mongoose");

module.exports = mongoose.model("Denounces", new mongoose.Schema({
    denouncer: { type: String },
    date: { type: String },
    reason: { type: String },
    suspect_name: { type: String },
}));
const mongoose = require("mongoose");

module.exports = mongoose.model("Commit", new mongoose.Schema({
    id: { type: String },
    data: { type: Object },
}));
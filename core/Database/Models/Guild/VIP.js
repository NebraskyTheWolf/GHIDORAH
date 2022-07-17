const mongoose = require("mongoose");

module.exports = mongoose.model("Vip", new mongoose.Schema({
    userId: { type: String },
}));
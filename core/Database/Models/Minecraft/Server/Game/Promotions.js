const mongoose = require("mongoose");

module.exports = mongoose.model("Messages", new mongoose.Schema({
    type_id: { type: Number },
    game: { type: String },
    multiplier: { type: Number },
    message: { type: String },
    start_date: { type: String },
    end_date: { type: String },
}));
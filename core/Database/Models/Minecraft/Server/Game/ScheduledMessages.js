const mongoose = require("mongoose");

module.exports = mongoose.model("Messages", new mongoose.Schema({
    message_text: { type: String },
    schedule_time: { type: String }
}));
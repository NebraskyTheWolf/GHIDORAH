const mongoose = require("mongoose");

module.exports = mongoose.model("Configurations", new mongoose.Schema({
    motd: { type: String },
    close_type: { type: String },
    server_lines: { type: String },
    slots: { type: BigInt },
    max_players: { type: BigInt },
    priority_title: { type: String },
    welcome_message: { type: String },
}));
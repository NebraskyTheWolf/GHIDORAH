const mongoose = require("mongoose");

module.exports = mongoose.model("Hosts", new mongoose.Schema({
    template_id: { type: String },
    ip_address: { type: String },
    player_uuid: { type: String },
    started_time: { type: String },
    played_time: { type: String },
}));
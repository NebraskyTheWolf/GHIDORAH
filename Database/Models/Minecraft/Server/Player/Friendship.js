const mongoose = require("mongoose");

module.exports = mongoose.model("Friendship", new mongoose.Schema({
    requester_uuid: { type: String },
    recipient_uuid: { type: String },
    demand_date: { type: String },
    active_status: { type: Boolean },
    played_time: { type: String },
}));
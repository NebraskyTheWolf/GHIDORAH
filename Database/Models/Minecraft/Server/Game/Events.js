const mongoose = require("mongoose");

module.exports = mongoose.model("Events", new mongoose.Schema({
    event_organizer: { type: String },
    event_template: { type: String },
    reward_coins: { type: BigInt },
    reward_pearls: { type: BigInt },
    event_date: { type: String },
}));

module.exports = mongoose.model("EventWinners", new mongoose.Schema({
    event_id: { type: String },
    event_winner: { type: String }
}));
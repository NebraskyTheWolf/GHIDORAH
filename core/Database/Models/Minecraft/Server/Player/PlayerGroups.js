const mongoose = require("mongoose");

module.exports = mongoose.model("Groups", new mongoose.Schema({
    group_id: { type: Number },
    group_name: { type: String },
    rank: { type: Number },
    tag: { type: String },
    prefix: { type: String },
    suffix: { type: String },
    multiplier: { type: Number }
}));
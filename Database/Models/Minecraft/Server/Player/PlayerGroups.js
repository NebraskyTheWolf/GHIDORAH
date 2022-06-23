const mongoose = require("mongoose");

module.exports = mongoose.model("Groups", new mongoose.Schema({
    group_id: { type: BigInt },
    group_name: { type: String },
    rank: { type: BigInt },
    tag: { type: BigInt },
    prefix: { type: BigInt },
    suffix: { type: BigInt },
    multiplier: { type: BigInt }
}));
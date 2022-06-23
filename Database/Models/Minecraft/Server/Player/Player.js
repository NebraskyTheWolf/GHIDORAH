const mongoose = require("mongoose");

module.exports = mongoose.model("Players", new mongoose.Schema({
    uuid: { type: String },
    name: { type: String },
    nickname: { type: String },
    coins: { type: BigInt },
    stars: { type: BigInt },
    powders: { type: BigInt },
    last_login: { type: String },
    first_login: { type: String },
    last_ip: { type: String },
    topTpKey: { type: String },
    group_id: { type: BigInt },
}));
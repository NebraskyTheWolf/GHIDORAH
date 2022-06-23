const mongoose = require("mongoose");

module.exports = mongoose.model("Items", new mongoose.Schema({
    item_name: { type: String },
    item_desc: { type: String },
    price_coins: { type: Number },
    price_stars: { type: Number },
    game_category: { type: Number },
    item_minecraft_id: { type: String },
    item_rarity: { type: String },
    rank_accessibility: { type: String },
}));
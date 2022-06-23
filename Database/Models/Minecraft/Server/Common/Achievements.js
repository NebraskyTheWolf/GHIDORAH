const mongoose = require("mongoose");

module.exports = mongoose.model("AchievementsCategory", new mongoose.Schema({
    category_name: { type: String },
    category_description: { type: String },
    item_minecraft_id: { type: String },
    parent_id: { type: String },
}));

module.exports = mongoose.model("Achievements", new mongoose.Schema({
    achievement_name: { type: String },
    achievement_description: { type: String },
    progress_target: { type: String },
    category_id: { type: BigInt },
}));
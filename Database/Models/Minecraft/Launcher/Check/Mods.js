const mongoose = require("mongoose");

module.exports = mongoose.model("Mods", new mongoose.Schema({
    modId: { type: String },
    modName: { type: String },
    modDescriptions: { type: String },
    modHash: { type: String },
    modVersion: { type: String },
}));
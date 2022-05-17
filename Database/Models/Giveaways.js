const mongoose = require("mongoose");

module.exports = mongoose.model("Giveaways", new mongoose.Schema({
    id: { type: String }, 
    guild: { type: String },
    registeredAt: { type: Number, default: Date.now() },

    data: { type: String, default: {
        authorId: null,
        type: null, // DROP, GIVEAWAYS
        expirationDate: null,
        members: [],
        winners: [],
        prizeData: []
    }}
}));
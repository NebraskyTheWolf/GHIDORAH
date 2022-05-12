const mongoose = require("mongoose");

module.exports = mongoose.model("Verification", new mongoose.Schema({
    id: { type: String },
    registeredAt: { type: Number, default: Date.now() },

    code: { type: String }, // 000-000-00
    verified: { type: Boolean, default: false },
    user: { type: Object, default: {
        username: null,
        avatar: null,
        banner: null,
        discriminator: null,
        system: false,
        bot: false
    }},

    data: { type: Object, default: []}
}));
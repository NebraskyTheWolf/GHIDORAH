const mongoose = require("mongoose");

module.exports = mongoose.model("Oauth", new mongoose.Schema({
    id: { type: String },
    registeredAt: { type: Number, default: Date.now() },

    key: { type: String },
    activated: { type: Boolean, default: false },
    user: { type: Object, default: {
        username: null,
        roles: null,
        avatar: null,
        banner: null,
        discriminator: null,
        permissions: null,
        system: false,
        bot: false
    }}
}));
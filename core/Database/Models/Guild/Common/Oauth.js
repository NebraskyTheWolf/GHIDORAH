const mongoose = require("mongoose");

module.exports = mongoose.model("DashboardAccount", new mongoose.Schema({
    id: { type: String },
    serverId: { type: String },
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
const mongoose = require("mongoose");

module.exports = mongoose.model("Guild", new mongoose.Schema({
    id: { type: String },
    registeredAt: { type: Number, default: Date.now() },

    blacklist: { type: Object, default: {
        user: {
            active: false,
            id: "",
            author: "",
            reason: "",
            createdAt: "",
            action: "KICK"
        }
    }},

    config: { type: Object, default: {
        blacklist: {
            logChannelId: "",
            backup: false,
            readOnFile: false
        }
    }},

    modules: { type: Object, default: {
        dashboard: {
            host: "",
            port: "",
            ownerId: "",
            authenticateMode: "OAUTH"
        }
    }}

}));
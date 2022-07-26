const mongoose = require("mongoose");

module.exports = mongoose.model("Guild", new mongoose.Schema({
    id: { type: String },
    registeredAt: { type: Number, default: Date.now() },

    blacklist: { type: Object, default: {}},

    config: { type: Object, default: {
        blacklist: {
            logChannelId: "",
            backup: false,
            readOnFile: false
        },
        logging: {
            moderation: null,
            alert: null,
            blacklist: null,
            loggingEnabled: false
        },
        autorole: {
            unverified: null,
            verified: null,
            rules: null,
        },
        interaction: {
            prefix: null,
            allowed: [],
            enabled: true
        },
        options: {
            coreGuild: false
        },
        selfroles: {
            channelId: null,
            data: [],
            enabled: false
        }
    }},

    modules: { type: Object, default: {
        dashboard: {
            host: "",
            port: "",
            ownerId: "",
            authenticateMode: "OAUTH"
        }
    }},

    verification: { type: Object, default: {
        channels: {
            channelId: null,
            logChannel: null,
            welcomeMessage: null,
            welcomeChannel: null,
        },
        online: {
            enabled: false
        },
        requirementtext: null,
        disabled: false
    }},

    xpSystem: { type: Object, default: {
        config: {
            alertChannel: null,
            xpBoost: 0,
            rankImage: false,
        },
        active: false
    }},

    selfroles: { type: Object, default: {
        config: {
            categories: [],
            roles: [],
        },
        active: false
    }},
    blacklisted: { type: Boolean, default: false },

    socials: { type: Object, default: {
        youtubeChannel: null,
        tiktokChannel: null,
        twitchChannel: null
    }}
}));
const mongoose = require("mongoose");

module.exports = mongoose.model("UserProfile", new mongoose.Schema({
    userId: { type: String },
    userName: { type: String },
    userUUID: { type: String },
    
    iconURL: { type: String },
    bannerURL: { type: String },

    shopData: { type: Object, default: {} },

    badges: { type: Object, default: {} },
    permissions: { type: Object, default: {} },

    data: { type: Object, default: {} }
}));
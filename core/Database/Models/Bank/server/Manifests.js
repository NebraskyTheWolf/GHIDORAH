const mongoose = require("mongoose");

module.exports = mongoose.model("Manifests", new mongoose.Schema({
    bankId: { type: String },
    identifier: { type: String },
    registeredAt: { type: Number, default: Date.now() },

    manifest: { type: Object, default: {
        bank: {
            name: null,
            location: null,
            services: null
        }
    }}
}));
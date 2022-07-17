const mongoose = require("mongoose");

module.exports = mongoose.model("Card", new mongoose.Schema({
    accountId: { type: String }, // ACCOUNT UNIQUE ID
    bankId: { type: String }, // LINKED TO BANK
    userId: { type: String }, // USER DISCORD ID
    registeredAt: { type: Number, default: Date.now() },

    manifest: { type: Object, default: {
        qrcode: {
            code: null,
            identifier: null,
            nodesIdentifier: null,
            allowedAction: [
                0x1F,   // DEBITS
            ],
            disallowedAction: [
                0x2F,   // FUNDINGS
                0x3C,   // CREDITS
                0x4E,   // CANCELLING
            ]
        }
    }}
}));
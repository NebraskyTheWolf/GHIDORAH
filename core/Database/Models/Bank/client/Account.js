const mongoose = require("mongoose");

module.exports = mongoose.model("Account", new mongoose.Schema({
    accountId: { type: String }, // ACCOUNT UNIQUE ID
    bankId: { type: String }, // LINKED TO BANK
    userId: { type: String }, // USER DISCORD ID
    registeredAt: { type: Number, default: Date.now() },

    manifest: { type: Object, default: {
        informations: {
            fursona: {
                firstName: null,
                lastName: null,
                age: null,
                iconURL: null
            },
            irl: {
                firstName: null,
                lastName: null,
                age: null,
                ageVerified: false
            },
            terminated: false,
            hash: null,
        }, 
        status: {
            accountState: 0x1FFFF, // ACCOUNT ENABLED
            accountID: null
        }
    }}
}));
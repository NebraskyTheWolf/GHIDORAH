const mongoose = require("mongoose");

module.exports = mongoose.model("Transactions", new mongoose.Schema({
    accountId: { type: String }, // ACCOUNT UNIQUE ID
    bankId: { type: String }, // LINKED TO BANK
    userId: { type: String }, // USER DISCORD ID
    registeredAt: { type: Number, default: Date.now() },

    manifest: { type: Object, default: {
        transactionData: {
            transactionId: null,
            transactionLabel: null,
            transactionIdentifier: null,
            transactionState: null, // 0x1F == ACCEPTED // 0x0F = DENIED // 0x2F == ACCOUNT TERMINATED // 0x5F == SERVER ERROR
        },
        data: {} // TRANSACTION LOGS
    }}
}));
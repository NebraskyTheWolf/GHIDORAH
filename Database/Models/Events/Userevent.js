const mongoose = require("mongoose");

module.exports = mongoose.model("Userevent", new mongoose.Schema({
    userId: { type: String },
    registeredAt: { type: Number, default: Date.now() },

    manifest: { type: Object, default: {
        eventId: null, 
        informations: {
            hash: null,
            fursonaName: null,
            age: null,
            ageVerified: false,
            refsheetURL: null,
            iconURL: null,
        }, 
        status: {
            paid: false,
            paidDate: null,
            paidHash: null
        },
        qrcode: {
            code: null,
            validated: false
        }
    }}
}));
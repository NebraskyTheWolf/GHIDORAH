const mongoose = require("mongoose");

module.exports = mongoose.model("Reservation", new mongoose.Schema({
    id: { type: String },
    registeredAt: { type: Number, default: Date.now() },
    status: { type: String },
}));

module.exports = mongoose.model("Billing", new mongoose.Schema({
    id: { type: String },
    userId: { type: String },

    data: { type: Object, default: {
        price: null,
        method: null,
        transactionId: null,
        issuer: null,

        totalPaid: null,
        tips: null,
        status: null,
    }},

    company: { type: Object, default: {  }}, 
    /**
     * DATA TEMPLATE COMPANY
     * {
     *    name: null,
     *    capital: null,
     *    owner: null,
     *    logoURL: null,
     *    bannerURL: null,
     *    govCID: null,
     * }
     **/
    registeredAt: { type: Number, default: Date.now() }
}));
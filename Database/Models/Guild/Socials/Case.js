const mongoose = require("mongoose");

module.exports = mongoose.model("Cases", new mongoose.Schema({

    target: { type: Object, default: {
        firstName: null,
        middleName: null,
        lastName: null,
        faceURL: null,
        age: null,

        locations: {
            lat: null,
            long: null,
            country: null,
            city: null,
            state: null,
            postalCode: null,
            ISP: null
        },

        descriptions: [],
        cases: []
    }}, 

    accounts: { type: Object, default: {
        discord: [],
        twitter: [],
        tiktok: [],
        steam: [],
        facebook: [],
        spotify: [],
        xbox: [],
        psn: []
    }},

    files: { type: Object, default: []},
    registeredAt: { type: Number, default: Date.now() },
    updatedAt: { type: Number, default: Date.now() }
}));
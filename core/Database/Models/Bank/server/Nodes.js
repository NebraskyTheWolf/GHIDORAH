const mongoose = require("mongoose");

module.exports = mongoose.model("Nodes", new mongoose.Schema({
    nodeIdentifier: { type: String },
    registeredAt: { type: Number, default: Date.now() },

    manifest: { type: Object, default: {
        server: {
            NodeIP: null,
            NodeLocation: null,
            NodeAuthority: {
                certificates: null,
                fingerprints: null,
                hashes: [],
                allowedOpcodes: [
                    0x1FE, // DEBITS
                ]
            },
            workers: {
                operations: 0x5FC9E2, // Payments processing / ENCODING TRANSACTION IN A CHAIN WORKER
                chainable: true,
            },
            encoding: {
                algorithm: 'RSA-SSE2-HMAC256',
                forceEncrypt: true,
                checkValidate: true
            }
        }
    }}
}));
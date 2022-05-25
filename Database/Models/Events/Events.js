const mongoose = require("mongoose");

module.exports = mongoose.model("Event", new mongoose.Schema({
    eventId: { type: String }, 
    registeredAt: { type: Number, default: Date.now() },

    manifest: { type: Object, default: {
        eventType: null,
        eventLocation: {
            eventAddress: null,
            state: null,
            altitude: null,
            longitude: null,
        },
        eventInformations: {
            hotels: {},
            activity: {},
            staffMembers: {},
            subscriptionTiers: {},
            metadata: {
                eventState: 0x1FF, // AWAITING_REGISTERS
                eventDisplay: 0x0FF // PUBLIC
            }
        }
    }}
}));
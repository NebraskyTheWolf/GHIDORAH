const mongoose = require("mongoose");

module.exports = mongoose.model("Modules", new mongoose.Schema({
    id: { type: String }, // MODULES ID
    guild: { type: String }, // GUILD ID
    registeredAt: { type: Number, default: Date.now() }, // DATE OF REGISTERING

    modules: { type: Object, default: [  ] }
}));
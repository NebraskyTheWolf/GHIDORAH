const mongoose = require("mongoose");

module.exports = mongoose.model("Service", new mongoose.Schema({
    clientId: { type: String },
    serviceName: { type: String },
    restricted: { type: Boolean },
    scopes: { type: Object },
    options: { type: Object }
}));
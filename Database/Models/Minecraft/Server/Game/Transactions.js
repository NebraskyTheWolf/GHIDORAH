const mongoose = require("mongoose");

module.exports = mongoose.model("Transactions", new mongoose.Schema({
    price_coins: { type: Number },
    price_stars: { type: Number },
    transaction_date: { type: String },
    selected: { type: Boolean },
    uuid_buyer: { type: String },
}));
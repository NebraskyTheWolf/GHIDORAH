const mongoose = require("mongoose");

module.exports = mongoose.model("Groups", new mongoose.Schema({
    uuid: { type: String },
    jukebox_listen: { type: Boolean },
    group_demand_receive: { type: Boolean },
    friendship_demand_receive: { type: Boolean },
    notification_receive: { type: Boolean },
    private_message_receive: { type: Boolean },
    chat_visible: { type: Boolean },
    player_visible: { type: Boolean },
    waiting_line_notification: { type: Boolean },
    other_player_interaction: { type: Boolean },
    click_on_me_activation: { type: Boolean },
    allow_statistic_onclick: { type: Boolean },
    allow_coins_onclick: { type: Boolean },
    allow_powders_onclick: { type: Boolean },
    allow_click_on_other: { type: Boolean },
    elytra_activated: { type: Boolean }
}));
const mongoose = require("mongoose");

module.exports = mongoose.model("Configuration", new mongoose.Schema({    
     config: { type: Object, default: {
        bot: { type: Object },
        authentication: { type: Object },
        redis: { type: Object },
        session: { type: Object },
        webconfig: { type: Object },
        SocialsAPI: { type: Object },
        rank: { type: Object },
     }},
     version: { type: String },
     revision: { type: String },
     validated: { type: Boolean }
}));
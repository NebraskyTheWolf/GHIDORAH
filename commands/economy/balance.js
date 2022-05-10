const Discord = require("discord.js");
module.exports = {
    name: "bank",
    description: "Bank informations",
    commandOptions: [
        {
            "type": 1,
            "name": "pay",
            "description": "Send money to a user",
            "options": []
        },
        {
            "type": 1,
            "name": "sell",
            "description": "Sell an items",
            "options": []
        },
        {
            "type": 1,
            "name": "buy",
            "description": "Buy an available items",
            "options": []
        },
        {
            "type": 1,
            "name": "leaderboard",
            "description": "See the global leaderboard.",
            "options": []
        }
    ],
    execute(interaction) {
        
    }
}
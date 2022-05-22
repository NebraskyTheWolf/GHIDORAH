module.exports = {
    name: "config",
    description: "Configure your server.",
    commandOptions: [
        {
            "type": 1,
            "name": "autorole",
            "description": "change the autorole settings.",
            "options": [
                {
                    "type": 3,
                    "name": "type",
                    "description": "Choice the type",
                    "choices": [
                      {
                        "name": "unverified",
                        "value": "unverified"
                      },
                      {
                        "name": "verified",
                        "value": "verified"
                      },
                      {
                        "name": "rules",
                        "value": "rules"
                      }
                    ],
                    "required": true
                  },
                  {
                    "type": 8,
                    "name": "role",
                    "description": "choice the role",
                    "required": true
                  }
            ]
        },
        {
            "type": 1,
            "name": "logging",
            "description": "Setup your logging channels.",
            "options": [
                {
                    "type": 3,
                    "name": "type",
                    "description": "Choice a type",
                    "choices": [
                      {
                        "name": "moderation",
                        "value": "moderation"
                      },
                      {
                        "name": "alert",
                        "value": "alert"
                      },
                      {
                        "name": "blacklist",
                        "value": "blacklist"
                      }
                    ],
                    "required": true
                },
                {
                    "type": 7,
                    "name": "channel",
                    "description": "Select a channel",
                    "required": true
                },
                {
                    "type": 5,
                    "name": "enable",
                    "description": "Enable the logging system",
                    "required": true
                }
            ]
        },
        {
            "type": 1,
            "name": "interaction",
            "description": "Configure the interaction usages.",
            "options": [
                {
                    "type": 3,
                    "name": "type",
                    "description": "Select a type",
                    "choices": [
                      {
                        "name": "prefix",
                        "value": "prefix"
                      },
                      {
                        "name": "allowed",
                        "value": "allowed"
                      }
                    ],
                    "required": true
                },
                {
                    "type": 3,
                    "name": "value",
                    "description": "set a value",
                    "required": true
                },
                {
                    "type": 5,
                    "name": "enable",
                    "description": "Enable the interactions on the server",
                    "required": true
                }
            ]
        },
        {
            "type": 1,
            "name": "verification",
            "description": "Setup a verification system.",
            "options": [
                {
                    "type": 3,
                    "name": "type",
                    "description": "choice the type",
                    "choices": [
                      {
                        "name": "Verification Channel",
                        "value": "verification_channel"
                      },
                      {
                        "name": "Log channel",
                        "value": "log_channel"
                      },
                      {
                        "name": "Welcome Channel",
                        "value": "welcome_channel"
                      }
                    ],
                    "required": true
                },
                {
                    "type": 7,
                    "name": "channel",
                    "description": "Select the channel",
                    "required": true
                },
                {
                    "type": 5,
                    "name": "enable",
                    "description": "Enable the verification on the server",
                    "required": true
                },
                {
                    "type": 5,
                    "name": "online",
                    "description": "Enable the online verification on the server",
                    "required": true
                }
            ]
        },
        {
            "type": 1,
            "name": "level",
            "description": "Level configurations.",
            "options": [
                {
                    "type": 3,
                    "name": "type",
                    "description": "Select the channel",
                    "choices": [
                      {
                        "name": "Levelup channel",
                        "value": "alertChannel"
                      }
                    ],
                    "required": true
                },
                {
                    "type": 7,
                    "name": "channel",
                    "description": "select the channel",
                    "required": true
                },
                {
                    "type": 4,
                    "name": "xpboost",
                    "description": "set a multiplier of xp",
                    "required": true
                },
                {
                    "type": 5,
                    "name": "rankcard",
                    "description": "Enable rank image view",
                    "required": true
                }
            ]
        },
        {
            "type": 1,
            "name": "selfroles",
            "description": "Level configurations.",
            "options": [
                {
                    "type": 3,
                    "name": "type",
                    "description": "Select the channel",
                    "choices": [
                      {
                        "name": "Selfroles channel",
                        "value": "selfroles"
                      }
                    ],
                    "required": true
                },
                {
                    "type": 7,
                    "name": "channel",
                    "description": "select the channel",
                    "required": true
                },
                {
                    "type": 5,
                    "name": "enable",
                    "description": "Enable the self roles systel.",
                    "required": true
                }
            ]
        },
        {
            "type": 1,
            "name": "rules",
            "description": "Level configurations.",
            "options": []
        }
    ],
    async execute(interaction) {
        
    }
}
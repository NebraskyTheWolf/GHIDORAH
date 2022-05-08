const Discord = require('discord.js');
const userSchema = require("./Models/User.js");
const guildSchema = require("./Models/Guild.js");
const memberSchema = require("./Models/Member.js");

module.exports.fetchUser = async function(key) {
    let userDB = await userSchema.findOne({ id: key });
    if (userDB) {
        return userDB;
    } else {
        userDB = new userSchema({
            id: key,
            registeredAt: Date.now()
        });
        await userDB.save().catch(err => console.error(err));
        return userDB;
    }
}

module.exports.fetchGuild = async function(key) {
    let guildDB = await guildSchema.findOne({ id: key });
    
    if (guildDB) {
        return guildDB;
    } else {
        guildDB = new guildSchema({
            id: key,
            registeredAt: Date.now()
        });
        await guildDB.save().catch(err => console.error(err));
        return guildDB;
    }
}

module.exports.fetchMember = async function(userID, guildID) {
    let member = await memberSchema.findOne({ id: userID, guildID: guildID });

    if (member) {
        return member;
    } else {
        member = new memberSchema({
            id: userID,
            guildID: guildID,
            registeredAt: Date.now()
        });
        await member.save().catch(err => console.error(err));
        return member;
    }
}

// RANKED RANK 

